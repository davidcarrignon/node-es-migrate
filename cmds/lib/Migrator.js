var _ = require('lodash');
//var sync = require('synchronize');
var fs = require('fs');
var path = require('path');
var elasticsearch = require('elasticsearch');
var LogsRepository = require('LogsRepository');


function Migrator() {	
}

Migrator.prototype = {
	up: function(host, apiVersion, filesPath) {
		var files = this.getFiles(filesPath);
		var client = new elasticsearch.Client({
			host: host,
			apiVersion: apiVersion,
		});
		var repository = new LogsRepository(client);
		
		files.forEach(function (file) {
			var alreadyRunned = false; // verify in es if runned
			
			if (!alreadyRunned) {
				console.log("Running " + file);
				var data = fs.readFileSync(file);
				//var filemodule = require(file);
				//filemodule.up(client, function () {});
				
				// try run
				// save in es result. 
				repository.save("1.0", file, data);
			} else {
				console.log("Skipped " + file);
			}
		});
	},
	
	getSourceControlLog: function(){
		client.get({
		  index: 'myindex',
		  type: 'mytype',
		  id: 1
		}, function (error, response) {
		  // ...
		});
	}
	
	getFiles: function(filesPath) {
		filePath = path.resolve(filePath);
		
		var stats = fs.statSync(filePath);
		var files;
		
		if (stats.isDirectory()) {
			files = this.getDirFiles(filePath);
		} else {
			files = [ filePath ];
		}
		
		return files;
	}
	
	getDirFiles: function(dir, filelist) {
		_this = this;
		files = fs.readdirSync(dir);
		filelist = filelist || [];
		files.forEach(function(file) {
			var filePath = dir + '/' + file;
			
			if (fs.statSync(filePath).isDirectory()) {
				filelist = _this.getDirFiles(filePath, filelist);
			}
			else {
				filelist.push(filePath);
			}
		});
		return filelist;
	},
}

module.exports = Migrator;