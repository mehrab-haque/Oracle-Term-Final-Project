const AuthReducer=(state=-1,action)=>{
    switch(action.type){
        case 'SIGNED_IN':
            return 1;
        case 'AUTH_LOADING':
            return 0;
        case 'SIGNED_OUT':
            return -1;
        default:
            return state;
    }
}

export default AuthReducer