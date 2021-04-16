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

  function handleChange(e) {
    if (e.currentTarget.value.length > 1) {
      e.currentTarget.value = e.currentTarget.value[0];
    }
  };

  return (
    <div className="guesser-container">
      <label htmlFor="basic-url">Enter a Letter!</label>
      <InputGroup className="mb-3">
        <FormControl
          ref={inputRef} 
          type="char" 
          aria-label="guess a letter"
          aria-describedby="basic-addon2"
          onChange={handleChange}
        />
      </InputGroup>
      <Button variant="secondary" onClick={() => onGuess()}>Submit</Button>
    </div>
  );
}

export default Guesser;