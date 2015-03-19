/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    noop = g.util.noop,
    // es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    queue = require('streamqueue'),
    lazypipe = require('lazypipe'),
    bower = require('./bower');

var htmlminOpts = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: false,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true
};

/**
 * Scripts
 */
gulp.task('scripts-dist', ['templates-dist'], function () {
    return appFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
});

/**
 * Templates
 */
gulp.task('templates', function () {
  // return templateFiles().pipe(buildTemplates());
});

gulp.task('templates-dist', function () {
    return templateFiles({min: true}).pipe(buildTemplates());
});

/**
 * Default task
 */
gulp.task('default', ['test']);

/**
 * Test
 */
gulp.task('test', ['templates', 'karma-conf'], function () {
    return testFiles()
    .pipe(g.karma({
        configFile: 'karma.conf.js',
        action: 'run'
    }));
});

/**
 * Inject all files for tests into karma.conf.js
 * to be able to run `karma` without gulp.
 */
gulp.task('karma-conf', ['templates'], function () {
    return gulp.src('./karma.conf.js')
        .pipe(g.inject(testFiles(), {
            starttag: 'files: [',
            endtag: ']',
            addRootSlash: false,
            transform: function (filepath, file, i, length) {
                return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
            }
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Test files
 */
function testFiles() {
    return new queue({objectMode: true})
        .queue(gulp.src(fileTypeFilter(bowerFiles(), 'js')))
        .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
        .queue(appFiles())
        .queue(gulp.src(['./app/**/*.spec.js', './.tmp/src/app/**/*.spec.js']))
        .done();
}

/**
 * All AngularJS application files as a stream
 */
function appFiles () {
    var files = [
        './.tmp/' + bower.name + '-templates.js',
        './.tmp/src/app/**/*.js',
        '!./.tmp/src/app/**/*_test.js',
        './app/**/*.js',
        '!./app/**/*.spec.js'
    ];
    return gulp.src(files)
        .pipe(g.angularFilesort());
}

/**
 * All AngularJS templates/partials as a stream
 */
function templateFiles (opt) {
    return gulp.src(['./**/*.html'], opt)
        .pipe(opt && opt.min ? g.htmlmin(htmlminOpts) : noop());
}

/**
 * Build AngularJS templates/partials
 */
function buildTemplates () {
    return lazypipe()
        .pipe(g.ngHtml2js, {
            moduleName: bower.name,
            prefix: '/' + bower.name + '/',
            stripPrefix: '/src/app'
        })
        .pipe(g.concat, bower.name + '-templates.js')
        .pipe(gulp.dest, './.tmp');
}

/**
 * Filter an array of files according to file type
 *
 * @param {Array} files
 * @param {String} extension
 * @return {Array}
 */
function fileTypeFilter (files, extension) {
    var regExp = new RegExp('\\.' + extension + '$');
    return files.filter(regExp.test.bind(regExp));
}

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist (ext, name, opt) {
    opt = opt || {};
    return lazypipe()
        .pipe(g.concat, name + '.' + ext)
        .pipe(gulp.dest, './dist')
        .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
        .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
        .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
        .pipe(ext === 'js' ? g.uglify : g.minifyCss)
        .pipe(g.rename, name + '.min.' + ext)
        .pipe(gulp.dest, './dist')();
}
