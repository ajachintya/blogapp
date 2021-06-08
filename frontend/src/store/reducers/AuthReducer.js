import jwt_decode from "jwt-decode";
import {SET_LOADER,SET_TOKEN,CLOSE_LOADER,REGISTER_ERRORS, LOGOUT,LOGIN_ERRORS} from '../types/userTypes'
const initialState = {
    loading:false,
    registerErrors:[],
    loginErrors:[],
    token:'',
    user:''
}

const verifyToken = (token)=>{
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if(new Date() > expiresIn){
        localStorage.removeItem('myToken');
        return null;
    }
    else{
        return decodeToken;
    }
}

const token = localStorage.getItem('myToken');
// const decodeToken = jwt_decode(token);
if(token){
    const decodeToken = verifyToken(token);
   if(decodeToken){
    initialState.token = token;
    const {user} = decodeToken;
    initialState.user = user;
   }
}


export const AuthReducer = (state=initialState,action)=>{
    // console.log(action.type);
    if(action.type === SET_LOADER){
        return{
            ...state,loading:true
        }
    }
    else if(action.type === CLOSE_LOADER){
        return{...state,loading:false}
    }else if(action.type === REGISTER_ERRORS){
        return {
            ...state,registerErrors:action.payload
        }
    }
    else if(action.type === LOGIN_ERRORS){
        return {
            ...state,loginErrors:action.payload
        }
    }
    else if(action.type===SET_TOKEN){
        const decoded = verifyToken(action.payload);
        const {user} = decoded;
        return {...state,user:user,token:action.payload,
            loginErrors:[],registerErrors:[]}
    }
    else if(action.type === LOGOUT){
        return {...state,token:"",user:""}
    }
    else{
        return state;
    }
}

