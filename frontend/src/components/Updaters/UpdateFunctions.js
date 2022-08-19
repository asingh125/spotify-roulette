/* eslint-disable */

import axios from 'axios'

const updateMode = async () => {
  const { data } = axios.get('/gameapi/mode').then(result => {
    return (parseInt(result.data, 10))
  })
}

const updatePlayers = async () => {
  const { data } = await axios.get('/gameapi/players')
  const d = data.split(',')
  return (d)
}

const updateRound = async () => {
  const { data } = await axios.get('/gameapi/roundnum')
  return (parseInt(data))
}

const updateSong = async () => {
  const { data } = axios.get('/gameapi/songID').then(result => {
    return (result.data)
  })
}

export {updateMode, updatePlayers, updateRound, updateSong}