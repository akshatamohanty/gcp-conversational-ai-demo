import { useEffect } from 'react'

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

const useSpeech = (onSpeechResponse) => {
	useEffect(() => {
		const speech = new SpeechSingleton(onSpeechResponse)
		console.log(speech)
		return () => {
			console.log('im off')
			speech.reset()
		}
  }, [onSpeechResponse])
}


export default SpeechSingleton

export { useSpeech }

// var voice = undefined;
// var voices = undefined;

// function getVoices() {
//   if (typeof speechSynthesis === 'undefined') {
//       return;
//   }
//   voices = speechSynthesis.getVoices();
//   if(voices.length > 0) {
//       selectVoice('Google UK English Female');
//   }
// }

// function selectVoice(name) {
//   for (let i = 0; i < voices.length; i++) {
//       if (voices[i].name === name) {
//           voice = voices[i];
//       }
//   }
// }

// getVoices();
// if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
//     speechSynthesis.onvoiceschanged = getVoices;
// }

// const SpeechInit = (speechRecognizer) => {

//   speechRecognizer.onresult = event => {
//     for(let i=event.resultIndex; i < event.results.length; i++){
//         var transcript = event.results[i][0].transcript
//         if(event.results[i].isFinal){
//             transcript = transcript.trim().toLowerCase()
//           console.log(transcript)
//             let utterThis = new SpeechSynthesisUtterance(transcript)
//             utterThis.voice = voice
//             speechSynthesis.speak(utterThis)
//             switch (transcript) {
//               case "right":
//                   break
//               case "left":
//                   break
//               case "down":
//                   break
//               case "up":
//                   break
//               default:
//             }
//         }
//     }
//   }
// }