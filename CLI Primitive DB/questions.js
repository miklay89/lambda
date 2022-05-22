const collectDataQuestion = [
  {
    type: 'input',
    name: 'name',
    message: 'Input Users name',
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Chose your Gender',
    choices: ['male', 'female'],
    filter(val) {
      return val.toLowerCase();
    },
    when: (answers) => answers.name !== ''
  },
  {
    type: 'input',
    name: 'years',
    message: 'How old are you?',
    validate(value) {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    when: (answers) => answers.name !== ''
  },
];

const dbInitQuestion = [
  {
    type: 'confirm',
    name: 'findOrExit',
    message: 'Would you like to find a User in DB?',
  },
  
];

const queryQuestion = [
  {
    type: 'input',
    name: 'query',
    message: 'Input Users name for searching',
  },
]

module.exports = {
  collectDataQuestion,
  dbInitQuestion,
  queryQuestion 
}