import {REMOVE_ERRORS,CREATE_ERRORS,
    SET_LOADER,CLOSE_LOADER,
    REDIRECT_FALSE,REDIRECT_TRUE,
    SET_MSG,REMOVE_MSG,
    SET_POSTS,SET_POST,POST_REQUEST,POST_RESET,SET_UPDATE_ERRORS,RESET_UPDATE_ERRORS, UPDATE_IMAGE_ERROR, RESET_UPDATE_IMAGE_ERROR} from '../types/postTypes';

const initialState = {
    loading:false,
    createErrors:[],
    redirect:false,
    msg:'',
    posts:[],
    post:{},
    postStatus:false,
    editErrors:[],
    editImageError:[]
}
export const PostReducer = (state=initialState,action)=>{
   if(action.type === SET_LOADER){
       return {
           ...state,
           loading:true
       }
   }
   else if(action.type === CLOSE_LOADER){
    return {
        ...state,
        loading:false
    }
   }
   else if(action.type === CREATE_ERRORS){
    return {
        ...state,
        createErrors:action.payload
    }
   }
   else if(action.type === REDIRECT_TRUE){
        return{
            ...state,
            redirect:true
        }
   }
   else if(action.type === REDIRECT_FALSE){
       return {
           ...state,
           redirect:false
       }
   }
   else if(action.type===SET_MSG){
       return {
           ...state,
           msg:action.payload
       }
   }
   else if(action.type === REMOVE_MSG){
       return {
           ...state,
           msg:''
       }
   }
   else if(action.type=== REMOVE_ERRORS){
       return {...state, createErrors:[]}
   }
   else{
       return state;
   }
}


export const fetchPosts = (state=initialState,action)=>{
    if(action.type === SET_POSTS ){
        return {...state,posts:action.payload}
    }
    else{
        return state;
    }
}


export const fetchPost = (state=initialState,action)=>{
    if(action.type===SET_POST){
        return {...state,post:action.payload}
    }
    else if(action.type===POST_REQUEST){
        return {...state,postStatus:true}
    }
    else if(action.type===POST_RESET){
        return{...state,postStatus:false}
    }
    else{
        return state;
    }
}


export const updatePost = (state=initialState,action)=>{
    if(action.type === SET_UPDATE_ERRORS){
        return {...state,editErrors:action.payload}
    }
    else if(action.type === RESET_UPDATE_ERRORS){
        return {...state,editErrors:[]}
    }
    else{
        return state;
    }
}

export const updateImage = (state=initialState,action)=>{
    if(action.type === UPDATE_IMAGE_ERROR){
        return {...state,editImageError:action.payload}
    }
    else if(action.type === RESET_UPDATE_IMAGE_ERROR){
        return {...state,editImageError:[]}
    }
    else{
        return state;
    }
}