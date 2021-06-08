import React,{useState,useEffect} from 'react'
import {Helmet} from 'react-helmet';
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {fetchPost,updatePost} from '../store/asyncActions/PostActions'
import {POST_RESET,REDIRECT_TRUE,RESET_UPDATE_ERRORS} from '../store/types/postTypes'
import toast,{Toaster } from 'react-hot-toast';
import '../css/grid.css'
import '../css/components/create.css'
import '../css/components/register.css';
const Edit = (props) => {
    const [state,setState] = useState({
        title:'',
        body:'',
    })

    const history = useHistory();

    const dispatch = useDispatch();
    const {loading,redirect,msg} = useSelector((state)=>state.PostReducer)
    const {post,postStatus} = useSelector((state)=>state.fetchPost)
    const {editErrors} = useSelector((state)=> state.updatePost);
    // const history = useHistory();
    // console.log(post);
    const {id} = useParams(); 
    useEffect(()=>{
        if(postStatus){
            setState({
                title:post.title,
                body:post.body,
            })
            dispatch({type:POST_RESET})
        }
        else{
            dispatch(fetchPost(id)) 
        }
    },[post])

    useEffect(()=>{
        if(redirect){
            history.push('/dashboard')
        }
    },[redirect])

    useEffect(()=>{
        if(editErrors.length>0){
            editErrors.map((curr)=>{
                // console.log(curr.msg)
                toast.error(`${curr.msg}`)
            })
        }
        // dispatch({type:RESET_UPDATE_ERRORS});
    },[editErrors])
    
    const updatePosts=(e)=>{
        e.preventDefault();
        dispatch(updatePost({
            _id:post._id,
            title:state.title,
            body:state.body,
        }))
    }
    return (
        <div className="mt-100">
            <Helmet>
               <title>Edit post</title>
               <meta name="description" content="Update Post" />
           </Helmet>
           <div className="container">
           <Toaster  position="top-right"
                reverseOrder={false}/>
               <div className="row">
                <div className="col-6">
                    <div className="card">
                            <h3 className="card__h3">Edit Post</h3>
                            <form onSubmit={updatePosts}>
                                <div className="group">
                                    <label htmlFor='title'>Post Title</label>
                                    <input type="text"
                                        name="title"
                                        id="title"
                                        className='group__control'
                                        placeholder="Post title..."
                                        value={state.title}
                                        onChange={(e)=> setState({...state,title:e.target.value})} />
                                </div>
                                <div className="group">
                                <label htmlFor="body" >Post Body</label>
                                <textarea type="text" name="body" id="body"
                                className="group__control"
                                value={state.body}
                                onChange={(e)=> setState({...state,body:e.target.value})}
                                placeholder="Post body..." />
                            </div>
                            {/* <div className="group">
                                <label htmlFor="description" >Meta Description</label>
                                <textarea type="text" name="description" id="description"
                                className="group__control"
                                value={state.description}
                                onChange={(e)=> setState({...state,description:e.target.value})}
                                placeholder="meta description"
                                maxLength="150" />
                                <p className="length">
                                    {state.description? state.description.length + '/150' : 0 +'/150' }
                                </p>
                            </div> */}
                            <div className="group">
                                <input type="submit" name="" id=""
                                className="btn btn-default btn-block" value="Edit"
                                 />
                            </div>
                            </form>
                    </div>
                </div>

               </div>
           </div>
        </div>
    )
}

export default Edit