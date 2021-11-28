import React, { useState, useEffect } from 'react'
import {useParams, Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import {getQuiz, submitQuiz} from '../actions/quizAction';

const TakeQuizScreen = ({location,history}) => {

	const [attemptedQuestions, setAttemptedQuestions] = useState([])
    const [questions, setQuestions] = useState([])
   

    const [flag, setFlag] = useState(false)
    const [flag2, setFlag2] = useState(false)

    const {quizId} = useParams()

    const dispatch = useDispatch ();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const currentQuiz = useSelector((state) => state.currentQuiz)
    const {loading: quizLoading,  error:quizError, quizInfo } = currentQuiz

    const submitQuizInfo = useSelector((state) => state.submitQuizInfo)
    const {submitQuizDetail} = submitQuizInfo


    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        if(!quizInfo){
            dispatch(getQuiz(quizId))
        }
        if(!flag && quizInfo){

            const arr = [...questions]
            const myQuestions = quizInfo.questions
            arr.push(...myQuestions)
            setQuestions(arr)
            setFlag(true) 
            console.log(questions) //testing

            const temp = quizInfo.questions.map(({question}) => {
                return {
                    question,
                    selectedOption: '',
                }
            })

			setAttemptedQuestions(temp)

        }
        if(submitQuizDetail){
            console.log(submitQuizDetail)
            alert('Quiz Submitted Successfully! You scored' + submitQuizDetail.score)
            history.push('/home')
        }

    }, [userInfo, quizInfo,submitQuizInfo,questions])

	const handleOptionSelect = (e, option, index) => {

		const temp = [...attemptedQuestions]

		console.log('index:' + index)  //testing
		if (e.target.checked) {
			temp[index].selectedOption = option
		}
		if (!e.target.checked) {
			temp[index].selectedOption = ''
		}

		setAttemptedQuestions(temp)
	}

    const submitHandler =(e)=>{

        e.preventDefault();
        dispatch(submitQuiz(attemptedQuestions, quizId))

    }

    
    return (
        <>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        {quizLoading && <Loader/>}
        {quizError && <Message variant='danger'>{quizError}</Message>}
        
        {true ?
                <div id='main-body'>
                <div id='create-quiz-body'>
                    <div className='quiz-header'>
                        {/* <h2>{quizInfo.name}</h2> */}
                    </div>
                    {questions.map(({question, answers}, index) => (
                        <div className='attempQuestionCard' key={index}>
                            <div id='title'>{question}</div>
                            <div className='option-div'>
                                {answers.map(({option}, ind) => (
                                    <div className='option' key={ind}>
                                        <input
                                                type='checkbox'
                                                name='option'
                                                onChange={(e) =>
                                                    handleOptionSelect(e, option, index)
                                                }
                                        />
                                        <label className='label' style={{ padding: '0px 5px' }}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div> 
                        </div>
                    ))}
                    <Button  onClick={submitHandler}>
                        Submit
                    </Button>
                </div>
            </div> : null
        }
        
        </>
    )
}

export default TakeQuizScreen


