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
    recordAudio = RecordRTC(
        stream,
        { type: ‘audio’, mimeType: ‘audio/webm` …}
    )
}
```

## Text-to-Speech and Speech-to-Text

Converting text-to-speech and vice versa are done using Natural Language Processing (NLP), which enables machines to read and understand human languages. NLP models can perform tasks like transcription (speech to text), speech synthesis (text to speech), sentiment analysis, intent detection, spam filtering, and autocomplete. When choosing a model, one can use existing models for speed and leverage existing advancements, though this may lack flexibility. Alternatively, one can bring their own model (BYOM) for more control and customization, but this requires significant time, money, and expertise. For deployment, models can be deployed on the cloud via an API or a paid service like Google Cloud Speech, offering processing power and abstraction but with potential security and latency issues. Alternatively, models can be deployed locally on the device, utilizing capabilities like the Web Speech API for data privacy and low latency, though this approach faces challenges with model conversion and processing limitations.

### Audio Streaming with sockets

# Talks & Presentation

- [Slides](https://docs.google.com/presentation/d/e/2PACX-1vSCCaXTQ3krJxLd9Y5mtGgNcGJ-BgGen7vvCIbYSKJeizY6bcxrbr5I6QXZ4Qd8gU13dBGzHPzW0MPR/pub?start=false&loop=false&delayms=3000)
- [Talk](https://youtu.be/hr8NPNJjIn0)

# References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
