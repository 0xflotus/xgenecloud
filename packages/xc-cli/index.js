#! /usr/bin/env node
const CliMgr = require('./lib/CliMgr.js');
const SocialMgr = require('./lib/mgr/SocialMgr');
const Util = require('./lib/util/Util')

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');


/* get cli args */
const args = require('yargs')
                .alias('u','url')
                .alias('m','module')
                .alias('n','nomodel')
                .help('help')
                .argv;

/* cwd is reference to all commands */
args.folder = process.cwd();

/* handle command */
(async () => {

// Checks for available update and returns an instance
  const notifier = updateNotifier({pkg});

// Notify using the built-in convenience method
  notifier.notify();


  if(args._ && args._.length) {
    await SocialMgr.showPrompt();

    await CliMgr.process(args);
  }else{
    Util.showHelp(args);
    process.exit(0)
  }
})().catch(err => {
  console.error('\n\nThere was an error processing command:');
  console.error(err);
});


