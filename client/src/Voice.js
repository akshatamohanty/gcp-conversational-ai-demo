import React, { useEffect, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

class SpeechSingleton {
	_speechApiInstance = null
	_recognizer = null

	constructor(onSpeechResponse) {
		if (!this._speechApiInstance) {
			try {
				const recognizer = this.makeRecognizer()
				this._recognizer = recognizer
				this._speechApiInstance = this
			} catch(ex) {
				throw new Error('error initializing speech: ', ex)
			}
		}

		this._speechApiInstance.onSpeech(onSpeechResponse)
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

		speechRecognizer.onaudioend = function(event) {
				console.log('onaudioend')
		}

		speechRecognizer.onend = function(event) {
			console.log('onsoundend, start again')
			// speechRecognizer.start()
		}

		speechRecognizer.onnomatch = function(event) {
			console.log('onnomatch')
		}

		speechRecognizer.onsoundstart = function(event) {
			console.log('onsoundstart')
		}

		speechRecognizer.onsoundend = function(event) {
			console.log('onsoundend')
		}

		speechRecognizer.onspeechstart = function(event) {
			console.log('[DEBUG] speech start')
			console.log('onspeechstart')
		}

		speechRecognizer.onspeechend = function(event) {
			console.log('onspeechend')
			speechRecognizer.stop()
		}

		speechRecognizer.onerror = function(event){
			console.log(event)
		}

		return speechRecognizer
	}

	getRecognizer = () => {
		if (!this._speechApiInstance || !this._recognizer) {
			throw new Error('no speech instance in bootstrap')
		}

		return this._speechApiInstance._recognizer
	}

	onSpeech = (handleOnSpeech) => {
		const speechRecognizer = this.getRecognizer()

		speechRecognizer.onresult = event => {
			for(let i=event.resultIndex; i < event.results.length; i++){
				console.log(event.results)
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

const useCloudSpeechApi = () => {
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
				timeSlice: 2000,
				ondataavailable: function(blob) {
					console.log(blob)
					// 3
					// making use of socket.io-stream for bi-directional
					// streaming, create a stream
					// var stream = ss.createStream();
					// stream directly to server
					// it will be temp. stored locally
					// ss(socket).emit('stream', stream, {
					// 		name: 'stream.wav',
					// 		size: blob.size
					// });
					// pipe the audio blob to the read stream
					// ss.createBlobReadStream(blob).pipe(stream);
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
			recordAudio.stop()
		}
	}, [])
}

const MicrophoneButton = () => {
	const [isRecording, setIsRecording]  = useState(false)

	const text = isRecording ? 'speaking' : 'tap to speak'

	return (
		<button
		  className='noselect'
			onMouseDown={_ => setIsRecording(true)}
			onTouchStart={_ => setIsRecording(true)}
			onMouseUp={_ => setIsRecording(false)}
			onTouchEnd={_ => setIsRecording(false)}
		>
			{text}
		</button>
	)
}


export { useWebSpeechApi }
export { useCloudSpeechApi as useSpeech }
export { MicrophoneButton }
