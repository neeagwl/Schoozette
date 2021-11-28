import React, { useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import './AddQuizScreen.css'
import AddQuestionModal from '../components/AddQuestionModal'
import QuestionsTable from '../components/QuestionsTable'
import axios from 'axios';
// import { Switch } from '@material-ui/core'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {createQuiz} from '../actions/quizAction';
import FormContainer from '../components/FormContainer';
import ModalForm from '../components/ModalForm';


const AddQuizScreen = ({location,history}) => {

    const [quizName, setQuizName] = useState('');
    const [questionArray, setQuestionArray] = useState([])

	const [numberQuestion, setNumberQuestion] = useState(0);

	const questions =[];

    const {classId} = useParams()

    const dispatch = useDispatch ();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

	const newQuiz = useSelector((state) => state.newQuiz)
    const { newQuizInfo ,loading, error} = newQuiz

    const redirect = location.search? location.search.split('=')[1]:'/login';

    useEffect(() => {
        if(!userInfo){
            history.push(redirect)
        }
		if(newQuizInfo){
			alert("Quiz Created Successfully")
			history.push(`/class/${classId}`)
		}
    }, [history,userInfo,redirect, newQuizInfo, questionArray])

	//MODAL
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const handleQuestionSubmit = (question, option1, option2, option3, correctOption) => {

		closeModal()
		
		const arr = [...questionArray]
		const answers = [{option: option1},{option:option2}, {option: option3}]
	
		arr.push({ question, answers, answer:correctOption })
		// console.log(arr)
		questions.push({question, answers, answer:correctOption});
		setQuestionArray(arr)

	}

    const submitHandler =(e)=>{

            e.preventDefault();
            if(questionArray.length==0){
				alert('Please add atleast one question')
			}

			else if(!quizName){
				alert('Please add quiz title')
			}

			else {
				dispatch(createQuiz(quizName, questionArray, classId))

			}

    }



    
    return (
        <>
            <div id='main-body'>
			<div id='create-quiz-body'>
				<div className='quiz-header'>
					<h3>Quiz Title</h3>
					<input
						type='text'
						className='input-text'
						value={quizName}
						onChange={(e) => setQuizName(e.target.value)}
						id='quiz-name'
						placeholder='Untitled Quiz'
						autoFocus
						autoComplete='off'
					/>
				</div>
				<div className='controls'>
					{/* <AddQuestionModal addQuestionHandle={addQuestionHandle} />
					 */}
					 	<Button onClick={openModal} variant='secondary'>Add Question</Button>

						{ isOpen ? 
						<ModalForm 
							closeModal={closeModal} 
							isOpen={isOpen} 
							handleSubmit={handleQuestionSubmit}
						/> 
						: 
						null 
						}
				</div>
			</div>
			<div className='questionTable'>
				{
					questionArray.length>0 ?
					questionArray.map(({question}, index)=>{
						return (
							<div>
								<p> Q {index+1}.   {question}</p>
							</div>
						)
					}) : <h5>Add a Question</h5>
				}
			</div>
			<div>
				
				<Button type="submit" variant="dark" onClick={submitHandler}>Create Quiz</Button>
			</div>
		</div>
        </>
    )
}

export default AddQuizScreen
