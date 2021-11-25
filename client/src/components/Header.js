import React ,{useEffect}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter,Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {logout} from '../actions/userActions';

const Header = ({history}) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;



    const logoutHandler =()=>{
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                    <Navbar.Brand>VPro</Navbar.Brand>
                    </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Link href='/joinClass' style={{color:'white'}}>JOIN A CLASS</Nav.Link>
                <Nav.Link href='/createClass' style={{color:'white'}}>CREATE A CLASS</Nav.Link>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {userInfo?(
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/createClass'>
                                    <NavDropdown.Item>Create a Class</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/joinClass'>
                                    <NavDropdown.Item>Join a Class</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    LogOut
                                </NavDropdown.Item>
                            </NavDropdown>
                            ):(
                            <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                            </LinkContainer>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
