import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const GreenButton = styled.button`
  grid-row: 1 / 1;
  grid-column: 1 / 2;
  padding: 5px 5px;
  font-size: 1em;
  position: relative;
  left: 0;
  outline: none;
  border: 2px solid Grey !important;
  background-color: LightGreen !important;
  color: Black
  font-size: 16px;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #b6e1fc !important;
  }
`
const GrayButton = styled.button`
  grid-row: 1 / 1;
  grid-column: 1 / 2;
  padding: 5px 5px;
  font-size: 1em;
  position: relative;
  left: 0;
  outline: none;
  border: 2px solid Grey !important;
  background-color: LightGrey !important;
  color: Black
  font-size: 16px;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const PlayerOption = props => {
  const [wasSelected, setWasSelected] = useState(false)

  const { player } = props

  const selectPlayer = async () => {
    //INSERT POST REQUEST FOR SUBMIT ANSWER(player) HERE
    const answer = player
    const { data } = await axios.post('/gameapi/submitanswer', { answer })
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