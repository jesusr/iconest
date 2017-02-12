import angular from 'angular';

let header = () => {
    return {
        template: require('./header.html'),
        controller: 'HeaderCtrl'
    };
};

class HeaderCtrl {
    constructor() {
        this.loginUrl = 'urldummy';
        this.config = {

        };
    }
}

angular.module('header', [])
    .directive('header', header)
    .controller('HeaderCtrl', HeaderCtrl);