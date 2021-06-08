import axios from 'axios';
import {SET_LOADER,SET_TOKEN,CLOSE_LOADER,REGISTER_ERRORS,LOGIN_ERRORS} from '../types/userTypes'
export const postRegister = (state)=>{
    //using thunk middleware which provides us dispatch
    return async(dispatch)=>{
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        dispatch({type:SET_LOADER})
       try{
        const {data} =await axios.post('/register',state,config);
        dispatch({type:CLOSE_LOADER})
        localStorage.setItem('myToken',data.token);
        dispatch({type:SET_TOKEN,payload:data.token});
       }catch(err){
        dispatch({type:CLOSE_LOADER})
        dispatch({type:REGISTER_ERRORS,payload:err.response.data.errors})
           console.log(err.response);
       }
    }
}

export const postLogin = (loginState)=>{
    return async(dispatch)=>{
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        dispatch({type:SET_LOADER})
        try{
            const {data} =await axios.post('/login',loginState,config);
            dispatch({type:CLOSE_LOADER})
            localStorage.setItem('myToken',data.token);
            dispatch({type:SET_TOKEN,payload:data.token});
           }catch(err){
            dispatch({type:CLOSE_LOADER})
            dispatch({type:LOGIN_ERRORS,payload:err.response.data.errors})
            // console.log(err.response.data.errors);
           }
    }
}