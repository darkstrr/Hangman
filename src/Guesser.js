import { React, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


function Guesser(props) {
  const inputRef = useRef(null);

  function onGuess(){
    if (inputRef && inputRef.current.value.length === 1) {
      const guess = inputRef.current.value;
      console.log(guess);
    //   // setGuess(user);
      props.socket.emit('guess', guess);
    }
  }
  return (
    <div className="guesser-container">
      <label htmlFor="basic-url">Enter a Letter! (must be one letter)</label>
      <InputGroup className="mb-3">
        <FormControl
          ref={inputRef} 
          type="char" 
          aria-label="guess a letter"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <Button variant="secondary" onClick={() => onGuess()}>Submit</Button>
    </div>
  );
}

export default Guesser;