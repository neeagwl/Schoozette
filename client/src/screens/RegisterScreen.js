import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({location,history}) => {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [selectedOption, setSelectedOption] = useState('Teacher');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch ();
    const userRegister = useSelector(state=>state.userRegister);
    const {loading,error,userInfo} = userRegister;

    const redirect = location.search? location.search.split('=')[1]:'/home';

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])

    const submitHandler =(e)=>{
            e.preventDefault();
            if(password!==confirmPassword){
                setMessage('Password do not match!')
            }else{
                // let isTeacher = selectedOption==='Teacher'? true:false ;
                console.log(name,email,password); //testing
                dispatch(register(name,email,password))
            }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>
                        Full Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* <Form.Group controlId='isTeacher'>
                    <Form.Label>
                        Are you a  ?
                    </Form.Label>
                        <Form.Check
                            inline
                            label="Teacher"
                            name="Teacher"
                            type="radio" value="Teacher" 
                            checked={selectedOption === 'Teacher'} 
                            onChange={e=>setSelectedOption(e.target.value)}
                        />
                        <Form.Check
                            inline
                            label="Student"
                            name="Student"
                            type="radio" value="Student" 
                            checked={selectedOption === 'Student'} 
                            onChange={e=>setSelectedOption(e.target.value)}
                        />
                </Form.Group> */}
                <Button type="submit" variant="primary">Register</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account?{' '}
                    <Link to='/login'>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
