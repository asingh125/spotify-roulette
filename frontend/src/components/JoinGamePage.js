import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Timer from './Timer'

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

const JoinGamePage = props => {
  const [username, setUsername] = useState('')
  const [players, setPlayers] = useState([])
  const [numPlayers, setNumPlayers] = useState(0)
  const [gamecode, setGameCode] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)

  // const [timeInterval, setTimeInterval] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
    }, 1000)
    return () => clearInterval(interval)
  }, [players])

  const updatePlayers = async () => {
    //INSERT GET REQUEST FOR PLAYERS IN THE GAME
    //console.log(_id)
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    //console.log(d)
    setPlayers(d)
    //console.log(players)
  }

  const navigate = useNavigate()

  const exitGame = async () => {
    //INSERT POST REQUEST TO EXIT GAME
    //const { data } = await axios.post('/api/questions')
    navigate('/')
  }

  const startGame = async () => {
   // if (numPlayers >= 3) {
      //INSERT START GAME ROUTE HERE, UPDATES GAME MODE
      const { data } = await axios.post('/gameapi/startgame')
      if (data === 'game started') {
      } else {
        window.alert('Error starting game. Please try again.');
      }
   // } else {
  //    window.alert('At least 3 players are required to start the game.');
  //  }
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
    
{/*       
      {loginStatus ? 
        <>
          <HeaderRight>
            Hello {username}
            <Button onClick={logOut}>Log Out</Button>
          </HeaderRight>
        </>
        : 
        <>
          <HeaderRight>
            <Button onClick={exitGame}>Log In</Button>
          </HeaderRight>
        </>
      } */}
    </>
  )
 
}

export default JoinGamePage
