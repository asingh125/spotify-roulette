/* eslint-disable */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Table, ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap'

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

  const returnPlayersAndScores = () => {
    const sl = []
    const stl = []
    // itemsArray.sort(function(a, b){  
    //   return sortingArr.indexOf(a) - sortingArr.indexOf(b);
    // });

    // console.log(players)
    // console.log(scores)
    let playersAndScores = []

    for (let i = 0; i < players.length; ++i) {
      playersAndScores.push([players[i], scores[i]])
      // sl.push(       
      //   <ListGroup.Item as="li">
      //     {players[i]} {' '}
      //     <Badge variant="primary" pill >
      //       {scores[i]}
      //     </Badge>
      //   </ListGroup.Item> 
      // )

      // tl.push(
      //   [
      //     <tr>
      //       <td width={60}>{i+1}</td>
      //       <td>{players[i]}</td>
      //       <td width={150}>{scores[i]}</td>
      //     </tr>,
      //     scores[i]
      //   ]
      // )
    }

    playersAndScores.sort( (a, b) => {
      return b[1] - a[1]
    })

    let tl = []
    for (let i = 0; i < players.length; ++i) {
      tl.push(
        <tr>
            <td width={60}> <b>{i+1}</b></td>
            <td>{playersAndScores[i][0]}</td>
            <td width={150}>{playersAndScores[i][1]}</td>
        </tr>
      )
    }

    

    return (
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {tl}
      </tbody>
    </Table>
    )

    // return (
    //   <ListGroup as="ol" numbered >
    //     {sl}
    //   </ListGroup>
    // )
  }

  return ( 
    <>
      <Card.Title>Scores:</Card.Title>
      {/* <Card.Body> */}
        {returnPlayersAndScores()}
      {/* </Card.Body> */}
    </>
  )
 
}

export default ScoreList
