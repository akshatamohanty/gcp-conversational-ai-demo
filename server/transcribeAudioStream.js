// Source: https://github.com/dialogflow/selfservicekiosk-audio-streaming/blob/master/examples/simpleserver.js
// STT - Transcribe Speech on Audio Stream

const speech = require('@google-cloud/speech')

// constants
const sampleRateHertz = 16000
const languageCode = 'en-US';
let encoding = 'LINEAR16';

// Creates a client
const speechClient = new speech.SpeechClient();

// Create the initial request object
// When streaming, this is the first call you will
// make, a request without the audio stream
// which prepares Dialogflow in receiving audio
// with a certain sampleRateHerz, encoding and languageCode
// this needs to be in line with the audio settings
// that are set in the client
const requestSTT = {
  config: {
    sampleRateHertz: sampleRateHertz,
    encoding: encoding,
    languageCode: languageCode
  },
  interimResults: false,
  //enableSpeakerDiarization: true,
  //diarizationSpeakerCount: 2,
  model: 'phone_call' // consider: video
}


async function transcribeAudioStream(audio, cb) {
  const recognizeStream = speechClient.streamingRecognize(requestSTT)
  .on('data', function(data){
    cb(data);
  })
  .on('error', (e) => {
    console.log(e);
  })
  .on('end', () => {
    console.log('on end');
  })

  audio.pipe(recognizeStream)
}

module.exports = transcribeAudioStream