export default class $projects {
    constructor($http) {
        this.$http = $http;
    }

    // Example service function
    list() {
        return this.$http({ method: 'GET', url: 'http://localhost:4443/api/project' });
    }
    detail(a) {
        return this.$http({ method: 'GET', url: 'http://localhost:4443/api/project/' + a });
    }
    setDetail(a, b) {
        return this.$http({ method: 'GET', url: 'http://localhost:4443/api/project/' + a + '/' + b });
    }
    path(a, b) {
        return this.$http({ method: 'GET', url: 'http://localhost:4443/api/project/path' });
    }
}

$projects.$inject = ['$http'];