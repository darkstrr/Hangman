import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Guesser() {
  return (
    <div className="guesser-container">
      <label htmlFor="basic-url">Enter a Letter!</label>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="guess a letter"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <Button variant="secondary">Submit</Button>
    </div>
  );
}

export default Guesser;