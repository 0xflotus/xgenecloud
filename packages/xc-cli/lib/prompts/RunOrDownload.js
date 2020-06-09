/**
 * Heirarchical conversation example
 */

'use strict';
var inquirer = require('inquirer');


class RunOrDownload {

  static async handle(args) {

    let answers = await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'action',
          message: 'Your XGENE desktop app is not open - do you want to ?',
          choices: [
            'Open the app!',
            'Download it for FREE'
          ]
        }
      ]);

    switch (answers.action) {

      case 'Open app!':
        break;

      case 'Download it for FREE':
        console.log('wget(https://xgene.cloud/download?latest=true) to Downloads');
        break;

    }
  }


}


module.exports = RunOrDownload;

