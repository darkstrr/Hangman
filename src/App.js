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
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const socket = io();

const words = ['cat', 'dog', 'pig']
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [guess, setGuess] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const selectRef = useRef(null);

  function onSelectCategory() {
    setCategorySelected(selectRef.current.value);
  }
  
  
  useEffect(() => {
    socket.on("categories", categories => {
      setCategories(categories);
    })
  }, []);

  if (!categorySelected) {
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
        <Row className="mt-5 w-25 m-auto">
          <Col>
            <Form>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Categories</Form.Label>
                <Form.Control as="select" ref={selectRef}>
                  {categories.map((category, i) => (
                    <option key={i}>{category}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="light" type="button" onClick={onSelectCategory}>
                Select Category
              </Button>
            </Form>
          </Col>
        </Row>
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
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
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
