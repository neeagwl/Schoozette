import axios from 'axios';

//CREATE A  NEW QUIZ
export const createQuiz = (quizName, questionArray, classId) => async (dispatch) => {
    try {
      dispatch({
        type: 'CREATE_QUIZ_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.post(
        '/api/quiz/create',
        { quiz_name: quizName, questions:questionArray, classId},
        config
      )
  
      dispatch({
        type: 'CREATE_QUIZ_SUCCESS',
        payload: data,
      })

      console.log(data) //testing

    } catch (error) {
      dispatch({
        type: 'CREATE_QUIZ_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }



// Get a QUIZ BY ID
export const getQuiz = (quizId) => async (dispatch) => {
    try {
      dispatch({
        type: 'GET_QUIZ_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.get(
        `/api/quiz/${quizId}`,config )
  
      dispatch({
        type: 'GET_QUIZ_SUCCESS',
        payload: data,
      })
      
    } catch (error) {
      dispatch({
        type: 'GET_QUIZ_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }  
  

//SUBMIT A QUIZ
export const submitQuiz = (attemptedQuestions, quizId) => async (dispatch) => {
  try {
    dispatch({
      type: 'SUBMIT_QUIZ_REQ',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }

    const { data } = await axios.post(
      `/api/quiz/${quizId}/evaluate`,
      { attemptedQuestions},
      config
    )

    dispatch({
      type: 'SUBMIT_QUIZ_SUCCESS',
      payload: data,
    })
    

  } catch (error) {
    dispatch({
      type: 'SUBMIT_QUIZ_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
