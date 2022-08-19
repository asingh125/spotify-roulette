/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import ScoreList from '../MiniComponents/ScoreList'
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap'

const EndPage = props => {
  const players = props.players
  // const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      // updatePlayers()
      if (scores.length == 0) {
        updateScores()
      }
    }, 200)
    return () => clearInterval(interval)
  }, [players])

  // const updatePlayers = async () => {
  //   const { data } = await axios.get('/gameapi/players')
  //   const d = data.split(',')
  //   setPlayers(d)
  // }

  const updateScores = async () => {
    const { data } = await axios.get('/gameapi/scores')
    const d = String(data).split(',')
    setScores(d)
  }

  const navigate = useNavigate()

  const getWinnerList = () => {
    let winners = []

    if (scores.length > 0) {
      let windexes = [0]
      let winscore = scores[0]
      for (let i = 1; i < players.length; ++i) {
        if (scores[i] > winscore) {
          winscore = scores[i]
          windexes = [i]
          winners = [players[i]]
        } else if (scores[i] === winscore) {
          windexes.push(i)
          winners.push(players[i])
        }
      }
    }
    return winners
  }

  const getWinners = () => {

    let winnerHeader = 'Winner: '
    let winnerList = []

    if (scores.length > 0) {
      let windexes = [0]
      let winscore = scores[0]
      for (let i = 1; i < players.length; ++i) {
        if (scores[i] > winscore) {
          winscore = scores[i]
          windexes = [i]
        } else if (scores[i] === winscore) {
          windexes.push(i)
        }
      }
  
      if (windexes.length > 1) {
        winnerHeader = 'Winners: '
      } else {
        winnerHeader = 'Winner: '
      }
  
      for (let i = 0; i < windexes.length; ++i) {
        winnerList.push( <> <Badge bg={'success'}>
          {players[windexes[i]]}
        </Badge> &nbsp; </>)
      }
    }

    return (
      <h4>
        {winnerHeader} &nbsp; {winnerList}
      </h4>
    )
  }

  const resetGame = async () => {
    const winners = getWinnerList()
    const {data} = await axios.post('/gameapi/resetgame', { winners })
    if (data !== 'success') {
      window.alert(`ERROR: ${data}. Please try again.`)
    }
  }

  return ( 
    <>

    <Container fluid="md">
      <Row>
        <Col>
          <Card>
            <Form className="rounded p-4 p-sm-3">
              <Card.Body><h3 className="text-center">Game Over!</h3></Card.Body>
              <Card.Body>
                {getWinners()}
              </Card.Body>
              <Card.Body>
                <ScoreList />
                <br/>
                <Button onClick={resetGame}>Play again {'('}same players{')'}</Button>
                <p></p>
                <Button onClick={ () => {navigate('/')}}>Back to home</Button>
              </Card.Body>
            </Form>
          </Card>
        </Col>
        </Row>
    </Container>
    </>
  )
 
}

export default EndPage
