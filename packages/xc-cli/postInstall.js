require('colors')
const clear = require('clear');
const AppMgr = require('./lib/mgr/AppMgr')
const firstRun = require('first-run');
const isFirstTime = false && firstRun();

const boxen = require('boxen');
(async () => {

  clear();

  if (isFirstTime) {

    console.log(`
Successfully installed xc-cli.\n\nPress any Key to install Desktop Client.
  `.bold.green)

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
      await AppMgr.install({})
      process.exit.bind(process, 0)
    });

  } else {

    console.log('\n\n' + boxen(`Please run following commands to get started      
 
# Install xc desktop app     
${'xc app.install'.green.bold} 
   
# Open xc desktop app 
${'xc app.open'.green.bold}`, {padding: 1, margin: 1, borderStyle: 'round',borderColor:'green'}));
  }
})().catch(e => console.log(e)).finally(() => {

})