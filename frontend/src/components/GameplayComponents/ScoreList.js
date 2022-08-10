/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap'

const ScoreList = props => {
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers()
      updatesScores()
    }, 500)
    return () => clearInterval(interval)
  }, [players, scores])

  const updatePlayers = async () => {
    const { data } = await axios.get('/gameapi/players')
    const d = data.split(',')
    setPlayers(d)
  }

  const updatesScores = async () => {
    const { data } = await axios.get('/gameapi/scores')
    // console.log(`this is the data: ${data}`)
    const d = String(data).split(',')
    setScores(d)
  }

  const navigate = useNavigate()

  const getWinners = () => {
    let ret = [<h2>Winner: </h2>]
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

    for (let i = 0; i < windexes.length; ++i) {
      ret.push(<h3>{players[windexes[i]]}</h3>)
    }
    return ret
  }

  const returnPlayersAndScores = () => {
    const ret = []
    // itemsArray.sort(function(a, b){  
    //   return sortingArr.indexOf(a) - sortingArr.indexOf(b);
    // });

    // console.log(players)
    // console.log(scores)

    for (let i = 0; i < players.length; ++i) {
      ret.push(       
        <ListGroup.Item as="li">
          {players[i]} {' '}
          <Badge variant="primary" pill >
            {scores[i]}
          </Badge>
        </ListGroup.Item> 
      )
    }

    return (
      <ListGroup as="ol" numbered >
        {ret}
      </ListGroup>
    )
  }

  return ( 
    <>
      <Card.Title>Scores:</Card.Title>
      <Card.Body>
        {returnPlayersAndScores()}
      </Card.Body>
    </>
  )
 
}

export default ScoreList
