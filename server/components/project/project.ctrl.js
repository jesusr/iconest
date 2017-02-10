var dir = __dirname.replace('/server/components/project', '/storage/projects'),
  fs = require('fs'),
  rdir = require('require-dir'),
  projects = rdir('' + dir, {
    recurse: true
  });

var projectCtrl = {
  path: function (path) {
    if (path && !fs.existsSync(path)) {
      return {
        error: true,
        code: 103,
        description: 'No folder in path'
      };
    } else if (path) {
      dir = path || dir;
    }
    return dir;
  },
  list: function () {
    return Object.keys(rdir('' + dir, {
      recurse: true
    }));
  },
  detail: function (name) {
    // This has to be more complete when the setCtrl has been developed
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
    //should be more restrictive in future
    var path;
    if (!name) {
      return {
        error: true,
        code: 104,
        description: 'Name or path needed'
      };
    }
    name = '' + name;
    path = name.indexOf('/') < 0 ? dir + '/' + name : name;
    if (fs.existsSync(path)) {
      fs.rmdirSync(path);
      return true;
    }
    return {
      error: true,
      code: 105,
      description: 'Folder not exists'
    };
  }
};
module.exports = projectCtrl;
