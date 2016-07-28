var sha1 = require('sha1');

function LogsRepository(client) {
	this.index = ".es-migrate"
	this.type = "changelogs"
	this.errorType = "errorlogs"
	this.client = client;
}

LogsRepository.prototype = {
	get: function(file, callback) {
		var hash = sha1(file);
		var client = this.client;
		client.get({
		  index: this.index,
		  type: this.type,
		  id: hash,
		}, function (error, response) {
			if (response.found) {
				callback(response._source);
			}			
			callback();
		});
	},
	
	save: function(version, scriptPath, scriptContent, callback) {
		var hash = sha1(scriptPath);
		var client = this.client;
		client.index({
		  index: this.index,
		  type: this.type,
		  id: hash,
		  body: {
		    '@timestamp': new Date(),
			version: version,
			scriptPath: scriptPath,
			scriptContent: scriptContent,			
		  }
		}, function (error, response) {
			callback(error, response); 
		});
	},
	
	saveError: function(version, scriptPath, scriptContent, errorMessage, callback) {
		var hash = sha1(scriptPath);
		var client = this.client;
		client.index({
		  index: this.index,
		  type: this.errorType,
		  id: hash,
		  body: {
		    '@timestamp': new Date(),
			version: version,
			scriptPath: scriptPath,
			scriptContent: scriptContent,			
			errorMessage: errorMessage,
		  }
		}, function (error, response) {
			callback(error, response); 
		});
	},
}

module.exports = LogsRepository;