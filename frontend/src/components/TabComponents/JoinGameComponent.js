/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'

const JoinGameComponent = props => {
  const [username, setUsername] = useState('')
  const [playlist, setPlaylist] = useState('')
  const [gamecode, setGameCode] = useState('')

  useEffect(() => {
  }, [])

  const navigate = useNavigate();

  const navigateToNewGame = async (result) => {
    navigate(`/game/${result._id}`)
  }

  const joinGame = async () => {
    let _id = gamecode
    axios.post('/gameapi/join', { _id, username }).then(response =>{
      console.log(response.data) 
      const playlistID = extractgameID(playlist)
      axios.post('gameapi/add_songs_to_game', { username, playlistID, _id }).then(response => {
        console.log(response.data)
        if (response.data !== '') {
          console.log(_id)
          navigate(`/game/${_id}`)
        } else {
          window.alert(`Error: ${response.data}. Please try again.`)
        }
      })
   })

  }

  // warning when link is in the wrong format??
  const extractgameID = (link) => {
    try {
      const idArray = link.split('/')
      const idArray2 = idArray[idArray.length - 1].split('?')
      return idArray2[0]
    }
    catch (err) {
      return ''
    }
  }

  return (
    <>
      <Card.Body>
        <Form className="rounded p-4 p-sm-3">
          <Card.Text>
            Enter a username, playlist link, and access code, then press join game!
          </Card.Text>

          <Form.Group className="mb-3" controlId="userInfo">
            <Form.Control placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
            <br/>
            <Form.Control placeholder="Playlist Link" value={playlist} onChange={e => setPlaylist(e.target.value)} />
            <br/>
            {/* <Form.Label>Game Code: </Form.Label> */}
            <Form.Control placeholder="Game code" value={gamecode} onChange={e => setGameCode(e.target.value)} />
            <br/>
            <Button variant="primary" onClick={joinGame}>Join game</Button>
          </Form.Group>

        </Form>
      </Card.Body>
              
    </>
  )
 
}

export default JoinGameComponent
