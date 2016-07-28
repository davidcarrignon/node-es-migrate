var Migrator = require("./lib/migrator.js");

exports.command = 'up'
 
exports.describe = 'Executes ElasticSearch upgrade a given number of migrations or a specific one. Defaults to up all migrations if no count is given.'
 
exports.builder = {	
	host: {				
		describe: '',
		default: 'http://localhost:9200',
	},	
	apiVersion: {
		alias: 'v',
		describe: '',
		default: '2.3',		
    },
	path: {
		alias: 'p',
		describe: ''
    },
}
 
exports.handler = function (argv) {  
  console.log("START UPGRADE !!!");
  
  var m = new Migrator();
  m.up(argv.host, argv.apiVersion, argv.path);
}