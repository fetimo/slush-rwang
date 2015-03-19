/*
 * slush-rwang
 *
 * Copyright (c) 2014, Matt Moats
 * Licensed under the MIT license.
 */

var gulp = require('gulp'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    _ = require('underscore.string');

gulp.task('default', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'App name?',
        default: getNameProposal()
    }], function(answers) {
        answers.nameDashed = _.slugify(answers.moduleName);
        answers.modulename = _.camelize(answers.nameDashed);
        gulp.src(__dirname + '/app-structure/**/*')
            .pipe(template(answers))
            .pipe(rename(function(path) {
                if (path.basename[0] === '_') {
                    path.basename = '.' + path.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .on('finish', function() {
                gulp.src(__dirname + '/templates/module.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.moduleName + '.module.js'))
                    .pipe(conflict('./app/modules'))
                    .pipe(gulp.dest('./app/modules'))
                    .on('finish', function() {
                        done();
                    });
            });
    });
});

gulp.task('module', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }], function(answers) {
        gulp.src(__dirname + '/templates/module.js')
            .pipe(template(answers))
            .pipe(rename(answers.moduleName + '.module.js'))
            .pipe(conflict('./app/modules'))
            .pipe(gulp.dest('./app/modules'))
            .on('finish', function() {
                done();
            });
    });
});

gulp.task('controller', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }, {
        name: 'controllerName',
        message: 'Controller name?',
        default: 'controller'
    }], function(answers) {
        gulp.src(__dirname + '/templates/controller.js')
            .pipe(template(answers))
            .pipe(rename(answers.controllerName + '.controller.js'))
            .pipe(conflict('./app/controllers'))
            .pipe(gulp.dest('./app/controllers'))
            .on('finish', function() {
                gulp.src(__dirname + '/templates/controller.spec.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.controllerName + '.controller.spec.js'))
                    .pipe(conflict('./app/controllers'))
                    .pipe(gulp.dest('./app/controllers'))
                    .on('finish', function() {
                        done();
                    });
            });
    });
});

gulp.task('directive', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }, {
        name: 'directiveName',
        message: 'Directive name?',
        default: 'directive'
    }], function(answers) {
        gulp.src(__dirname + '/templates/directive.js')
            .pipe(template(answers))
            .pipe(rename(answers.directiveName + '.directive.js'))
            .pipe(conflict('./app/directives'))
            .pipe(gulp.dest('./app/directives'))
            .on('finish', function () {
                gulp.src(__dirname + '/templates/directive.spec.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.directiveName + '.directive.spec.js'))
                    .pipe(conflict('./app/directives'))
                    .pipe(gulp.dest('./app/directives'))
                    .on('finish', function() {
                        done();
                    });
            });
    });
});

gulp.task('factory', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }, {
        name: 'factoryName',
        message: 'Factory name?',
        default: 'factory'
    }], function(answers) {
        gulp.src(__dirname + '/templates/factory.js')
            .pipe(template(answers))
            .pipe(rename(answers.factoryName + '.factory.js'))
            .pipe(conflict('./app/factories'))
            .pipe(gulp.dest('./app/factories'))
            .on('finish', function() {
                done();
            });
    });
});

gulp.task('service', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }, {
        name: 'serviceName',
        message: 'Service name?',
        default: 'service'
    }], function(answers) {
        gulp.src(__dirname + '/templates/service.js')
            .pipe(template(answers))
            .pipe(rename(answers.serviceName + '.service.js'))
            .pipe(conflict('./app/services'))
            .pipe(gulp.dest('./app/services'))
            .on('finish', function() {
                done();
            });
    });
});

gulp.task('filter', function(done) {
    inquirer.prompt([{
        name: 'moduleName',
        message: 'Module name?',
        default: getNameProposal()
    }, {
        name: 'filterName',
        message: 'Filter name?',
        default: 'filter'
    }], function(answers) {
        gulp.src(__dirname + '/templates/filter.js')
            .pipe(template(answers))
            .pipe(rename(answers.filterName + '.filter.js'))
            .pipe(conflict('./app/filters'))
            .pipe(gulp.dest('./app/filters'))
            .on('finish', function() {
                gulp.src(__dirname + '/templates/filter.spec.js')
                    .pipe(template(answers))
                    .pipe(rename(answers.filterName + '.filter.spec.js'))
                    .pipe(conflict('./app/filters'))
                    .pipe(gulp.dest('./app/filters'))
                    .on('finish', function() {
                        done();
                    });
            });
    });
});

function getNameProposal () {
  var path = require('path');
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}
