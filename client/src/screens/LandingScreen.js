import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import './LandingScreen.css';

const LandingScreen = () => { 
    const dispatch = useDispatch ();
    const userLogin = useSelector(state=>state.userLogin);
    const {loading,error,userInfo} = userLogin;

    return (
        <>
        <div className="landing">
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}

    <div id="landing-header">
         <h1 style={{ fontSize: "50px" }}> <Link style={{color: "white"}} to={`/aboutus`}><b>Schoozette</b></Link></h1>
         <h4 style={{ color: "white" }}>FALL IN LOVE WITH LEARNING</h4>
         {userInfo?
             <Link to={`/home`} style={{ margin:"20px 7px"}} className="btn btn-lg btn-success active">Go to Dashboard
             &#8594;</Link>
             :
          <>   
          <Link to={`/login`} style={{ margin:"20px 7px"}} className="btn btn-lg btn-success active">Login</Link>
          <Link href={`/register`} style={{ margin: "20px 7px"}} className="btn btn-lg btn-success active">Register</Link> 
          </>
        }

        <br/>
        <br/>
        <Link  className="btn btn-sm btn-primary" style={{marginRight: "1%" }} to={`/contactus`}><span className="glyphicon glyphicon-earphone"></span></Link>
        <Link  className="btn btn-sm btn-info active" style={{marginRight: "1%"}} to={`#`}><i className="fab fa-facebook"></i></Link>
        <Link className="btn btn-sm btn-warning"  to={`#`}><span className="glyphicon glyphicon-inbox"></span></Link>
    </div>
    <div className="container text-center">
        
    </div>
    
    <ul className="slideshow">
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
        <li><div className="blur"></div></li>
    </ul>
    </div>
        </>
    )
}

export default LandingScreen
