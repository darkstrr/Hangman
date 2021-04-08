import React, { useState, useEffect, userRef } from 'react';
import Header from './Header';
import Figure from './Figure';
import WrongLetters from './Incorrect';
import Word from './Word';
import { showNotification as show, checkWin } from './helpers';
import io from 'socket.io-client';

import './App.css';

const socket = io();

const words = []
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  
  useEffect(() => {
    
  }, []);


    
  return (
    <div>
      <div className="App">
        <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
      
    </div>
  );
}

export default App;
