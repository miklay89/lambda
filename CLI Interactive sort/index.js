const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function firstQuestion() {
  let data = [];
  rl.question(' Wake up, NEO...\n THE MATRIX HAS YOU...\n Input 10 words or digits, dividing them by SPACES: ', (answer) => {
    if(answer === 'exit') {
      exitTheMatrix();
    }

    data.push(...answer.split(' '));
    console.log(`Your input: ${answer}`);
    console.log(
      'How would you like to sort values?\n',
      '1. Words by name (from A to Z)\n',
      '2. Show digits from the smallest\n',
      '3. Show digits from the biggest\n',
      '4. Words by quantity of letters\n',
      '5. Only uniq words\n',
      '6. Uniq words and digits'
    );
    secondQuestion(data);
  });
}

function secondQuestion(data) {
  rl.question('Input digits from 1 to 6: ' , (answer) => {
    if(answer === 'exit') {
      exitTheMatrix();
    }

    console.log(`Your input: ${answer}`);
    dataSort(answer, data);
  });
}

function dataSort(flag, data) {
  const words = onlyWords(data);
  const digits = onlyDigits(data);
  switch(flag) {
        case '1':
          console.log(words.sort());
          firstQuestion();
          break;
        case '2':
          console.log(digits.sort((a, b) => a - b));
          firstQuestion();
          break;
        case '3':
          console.log(digits.sort((a, b) => b - a));
          firstQuestion();
          break;
        case '4':
          console.log(words.sort((a, b) => a.length - b.length));
          firstQuestion();
          break;
        case '5':
          console.log(onlyUniqWords(words));
          firstQuestion();
          break;
        case '6':
          console.log(onlyUniqWords(data));
          firstQuestion();
          break;
        default:
          console.log('Wrong input, try again')
          secondQuestion(data);
      }
}

function onlyWords(arr) {
  return arr.filter(el => isNaN(el));
}

function onlyDigits(arr) {
  return arr.filter(el => !isNaN(el));
}

function onlyUniqWords(arr) {
  return [...new Set(arr)];
}

function exitTheMatrix() {
  console.log('FREE AT LAST!!!)');
  process.exit();
}

firstQuestion()