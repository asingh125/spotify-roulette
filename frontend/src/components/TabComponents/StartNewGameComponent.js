/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'

const StartNewGameComponent = props => {
  const [username, setUsername] = useState('')
  const [playlist, setPlaylist] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const startGame = async () => {
    const playlistID = extractgameID(playlist)
    const createResponse = await axios.post('/gameapi/create', { username, playlistID })
    const _id = createResponse.data
    const joinResponse = await axios.post('/gameapi/join', { _id, username, playlistID })

    if (joinResponse.data == 'success'){
      navigate(`/game/${_id}`)
    }
    else {
      setError(joinResponse.data)
      // window.alert(`Error: ${joinResponse.data}`)
    }
  }

  // warning when link is in the wrong format??
  const extractgameID = (link) => {
    try {
      const basicUrl = link.split('?')[0]
      console.log(basicUrl)
      const splitArr = basicUrl.split('/')
      const playlistId = splitArr[splitArr.length - 1]
      console.log(playlistId)
      return playlistId
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
            Click the button below to generate a new game and share the access code with your friends!
          </Card.Text>

          <Form.Group className="mb-3" controlId="userInfo">
            <Form.Control placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
            <br/>
            <Form.Control placeholder="Playlist Link" value={playlist} onChange={e => setPlaylist(e.target.value)} />
            <br/>
            { (error === '') ? 
              <></>
              :
              <>
                <Alert variant="danger" onClose={() => setError('')} dismissible> 
                  <b>ERROR: </b>{` ${error}`}
                </Alert>
                <br/>
              </>
            }
            <Button variant="primary" onClick={startGame}>Create game</Button>
          </Form.Group>

        </Form>
      </Card.Body>
              
    </>
  )
 
}

export default StartNewGameComponent
