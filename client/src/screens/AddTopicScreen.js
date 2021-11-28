import React, { useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {addTopic} from '../actions/classAction';
import FormContainer from '../components/FormContainer';

const AddTopicScreen = ({location,history}) => {

    const [topicName, setTopicName] = useState('');
    const [topicTheory,setTopicTheory] = useState('');

    const {classId} = useParams()

    const dispatch = useDispatch ();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const classTopic = useSelector(state=>state.classTopic);
    const {loading,error,topicInfo} = classTopic;

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }
        if(topicInfo){
            history.push(`/class/addQuiz/${classId}`) //add quiz
        }
    }, [history,userInfo,redirect, topicInfo])

    const submitHandler =(e)=>{

            e.preventDefault();
            dispatch(addTopic({topicName, topicTheory,classId}))
            
    }

    return (
        <FormContainer>
            <h1>Add a new topic to your class</h1>
            {/* {message && <Message variant='danger'>{message}</Message>} */}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='topicName'>
                    <Form.Label>
                        Topic Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter topic name"
                        value={topicName}
                        onChange={e=>setTopicName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='topicTheory'>
                    <Form.Label>
                        Topic Theory
                    </Form.Label>
                    <Form.Control
                        type="topicTheory"
                        placeholder="Enter your topic topicTheory"
                        as="textarea" rows='8'
                        value={topicTheory}
                        onChange={e=>setTopicTheory(e.target.value)}
                    ></Form.Control>
                </Form.Group>    
                <Button type="submit" variant="primary">Add Quiz</Button>
            </Form>
        </FormContainer>
    )
}

export default AddTopicScreen
