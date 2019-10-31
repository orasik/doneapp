'use strict';
const inquirer = require('inquirer');
const { addTask, listTasks }  = require('./store');

const prog = require('caporal');
prog
  .version('1.0.0')
  // you specify arguments using .argument()
  // 'app' is required, 'env' is optional
  .command('add', 'Add a new task')
  // .argument('<app>', 'App to deploy', /^myapp|their-app$/)
  .argument('[date]', 'Date where task was done', /^dev|staging|production|local$/, 'local')
  // you specify options using .option()
  // if --tail is passed, its value is required
  // .option('--tail <lines>', 'Tail <lines> lines of logs after deploy', prog.INT)
  .action(function(args, options, logger) {
    console.log(args);
    console.log(options);
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
    });
  })
  
  .command('list', 'List tasks done today')
  .argument('[date]', 'List tasks done on that date')
  .action((args, options, logger) => {
    listTasks(args['date']);
  })
  ;

prog.parse(process.argv);