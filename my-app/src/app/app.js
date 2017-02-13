import angular from 'angular';
import header from './components/header/header';
import $project from './components/projects/projects.service';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  };
};

class AppCtrl {
  constructor($project) {
    let _this = this;
    this.url = 'https://github.com/preboot/angular-webpack';
    this.active = '';
    this.setDetail = null;
    this.projectData = null;
    this.$project = $project;
    this.$project.list().then(function (data) {
      _this.projects = data.data;
    });
  }
  getBase($project) {
    return $project.path();
  }
  selectProject(a) {
    let _this = this;
    if (this.active === a) {
      this.projectData = null;
      this.active = '';
      this.setDetail = null;
    } else {
      this.$project.detail(a).then(function (data) {
        if (data.data.sets) {
          _this.projectData = data.data;
          _this.projectData.list = Object.keys(data.data.sets);
        } else {
          _this.projectData = [];
        }
        _this.setDetail = null;
        _this.active = a;
      });
    }
  }
  getProjectSet(a, b) {
    let _this = this;
    this.getBase(this.$project).then(function (data) {
      _this.base = data.data;
    });
    this.$project.setDetail(a, b).then(function (data) {
      _this.setDetail = data.data;
      _this.activeSet = b;
    });
  }
  hasPack() {
    return this.setDetail.dist.arr.indexOf(this.active + '.' + this.activeSet + '.webfonts.zip') >= 0;
  }
  getFormat(a) {
    return a.split('.')[a.split('.').length - 1];
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['header'])
  .directive('app', app)
  .service('$project', $project)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;