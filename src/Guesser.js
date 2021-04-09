import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';


function Guesser() {
  const[guess, setGuess] = useState("");
  const socket = io();
  const inputRef = useRef(null);
  function onGuess(){
    if (inputRef != null) {
      const user = inputRef.current.value;
      setGuess(user);
      socket.emit('guess', guess);
    }
  }
  return (
    <div className="guesser-container">
      <label htmlFor="basic-url">Enter a Letter!</label>
        <input ref={inputRef} type="char" />
        <button onClick={() => onGuess()}>Login</button>
    </div>
  );
}

export default Guesser;