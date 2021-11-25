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

