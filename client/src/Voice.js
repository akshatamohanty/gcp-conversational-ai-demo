import { useEffect, useRef } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import io from 'socket.io-client'
import ss from 'socket.io-stream'

class SpeechSingleton {
	_speechApiInstance = null

	constructor(onSpeechResponse) {
		if (!SpeechSingleton._speechApiInstance) {
			try {
				const recognizer = this.makeRecognizer()
				this._recognizer = recognizer
				SpeechSingleton._speechApiInstance = this
			} catch(ex) {
				throw new Error('error initializing speech: ', ex)
			}
		}

		if (onSpeechResponse) {
			SpeechSingleton._speechApiInstance.onSpeech(onSpeechResponse)
		}
	}

	makeRecognizer() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		if (!SpeechRecognition) {
			throw new Error('no speech api support')
		}

		const speechRecognizer = new SpeechRecognition()
		speechRecognizer.continuous = true
		speechRecognizer.lang = "en-US"
		speechRecognizer.start()

		speechRecognizer.onaudiostart = function(event) {
			console.log('onaudiostart')
		}

		return speechRecognizer
	}

	getRecognizer = () => {
		if (!SpeechSingleton._speechApiInstance) {
			throw new Error('no speech instance in bootstrap')
		}

		return this._recognizer
	}

	onSpeech = (handleOnSpeech) => {
		if (!handleOnSpeech) {
			return null
		}

		const speechRecognizer = this.getRecognizer()

		speechRecognizer.onresult = event => {
			for(let i=event.resultIndex; i < event.results.length; i++){
				let transcript = event.results[i][0].transcript

				if(event.results[i].isFinal) {
					transcript = transcript.trim().toLowerCase()
				}

				handleOnSpeech(transcript)
			}
		}
	}

	reset = () => {
		// const speechRecognizer = this.getRecognizer()
		// speechRecognizer.onresult(_ => null)
	}
}

const useWebSpeechApi = (onSpeechResponse) => {
	useEffect(() => {
		const speech = new SpeechSingleton(onSpeechResponse)
		return () => {
			speech.reset()
		}
  }, [onSpeechResponse])
}

const useCloudSpeechApi = (onSpeechResponse) => {
	let socketRef = useRef()

	useEffect(() => {
		socketRef.current = io('http://localhost:3022')

    // when the server found results send
    // it back to the client
    socketRef.current.on('results', function (data) {
			// show the results on the screen
			if(data.results && data.results[0] && data.results[0].alternatives[0]) {
				const transcription = data.results[0].alternatives[0].transcript
				onSpeechResponse(transcription)
			}
    })
	}, [onSpeechResponse])

	useEffect(() => {
		let recordAudio

		function onStream(stream) {
			recordAudio = RecordRTC(stream, {
				type: 'audio',

				mimeType: 'audio/webm',
				sampleRate: 44100,

				// used by StereoAudioRecorder
				// the range 22050 to 96000.
				// let us force 16khz recording:
				desiredSampRate: 16000,

				// MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
				// CanvasRecorder, GifRecorder, WhammyRecorder
				recorderType: StereoAudioRecorder,

				// Dialogflow / STT requires mono audio
				numberOfAudioChannels: 1,

				// continuous streaming
				timeSlice: 5000, //1000,

				ondataavailable: function(blob) {
					if (window.speechSynthesis.speaking) {
						return
					}

					// making use of socket.io-stream for bi-directional
					// streaming, create a stream
					const stream = ss.createStream()
					// stream directly to server
					// it will be temp. stored locally
					ss(socketRef.current).emit('stream-translate', stream, {
							name: 'stream.wav',
							size: blob.size
					})

					// pipe the audio blob to the read stream
					ss.createBlobReadStream(blob).pipe(stream)
			}
			})

			recordAudio.startRecording()
		}

		navigator.getUserMedia({
			audio: true
		}, onStream, function(error) {
				console.error(JSON.stringify(error));
		})

		return () => {
			recordAudio.stopRecording()
		}
	}, [])
}

function speak(utter) {
	var synth = window.speechSynthesis
	const utterance = new SpeechSynthesisUtterance(utter)

	/// bad bad bad
	if (SpeechSingleton._speechApiInstance) {
		const rcg = SpeechSingleton._speechApiInstance.getRecognizer()
		utterance.onstart = _ => { rcg.abort(); console.log('utterace started') }
		utterance.onend = _ => { rcg.start(); console.log('utterance ended') }
	}

	synth.speak(utterance)
}


export { useWebSpeechApi as useSpeech }
// export { useCloudSpeechApi as useSpeech  }
export { speak }
