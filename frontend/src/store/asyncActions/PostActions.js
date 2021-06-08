import axios from 'axios';
import {CREATE_ERRORS,
    SET_LOADER,
    CLOSE_LOADER,REDIRECT_FALSE,
    REDIRECT_TRUE,SET_MSG,
    REMOVE_MSG,
    SET_POSTS,
REMOVE_ERRORS,
SET_POST,POST_REQUEST,POST_REST,SET_UPDATE_ERRORS,UPDATE_IMAGE_ERROR,RESET_UPDATE_IMAGE_ERROR} 
from '../types/postTypes'
export const createAction =(postData)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}} = getState();
        // console.log(data);
        try{
            dispatch({type:SET_LOADER})
            const config={
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const {data:{msg}} = await axios.post('/create_post',postData,config);
            dispatch({type:CLOSE_LOADER})
            dispatch({type:REMOVE_ERRORS});
            dispatch({type:REDIRECT_TRUE});
            dispatch({type:SET_MSG,payload:msg})
            // console.log();
        }catch(err){
            const {errors} = err.response.data;
            console.log(errors);
            dispatch({type:CLOSE_LOADER})
            dispatch({type:CREATE_ERRORS,payload:errors})
            console.log(err.response)
        }
    }
}


export const fetchPosts = (id)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}} = getState()
        dispatch({type:SET_LOADER});
        const config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        try{
            const {data:{data}} = await axios.get(`/posts/${id}`,config);
            dispatch({type:CLOSE_LOADER});
            dispatch({type:SET_POSTS,payload:data})
            // console.log(data);
        }catch(err){
            dispatch({type:CLOSE_LOADER});
        }
    }
}


export const fetchPost = (id)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}} = getState();
        const config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        dispatch({type:SET_LOADER});
        try{
            const {data:{post}} = await axios.get(`/post/${id}`,config );
            dispatch({type:CLOSE_LOADER});
            dispatch({type:SET_POST,payload:post})
            dispatch({type:POST_REQUEST});
        }catch(err){
            dispatch({type:CLOSE_LOADER});
            console.log(err);
        }
    }
}


export const updatePost =(updatedData)=>{
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}} = getState();
        const config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        // console.log(updatedData);
        dispatch({type:SET_LOADER});
        try{
            const {data} = await axios.patch('/update',updatedData,config);
            // console.log(data);
            dispatch({type:CLOSE_LOADER});
            dispatch({type:REDIRECT_TRUE});
            dispatch({type:SET_MSG,payload:data.msg})
        }catch(err){
            dispatch({type:SET_UPDATE_ERRORS,payload:err.response.data.errors})
            dispatch({type:CLOSE_LOADER});
            console.log(err.response.data.errors);
        }
    }
}   


export const updateImage = (image)=>{
    console.log(image)
    return async(dispatch,getState)=>{
        const {AuthReducer:{token}} = getState();
        const config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        dispatch({type:SET_LOADER});

        try{
            const {data:{msg}} = await axios.post('/updateImage',image,config);
            dispatch({type:CLOSE_LOADER});
            dispatch({type:REDIRECT_TRUE});
            dispatch({type:SET_MSG,payload:msg});
            // console.log(msg);
        }catch(err){
            dispatch({type:UPDATE_IMAGE_ERROR,payload:err.response.data.errors})
            dispatch({type:CLOSE_LOADER});
            console.log(err.response.data.errors);
        }
    }
}


export const fetchAllPosts = ()=>{
    return async(dispatch)=>{
        dispatch({type:SET_LOADER});
        try{
            const {data:{data}} = await axios.get(`/home`);
            // dispatch({type:SET_MSG,payload:"hello"})
            dispatch({type:CLOSE_LOADER});
            dispatch({type:SET_POSTS,payload:data})
            // console.log(data);
        }catch(err){
            dispatch({type:CLOSE_LOADER});
            console.log(err);
        }
    }
}