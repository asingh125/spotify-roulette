/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ModeUpdater = props => {
  const setState = props.setState

  const [newState, setNewState] = useState(props.initial)
  const [lastState, setLastState] = useState(props.initial)

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastState != newState) {
        console.log(`Mode changed from ${lastState} to ${newState}.`)
        setState(newState)
      }
      setLastState(newState)
      updateMode()
    }, 500)
    return () => clearInterval(interval)
  }, [newState, lastState])

  const updateMode = async () => {
    const { data } = axios.get('/gameapi/mode').then(result => {
      setNewState(parseInt(result.data, 10))
    })
  }

  return (
    <>
    </>
  )

}

export default ModeUpdater