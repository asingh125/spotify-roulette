import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  grid-template-rows: auto 1fr;
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

const BetweenPage = props => {
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])
  const [round, setRound] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
      updatesScores()
    }, 500)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updatesScores = async () => {
    const { data } = await axios.get('/gameapi/scores')
    const d = data.split(',')
    setScores(d)
  }

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

  const startNextRound = async () => {
    if (round >= (2 * players.length)) {
      await axios.post('/gameapi/end')
    } else {
      const { data } = await axios.post('/gameapi/nextround')
      if (data === 'round started') {
      } else if (data === 'game over') {
      }else {
        window.alert('Error starting next round. Please try again.');
      }
    }
  }

  const navigate = useNavigate()

  const returnPlayersAndScores = () => {
    const ret = []
    for (let i = 0; i < players.length; ++i) {
      ret.push(<> <h3>{players[i]}:  {scores[i]}</h3> </>)
    }
    return ret
  }

  return ( 
    <>
      <h2>Scores:</h2>
      {returnPlayersAndScores()}
      <GridContainer>
      <Button onClick={startNextRound}>Start Next Round</Button>
    </GridContainer> 
    </>
  )
 
}

export default BetweenPage
