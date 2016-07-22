var yargs = require('yargs');

function esmigrate() {
}

esmigrate.prototype = {
	run: function() {
		yargs
			.usage('Usage: $0 <command> [options]')
			.commandDir('cmds')
			.demand(1)
			.example('$0 up -p ./test/ -c 2', 'Upgrade ElasticSearch next 2 migrations not already run.')
			.help('h')
			.alias('h', 'help')
			.epilog('Copyright 2016');
					
		var commandHandlers = yargs.getCommandInstance().getCommands();
		var argv = 	yargs.argv;
			
		var cmd = argv._[0];		
		if (cmd && commandHandlers.indexOf(cmd) == -1) {
		  yargs.showHelp();
		  console.log("Command '$0' is not valid.".replace("$0", cmd));
		}		
	},
}

module.exports = esmigrate;
