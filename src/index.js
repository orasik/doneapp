'use strict';
const inquirer = require('inquirer');
const { addTask, listTasks }  = require('./store');
const Table = require("cli-table3");
const moment = require("moment");
const chalk = require("chalk");

const prog = require('caporal');
prog
  .version('1.0.0')
  .command('add', 'Add a new task')
  .argument('[date]', 'Date where task was done', /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, moment().format('Y-M-D'))
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
      },
      {
        type: 'input',
        name: 'project',
        message: "Which project?",
      },
    ];
    
    inquirer.prompt(questions).then(answers => {
      addTask(answers, args['date']);
    });
  })
  
  .command('list', 'List tasks done today')
  .argument('[date]', 'List tasks done on that date')
  .action((args, options, logger) => {
    const tasks =  listTasks(args['date']);
    tasks.then(result => {
      const output = new Table({
        head: ['Ticket #', 'Description', 'Project'],
        // style:{border:[],header:[]},
        colWidths:[10,50,10],
        wordWrap:true
      });
  
      result.forEach(element => {
        output.push([
          chalk.cyan(element.data().reference), 
          element.data().description, 
          chalk.red(element.data().project)
        ]);
      });

      console.log(output.toString());
    });
  })
  ;

prog.parse(process.argv);