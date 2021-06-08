import {Helmet} from 'react-helmet';    
 import React,{useEffect,useState} from 'react';
 import {useSelector,useDispatch} from 'react-redux';
 import {fetchAllPosts} from '../store/asyncActions/PostActions'
 import moment from 'moment';
 import {Link} from 'react-router-dom';
 import '../css/grid.css'
 import '../css/components/home.css'
const Home = () => {
    const {loading} = useSelector((state)=> state.PostReducer)
    const {posts} = useSelector(state => state.fetchPosts);
    const dispatch = useDispatch();
    const [state,setState] = useState('');
    useEffect(()=>{
        dispatch(fetchAllPosts())
    },[])
    console.log(posts)
    console.log(loading)

    const Links = posts.map((post)=>{
        return <div>{post.props}</div>
    })
    // console.log(Links);

    return (
        <>
           <Helmet>
               <title>Welcome</title>
               <meta name="description" content="Welcome to blog home page" />
           </Helmet>
           <div style={{marginTop:"100px"}} className="container">
                <div className="row" style={{marginBottom:"50px"}}>
                    <div className="col-9 home"> 
                        {!loading? posts.length > 0? posts.map((post)=>(
                            <div className="row post-style" key={post._id}>
                                <div className="col-8">
                                    <div className="post">
                                        <div className="post__header">
                                            <div className="avatar">
                                                {post.userName[0]}
                                            </div>
                                            <div className="user">
                                                <span> {post.userName}</span>
                                                <span>{moment(post.updatedAt).format('MMM Do YY')}</span>
                                            </div>
                                        </div>
                                        <div className="post__body">
                                            <h1 className="body__title">
                                                <Link>{post.title}</Link>
                                            </h1> 
                                            <div className="body__details">
                                            {post.body}
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                   <div className="post__image">
                                   <img src={`/images/${post.image}`} alt=""/>
                                   </div>
                                </div>
                            </div>
                        )) :"NO Posts" : 'Loading...'}
                    </div>
                </div>
           </div>
        </>
    )
}

export default Home;