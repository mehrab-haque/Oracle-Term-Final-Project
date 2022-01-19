const RegReducer=(state=-1,action)=>{
    switch(action.type){
        case 'REGISTERED_IN':
            return 1;
        case 'REGISTER_LOADING':
            return 0;
        case 'NOT_REGISTERED':
            return -1;
        default:
            return state;
    }
}

export default RegReducer