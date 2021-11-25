import axios from 'axios';
// import history from '../history'

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_LOGIN_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      )

      console.log(data); //testing
  
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
      localStorage.setItem("jwt",data.token)
      localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('jwt');
    localStorage.removeItem('newClassInfo')
    dispatch({type:"USER_LOGOUT"})
    document.location.href='/login'
  }

  export const register = (name,email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/user/register',
        { name,email, password },
        config
      )
  
      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      })

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

