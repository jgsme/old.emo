gutil = require 'gulp-util'
through = require 'through2'
path = require 'path'

module.exports = (opt)->
  cwd = base = null
  jsons = []

  transform = (file, encoding, callback)->
    if file.isNull() then return callback null, file
    if file.isStream() then return callback new gutil.PluginError('helper/generate-json', 'Stream not supported')
    if cwd is null then cwd = file.cwd
    if base is null then base = file.base

    jsons.push JSON.parse file.contents.toString()

    callback()

  flush = (callback)->
    res = Object.keys(jsons[0]).map (key)->
      keywords = []
      for json in jsons
        if json[key]? then keywords = keywords.concat json[key]
      {
        name: key
        keywords: keywords
      }

    @push new gutil.File
      cwd: cwd
      base: base
      path: path.resolve base, 'emojis.json'
      contents: new Buffer JSON.stringify res
    callback()

  through.obj transform, flush
