import React, { useState, useEffect, userRef } from 'react';
import Header from './Header';
import Guesser from './Guesser';
import Figure from './Figure';
import WrongLetters from './Incorrect';
import Word from './Word';
import { showNotification as show, checkWin } from './helpers';
import io from 'socket.io-client';

import './App.css';

const socket = io();

const words = ['cat', 'dog', 'pig']
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  
  useEffect(() => {

  }, []);

  return (
    <div className="App container text-center">
      <div className="row">
        <div className="col-12">
          <Figure wrongLetters={wrongLetters} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
        <WrongLetters wrongLetters={wrongLetters} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
        <Guesser />
        </div>
      </div>
    </div>
  );
}

export default App;
