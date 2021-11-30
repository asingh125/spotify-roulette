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
  background-color: LightSkyBlue !important;
  color: Black
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const QuestionComposer = props => {
  const { updateQuestions, userName } = props
  const [question, setQuestion] = useState('')

  const postQuestion = async () => {
    if (!(userName == null)) {
      if (userName.length > 0) {
        const author = userName
        const questionText = question
        const answer = ''
        const { data } = await axios.post('/api/questions/add', { author, questionText, answer })
        if (data === 'question posted') {
          updateQuestions()
        } else {
          window.alert('Error posting questoin. Please try again.')
        }
      }
    } else {
      window.alert('Not logged in. Please log in and try again.')
    }
  }

  return (
    <>
    <Header>Post a question</Header>
      <GridContainer>
        <Label>Question: </Label>
        <InputContainer>
          <input value={question} onChange={e => setQuestion(e.target.value)} type="text" />
        </InputContainer>
      </GridContainer>

      <br/>
      <br/>
      <br/>
      
      <ButtonContainer>
        <Button onClick={postQuestion}>Post Question</Button>
      </ButtonContainer>
    </>
  )
}

export default QuestionComposer
