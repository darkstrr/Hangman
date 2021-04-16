import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import Guesser from './Guesser';
import Figure from './Figure';
import WrongLetters from './Incorrect';
import Word from './Word';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategorySelect from './CategorySelect';

const socket = io();
let isListening = false;

function App() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [generatedWord, setGeneratedWord] = useState(null);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [status, setStatus] = useState('');



  function onSelectCategory(category) {
    setCategorySelected(category);
  }

  function checkWin(correct, wrong, word) {
    let status = 'win';
    // Check for win
    word.split('').forEach(letter => {
      if(!correct.includes(letter)){
        status = '';
      }
    });
    // Check for lose
    if(wrong.length === 6) status = 'lose';
  
    return status
  }
  
  
  useEffect(() => {
    socket.on("categories", categories => {
      setCategories(categories);
    })
    socket.on("word generated", word => {
      setGeneratedWord(word);
      setCategorySelected(true);
    })
    socket.on("handle guess", guessData => {
      if (guessData.isCorrect) {
        setCorrectLetters(guessData.correctLetters);
      } else if (!guessData.isCorrect) {
        setWrongLetters(guessData.wrongLetters);
      }
      setStatus(checkWin(
        guessData.correctLetters, 
        guessData.wrongLetters, 
        guessData.word
      ));
    })
  }, []);

  useEffect(() => {
    if (categorySelected && typeof categorySelected === 'string') {
      socket.emit('generate word', categorySelected);
    }
  }, [categorySelected]);

  useEffect(() => {
    if (status === 'win') {
      // emit win event
      // reset app global variables
    } else if (status === 'lose') {
      // emit lose event
      // reset app global variables
    }
  }, [status]);

  if (!categorySelected || !generatedWord) {
    return (
      <Container className="text-center">  
        <Row className="mt-5">
          <Col>
            <Header />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Please select a category</h3>
          </Col>
        </Row>
        <CategorySelect categories={categories} onSelectCategory={onSelectCategory} />
      </Container>
    );
  } else {
    return (
      <Container className="text-center">  
        <Row className="mt-5">
          <Col>
            <Header />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Figure wrongLetters={wrongLetters} />
          </Col>
          <Col>
            <WrongLetters wrongLetters={wrongLetters} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Word generatedWord={generatedWord} correctLetters={correctLetters} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={{ span: 2, offset: 5 }}>
            <Guesser socket={socket}/>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default App;
