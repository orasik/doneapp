#!/usr/bin/env node

const inquirer = require('inquirer');
const Table = require('cli-table3');
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');
const prog = require('caporal');
const { hasConfig } = require('./utils');
const { addTask, listTasks } = require('./store');

prog
  .version('0.1.0')
  .command('add', 'Add a new task')
  .argument('[date]', 'Date where task was done', /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, moment().format('Y-MM-DD'))
  .action((args) => {
    if (!hasConfig()) {
      console.log(`you don't have config file, please run ${chalk.yellow('doneapp init')}`);
      return;
    }
    const questions = [
      {
        type: 'input',
        name: 'reference',
        message: 'What is the ticket number?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please describe the work.',
      },
      {
        type: 'input',
        name: 'project',
        message: 'Which project?',
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      addTask(answers, args.date);
    });
  })

  .command('list', 'List tasks done today')
  .argument('[date]', 'List tasks done on that date')
  .action(async (args) => {
    if (!hasConfig()) {
      console.log(`you don't have config file, please run ${chalk.yellow('doneapp init')}`);
      return;
    }
    const tasks = await listTasks(args.date);
    const output = new Table({
      head: ['Ticket #', 'Description', 'Project'],
      colWidths: [13, 50, 13],
      wordWrap: true,
    });

    tasks.forEach((element) => {
      output.push([
        chalk.cyan(element.data().reference),
        element.data().description,
        chalk.red(element.data().project),
      ]);
    });
    console.log(output.toString());
  })

  .command('init', 'intial setup to save config data')
  .action(async () => {
    const questions = [
      {
        type: 'input',
        name: 'serviceAccountFile',
        message: '➡️  Firebase service account file location (in your local system)',
      },
      {
        type: 'input',
        name: 'databaseURL',
        message: '➡️  Firestore database url',
      },
      {
        type: 'input',
        name: 'collection',
        message: '➡️  Database collection name',
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      fs.writeFileSync(`${process.env.HOME}/.doneapp`,
        `DATABASE_URL=${answers.databaseURL}
SERVICE_ACCOUNT_FILE=${answers.serviceAccountFile}
COLLECTION_NAME=${answers.collection}
`);
    });
  });

prog.parse(process.argv);
