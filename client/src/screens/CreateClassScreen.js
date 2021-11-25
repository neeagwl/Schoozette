import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createClass } from '../actions/classAction';

const CreateClassScreen = ({location, history}) => { 

    const [className,setClassName] = useState('');

    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    const dispatch = useDispatch ();
    const newClass = useSelector(state=>state.newClass);
    const {error:classError,newClassInfo} = newClass;

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])

    const submitHandler =(e)=>{
            e.preventDefault();
            dispatch(createClass(className))
    }

    return (
        <>
        {userInfo ?  
            <div>
            
                    {error && <Message variant='danger'>{error}</Message>}
                    {classError && <Message variant='danger'>{classError}</Message>}
                    {loading && <Loader/>}
                    <FormContainer>
                        <h4>Create a new Class</h4>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='className'>
                                <Form.Label>
                                    Class Name 
                                </Form.Label>
                                <Form.Control
                                    type="className"
                                    placeholder="Enter your Class Name"
                                    value={className}
                                    onChange={e=>setClassName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Button type="submit" variant="primary">Create Class</Button>
                        </Form>
                    </FormContainer>

                    {newClassInfo ? 
                       <h5>Share this code to your students  <i>{newClassInfo.classCode}</i></h5> 
                                                  : <p></p>
                    }
            
            </div> 
        
        : <h1>Please log in</h1> }

       
        </>
    )
}

export default CreateClassScreen
