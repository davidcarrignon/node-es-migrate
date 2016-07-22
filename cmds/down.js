exports.command = 'down'
 
exports.describe = 'Executes ElasticSearch downgrade a given number of migrations or a specific one. Defaults to downgrade one migration if no count is given.'
 
exports.builder = {
}
 
exports.handler = function (argv) {
  // do something with argv. 
  console.log("down!");
}