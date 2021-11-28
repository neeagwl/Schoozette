export const createQuizReducer = (state={},action)=>{
    switch(action.type){
        case 'CREATE_QUIZ_REQ':
            return {loading:true}

        case 'CREATE_QUIZ_SUCCESS':
            return {loading:false, newQuizInfo:action.payload}
            
        case 'CREATE_QUIZ_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}


export const getQuizReducer = (state={},action)=>{
    switch(action.type){
        case 'GET_QUIZ_REQ':
            return {loading:true}

        case 'GET_QUIZ_SUCCESS':
            return {loading:false, quizInfo:action.payload}
            
        case 'GET_QUIZ_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const submitQuizReducer = (state={},action)=>{
    switch(action.type){
        case 'SUBMIT_QUIZ_REQ':
            return {loading:true} 

        case 'SUBMIT_QUIZ_SUCCESS':
            return {loading:false, submitQuizDetail:action.payload}
            
        case 'SUBMIT_QUIZ_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}



