/**
 * Heirarchical conversation example
 */

'use strict';
var inquirer = require('inquirer');

class RunOrDownload {

  static async prepareCmd(ipc, args) {

    args._[0] = '';

    let answers = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'gen',
          'add',
          'show',
          'run',
        ]
      }]);

    args._[0] = answers.action;

    switch (answers.action) {

      case 'gen':
        await this.handleGen(ipc,args)
        break;

      case 'add':
        break;

      case 'show':
        break;

      case 'run':
        break;


    }
  }

  static async handleGen(ipc,args) {

    let a1 = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'action',
        message: 'What do you want to generate ?',
        pageSize: 9,
        choices: [
          'apis',
          'backend',
          'block',
          'controller',
          'middleware',
          'service',
          'resolver',
          'type',
          'schema',
          'apis',
        ]
      }]);

    args._[0] += `:${a1.action}`;

    switch (a1.action) {

      case 'apis':

        let a2 = await inquirer.prompt([
          {
            type: 'rawlist',
            name: 'action',
            message: 'Which apis you want to use?',
            choices: [
              'rest',
              'graphql'
            ]
          }]);

        args._[0] += `:${a2.action}`;

        break;

    }
  }

  static async handleAdd() {

  }

  static async handleShow() {

  }

  static async handleRun() {

  }


}


module.exports = RunOrDownload;

