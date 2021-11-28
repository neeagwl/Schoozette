import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Leaderboard from 'react-leaderboard';
import { getClassProfile, getClassLeaderBoard } from '../actions/classAction'

const ClassScreen = ({ history }) => {

  const dispatch = useDispatch()

  const {classId} = useParams()

  const [topicUrl, setTopicUrl] = useState('');

  const classProfile = useSelector((state) => state.classProfile)
  const { loading, error, classInfo } = classProfile

  const classLeaderboard = useSelector((state) => state.classLeaderboard)
  const { leaderboard } = classLeaderboard

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else if(!classInfo) {
        dispatch(getClassProfile(classId))
    }
    if(!leaderboard){
      dispatch(getClassLeaderBoard(classId))
    }
    if(classInfo){
      setTopicUrl(`/class/addTopic/${classInfo._id}`)
    }
  }, [dispatch, history, userInfo, classInfo, leaderboard])

  return (
    <>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <Container className="justify-content-md-center">
        {classInfo && <h3>{classInfo.className}</h3>}
        {classInfo && userInfo._id==classInfo.classTeacher && <Link to={topicUrl}><Button variant="dark">Add a new chapter</Button></Link>}
        <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>CLASS NAME</th>
            <th>CLASS THEORY</th>
            <th>CLASS QUIZ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classInfo ? (classInfo.topics.map(({topicName, topicTheory}, index) =>{ 

            let quizArray = classInfo.quizzes
            let quizId = quizArray[index]
            let quizUrl = `/quiz/${quizId}`
            return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{topicName}</td>
              <td>
                {topicTheory}
              </td>
              <td>
              <Link to={quizUrl}><Button variant="info">Take Quiz</Button></Link>
              </td>
            </tr>
          )})) : <h6>Loading...</h6>}
        </tbody>
      </Table>
      </Container>
      </Col>
      <Col md={4}>
        {
          leaderboard && (
          <div className="string">
            <Leaderboard users={leaderboard} paginate={10}/>
          </div>)

        }
      </Col>
      </Row>

      )}
    </>
  )
}

export default ClassScreen