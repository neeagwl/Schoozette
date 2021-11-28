import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'

const ModalForm =(props)=> {

    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [correctOption, setCorrectOption] = useState('');

    // state={ question: null, option1: null, option2: null, option3:null, correctOption:null  }
  
    // handleQuestionChange = (e) => this.setState({question: e.target.value})
    // handleOption1Change =  (e) => this.setState({option1: e.target.value})
    // handleOption2Change =  (e) => this.setState({option2: e.target.value})
    // handleOption3Change =  (e) => this.setState({option3: e.target.value})  
    // handleCorrectOptionChange = (e) => this.setState({correctOption: e.target.value})  
  

      return(
        <Modal 
          show={props.isOpen} 
          onHide={props.closeModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>Add a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group >
                <Form.Label>Question: </Form.Label>
                <Form.Control type="text" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="question input"/>           
            </Form.Group>
            <Form.Group >
                <Form.Label>Option 1: </Form.Label>
                <Form.Control type="text" onChange={e=>setOption1(e.target.value)} value={option1} placeholder="option input"/>           
            </Form.Group>
            <Form.Group >
            <Form.Group >
                <Form.Label>Option 2: </Form.Label>
                <Form.Control type="text" onChange={e=>setOption2(e.target.value)} value={option2} placeholder="Option  input"/>           
            </Form.Group>
                <Form.Label>Option 3: </Form.Label>
                <Form.Control type="text" onChange={e=>setOption3(e.target.value)} value={option3} placeholder="option input"/>           
            </Form.Group>
            <Form.Group >
                <Form.Label>Correct Option: </Form.Label>
                <Form.Control type="text" onChange={e=>setCorrectOption(e.target.value)} value={correctOption} placeholder="answer input"/>           
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit" 
                onClick={() => props.handleSubmit(question, option1, option2, option3, correctOption)}>
                Submit
            </Button>
        </Modal.Footer>
      </Modal>
      )
}


  export default ModalForm