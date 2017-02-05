var dir = __dirname.replace('/server/components/project', '/storage/projects');
console.log(dir);
var projects = require('require-dir')('' + dir, {
  recurse: true
});

console.log(projects);


var projectCtrl = {
  list: function(req, res) {
    res.json(Object.keys(projects));
  },
  detail: function(req, res) {
    res.json(projects[req.params.project]);
  }
}
module.exports = projectCtrl;
