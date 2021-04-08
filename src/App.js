import React, { useState, useEffect, userRef } from 'react';
import Header from './Header';
import Figure from './Figure';
import WrongLetters from './Incorrect';
import Word from './Word';
import Notify from './Notify';
import Popup from './Popup';
import { showNotification as show, checkWin } from './helpers';
import io from 'socket.io-client';

import './App.css';

const socket = io();

const words = []
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotify, setShowNotify] = useState(false);
  
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotify);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotify);
          }
        }
      }
      socket.emit('update', {playable, correctLetters, wrongLetters, setShowNotify})
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
      setPlayable(true);
  
      // Empty Arrays
      setCorrectLetters([]);
      setWrongLetters([]);
  
      const random = Math.floor(Math.random() * words.length);
      selectedWord = words[random];
    }
    
  return (
    <div>
      <div className="App">
        <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notify showNotify={showNotify} />
      
    </div>
  );
}

export default App;
