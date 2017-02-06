var dir = __dirname.replace('/server/components/project', '/storage/projects'),
  fs = require('fs'),
  rdir = require('require-dir'),
  projects = rdir('' + dir, {
    recurse: true
  });

var projectCtrl = {
  path: function () {
    return dir;
  },
  list: function () {
    return Object.keys(rdir('' + dir, {
      recurse: true
    }));
  },
  detail: function (name) {
    if (!name || !projects[name]) {
      return {};
    }
    return projects[name];
  },
  create: function (project) {
    var folder;
    if (!project || !project.name) {
      return {
        error: true,
        code: 100,
        description: 'Parameters error'
      };
    }
    folder = dir + '/' + project.name;
    if (!fs.existsSync(folder.replace(' ', '_'))) {
      fs.mkdirSync(folder.replace(' ', '_'));
      return {
        name: project.name,
        path: folder
      };
    } else {
      return {
        error: true,
        code: 101,
        description: 'Already exists'
      };
    }
  },
  remove: function (name) {
    if (!fs.existsSync(folder.replace(' ', '_'))) {
      fs.rmdirSync(dir + '/' + 'name');
    }
  }
};
module.exports = projectCtrl;
