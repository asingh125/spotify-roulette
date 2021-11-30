import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import QListItem from './QListItem'
import QuestionList from './QuestionList'
import QuestionPreview from './QuestionPreview'
import QuestionPreviewLoggedOut from './QuestionPreviewLoggedOut'
import QuestionComposer from './QuestionComposer'

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  grid-template-rows: auto 1fr;
  margin: 0 auto;
`
const QPGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto auto;
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
  background-color: LightSkyBlue !important;
  color: Black
  font-size: 16px;
  text-align: center;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const HomePage = props => {
  const [questions, setQuestions] = useState([])
  const [username, setUsername] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [currquestion, setQuestion] = useState('')
  const [currauthor, setAuthor] = useState('')
  const [curranswer, setAnswer] = useState('')
  const [curr_id, setId] = useState(-1)

  useEffect(() => {
    updateLoginStatus()
  }, [])

  const navigate = useNavigate();

  const logOut = async () => {
    const { data } = await axios.post('/account/logout', { })
    if (data === 'user logged out') {
      setLoginStatus(false)
    } else {
      window.alert('Error logging out. Please try again.');
    }
  }

  const goToLogin = async () => {
    navigate("/login");
  }

  const updateLoginStatus = async () => {
    const { data } = await axios.post('/account/isLoggedIn', { })
    if (data.length > 0) {
      setLoginStatus(true)
      setUsername(data)
    } else {
      setLoginStatus(false)
    }
  }

  const updateQuestions = async () => {
    const { data } = await axios.get('/api/questions')
    setQuestions(data)
  }

  const setPreviewQuestion = (inputs) => {
    const { questionText, author, answer, _id } = inputs
    setQuestion(questionText)
    setAuthor(author)
    setAnswer(answer)
    setId(_id)
  }

  return (
    <>
      <GridContainer>
      <HeaderLeft>CampusWire Lite</HeaderLeft>
      {loginStatus ? 
        <>
          <HeaderRight>
            Hello {username}
            <Button onClick={logOut}>Log Out</Button>
          </HeaderRight>
          <QuestionPreview _id={curr_id} author={currauthor} questionText={currquestion} answer={curranswer} updateAnswerPreview={setAnswer} updateQuestions={updateQuestions}/>
        </>
        : 
        <>
          <HeaderRight>
            <Button onClick={goToLogin}>Log In</Button>
          </HeaderRight>
          <QuestionPreviewLoggedOut _id={curr_id} author={currauthor} questionText={currquestion} answer={curranswer} updateAnswerPreview={setAnswer} updateQuestions={updateQuestions}/>

        </>
      }
      </GridContainer>

      
    <QuestionList onQuestionClick={setPreviewQuestion} qList={questions} updateQuestions={updateQuestions} />

    {loginStatus ? 
      <QuestionComposer userName={username} updateQuestions={updateQuestions}/>
      : 
      <>
      </>
    }

    </>
  )


 
}

export default HomePage
