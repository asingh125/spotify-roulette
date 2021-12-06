import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const GridContainer = styled.div`
  display: grid;
  width: 40vw;
  grid-template-rows: auto 1fr;
  margin: 0 auto;
`

const Header = styled.h2`
  font-size: 1.5em;
  color: Black !important;
  font-family: Arial;
  text-align: center;
  margin: 0 auto;
  padding: 5px;
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
  text-align: right;
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
  left: 59%;
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

const SignUp = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [playlist, setPlaylist] = useState('')

  const navigate = useNavigate();

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password, playlist })
    if (data === 'user signed up') {
      logIn()
    } else {
      console.log(data)
      window.alert('Error signing in. Please try again.');
    }
  }

  const logIn = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'user logged in') {
      navigate("/")
    } else {
      window.alert('Error logging in. Please try again.')
    }
  }

  return (
    <>
    <Header>Sign Up</Header>
      <GridContainer>
        <Label>Username</Label>
        <InputContainer>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        </InputContainer>
      </GridContainer>

      <GridContainer>
        <Label>Password</Label>
        <InputContainer>
          <input value={password} onChange={e => setPassword(e.target.value)} type="text" />
        </InputContainer>
      </GridContainer>

      <GridContainer>
        <Label>Playlist Link</Label>
        <InputContainer>
          <input value={playlist} onChange={e => setPlaylist(e.target.value)} type="text" />
        </InputContainer>
      </GridContainer>

      <br/>
      <br/>
      <br/>
      
      <ButtonContainer>
        <Button onClick={createUser}>Sign Up</Button>
        <Link to="/login">Already have an account? Log in</Link>
      </ButtonContainer>
    </>
  )
}

export default SignUp
