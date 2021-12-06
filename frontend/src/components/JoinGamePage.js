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

const JoinGamePage = props => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
    }, 1000)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const navigate = useNavigate()

  const startGame = async () => {
    const { data } = await axios.post('/gameapi/startgame')
    if (data === 'game started') {
    } else {
      window.alert('Error starting game. Please try again.');
    }
  }

  return (
    <>
    <h2>Players:</h2>
    <>
      {players.map(player => <> <p>{player}</p> <br/> </>)}
    </>
    <br />
     <GridContainer>
      <Button onClick={startGame}>Start Game</Button>
    </GridContainer> 
    </>
  )
 
}

export default JoinGamePage
