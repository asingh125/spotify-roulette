import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Timer from './Timer'
import PlayerOption from './PlayerOption'

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  grid-template-rows: auto 1fr;
`

const HeaderLeft = styled.h2`
  font-size: 1.5em;
  color: Black !important;
  font-family: Arial;
  text-align: left;
  grid-row: 1 / 1;
  grid-column: 1 / 2;
`

const HeaderRight = styled.h2`
  font-size: 1em;
  color: DarkGray !important;
  font-family: Arial;
  text-align: right;
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  padding: 10px 20vw;
`

const Label = styled.div`
  grid-row: 1 / 1;
  grid-column: 1 / 2;
  padding: 0;
  font-size: 1em;
  position: relative;
  color: Grey !important;
  padding: 25px 25px;
  border-radius: 10px;
  font-family: Arial;
  text-align: left;
`

const InputContainer = styled.div`
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  padding: 0;
  font-size: 1.5em;
  position: relative;
  color: Grey !important;
  padding: 25px 25px;
  border-radius: 10px;
  font-family: Arial;
`

const ButtonContainer = styled.div`
  margin: 0 auto !important;
  margin: 0;
  position: absolute;
  padding: 25px 25px;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const Button = styled.button`
  padding: 5px 5px;
  font-size: 1em;
  position: relative;
  left: 0;
  outline: none;
  border: 2px solid Grey !important;
  background-color: #67e091 !important;
  color: Black
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: #04bf13 !important;
  }
`

const EndPage = props => {
  const [username, setUsername] = useState('')
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])
  const [numPlayers, setNumPlayers] = useState(0)

  const [songID, setSongID] = useState('')
  const [round, setRound] = useState(1)
  const [mode, getMode] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
      updatesScores()
    }, 500)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    //INSERT GET REQUEST FOR PLAYERS IN THE GAME
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updatesScores = async () => {
    //INSERT GET REQUEST FOR PLAYERS IN THE GAME
    const { data } = await axios.get('/gameapi/scores')
    const d = data.split(',')
    setScores(d)
  }

  const startNextRound = async () => {
    const { data } = await axios.post('/gameapi/nextround')
    if (data === 'round started') {
    } else if (data === 'game over') {
    }else {
      window.alert('Error starting next round. Please try again.');
    }
  }

  const navigate = useNavigate()

  const getWinners = () => {
    let ret = [<h2>Winner: </h2>]
    let windexes = [0]
    let winscore = scores[0]
    for (let i = 1; i < players.length; ++i) {
      if (scores[i] > winscore) {
        winscore = scores[i]
        windexes = [i]
      } else if (scores[i] === winscore) {
        windexes.push(i)
      }
    }

    for (let i = 0; i < windexes.length; ++i) {
      ret.push(<h3>{players[windexes[i]]}</h3>)
    }
    return ret
  }

  const returnPlayersAndScores = () => {
    const ret = []
    for (let i = 0; i < players.length; ++i) {
      ret.push(<> <h3>{players[i]}:  {scores[i]}</h3> </>)
    }
    return ret
  }

  const goHome = async () => {
    navigate("/");
  }

  return ( 
    <>
      <h2>Game Over! Final Scores:</h2>
      {returnPlayersAndScores()}
      <br />
      {getWinners()}
      <GridContainer>
      <Button onClick={goHome}>Back to Home</Button>
    </GridContainer> 
    </>
  )
 
}

export default EndPage
