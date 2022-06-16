import inquirer from "inquirer";
import { lookup } from 'mime-types';
import { fileUpload, getUrlbyID, getShortUrlByID } from './google';
import path from 'path';

interface Result {
  pathToFile: string;
  fileName: string;
  extname: string;
  new_fileName: string;
  id: string;
  mime_type: string | boolean;
}

let result: Result = {
  pathToFile: '',
  fileName: '',
  extname: '',
  new_fileName: '',
  id: '',
  mime_type: ''
};

inquirer.prompt(
  [
    {
      type: 'input',
      name: 'path',
      message: 'Drag and drop image file to terminal and press Enter for Upload:',
    }
  ]
)
.then(answers => { 
  result.pathToFile = answers.path;
  console.log('Path to file: ', result.pathToFile);
  result.fileName = path.basename(answers.path);
  console.log('Filename: ', result.fileName);
  result.extname = path.extname(answers.path);
  result.mime_type = lookup(result.extname);
  console.log('File extname: ', result.extname)
}).then(() => {
    inquirer.prompt([
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
  .then(async answers => {
    result.new_fileName = answers.new_fileName;
    let fullFilename = result.fileName;
    if(result.new_fileName) {
      console.log(`New filename is: ${answers.new_fileName}${result.extname}`);
      fullFilename = result.new_fileName + result.extname;
    }
    console.log(result.pathToFile);
    console.log(fullFilename)
    const path = result.pathToFile;
    console.log(path);
    const mime_type = result.mime_type;
    const id = await fileUpload(path, fullFilename, mime_type as string);
    console.log('File was uploaded.')
    return id as string;
  })
  .then(id => {
    result.id = id;
  })
  .then(() => {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'shortLink',
        message: 'Would you like to shirt the link?'
      }
    ])
    .then(answers => {
      if (answers.shortLink) {
        getShortUrlByID(result.id);
      } else {
        getUrlbyID(result.id)
      }
    })
  })
})
.catch(err => console.log(err));