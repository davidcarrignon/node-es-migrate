exports.command = 'up'
 
exports.describe = 'Executes ElasticSearch upgrade a given number of migrations or a specific one. Defaults to up all migrations if no count is given.'
 
exports.builder = {
}
 
exports.handler = function (argv) {
  // do something with argv. 
  console.log("up!");
}