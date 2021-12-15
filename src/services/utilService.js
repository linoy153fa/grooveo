import audio1 from '../assets/audios/1.mp3'
import audio2 from '../assets/audios/2.mp3'
import audio3 from '../assets/audios/3.mp3'
import audio4 from '../assets/audios/4.mp3'
import audio5 from '../assets/audios/5.mp3'
import audio6 from '../assets/audios/6.mp3'
import audio7 from '../assets/audios/7.mp3'
import audio8 from '../assets/audios/8.mp3'
import audio9 from '../assets/audios/9.mp3'
const audios = [audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8, audio9]
export const utilService = {
    getAudio,
    makeId
}


export function getAudio(idx) {
    if (idx <= 0) return audio1
    return audios[idx - 1]
}

function makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}