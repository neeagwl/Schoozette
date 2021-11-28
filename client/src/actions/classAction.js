import axios from 'axios';

export const createClass = (className,classDescription) => async (dispatch) => {
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
        { className,classDescription},
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

// GET A CLASS PROFILE
export const getClassProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'CLASS_PROFILE_REQ',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }

    const { data } = await axios.get(
      `/api/class/${id}`,config )

    dispatch({
      type: 'CLASS_PROFILE_SUCCESS',
      payload: data,
    })
    
  } catch (error) {
    dispatch({
      type: 'CLASS_PROFILE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}  


//ADD A TOPIC TO THE CLASS
export const addTopic = ({topicName, topicTheory, classId}) => async (dispatch) => {
  try {
    dispatch({
      type: 'ADD_TOPIC_REQ',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }

    const { data } = await axios.post(
      `/api/class/addTopic/${classId}`,
      { topicName, topicTheory},
      config
    )

    dispatch({
      type: 'ADD_TOPIC_SUCCESS',
      payload: data,
    })

    console.log(data) //testing

  } catch (error) {
    dispatch({
      type: 'ADD_TOPIC_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//GET LAEDERBOARD OF A CLASS
export const getClassLeaderBoard = (classId) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_LEADERBOARD_REQ',
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }

    console.log(classId) //testing

    const { data } = await axios.get(
      `/api/class/leaderboard/${classId}`,
      config
    )

    dispatch({
      type: 'GET_LEADERBOARD_SUCCESS',
      payload: data,
    })

    console.log(data) //testing

  } catch (error) {
    dispatch({
      type: 'GET_LEADERBOARD_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
