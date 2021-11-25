import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { joinClass } from '../actions/classAction';

const JoinClassScreen = ({location, history}) => { 

    const [classCode, setClassCode] = useState('');

    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    const dispatch = useDispatch ();

    const joinNewClass = useSelector(state=>state.joinNewClass);
    const {error:joinClassError, joinClassInfo} = joinNewClass;

    // if(joinClassInfo) console.log(joinClassInfo)

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(joinClass(classCode));
    }


    return (
        <>
        {userInfo ?  
            <div>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
                    <FormContainer>
                        <h4>Join a Class</h4>
                        {joinClassError && <Message variant='danger'>{joinClassError}</Message>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='className'>
                                <Form.Label>
                                    Class Code
                                </Form.Label>
                                <Form.Control
                                    type="classCode"
                                    placeholder="Enter the Class Code"
                                    value={classCode}
                                    onChange={e=>setClassCode(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Button type="submit" variant="primary">Join Class</Button>
                        </Form>
                    </FormContainer>
                    {joinClassInfo && <h3>Yor are now enrolled in {joinClassInfo.className} class</h3>}
            
            </div> 
        
        : <h1>Please log in</h1> }

       
        </>
    )
}

export default JoinClassScreen
