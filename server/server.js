const express = require('express')
const io = require('socket.io')
const ss = require('socket.io-stream')
const path = require('path')
const fs = require('fs')

const transcribeAudioStream = require('./transcribeAudioStream.js')

//
// setup app
//
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

server = app.listen(3022)

//
// setup socket
//
const socketIo = io(server).on('connect', (client) => {
  // when the client sends 'stream-transcribe' events
  // when using audio streaming
  ss(client).on('stream-translate', function(stream, data) {
      // get the name of the stream
      const filename = path.basename(data.name)

      // pipe the filename to the stream
      stream.pipe(fs.createWriteStream(filename))

      // make a detectIntStream call
      transcribeAudioStream(stream, function(results){
          console.log(results)
          // client.emit('results', results)
      })
  })
})