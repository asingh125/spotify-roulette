import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.button`
  grid-row: 1 / 1;
  grid-column: 1 / 2;
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
  width: 100%;
  &:hover {
    background-color: #b6e1fc !important;
  }
`

const QListItem = props => {

  const { questionText, onQuestionClick, _id, author, answer } = props

  const clickFun = () => {
    onQuestionClick(props)
  }

  return (
    <p align="center">
      <ItemWrapper onClick={clickFun}>
        {questionText}
      </ItemWrapper>
    </p>
  )
}

export default QListItem