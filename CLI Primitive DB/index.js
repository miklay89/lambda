const moduleDB = require('./db');
const saveToDB = moduleDB.saveToDB;
const readDB = moduleDB.readDB;
const findInDB = moduleDB.findInDB;
const { collectDataQuestion, dbInitQuestion, queryQuestion } = require('./questions');
const inquirer = require('inquirer');

function ask(questions) {
  return inquirer.prompt(questions);
}

function init(dataQuestion, dbQuestion, dbQueryQuestion) {
  try {
    ask(dataQuestion)
    .then(answers => {
      if(!answers.name) {
        dbInit(dbQuestion, dbQueryQuestion);
        return;
      }
      saveToDB(answers);
      init(dataQuestion, dbQuestion, dbQueryQuestion);
    });
  } catch (err) {
    console.log(err);
  }
}

function dbInit(dbQuestion, dbQueryQuestion) {
  try {
    ask(dbQuestion)
    .then(async (answers) => {
      if(!answers.findOrExit) {
        process.exit();
      }
      const data = await readDB();
      console.log(data);
      searchInDB(data, dbQueryQuestion)
    });
  } catch(err) {
    console.log(err);
  }
}

function searchInDB(data, dbQueryQuestion) {
  try {
    ask(dbQueryQuestion)
    .then(answers => {
      const query = answers.query;
      const candidate = findInDB(data, query);
      candidate? console.log(candidate) : console.log(`User with name: ${query} not found`);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}

init(collectDataQuestion, dbInitQuestion, queryQuestion);