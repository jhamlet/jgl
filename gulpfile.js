var gulp     = require('gulp'),
    ejs      = require('gulp-ejs'),
    jsdoc    = require('gulp-jsdoc'),
    jsdoc2md = require('jsdoc-to-markdown'),
    fs       = require('fs'),
    path     = require('path'),
    clean    = require('del'),
    pkgInfo  = require('./package.json'),
    CLEAN    = [];
    
gulp.task('clean', function (done) {
    clean(CLEAN, done);
});

gulp.task('api.md', function () {
    return jsdoc2md.
        render('lib/**/*.js', { 'heading-depth': 3 }).
        pipe(fs.createWriteStream('API.md'));
});
CLEAN.push('API.md');

gulp.task('readme.md', function () {
    return gulp.
        src('src/tmpl/README.ejs').
        pipe(ejs({
            pkg: pkgInfo,
            license: fs.readFileSync('LICENSE', 'utf8'),
            links: {
                apiDoc: 'API.md'
            }
        }, {
            ext: '.md'
        })).
        pipe(gulp.dest('./'));
});
CLEAN.push('README.md');

gulp.task('docs', ['readme.md'], function () {
    return gulp.
        src(['./lib/**/*.js', 'README.md']).
        pipe(jsdoc(
            path.join('docs', pkgInfo.version),
            {
                path:                  'ink-docstrap',
                systemName:            pkgInfo.fullname,
                footer:                '',
                copyright:             'Copyright © 2014 Jerry Hamlet',
                navType:               'vertical',
                theme:                 'spacelab',
                linenums:              true,
                collapseSymbols:       true,
                inverseNav:            true,
                outputSourceFiles:     true,
                outputSourcePath:      true,
                highlightTutorialCode: true,
                syntaxTheme:           'dark'
            },
            {
                licenses: [
                    fs.readFileSync('./LICENSE', 'utf8')
                ],
                version: pkgInfo.version
            },
            {
                recurse: true,
                lenient: true,
                'private': true
            }
        ));
});
CLEAN.push('docs/**/*');
CLEAN.push('docs');

gulp.task('default', ['readme.md', 'api.md', 'docs']);
