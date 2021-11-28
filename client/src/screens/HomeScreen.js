import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createClass, getAllClassOfUser, joinClass } from '../actions/classAction';
import './HomeScreen.css';

const heading = {
    marginTop :"40px",
    textAlign:"center",
    color : "#8a165f",
    marginBottom : "40px"
}

const HomeScreen = ({location, history}) => { 
   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const allClass = useSelector(state=>state.allClass)
    const {loading, error, allClassOfUser} = allClass

    const dispatch = useDispatch();

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }else if(!allClassOfUser){
            dispatch(getAllClassOfUser(userInfo._id))
        }
        console.log(allClassOfUser);
    }, [history,userInfo,redirect, allClassOfUser])


    return (

        <div >
        <h1 my-2 style= {heading}>MY Enrolled Classes</h1>
        <Row className="justify-content-center">
        { allClassOfUser ?
            allClassOfUser.enrolledClassArray.map(({_id, className, totalScore,classDescription}) =>{
                const classUrl = `/class/${_id}`
                return(
         
                    <div key={_id} >
                    {/* <Row className="justify-content-center"> */}
                <Col className="order-lg-2" lg="3">
                    
                      

                    <Card className="_card">
                    {/* <Card.Img className="_card-img" variant="top" src={className}  alt={className} /> */}
                    <Card.Body className="_card-body">
                        <Card.Title className="_card-title" style={{
                            color: '#3C4858',
                            margin: '1.75rem 0 0.875rem',
                            marginTop: '.625rem',
                            fontFamily: '"Roboto Slab", "Times New Roman", serif',
                            fontWeight: '900',
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                            lineHeight: '1.5em'
                        }}>{className}</Card.Title>
                        {classDescription ?
                        <Card.Text className="_card-text">
                        {classDescription.substring(0,20)}....
                        </Card.Text>
                        : 
                        <Card.Text className="_card-text">
                        {className}
                        </Card.Text>
                    }
                    

                        <Card.Text className="_card-text">
                            Total Score: {totalScore}
                        </Card.Text>
                        <Link to={classUrl}><Button className="_primary">Visit Profile</Button></Link>
                    </Card.Body>
                    </Card>
                                
                                    </Col>
                                    {/* </Row> */}
                                    </div>
                                    )
                                })
                                :<h2>Loading!...</h2>
                            }
                            {/* hii */}
                            </Row>
                            <h1 my-2 style= {heading}>MY Created Classes</h1>
                            <Row className="justify-content-center">
                            { allClassOfUser  ?
                                allClassOfUser.createdClassArray.map(({_id, className, numberOfEnrolledStudents,classDescription}) =>{
                                    const classUrl = `/class/${_id}`
                                    return(
                            
                                        <div key={_id} >
                                        {/* <Row className="justify-content-center"> */}
                                    <Col className="order-lg-2" lg="3">
                                        
                                            

                    <Card className="_card">
                    {/* <Card.Img className="_card-img" variant="top" src={className}  alt={className} /> */}
                    <Card.Body className="_card-body">
                        <Card.Title className="_card-title" style={{
                            color: '#3C4858',
                            margin: '1.75rem 0 0.875rem',
                            marginTop: '.625rem',
                            fontFamily: '"Roboto Slab", "Times New Roman", serif',
                            fontWeight: '900',
                            textDecoration: 'none',
                            fontSize: '1.5rem',
                            lineHeight: '1.5em'
                        }}>{className}</Card.Title>
                            {classDescription ?
                        <Card.Text className="_card-text">
                        {classDescription.substring(0,20)}....
                        </Card.Text>
                        : 
                        <Card.Text className="_card-text">
                        {className}
                        </Card.Text>
                    }
                        <Card.Text className="_card-text">
                            Number of Enrolled Students: {numberOfEnrolledStudents}
                        </Card.Text>
                        <Link to={classUrl}><Button className="_primary">Visit Profile</Button></Link>
                    </Card.Body>
                    </Card>
               
                </Col>
                {/* </Row> */}
                </div>
                )
            })
            :<h2>Loading!...</h2>
        }
        {/* hii */}
        </Row> 
    </div>
    
    )
}

export default HomeScreen
