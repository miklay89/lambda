"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const mime_types_1 = require("mime-types");
const google_1 = require("./google");
const path_1 = __importDefault(require("path"));
let result = {
    pathToFile: '',
    fileName: '',
    extname: '',
    new_fileName: '',
    id: '',
    mime_type: ''
};
inquirer_1.default.prompt([
    {
        type: 'input',
        name: 'path',
        message: 'Drag and drop image file to terminal and press Enter for Upload:',
    }
])
    .then(answers => {
    result.pathToFile = answers.path;
    console.log('Path to file: ', result.pathToFile);
    result.fileName = path_1.default.basename(answers.path).slice(0, -1);
    console.log('Filename: ', result.fileName);
    result.extname = path_1.default.extname(answers.path).slice(0, -1);
    result.mime_type = (0, mime_types_1.lookup)(result.extname);
    console.log('File extname: ', result.extname);
}).then(() => {
    inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'newName',
            message: () => `You uploading file with name: ${result.fileName} \r\n Would you like to change name?`,
        },
        {
            type: 'input',
            name: 'new_fileName',
            message: 'Input new name without extname (.jpg, .png, .bmp):',
            when: (answers) => answers.newName == true
        }
    ])
        .then(async (answers) => {
        result.new_fileName = answers.new_fileName;
        let fullFilename = result.fileName;
        if (result.new_fileName) {
            console.log(`New filename is: ${answers.new_fileName}${result.extname}`);
            fullFilename = result.new_fileName + result.extname;
        }
        console.log(result.pathToFile);
        console.log(fullFilename);
        const path = result.pathToFile.slice(1, -1);
        console.log(path);
        const mime_type = result.mime_type;
        const id = await (0, google_1.fileUpload)(path, fullFilename, mime_type);
        console.log('File was uploaded.');
        return id;
    })
        .then(id => {
        result.id = id;
    })
        .then(() => {
        inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'shortLink',
                message: 'Would you like to shirt the link?'
            }
        ])
            .then(answers => {
            if (answers.shortLink) {
                (0, google_1.getShortUrlByID)(result.id);
            }
            else {
                (0, google_1.getUrlbyID)(result.id);
            }
        });
    });
})
    .catch(err => console.log(err));
