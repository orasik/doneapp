'use strict';
const inquirer = require('inquirer');
const { addTask, listTasks }  = require('./store');

const prog = require('caporal');
prog
  .version('1.0.0')
  .command('add', 'Add a new task')
  .argument('[date]', 'Date where task was done', /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, null)
  .action(function(args, options, logger) {
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
      addTask(answers, args['date']);
    });
  })
  
  .command('list', 'List tasks done today')
  .argument('[date]', 'List tasks done on that date')
  .action((args, options, logger) => {
    listTasks(args['date']);
  })
  ;

prog.parse(process.argv);