'use strict';
const inquirer = require('inquirer');
const { addTask, listTasks }  = require('./store');

const questions = [
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
  answers['timestamp'] = new Date().getTime()
  answers['category'] = 'work'

  addTask(answers);
  listTasks('2019-10-27');
});