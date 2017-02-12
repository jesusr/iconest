import angular from 'angular';

let project = () => {
    return {
        template: require('./project.html'),
        controller: 'projectCtrl'
    };
};

class projectCtrl {
    constructor() {
    }
}

angular.module('project', [])
    .directive('project', project)
    .controller('projectCtrl', projectCtrl);