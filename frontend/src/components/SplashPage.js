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
  font-size: 2em;
  color: Black !important;
  font-family: Arial;
  text-align: left;
  grid-row: 1 / 1;
  grid-column: 1 / 2;
`
const H2 = styled.h2`
  font-size: 1.4em;
  color: DarkGray  !important;
  font-family: Arial;
`
const P = styled.p`
  font-size: 1.1em;
  color: Black !important;
  font-family: Helvetica;
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

const SplashPage = props => {
  const [username, setUsername] = useState('')
  const [gamecode, setGameCode] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    updateLoginStatus()
  }, [])

  const navigate = useNavigate();

  const logOut = async () => {
    const { data } = await axios.post('/account/logout', { })
    if (data === 'user logged out') {
      setLoginStatus(false)
    } else {
      window.alert('Error logging out. Please try again.');
    }
  }

  const startGame = async () => {
    //CREATE GAME ROUTE HERE, IT RETURNS ID OF GAME CREATED
    let players = [username]
    const { _id } = await axios.post('/gameapi/create', { players })
    //navigate(`/game/${_id}`)
    //navigate(`/game/${result._id}`)
  }

  const navigateToNewGame = async (result) => {
    navigate(`/game/${result._id}`)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const joinGame = async () => {
    //INSERT JOIN GAME REQUEST
    let _id = gamecode
    const { data1 } = await axios.post('/gameapi/join', { _id, username })
    console.log(data1)
    const { data } = await axios.post('gameapi/add_songs_to_game', { _id })
    console.log(data)
    if (data === 'songs added') {
      // addTwoRandomSongsToDB(_id)
      navigate(`/game/${_id}`)
    } else {
      window.alert(`Error: ${data}. Please try again.`)
    }
  }

  const addTwoRandomSongsToDB = async gameID => {
    //get list of songs
    const { playlist } = await axios.post('gameapi/get_playlist_songs')
    const items = playlist.items
    console.log(playlist)

    //get 2 random songs
    let s1 = getRandomInt(items.length)
    let s2 = getRandomInt(items.length)
    while (s2 === s1) {
      s2 = getRandomInt(items.length)
    }
    const song1 = items[s1]
    const song2 = items[s2]

    //save strings with song info
    const artists1 = song1.artists
    const string1 = `${username}|${song1.href}|${song1.name}|${artists1[0]}`
    const artists2 = song2.artists
    const string2 = `${username}|${song2.href}|${song2.name}|${artists2[0]}`

    //add the songs to the game
    const _id = gameID
    const { data } = await axios.post('gameapi/add_songs_to_game', { _id, string1, string2 })
    console.log(data)
  }

  const goToLogin = async () => {
    navigate("/login");
  }

  const updateLoginStatus = async () => {
    const { data } = await axios.post('/account/isLoggedIn', { })
    if (data.length > 0) {
      setLoginStatus(true)
      setUsername(data)
    } else {
      setLoginStatus(false)
    }
  }

  const authenticateWithSpotify = async () => {
    const { data } = await axios.get('/login')
    .then(addTokenToUser())
  }

  const addTokenToUser = async () => {
    const { data } = await axios.post('gameapi/add_token_to_user')
    console.log(data)
  }

  const getSongs = async () => {
    console.log("starting")
    const { data } = await axios.post('gameapi/get_playlist_songs')
    console.log(data)
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
          </HeaderRight>
        </>
        : 
        <>
          <HeaderRight>
            <Button onClick={goToLogin}>Log In</Button>
          </HeaderRight>
        </>
      }
      </GridContainer>
      <H2>Welcome to Spotify Roulette, a game where you try to guess your friends' music taste!</H2> 
      {loginStatus ? 
        <>
          <Button onClick={authenticateWithSpotify}>Connect your spotify account</Button>
          <br />
          <br />
          <Button onClick={startGame}>Start a New Game</Button>
          <br />
          <br />
          <Button onClick={joinGame}>Join Game by Code</Button> 
          <input value={gamecode} onChange={e => setGameCode(e.target.value)} type="text" />
          
        </>
        : 
        <>
          <P>Each round, a song from a different player's playlist will show up on the screen, and each player must guess whose they think it came from. The person with the most correct guesses at the end of the game wins. </P>
          <P>To start playing, create an account with your username, password, and a link to your favorite Spotify playlist. Make sure to link this account to your Spotify account once you're logged in. Have fun!</P>
        </>
      }
    </>
  )
 
}

export default SplashPage
