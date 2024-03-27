import React, { useState } from 'react'

import { ScoreNum } from '@/utils/piano/constant'

import SmapleLibrary from '@/lib/Tonejs-Instruments'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { playNoteByNotename } from '@/store/actions/piano';

export default function usePlayMixin() {

  const dispatch = useDispatch()
  const { inputSpeed } = useSelector(
    (state) => ({
      inputSpeed: state.pianoState.get('inputSpeed'),
    }),
    shallowEqual
  )
  const [manualPlayIndex, setManualPlayIndex] = useState(0)
  const [backingTrackIndex, setBackingTrackIndex] = useState(0)

  let touchedKeys = ScoreNum
  let playTimers = []
  // 目前只有C调和 D调，待完善调整
  let StepMap = {
    'C': {
      '1>>': 'C2', '2>>': 'D2', '3>>': 'E2', '4>>': 'F2', '5>>': 'G2', '6>>': 'A2', '7>>': 'B2',
      '1>': 'C3', '2>': 'D3', '3>': 'E3', '4>': 'F3', '5>': 'G3', '6>': 'A3', '7>': 'B3',
      '1': 'C4', '2': 'D4', '3': 'E4', '4': 'F4', '5': 'G4', '6': 'A4', '7': 'B4',
      '1<': 'C5', '2<': 'D5', '3<': 'E5', '4<': 'F5', '5<': 'G5', '6<': 'A5', '7<': 'B5',
      '1<<': 'C6', '2<<': 'D6', '3<<': 'E56', '4<<': 'F6', '5<<': 'G6', '6<<': 'A6', '7<<': 'B6'
    },
    'D': {
      '1>>': 'D2', '2>>': 'E2', '3>>': 'F#2', '4>>': 'G2', '5>>': 'A2', '6>>': 'B2', '7>>': 'C#3',
      '1>': 'D3', '2>': 'E3', '3>': 'F#3', '4>': 'G3', '5>': 'A3', '6>': 'B3', '7>': 'C#4',
      '1': 'D4', '2': 'E4', '3': 'F#4', '4': 'G4', '5': 'A4', '6': 'B4', '7': 'C#5',
      '1<': 'D5', '2<': 'E5', '3<': 'F#5', '4<': 'G5', '5<': 'A5', '6<': 'B5', '7<': 'C#6',
      '1<<': 'D6', '2<<': 'E6', '3<<': 'F#6', '4<<': 'G6', '5<<': 'A6', '6<<': 'B6', '7<<': 'C#7'
    },
  }

  // useEffect(() => {
  //   console.log('scorename变化了')
  //   playScoreByName(scorename)
  //   return () => {
  //   };
  // }, [scorename]);

  // 触发单个音符播放
  const playNote = (notename, duration) => {
    dispatch(playNoteByNotename(notename, duration))
  }

  // 将简谱numNotation映射为notename
  const mapNum2NoteName = (stepname = '', numNotation = '') => {
    let pitch = numNotation.match(/[#b]*[0-7][\<\>]*/g)[0]

    if (pitch && stepname && StepMap[stepname]) {
      let curStep = StepMap[stepname]
      if (curStep && curStep[pitch]) {
        let notename = curStep[pitch]
        return notename
      }
    }
    return ''
  }

  // 获取音符持续时长
  const getNoteDuration = (numNotation, timeUnit) => {
    let factor = 1
    if (numNotation.match(/\([0-9.]*\)/g)) {
      factor = numNotation.match(/\([0-9.]*\)/g)[0].replace(/[\)\(]/g, '')
    }
    return timeUnit * (+factor)
  }
  // 自动播放简谱
  const autoPlayNumberScore = (step = 'C', musicScore, speed = 75) => {
    // $('.piano-key').removeClass('auto-key-active')
    let timeUnit = (60 * 1000) / speed
    let startStmp = new Date()
    let i = 0
    let playedTime = 0
    let pressedNote

    let loop = () => {

      let curStmp = new Date()
      let deltaTime = curStmp - startStmp
      console.log("播放下一个音符")
      if (deltaTime > playedTime) {
        // 播放下一个音符
        // if (pressedNote) {
        //   $(`[data-keyCode=${pressedNote.keyCode}]`).removeClass('auto-key-active');
        // }
        let numNotation = musicScore[i]
        let notename = mapNum2NoteName(step, numNotation)
        // pressedNote = getNoteByName(notename)

        // if (pressedNote) $(`[data-keyCode=${pressedNote.keyCode}]`).addClass('auto-key-active')
        // try {
        // polySynth.triggerAttack(notename);
        playNote(notename)
        //   polySynth.triggerAttackRelease(notename, '1n');
        // } catch (error) {
        //   console.log(error)
        // }
        playedTime += getNoteDuration(numNotation, timeUnit)
        i++
        if (i >= musicScore.length) {
          setTimeout(() => {
            // $(`.piano-key`).removeClass('auto-key-active')
          }, 1000)
          // clearInterval(loopTimer)
          return
        }
      }
    }
    let loopTimer = setInterval(() => {
      loop()
    }, 20)

    playTimers.push(loopTimer)
  }

  // 根据输入播放简谱
  const manualPlayMixin = (step = 'C', musicScore, speed = 75) => {
    // $('.piano-key').removeClass('auto-key-active')
    // let startStmp = new Date()
    // let curStmp = new Date()
    // let deltaTime = curStmp - startStmp
    // if (deltaTime > playedTime) {
    // 播放下一个音符
    // if (pressedNote) {
    //   $(`[data-keyCode=${pressedNote.keyCode}]`).removeClass('auto-key-active');
    // }
    console.log('index有变化吗？', manualPlayIndex)
    let numNotation = musicScore[manualPlayIndex]
    let notename = mapNum2NoteName(step, numNotation)
    // pressedNote = getNoteByName(notename)

    // if (pressedNote) $(`[data-keyCode=${pressedNote.keyCode}]`).addClass('auto-key-active')
    // try {
    // polySynth.triggerAttack(notename);
    playNote(notename)
    //   polySynth.triggerAttackRelease(notename, '1n');
    // } catch (error) {
    //   console.log(error)
    // }
    // playedTime += getNoteDuration(numNotation, timeUnit)
    // manualPlayIndex++

    setManualPlayIndex((data) => {
      return data + 1
    })
    // if (manualPlayIndex >= musicScore.length) {
    //   setTimeout(() => {
    // $(`.piano-key`).removeClass('auto-key-active')
    // }, 1000)
    // clearInterval(loopTimer)
    // return
    // }

    // let loop = () => {


    // }
    // }

    // loop()
    // let loopTimer = setInterval(() => {
    //   loop()
    // }, 20)

    // playTimers.push(loopTimer)
  }

  // 根据输入播放简谱 副轨
  const backingTrackPlay = (step = 'C', musicScore, speed = 75) => {
    // $('.piano-key').removeClass('auto-key-active')
    // let startStmp = new Date()
    // let curStmp = new Date()
    // let deltaTime = curStmp - startStmp
    // if (deltaTime > playedTime) {
    // 播放下一个音符
    // if (pressedNote) {
    //   $(`[data-keyCode=${pressedNote.keyCode}]`).removeClass('auto-key-active');
    // }
    let numNotation = musicScore[backingTrackIndex]
    let notename = mapNum2NoteName(step, numNotation)
    // pressedNote = getNoteByName(notename)

    // if (pressedNote) $(`[data-keyCode=${pressedNote.keyCode}]`).addClass('auto-key-active')
    // try {
    // polySynth.triggerAttack(notename);
    playNote(notename)
    //   polySynth.triggerAttackRelease(notename, '1n');
    // } catch (error) {
    //   console.log(error)
    // }
    // playedTime += getNoteDuration(numNotation, timeUnit)
    // manualPlayIndex++

    setBackingTrackIndex((data) => {
      return data + 1
    })
  }

  // 点击简谱列表播放音乐
  const playScoreByName = (name = '天空之城') => {
    console.log('发过来的歌曲名：', name)
    let targetScore
    for (let k in ScoreNum) {
      let score = ScoreNum[k]
      if (score.name == name) {
        targetScore = score
        break
      }
    }
    if (targetScore) {
      pauseAutoPlay()
      let step = targetScore.step
      // let speed = targetScore.speed
      console.log(StepMap[step])
      if (StepMap[step]) {
        console.log(inputSpeed)
        autoPlayNumberScore(step, targetScore.mainTrack, inputSpeed)
        if (targetScore.backingTrack) {
          autoPlayNumberScore(step, targetScore.backingTrack, inputSpeed)
        }
      }
    }
  }
  // 根据输入播放简谱
  const playKnockByName = (name = '天空之城') => {
    let targetScore
    for (let k in ScoreNum) {
      let score = ScoreNum[k]
      if (score.name == name) {
        targetScore = score
        break
      }
    }
    if (targetScore) {
      pauseAutoPlay()
      let step = targetScore.step
      // let speed = targetScore.speed
      console.log(StepMap[step])
      if (StepMap[step]) {
        manualPlayMixin(step, targetScore.mainTrack, inputSpeed)
        console.log(targetScore.backingTrack)
        if (targetScore.backingTrack) {
          backingTrackPlay(step, targetScore.backingTrack, inputSpeed)
        }
      }
    }
  }

  // 停止自动播放
  const pauseAutoPlay = () => {
    // $(`.piano-key`).removeClass('auto-key-active')
    playTimers.forEach((timer) => {
      clearInterval(timer)
      timer = null
    })
    playTimers.splice(0)
    return 'pauseAutoPlay'
  }

  return { playScoreByName, pauseAutoPlay, playKnockByName }
}
