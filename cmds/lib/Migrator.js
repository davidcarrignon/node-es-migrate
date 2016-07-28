var _ = require('lodash');
//var sync = require('synchronize');
var fs = require('fs');
var path = require('path');
var elasticsearch = require('elasticsearch');
var LogsRepository = require('./LogsRepository');


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
				var data = fs.readFileSync(file,{encoding:'utf8'});
				//var filemodule = require(file);
				//filemodule.up(client, function () {});
				
				console.log(data);
				
				// try run
				// save in es result. 
				repository.save("1.0", file, data, function(e, r) {});
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
	},
	
	getFiles: function(filesPath) {
		filesPath = path.resolve(filesPath);
		
		var stats = fs.statSync(filesPath);
		var files;
		
		if (stats.isDirectory()) {
			files = this.getDirFiles(filesPath);
		} else {
			files = [ filesPath ];
		}
		
		return files;
	},
	
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