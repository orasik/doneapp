'use strict';
var inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'reference',
    message: 'What is the ticket number?',
  },
  {
    type: 'input',
    name: 'description',
    message: "Please describe the work.",
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('\nOrder receipt:');
  answers['timestamp'] = new Date()
  answers['category'] = 'work'
  console.log(JSON.stringify(answers, null, '  '));
});