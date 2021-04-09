import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function Guesser() {
  return (
    <InputGroup className="mb-3">
    <FormControl
      placeholder="Guess a letter!"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="secondary">Submit</Button>
    </InputGroup.Append>
  </InputGroup>
  );
}

export default Guesser;