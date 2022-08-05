/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const AnswerSubmitter = props => {
  // const players = props.players
  const [players, setPlayers] = useState([])
  // const [song, setSong] = useState(['a','b','I Will Survive','Gloria Gaynor'])
  // const [round, setRound] = useState(1)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mode, setMode] = useState(1)

  const iframe = '<iframe style="border-radius:10px" src="https://open.spotify.com/embed/track/7cv28LXcjAC3GsXbUvXKbX?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>'; 
  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }

  const updateMode = async () => {
    const { data } = axios.get('/gameapi/mode').then(result => {
      setMode(parseInt(result.data, 10))
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateMode()
      updatePlayers()
      // updateRound()
    }, 1000)
    return () => clearInterval(interval)
  }, [mode, players])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  // const navigate = useNavigate()

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [players])

  // const updatePlayers = async () => {
  //   const { data } = await axios.get('/gameapi/players')
  //   const d = data.split(',')
  //   setPlayers(d)
  // }


  // const updateSong = async () => {
  //   const { data } = await axios.get('/gameapi/song')
  //   setSong(data.split('|'))
  // }

  const updateRound = async () => {
    const { data } = await axios.get('/gameapi/roundnum')
    setRound(parseInt(data))
  }

  const displayPlayerOptions = () => {
    let radios = []
    for (let i = 0; i < players.length; ++i) {
      const player = players[i]
      const radio = 
      <Form.Check 
        type={'radio'}
        id={`radio-${i}}`}
        label={player}
        name='radios'
        onClick={ () => {setSelected(player)} }
      />
      radios.push(radio)
      // let listOption = <> <ListGroup.Item>{player}</ListGroup.Item> </>
    }
    return (
      <>
      <Form>
        {radios}
      </Form>
    </>

    )
  }

  const submitAnswer = () => {
    axios.post('/gameapi/submitanswer', { selected }).then(result => {
      if (result.data === 'answer submitted') {
        setSubmitted(true)
        console.log('SUBMITTED the answer')
      } else {
        window.alert('Error submitting answer. Please try again.');
      }
    })
  }


  return (
    <>

      <Card.Title>Your guess:</Card.Title>
      <Card.Body>
      {/* <ListGroup defaultActiveKey=""> */}
        <>
          {displayPlayerOptions()}
        </>
        {/* </ListGroup> */}

        {submitted ? 
          <Button onClick={submitAnswer} disabled = "disabled">Submit Answer</Button>
        :
          <Button onClick={submitAnswer}>Submit Answer</Button>
        }
      </Card.Body>

    </>
  )
 
}

export default AnswerSubmitter
