/* eslint-disable */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { ProgressBar, Button, Card, Nav, Form, Navbar, Container, Row, Col, ListGroup } from 'react-bootstrap'


const SongPlayer = props => {
  const song = props.song
  console.log(song)

  const iframe = `<iframe style="border-radius:10px" src="https://open.spotify.com/embed/track/${song}?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>` 
  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }

  return (
    <>

      <Card.Title>Song:</Card.Title>
      <Card.Body>
        <Iframe iframe={iframe} /> 
      </Card.Body>

    </>
  )
 
}

export default SongPlayer
