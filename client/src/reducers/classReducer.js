export const createClassReducer = (state={},action)=>{
    switch(action.type){
        case 'CREATE_CLASS_REQ':
            return {loading:true}

        case 'CREATE_CLASS_SUCCESS':
            return {loading:false, newClassInfo:action.payload}
            
        case 'CREATE_CLASS_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}


export const joinClassReducer = (state={},action)=>{
    switch(action.type){
        case 'JOIN_CLASS_REQ':
            return {loading:true}

        case 'JOIN_CLASS_SUCCESS':
            return {loading:false, joinClassInfo:action.payload}
            
        case 'JOIN_CLASS_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const classDetailOfUserReducer = (state={},action)=>{
    switch(action.type){
        case 'CLASS_DETAILS_REQ':
            return {loading:true}

        case 'CLASS_DETAILS_SUCCESS':
            return {loading:false, allClassOfUser:action.payload}
            
        case 'CLASS_DETAILS_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const classProfileReducer = (state={},action)=>{
    switch(action.type){
        case 'CLASS_PROFILE_REQ':
            return {loading:true}

        case 'CLASS_PROFILE_SUCCESS':
            return {loading:false, classInfo:action.payload}
            
        case 'CLASS_PROFILE_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}


export const addTopicReducer = (state={},action)=>{
    switch(action.type){
        case 'ADD_TOPIC_REQ':
            return {loading:true}

        case 'ADD_TOPIC_SUCCESS':
            return {loading:false, topicInfo:action.payload}
            
        case 'ADD_TOPIC_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

export const getClassLeaderBoardReducer = (state={},action)=>{
    switch(action.type){
        case 'GET_LEADERBOARD_REQ':
            return {loading:true}

        case 'GET_LEADERBOARD_SUCCESS':
            return {loading:false, leaderboard:action.payload}
            
        case 'GET_LEADERBOARD_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}

