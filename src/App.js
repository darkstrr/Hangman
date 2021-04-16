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
import CategorySelect from './CategorySelect';

const socket = io();

const words = ['cat', 'dog', 'pig']
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [generatedWord, setGeneratedWord] = useState(null);
  const [guess, setGuess] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);


  function onSelectCategory(category) {
    setCategorySelected(category);
  }
  
  
  useEffect(() => {
    socket.on("categories", categories => {
      setCategories(categories);
    })
    socket.on("word generated", word => {
      setGeneratedWord(word);
    })
  }, []);

  useEffect(() => {
    if (categorySelected) {
      socket.emit('generate word', categorySelected);
    }
  }, [categorySelected]);

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
