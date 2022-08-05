/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PlayerOption = props => {
  const [wasSelected, setWasSelected] = useState(false)

  const { player } = props

  const selectPlayer = async () => {
    //INSERT POST REQUEST FOR SUBMIT ANSWER(player) HERE
    const answer = player
    const { data } = await axios.post('/gameapi/submitanswer', { answer }).then(result => {
      result.data 
    })
    if (data === 'answer submitted') {
    } else {
      window.alert('Error submitting answer. Please try again.');
    }
    setWasSelected(true)
  }

  return (
    <>
    {wasSelected ? 
      <>
        <button onClick={selectPlayer}>
          {player}
        </button>
        <br />
        <br />
      </>
    :
      <>
        <button onClick={selectPlayer}>
          {player}
        </button>
        <br />
        <br />
      </>
    }
    </>
  )
}

export default PlayerOption