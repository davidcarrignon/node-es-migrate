var yargs = require('yargs');

function esmigrate() {
}

esmigrate.prototype = {
	run: function() {		
		yargs
			.usage('Usage: $0 <command> [options]')
			.commandDir('cmds')
			.demand(1)
			.example('$0 up -c 2', 'up ElasticSearch by 2 iterations')
			.help('h')
			.alias('h', 'help')
			.epilog('copyright 2016');
					
		var commandHandlers = yargs.getCommandInstance().getCommands();
		var argv = 	yargs.argv;
			
		var cmd = argv._[0];		
		if (cmd && commandHandlers.indexOf(cmd) == -1) {
		  yargs.showHelp();
		  console.log("Command '$0' is not valid.".replace("$0", cmd));
		}		
	}
}

module.exports = esmigrate;
