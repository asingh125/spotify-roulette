import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import QListItem from './QListItem'

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  grid-template-rows: auto 1fr;
  margin: 0 auto;
`

const HeaderLeft = styled.h2`
  font-size: 1.5em;
  color: Black !important;
  font-family: Arial;
  text-align: left;
  grid-row: 1 / 1;
  grid-column: 1 / 2;
`

const HeaderRight = styled.h2`
  font-size: 1em;
  color: DarkGray !important;
  font-family: Arial;
  text-align: right;
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  padding: 10px 20vw;
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
  left: 50%;
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
  background-color: White !important;
  color: Black
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const QuestionList = ({ onQuestionClick, qList, updateQuestions }) => {
  useEffect(() => {
    updateQuestions();
  }, []);

  return (
      <>
        {qList.map(q => <QListItem key={q._id} _id={q._id} author={q.author} answer={q.answer} questionText={q.questionText} onQuestionClick={onQuestionClick}/>)}
      </>
  )
 
}

export default QuestionList
