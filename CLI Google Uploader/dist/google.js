"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortUrlByID = exports.getUrlbyID = exports.fileUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const urlShorter_1 = require("./urlShorter");
dotenv_1.default.config();
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path_1.default.join(__dirname, '../', 'token.json');
const storedCredentials = {
    client_secret: process.env.client_secret,
    client_id: process.env.client_id,
    redirect_uris: process.env.redirect_uris,
};
const oAuth2Client = new googleapis_1.google.auth.OAuth2(storedCredentials.client_id, storedCredentials.client_secret, storedCredentials.redirect_uris);
async function authenticate(scopes) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
        include_granted_scopes: true
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, async (err, token) => {
            if (err)
                return console.log('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            await (0, db_1.saveToken)(TOKEN_PATH, token);
            return oAuth2Client;
        });
    });
}
function isNotExpiredToken(token) {
    const expiryDate = +token.expiry_date;
    const currentDate = Date.now();
    const result = expiryDate - currentDate;
    if (result > 0)
        return true;
    return false;
}
async function init() {
    const tokens = await (0, db_1.readToken)(TOKEN_PATH);
    const access_token = tokens.access_token;
    const refresh_token = tokens.refresh_token;
    if (!tokens) {
        return authenticate(SCOPES[0]);
    }
    if (tokens && isNotExpiredToken(tokens)) {
        oAuth2Client.setCredentials({ access_token: access_token, refresh_token: refresh_token });
        return oAuth2Client;
    }
    if (!isNotExpiredToken(tokens)) {
        oAuth2Client.setCredentials({ refresh_token: refresh_token });
        return oAuth2Client;
    }
}
async function uploadFiles(client, path, name, mime_type) {
    const drive = googleapis_1.google.drive({
        version: 'v3',
        auth: await client,
    });
    const filePath = path;
    const fileName = name;
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: ['1bu-N9wZvCNbHsj51PiH4NFO9HoY41yBB'],
                mimeType: mime_type,
            },
            media: {
                mimeType: mime_type,
                body: fs_1.default.createReadStream(filePath),
            },
        });
        const id = response.data.id;
        return id;
    }
    catch (err) {
        console.log(err);
    }
}
async function getFileUrl(client, id) {
    const drive = googleapis_1.google.drive({
        version: 'v3',
        auth: await client,
    });
    const webViewLink = await drive.files.get({
        fileId: id,
        fields: 'webViewLink'
    });
    const fileId = webViewLink.data.webViewLink;
    return fileId;
}
async function fileUpload(path, filename, mime_type) {
    const id = await init()
        .then(client => uploadFiles(client, path, filename, mime_type))
        .catch(err => console.log(err));
    return id;
}
exports.fileUpload = fileUpload;
async function getUrlbyID(id) {
    init()
        .then(client => getFileUrl(client, id))
        .then(url => console.log(url))
        .catch(err => console.log(err));
}
exports.getUrlbyID = getUrlbyID;
async function getShortUrlByID(id) {
    init()
        .then(client => getFileUrl(client, id))
        .then(url => (0, urlShorter_1.urlShorter)(url))
        .then(shortUrl => console.log(shortUrl))
        .catch(err => console.log(err));
}
exports.getShortUrlByID = getShortUrlByID;
