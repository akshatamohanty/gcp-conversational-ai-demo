# Description

This project demonstrates the use of the conversational tools in Google Cloud, by building a voice-powered web game.

The game has three functions:

- Shows a picture question
- Consumes and processes a voice-based answer
- Checks if the answer is correct and provides feedback

# System Diagram

![alt text](overall-diagram.png)

## Capturing Audio

Capturing audio involves device-specific steps and requires referring to native documentation and open-source libraries.

In this project, we use the Web Browser's native API, the Web Audio API to capture audio. Additionally, we cover relevant knowledge about audio streams and various audio file formats that is crucial for effective implementation.

For e.g, in Chrome, we can get access to the users' audio with the code below -

```javascript
navigator.getUserMedia({ audio: true }, onSuccess, onError);
```

The audio stream now needs to be converted into a compatible format. For this purpose, which we use the open-source `RecordRTC` javascript library.

```javascript
function onSuccess(stream) {
  recordAudio = RecordRTC(stream, { type: "audio", mimeType: "audio/webm" });
}
```

## Text-to-Speech and Speech-to-Text

Converting text-to-speech and vice versa are done using Natural Language Processing (NLP), which enables machines to read and understand human languages. NLP models can perform tasks like transcription (speech to text), speech synthesis (text to speech), sentiment analysis, intent detection, spam filtering, and autocomplete. When choosing a model, one can use existing models for speed and leverage existing advancements, though this may lack flexibility. Alternatively, one can bring their own model (BYOM) for more control and customization, but this requires significant time, money, and expertise. For deployment, models can be deployed on the cloud via an API or a paid service like Google Cloud Speech, offering processing power and abstraction but with potential security and latency issues. Alternatively, models can be deployed locally on the device, utilizing capabilities like the Web Speech API for data privacy and low latency, though this approach faces challenges with model conversion and processing limitations.

### `Voice.js`

This code provides functionalities for capturing and processing speech using both the Web Speech API and a custom cloud-based solution.

The `SpeechSingleton` class manages a singleton instance of the Web Speech API for speech recognition. It initializes the recognizer, handles speech events, and processes speech results. The `useWebSpeechApi` hook initializes the SpeechSingleton with a provided callback for handling speech responses and resets it upon unmounting.

The cloud-based solution uses `RecordRTC` for audio recording and socket.io for streaming audio to a server for processing. The `useCloudSpeechApi` hook sets up a socket connection to receive speech results from the server and starts continuous audio recording using RecordRTC. The recorded audio is streamed to the server for speech-to-text conversion.

The speak function utilizes the Web Speech API for text-to-speech synthesis. It manages the state of the recognizer and recorder during speech synthesis to ensure smooth operation.

Overall, the code provides a flexible setup for speech recognition and synthesis, leveraging both client-side APIs and server-side processing.

### Web Speech Api

The Web Speech API enables voice data handling in web apps through two main components:

- SpeechSynthesis (Text-to-Speech) and
- SpeechRecognition (Asynchronous Speech Recognition).

#### Speech Recognition:

This is accessed via the SpeechRecognition interface. It recognizes voice input from an audio source and responds accordingly. and uses the `SpeechGrammar` interface to define recognized grammar using `JSpeech Grammar Format` (JSGF).

#### Speech Synthesis

This is accessed via the `SpeechSynthesis` interface and allows web apps to read text content out loud. It represents voices with `SpeechSynthesisVoice` objects and text to be spoken with `SpeechSynthesisUtterance` objects.

### Streaming with sockets

The backend code (`server` folder) sets up an Express server with Socket.io to handle real-time audio transcription using Google Cloud's Speech-to-Text service.

1. **Server Setup**: An Express application is created, serving a simple "hello world" response on the root endpoint and listening on port 3022.

2. **Socket.IO Integration**: The server uses Socket.IO to handle incoming connections. When a client sends an audio stream (`stream-translate` event), the server saves the audio stream to a file and processes it using the `transcribeAudioStream` function.

3. **Transcription Logic**: The `transcribeAudioStream` function uses Google Cloud's Speech-to-Text client to transcribe the audio stream. It creates a request with specified audio settings and streams the audio to Google Cloud's API. The transcribed results are sent back to the client via Socket.IO events.

4. **Google Cloud Speech-to-Text**: The code configures the Speech-to-Text client with parameters such as sample rate, encoding, and language code, ensuring the audio settings match between the client and the server.

We enable real-time audio transcription by streaming audio from the client to the server, which then uses Google Cloud's Speech-to-Text service to transcribe the audio and send back the results.

# Talks & Presentation

- [Slides](https://docs.google.com/presentation/d/e/2PACX-1vSCCaXTQ3krJxLd9Y5mtGgNcGJ-BgGen7vvCIbYSKJeizY6bcxrbr5I6QXZ4Qd8gU13dBGzHPzW0MPR/pub?start=false&loop=false&delayms=3000)
- [Talk](https://youtu.be/hr8NPNJjIn0)

## Running the project

Install the packages, by navigating to the folder `client` and running `npm install`.
Run `npm start` to start the app.

By default, the app uses the browser-based `WebSpeech` API. To use the Cloud Speech API, navigate to the `server` folder, and run `npm install` and `npm start` to start the node server. In the client app,

# References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
