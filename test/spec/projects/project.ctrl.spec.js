var projectCtrl = require('../../../server/components/project/project.ctrl'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    expect = chai.expect,
    fs = require('fs'),
    dir = __dirname.replace('/test/spec/projects', '/storage/projects'),
    actualDate = new Date().valueOf();

function cleanFolder() {
    if (fs.existsSync(dir + '/' + actualDate)) {
        fs.rmdirSync(dir + '/' + actualDate);
    }
}

after(function (done) {
    cleanFolder();
    done();
});

describe('Projects Controller', function () {
    beforeEach(function () {
        cleanFolder();
    });
    describe('Get the project storage path', function () {
        it('Should return the correct path: ' + dir, function () {
            projectCtrl.path().should.be.equal(dir);
        });
    });
    describe('Get the project list', function () {
        it('Should return an Array', function () {
            projectCtrl.list().should.be.a('Array');
        });
    });
    describe('Get the project detail', function () {
        it('Should return a void Object if no name provided', function () {
            var detail = projectCtrl.detail();
            expect(detail).to.deep.equal({});
        });
    });
    describe('New project', function () {
        it('Should return an error message with code 100 if no parameter is sent', function () {
            var l = projectCtrl.list().length,
                newProject = projectCtrl.create();
            newProject.should.be.a('Object');
            newProject.should.have.property('error');
            newProject.should.have.property('code');
            newProject.should.have.property('description');
            newProject.error.should.be.equal(true);
            newProject.code.should.be.equal(100);
            l.should.be.equal(projectCtrl.list().length);
        });
        it('Should return an error message with code 100 if the parameter does not contain "name"', function () {
            var l = projectCtrl.list().length,
                newProject = projectCtrl.create({ a: true });
            newProject.should.be.a('Object');
            newProject.should.have.property('error');
            newProject.should.have.property('code');
            newProject.should.have.property('description');
            newProject.error.should.be.equal(true);
            newProject.code.should.be.equal(100);
            l.should.be.equal(projectCtrl.list().length);
        });
        it('Should create a new project and return an object with the name and the url path', function () {
            var l = projectCtrl.list().length,
                newProject = projectCtrl.create({ name: actualDate });
            newProject.should.be.a('Object');
            newProject.should.not.have.property('error');
            newProject.should.have.property('name');
            newProject.should.have.property('path');
            newProject.name.should.be.equal(actualDate);
            l.should.be.equal(projectCtrl.list().length - 1);
        });
    });
});