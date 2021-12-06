import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import PlayerOption from './PlayerOption'

const PlayGamePage = props => {
  const [players, setPlayers] = useState([])
  const [song, setSong] = useState([])
  const [round, setRound] = useState(1)

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
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }


  const updateSong = async () => {
    const { data } = await axios.get('/gameapi/song')
    setSong(data.split('|'))
  }

  const updateRound = async () => {
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
