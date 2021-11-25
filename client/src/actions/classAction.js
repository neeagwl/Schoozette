import axios from 'axios';

export const createClass = (className) => async (dispatch) => {
    try {
      dispatch({
        type: 'CREATE_CLASS_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.post(
        '/api/class/create',
        { className},
        config
      )
  
      dispatch({
        type: 'CREATE_CLASS_SUCCESS',
        payload: data,
      })

      console.log(data) //testing
      localStorage.setItem('newClassInfo', JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: 'CREATE_CLASS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const joinClass = (classCode) => async (dispatch) => {
    try {
      dispatch({
        type: 'JOIN_CLASS_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.post(
        '/api/class/join',
        { classCode},
        config
      )
  
      dispatch({
        type: 'JOIN_CLASS_SUCCESS',
        payload: data,
      })

      console.log(data) //testing

    } catch (error) {
      dispatch({
        type: 'JOIN_CLASS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  //GET ALL CLASS OF A USER
  export const getAllClassOfUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CLASS_DETAILS_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.get(
        `/api/class/all/${id}`,config )
  
      dispatch({
        type: 'CLASS_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: 'CLASS_DETAILS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  } 
