var dir = __dirname.replace('/server/components/set', '/storage/projects'),
  fs = require('fs'),
  zipFolder = require('zip-folder'),
  svgo = require('svgo'),
  webfont = require('webfont').default,
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
    if (fs.existsSync(dest)) {
      return dest;
    } else {
      zipFolder(orig, dest, function (err) {
        if (err) {
          console.log('oh no!', err);
        } else {
          return dest;
        }
      });
    }
  },
  svgFont: function (proj, set, formats, callback) {
    this.optimize(proj, set, project.detail(proj, set));
    return webfont({
      files: project.path() + '/' + proj + '/sets/' + set + '/*.svg',
      fontName: proj + '.' + set,
      formats: formats,
      template: 'scss'
    }).then(callback);
  },
  svgFontFiles: function (proj, set, result, formats) {
    var path = project.path() + '/' + proj + '/dist';
    // could be refactored to async, I suppose
    for (var i = 0; i < formats.length; i++) {
      compileFontFile(path, formats[i], proj, set, result[formats[i]]);
    }
    compileFontFile(path, 'scss', proj, set, result.styles);
    if (fs.existsSync(path + '/' + proj + '.' + set + '.webfonts.zip')) {
      return path + '/' + proj + '.' + set + '.webfonts.zip';
    } else {
      zipFolder(path + '/fonts', path + '/' + proj + '.' + set + '.webfonts.zip', function (err) {
        if (err) {
          console.log('oh no!', err);
        } else {
          return path + '/' + proj + '.' + set + '.webfonts.zip';
        }
      });
    }
  },
  optimize: function (proj, set, arr) {
    var base = project.path() + '/' + proj,
      orig = base + '/sets/' + set,
      dest = base + '/dist/' + proj + '.' + set + '.zip';
    for (var i = 0; i < arr.length; i++) {
      if (fs.existsSync(orig + '/' + arr[i])) {
        var content = fs.readFile(orig + '/' + arr[i], 'utf8');
        opt(orig + '/' + arr[i], content);
      }
    }
    function opt(path, data) {
      if (err) {
        throw err;
      }
      svgo.optimize(data, function (result) {
        fs.writeFileSync(path, result);
      });
    }
  }
};
function compileFontFile(path, type, proj, set, data, ext) {
  if (fs.existsSync(path + '/fonts/' + proj + '.' + set + '.' + type)) {
    return path + '/fonts/' + proj + '.' + set + '.' + type;
  } else {
    fs.writeFileSync(path + '/fonts/' + proj + '.' + set + '.' + type, data);
  }
}
module.exports = setCtrl;
