import React, { useState, useEffect, useRef } from 'react';
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

const socket = io();

const words = ['cat', 'dog', 'pig']
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [guess, setGuess] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const inputRef = useRef(null);
  
  
  useEffect(() => {
  }, []);

  return (
    <Container className="App text-center">  
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
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={{ span: 2, offset: 5 }}>
          <Guesser />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
