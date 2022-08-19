/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SongUpdater = props => {
  const setState = props.setState
  const period = props.period

  const [newState, setNewState] = useState(props.initial)
  const [lastState, setLastState] = useState(props.initial)

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastState != newState) {
        console.log(`Song changed from ${lastState} to ${newState}.`)
        setState(newState)
      }
      setLastState(newState)
      updateSong()
    }, period)
    return () => clearInterval(interval)
  }, [newState, lastState])

  const updateSong = async () => {
    const { data } = axios.get('/gameapi/songID').then(result => {
      setNewState(result.data)
    })
  }

  return (
    <>
    </>
  )

}

export default SongUpdater