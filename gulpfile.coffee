gulp = require 'gulp'
jade = require 'gulp-jade'
coffee = require 'gulp-coffee'
styl = require 'gulp-stylus'
conn = require 'gulp-connect'
deploy = require 'gulp-gh-pages'

paths =
  jade: 'src/*.jade'
  styl: 'src/*.styl'
  coffee: 'src/*.coffee'
  dest: 'build/'

gulp.task 'jade', ->
  gulp.src paths.jade
    .pipe jade()
    .pipe gulp.dest(paths.dest)

gulp.task 'coffee', ->
  gulp.src paths.coffee
    .pipe coffee()
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
gulp.task 'default', ['jade', 'styl', 'coffee', 'copy']
gulp.task 'watch', ['default'], ->
  gulp.watch paths.jade, ['jade']
  gulp.watch paths.styl, ['styl']
  gulp.watch paths.coffee, ['coffee']
  conn.server
    root: 'build'

gulp.task 'deploy', ['default'], ->
  gulp.src './build/*'
    .pipe deploy
      cacheDir: 'tmp'
