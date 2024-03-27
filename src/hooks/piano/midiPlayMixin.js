import React, { useState, useEffect, useRef } from 'react'

import { isNoteNameValid } from '@/utils/util'

import { OBEvent } from "@/config";

import event from '@/utils/event';

import { Midi, Player } from '@tonejs/midi'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { playNoteByNotename } from '@/store/actions/piano';

export default function useMidiPlayMixin() {

    const dispatch = useDispatch()

    const [currentMidiData, setCurrentMidiData] = useState(null)

    const midiNotesRef = useRef([])

    const midiNotesByKeyRef = useRef([])

    const [midiStop, setMidiStop] = useState(false);//自动播放停止

    const startTimeRef = useRef(null)

    const noteIndexRef = useRef(0);

    // useEffect(() => {
    //     event.regist(OBEvent.PLAY_MIDI_NOTE, note => {
    //         if (!note) return;
    //         if (isNoteNameValid(note.name)) {
    //             console.log('这里调用了几次')
    //             playNote(note.name, note.duration + 0.8)

    //             // $(`[data-name="${note.name}"]`).addClass('auto-key-active')
    //             // setTimeout(() => {
    //             // $(`[data-name="${note.name}"]`).removeClass('auto-key-active')
    //             // }, note.duration * 900)
    //         }
    //         // setTimeout(() => {

    //         // }, 0)
    //     })
    // }, [])

    const playNote = (notename, duration) => {
        dispatch(playNoteByNotename(notename, duration))
    }

    const playmidinote = (note) => {
        if (!note) return;
        if (isNoteNameValid(note.name)) {
            playNote(note.name, note.duration + 0.8)
            document.querySelector(`div[data-name='${note.name}']`).classList.add("auto-key-active")
            setTimeout(() => {
                document.querySelector(`div[data-name='${note.name}']`).classList.remove('auto-key-active')
            }, note.duration * 900)
        }
    }
    // 排序 attr 排序用的字段   rev true 为升序，false为降序
    const compare = (attr, rev) => {
        if (rev == undefined) {
            rev = 1;
        } else {
            rev = (rev) ? 1 : -1;
        }
        return (a, b) => {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        }
    }

    const loadMidiAndPlay = (midi) => {
        Midi.fromUrl(midi).then((data) => {
            setCurrentMidiData(data)
            playMidi(data)
        });
    }
    const playMidi = (midiData) => {
        if (midiData) {
            setMidiStop(false)
            midiNotesRef.current = []
            midiData.tracks.forEach((track, trackIndex) => {
                // 需要是钢琴乐器 FIXME
                midiNotesRef.current = midiNotesRef.current.concat(track.notes)
            })
            startTimeRef.current = +new Date()
            // event.emit(OBEvent.HIDE_GLOBAL_LOADING);
            playLoop()
        }
    }
    const playLoop = () => {
        if (midiStop) return
        let unPlayedNotes = midiNotesRef.current.filter(n => !n.played)
        if (unPlayedNotes.length <= 0) {
            // event.emit(OBEvent.MUSIC_END);
            return
        }
        let now = +new Date()
        let playedTime = now - startTimeRef.current // 单位毫秒ms
        unPlayedNotes.forEach((note, index) => {
            if (playedTime >= note.time * 1000 && !note.played) {
                // 播放note
                note.played = true;
                // event.emit(OBEvent.PLAY_MIDI_NOTE, note);
                playmidinote(note)
            }
        })
        setTimeout(() => {
            playLoop()
        }, 30)

    }
    const stopMidiPlay = () => {
        setMidiStop(true)
        setCurrentMidiData(null)
        midiNotesRef.current = []
    }


    const loadMidiAndPlayByKey = (midi) => {
        Midi.fromUrl(midi).then((data) => {
            playMidiByKey(data)
        });
    }
    const playMidiByKey = (midiData) => {
        if (midiData) {
            midiData.tracks.forEach((track, trackIndex) => {
                midiNotesByKeyRef.current = midiNotesByKeyRef.current.concat(track.notes)
            })
            midiNotesByKeyRef.current = midiNotesByKeyRef.current.sort(compare('time', true))
        }
    }

    // 播放midi的一个音
    const playLoopByKey = () => {

        let isTimeSame = true;
        let isKeyEnd = false;//用户是否弹奏完
        while (isTimeSame) {
            let note = midiNotesByKeyRef.current[noteIndexRef.current]
            // event.emit(OBEvent.PLAY_MIDI_NOTE, note);
            playmidinote(note)

            if (noteIndexRef.current === midiNotesByKeyRef.current.length - 1) {
                isTimeSame = false;
                isKeyEnd = true;
                clearMidiPlayByKey()
                return isKeyEnd;
            }
            noteIndexRef.current++;
            // console.log(noteIndexRef.current)
            // console.log(midiNotesByKeyRef.current[noteIndexRef.current + 1].time)
            // console.log(midiNotesByKeyRef.current[noteIndexRef.current].time)
            if (midiNotesByKeyRef.current[noteIndexRef.current + 1].time - midiNotesByKeyRef.current[noteIndexRef.current].time <= 0.08549) {
                // console.log('小于0.08')
                isTimeSame = true;
            } else {
                // console.log('大于0.08')
                isTimeSame = false;
            }
        }

        return isKeyEnd;
    }
    const clearMidiPlayByKey = () => {
        midiNotesByKeyRef.current = []
        startTimeRef.current = null;
        noteIndexRef.current = 0
    }

    return { loadMidiAndPlay, stopMidiPlay, loadMidiAndPlayByKey, playLoopByKey, clearMidiPlayByKey }
}
