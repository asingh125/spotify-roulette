import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Answerer from './Answerer'

const CancelButton = styled.button`
  padding: 5px 5px;
  font-size: 1em;
  position: relative;
  left: 0;
  border: 2px solid Grey !important;
  background-color: lightsalmon !important;
  color: Grey
  text-align: center;
  &:hover {
    background-color: darksalmon !important;
  }
`

const EditButton = styled.button`
  padding: 5px 5px;
  font-size: 1em;
  position: relative;
  left: 0;
  border: 2px solid Grey !important;
  background-color: lightgray !important;
  color: Grey
  text-align: center;
  &:hover {
    background-color: darkgray !important;
  }
`
const Intro = styled.h3`
  font-size: 2em;
  color: palevioletred;
  font-family: Arial;
`

const Desc = styled.h4`
  font-size: 1.5em;
  color: lightpink;
  font-family: Arial;
`

const Box = styled.div`
  padding: 10px 10px;
  border: 2px solid Black !important;
  background-color: White !important;
`

const QuestionPreviewLoggedOut = props => {
  const { _id, author, questionText, answer, updateAnswerPreview, updateQuestions } = props
  const [answerMode, setAnswerMode] = useState(false)

  return (
    <>
      <Box>
        <Intro> {questionText} </Intro>
        <Desc>Author: {author}</Desc>
        <Desc>Answer: {answer}</Desc>
      </Box>
    </>
  )
}

export default QuestionPreviewLoggedOut
