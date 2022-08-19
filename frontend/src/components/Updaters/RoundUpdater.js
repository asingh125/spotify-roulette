/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RoundUpdater = props => {
  const setState = props.setState
  const period = props.period

  const [newState, setNewState] = useState(props.initial)
  const [lastState, setLastState] = useState(props.initial)

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastState != newState) {
        console.log(`Round changed from ${lastState} to ${newState}.`)
        setState(newState)
      }
      setLastState(newState)
      updateRound()
    }, period)
    return () => clearInterval(interval)
  }, [newState, lastState])

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setNewState(parseInt(data))
  }

  return (
    <>
    </>
  )

}

export default RoundUpdater