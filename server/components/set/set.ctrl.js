var dir = __dirname.replace('/server/components/set', '/storage/projects'),
  fs = require('fs'),
  zipFolder = require('zip-folder'),
  project = require(__dirname + '/../project/project.ctrl'),
  rdir = require('require-dir');

var setCtrl = {
  list: function (project) {
    console.log(rdir(dir + '/' + project + '/sets', {
      recurse: true
    }));
    return Object.keys(rdir(dir + '/' + project + '/sets', {
      recurse: true
    }));
  },
  detail: function (name, set) {
    // todo errorcontrol
    var path = project.path() + '/' + name + '/sets/' + set;
    return fs.readdirSync(path);
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
  },
  zip: function (proj, set) {
    var base = project.path() + '/' + proj,
      orig = base + '/sets/' + set,
      dest = base + '/dist/' + proj + '.' + set + '.zip';
      console.log(set);
      console.log(orig);
      console.log(dest);
    if (fs.existsSync(dest)) {
      return dest;
    } else {
      zipFolder(orig, dest, function (err) {
        if (err) {
          console.log('oh no!', err);
        } else {
          console.log(dest);
          return dest;
        }
      });
    }
  }
};
module.exports = setCtrl;
