import fs from 'fs';
import path from 'path';
import readline from 'readline';
import {google} from 'googleapis';
import dotenv from 'dotenv';
import { TokenInterface, CredentialsInterface } from './interfaces';
import { readToken, saveToken } from './db';
import { urlShorter } from './urlShorter';
dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(__dirname,'../', 'token.json');
const storedCredentials: CredentialsInterface = {
  client_secret: process.env.client_secret as string,
  client_id: process.env.client_id as string,
  redirect_uris: process.env.redirect_uris as string,
};

const oAuth2Client = new google.auth.OAuth2(
  storedCredentials.client_id, 
  storedCredentials.client_secret, 
  storedCredentials.redirect_uris);

async function authenticate(scopes: string) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    include_granted_scopes: true
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, async (err, token: any) => {
      if (err) return console.log('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      await saveToken(TOKEN_PATH, token);
      return oAuth2Client;
    });
  });
}

function isNotExpiredToken(token: TokenInterface) {
  const expiryDate = +token.expiry_date;
  const currentDate = Date.now();
  const result = expiryDate - currentDate;
  if(result > 0) return true;
  return false;
}

async function init() {
  const tokens: TokenInterface = await readToken(TOKEN_PATH);
  const access_token = tokens.access_token;
  const refresh_token = tokens.refresh_token;
  if(!tokens) {
    // console.log('This app needs authentication');
  return authenticate(SCOPES[0]);
  }
  if(tokens && isNotExpiredToken(tokens)) {
    oAuth2Client.setCredentials({ access_token: access_token, refresh_token: refresh_token });
    // console.log('Access token not expired');
    return oAuth2Client;
  } 
  if(!isNotExpiredToken(tokens)) {
    oAuth2Client.setCredentials({ refresh_token: refresh_token });
    // console.log('Access token is expired and will be refreshed');
    return oAuth2Client;
  }
}

async function uploadFiles(client: any, path: string, name: string, mime_type: string) {
  const drive = google.drive({
    version: 'v3',
    auth: await client,
  });

  const filePath = path;
  const fileName = name;

  try{
    const response = await drive.files.create({
          requestBody: {
              name: fileName, //file name
              parents: ['1bu-N9wZvCNbHsj51PiH4NFO9HoY41yBB'],
              mimeType: mime_type,
          },
          media: {
              mimeType: mime_type,
              body: fs.createReadStream(filePath),
          },
      });  
      // console.log(response.data);
      const id = response.data.id
      return id;
  }catch (err) {
      //report the error message
      console.log(err);
  }
}

async function getFileUrl(client: any, id: string) {
  const drive = google.drive({
    version: 'v3',
    auth: await client,
  });

  const webViewLink = await drive.files.get({
    fileId: id,
    fields: 'webViewLink'
  });
  const fileId = webViewLink.data.webViewLink as string;
  return fileId;
}

export async function fileUpload(path: string, filename: string, mime_type: string) {
  const id = await init()
  .then(client => uploadFiles(client, path, filename, mime_type))
  .catch(err => console.log(err));
  return id;
}

export async function getUrlbyID(id: string) {
  init()
  .then(client => getFileUrl(client, id))
  .then(url => console.log(url))
  .catch(err => console.log(err));
}

export async function getShortUrlByID(id: string) {
  init()
  .then(client => getFileUrl(client, id))
  .then(url => urlShorter(url))
  .then(shortUrl => console.log(shortUrl))
  .catch(err => console.log(err));
}



