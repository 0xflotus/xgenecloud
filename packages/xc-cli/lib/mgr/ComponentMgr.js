const inquirer = require('inquirer');
const path = require('path');

class ComponentMgr {

  static async add(args) {

    const components = require(path.join(process.cwd(), './server/app.components.js'))

    const answer = await inquirer
        .prompt([
          {
            name: 'compoonent',
            message: 'Choose after which component should we insert the new component?',
            type: 'list',
            choices: components.components.map(component => component.title)
          }
        ])

    return answer.compoonent;
  }

  static async rename(args) {

  }

  static async delete(args) {

  }

}


module.exports = ComponentMgr;