import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import Timer from './Timer'
import JoinGamePage from './JoinGamePage'
import PlayGamePage from './PlayGamePage'
import BetweenPage from './BetweenPage'
import EndPage from './EndPage'
import App2 from './SongPlayer'

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

const GamePage = props => {
  const { _id } = useParams()
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState(1)
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    updateLoginStatus()
    const interval = setInterval(() => {
      updateMode()
    }, 1000)
    return () => clearInterval(interval)
  }, [mode])


  const updateLoginStatus = async () => {
    const { data } = await axios.post('/account/isLoggedIn', { })
    if (data.length > 0) {
      setLoginStatus(true)
      setUsername(data)
    } else {
      setLoginStatus(false)
    }
  }

  const navigate = useNavigate();

  const logOut = async () => {
    const { data } = await axios.post('/account/logout', { })
    if (data === 'user logged out') {
      setLoginStatus(false)
    } else {
      window.alert('Error logging out. Please try again.');
    }
  }

  const goToLogin = async () => {
    navigate("/login");
  }

  const goHome = async () => {
    navigate("/");
  }

  const updateMode = async () => {
    const { data } = await axios.get('/gameapi/mode')
    setMode(parseInt(data))
  }

  const displayGameMode = () => {
    switch(mode) {
      case 1:
        return (<JoinGamePage />)
      case 2:
        return (<PlayGamePage />)
      case 3: 
        return (<BetweenPage />)
      case 4: 
        return (<EndPage />)
      default:
        return (<></>);
    }
  }

  return (
    <>
      <GridContainer>
      <HeaderLeft>Spotify Roulette</HeaderLeft>
      {loginStatus ? 
        <>
          <HeaderRight>
            Hello {username}
            <Button onClick={logOut}>Log Out</Button>
            <Button onClick={goHome}>Back to Home</Button>
          </HeaderRight>
        </>
        : 
        <>
          <HeaderRight>
            <Button onClick={goToLogin}>Log In</Button>
            <Button onClick={goHome}>Back to Home</Button>
          </HeaderRight>
        </>
      }
      </GridContainer>
      {loginStatus ? 
        <>
          {displayGameMode()}
        </>
        : 
        <>
          <p>You need to log into an account to participate in a game.</p>
        </>
      }
    </>
  )
 
}

export default GamePage
