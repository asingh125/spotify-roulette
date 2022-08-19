/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PlayersUpdater = props => {
  const setState = props.setState
  const period = props.period

  const [newState, setNewState] = useState(props.initial)
  const [lastState, setLastState] = useState(props.initial)

  const arrayEquals = (arr1, arr2) => {
    if ((arr1 == undefined) && (arr2 == undefined)) {
      return true
    }
    if (typeof arr1 != typeof arr2) {
      return false
    }
    if (arr1.length != arr2.length) {
      return false
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!(arrayEquals(lastState, newState))) {
        console.log(`Players changed from ${lastState} to ${newState}`)
        setState(newState)
      }
      setLastState(newState)
      updatePlayers()
    }, period)
    return () => clearInterval(interval)
  }, [newState, lastState])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setNewState(d)
  }

  return (
    <>
    </>
  )

}

export default PlayersUpdater