import { React, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CategorySelect = (props) => {
  const selectRef = useRef(null);

  function sendSelectedCategory() {
    props.onSelectCategory(selectRef.current.value);
  }

  return (
    <Row className="mt-5 w-25 m-auto">
      <Col>
        <Form>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Categories</Form.Label>
            <Form.Control as="select" ref={selectRef}>
              {props.categories.map((category, i) => (
                <option key={i}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="light" type="button" onClick={sendSelectedCategory}>
            Select Category
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default CategorySelect