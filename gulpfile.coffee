gulp = require 'gulp'
jade = require 'gulp-jade'
coffee = require 'gulp-coffee'
styl = require 'gulp-stylus'
conn = require 'gulp-connect'
deploy = require 'gulp-gh-pages'
riot = require 'gulp-riot'
concat = require 'gulp-concat'
gulpif = require 'gulp-if'

paths =
  jade: 'src/*.jade'
  styl: 'src/*.styl'
  js: ['lib/Fuse/src/fuse.min.js', 'src/components/*.jade', 'src/*.coffee']
  dest: 'build/'

gulp.task 'jade', ->
  gulp.src paths.jade
    .pipe jade()
    .pipe gulp.dest(paths.dest)

gulp.task 'js', ->
  gulp.src paths.js
    .pipe gulpif(/\.coffee/, coffee())
    .pipe gulpif(/\.jade/, riot
      template: 'jade'
      compact: true
    )
    .pipe concat 'index.js'
    .pipe gulp.dest(paths.dest)

gulp.task 'styl', ->
  gulp.src paths.styl
    .pipe styl()
    .pipe gulp.dest(paths.dest)

gulp.task 'copy-json', ->
  gulp.src 'lib/emoji/emojis.json'
    .pipe gulp.dest("#{paths.dest}data")

gulp.task 'copy-asset', ->
  gulp.src ['lib/emoji/stylesheets/emoji.css', 'lib/emoji/emoji.png']
    .pipe gulp.dest(paths.dest)

gulp.task 'copy', ['copy-json', 'copy-asset']
gulp.task 'default', ['jade', 'styl', 'js', 'copy']
gulp.task 'watch', ['default'], ->
  gulp.watch paths.jade, ['jade']
  gulp.watch paths.styl, ['styl']
  gulp.watch paths.js, ['js']
  conn.server
    root: 'build'
    port: 3001

gulp.task 'deploy', ['default'], ->
  gulp.src './build/*'
    .pipe deploy
      cacheDir: 'tmp'
