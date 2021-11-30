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
  margin: 0 auto;
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
  background-color: LightSkyBlue !important;
  color: Black
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const Answerer = props => {
  const { _id, updateAnswerPreview, updateQuestions } = props
  const [answer, setNewAnswer] = useState('')

  const updateAnswer = async () => {
    const { data } = await axios.post('/api/questions/answer', { _id, answer })
    if (data === 'answer posted') {
      updateAnswerPreview(answer)
    } else {
      window.alert('Error posting answer. Please try again.')
    }
  }

  return (
    <>
    <Header>Write a new answer</Header>
         <InputContainer>
          <input value={answer} onChange={e => setNewAnswer(e.target.value)} type="text" />
        </InputContainer>

      <br/>
      <br/>
      <br/>
      
      <ButtonContainer>
        <Button onClick={updateAnswer}>Post Answer</Button>
      </ButtonContainer> 
      
    </>
  )
}

export default Answerer
