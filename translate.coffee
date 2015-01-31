fs = require 'fs'
async = require 'neo-async'
Translator = require 'mstranslator'
emojis = require './lib/emoji/emojis.json'
keys = require './.mskey.json'

t = new Translator
  client_id: keys.ID
  client_secret: keys.SECRET
, true

req = (word, callback)->
  t.translate
    text: word
    from: 'en'
    to: 'ja'
  , (err, data)->
    callback null, data

keyHandler = (key, callback)-> async.map emojis[key], req, (err, res)->
  callback null,
    key: key
    result: res

async.map Object.keys(emojis), keyHandler, (err, result)->
  output = {}
  for res in result
    output[res.key] = res.result
  fs.writeFile 'src/data/emojis.ja.json', JSON.stringify(output)
