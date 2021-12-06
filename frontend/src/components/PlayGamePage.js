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

const PlayGamePage = props => {
  const [username, setUsername] = useState('')
  const [players, setPlayers] = useState([])
  const [numPlayers, setNumPlayers] = useState(0)

  const [song, setSong] = useState([])
  const [round, setRound] = useState(1)
  const [mode, getMode] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
      updateRound()
      updateSong()
    }, 500)
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


  const updateSong = async () => {
    //INSERT GET REQUEST FOR SONG IN THIS ROUND
    const { data } = await axios.get('/gameapi/song')
    setSong(data.split('|'))
  }

  const updateRound = async () => {
    //INSERT GET REQUEST FOR SONG IN THIS ROUND
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

  return (
    <>
    <h2>Round {round}:</h2>
    <br />
    <>
      <h2>Song:</h2>
      <h3>Title: {song[2]}</h3>
      <h3>Artist: {song[3]}</h3>
      {players.map(player => <PlayerOption player={player} />)}
    </>
    </>
  )
 
}

export default PlayGamePage
