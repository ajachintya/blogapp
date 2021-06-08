import {useEffect} from 'react'
import {Helmet} from 'react-helmet';    
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {REDIRECT_FALSE,REMOVE_MSG,REMOVE_ERRORS,
    RESET_UPDATE_ERRORS,SET_LOADER,
    CLOSE_LOADER,SET_MSG} from '../store/types/postTypes';
import {fetchPosts} from '../store/asyncActions/PostActions';
import moment from 'moment';
import toast,{Toaster } from 'react-hot-toast';
import { BsPencil,BsFillTrashFill,BsImage } from 'react-icons/bs';
import axios from 'axios'
import Sidebar from './Sidebar'
import '../css/grid.css'
import '../css/components/dashboard.css'
const Dashboard = ()=>{

    const {redirect,msg,loading,createErrors} = useSelector((state)=> state.PostReducer);
    const {user:{_id},token} = useSelector((state)=> state.AuthReducer);
    const {posts} = useSelector((state)=> state.fetchPosts);
    const {editErrors} = useSelector((state)=> state.updatePost);
    const dispatch = useDispatch();
    const deletePosts = async(id)=>{
        console.log(id)
        const confirm = window.confirm("Do you really want to delete post?")
        if(confirm){
            const config={
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            dispatch({type:SET_LOADER})
            try{
                const {data:{msg}} = await axios.get(`/delete/${id}`,config);
                dispatch({type:CLOSE_LOADER})
                // dispatch(fetchPosts(_id));
                dispatch({type:SET_MSG,payload:msg})
            }catch(err){
                dispatch({type:CLOSE_LOADER})
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        if(createErrors.length > 0 ){
            dispatch({type:REMOVE_ERRORS})
        }

        if(editErrors.length > 0){
            dispatch({type:RESET_UPDATE_ERRORS});
        }
        if(redirect){
            dispatch({type:REDIRECT_FALSE});
        }
        if(msg){
            toast.success(msg);
            dispatch({type:REMOVE_MSG});
        }
        dispatch(fetchPosts(_id));
        
    },[msg])
    return(
        <>
          <Helmet>
               <title>Dashboard</title>
               <meta name="description" content="Welcome to dashboard" />
           </Helmet>
           <Toaster  position="top-right"
                reverseOrder={false}/>
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    {/* <div className="col-3 p-15">
                        <Sidebar />
                    </div> */}
                    <div className="col-9 p-15">
                        {!loading ? posts.length > 0 ? posts.map((post)=>(
                                <div className="dashboard__posts" key={post._id}>
                                    <div className="post__title">
                                         <Link to="/" > {post.title}  </Link>
                                       
                                         <span>Published {moment(post.updatedAt).fromNow()} </span>
                                    </div>
                                 <div className="post__links">
                                 <Link to={`/updateImage/${post._id}`} > 
                                 <BsImage className="icon"  /> 
                                 </Link>
                                 <Link className="icon" to={`/edit/${post._id}`}> 
                                 <BsPencil /> 
                                 </Link>
                                <BsFillTrashFill onClick={()=>deletePosts(post._id)} className="icon" />
                                 </div>
                                </div>
                        )):"You have no posts":'loading...'}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;