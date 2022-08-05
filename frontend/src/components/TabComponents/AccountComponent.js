import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'

const AccountComponent = props => {
  const [username, setUsername] = useState('')
  const [gamecode, setGameCode] = useState('')

  useEffect(() => {
  }, [])

  const navigate = useNavigate();

  const addTokenToUser = async () => {
    const { data } = await axios.post('gameapi/add_token_to_user')
    console.log(data)
  }

  const authenticateWithSpotify = async () => {
    const { data } = await axios.get('/login')
    .then(addTokenToUser())
  }

  return (
    <>
      <Card.Body>
        <Form className="rounded p-4 p-sm-3">
          <Form.Group>
            <Card.Text>
              Log in with your Spotify account to be able to start games and play songs in browser: 
              <br/>
              <br/>
              <Button onClick={authenticateWithSpotify}>Connect Spotify</Button>
            </Card.Text>
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <br/>
          <Form.Label>Change your playlist link: </Form.Label>
          <Form.Control type="email" placeholder="Playlist link" />
          <br/>
          <Button variant="primary">Update link</Button>
          <Form.Group>
            <Form.Text className="text-muted">
                Playlist successfuly updated!
              </Form.Text> 
            </Form.Group>
        </Form.Group>
        </Form>
      </Card.Body>        
    </>
  )
 
}

export default AccountComponent
