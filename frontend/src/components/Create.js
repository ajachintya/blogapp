import {useState,useEffect} from 'react';
import {createAction} from '../store/asyncActions/PostActions'
import {Helmet} from 'react-helmet';
import {useSelector,useDispatch} from 'react-redux';
import toast,{Toaster } from 'react-hot-toast';
import  {REMOVE_ERRORS} from '../store/types/postTypes'
import '../css/grid.css'
import '../css/components/create.css'
import '../css/components/register.css';

const Create = (props)=>{

    const [currImage,setCurrImage] =useState('Choose image')
    const [state,setState] = useState({
        title:'',
        body:'',
        image:''
    });
    const [imagePreview,setImagePreview] = useState('')
    

    const {user:{_id,name}} = useSelector((state)=>state.AuthReducer)
    const {createErrors,redirect} = useSelector((state)=>state.PostReducer);
    console.log(createErrors);
    const dispatch = useDispatch();

    const changeHandler =(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    }

    const changeHandlerDescription = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    
    }
    useEffect(()=>{
        if(redirect){
            props.history.push('/dashboard')
        }
        if(createErrors.length>0){
            createErrors.map((curr)=>{
                console.log(curr.msg)
                toast.error(`${curr.msg}`)
            })
        }
        
    },[createErrors,redirect])

    const fileHandler=(e)=>{
        if(e.target.files.length!==0){
            setState({
                ...state,
                [e.target.name] : e.target.files[0]
            })
    
            setCurrImage(e.target.files[0].name)
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }



    const createPost =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',state.title);
        formData.append('body',state.body);
        formData.append('description', state.description);
        formData.append('image',state.image);
        formData.append('id',_id);
        formData.append('name',name);
        dispatch(createAction(formData))
    }
    return (
        <>
          <Helmet>
               <title>Create Post</title>
               <meta name="description" content="Create your post" />
           </Helmet>
        <div className="container mt-100">
        <Toaster  position="top-right"
                reverseOrder={false}/>
        <form onSubmit={createPost}>
            <div className="row ml-minus-15 mr-minus-15">
                <div className="col-6 p-15">
                    <div className="card">
                        <h3 className="card__h3">Create a new Post</h3>
                        
                            <div className="group">
                                <label htmlFor="title" >Post Title</label>
                                <input type="text" name="title" id="title"
                                className="group__control"
                                value={state.title}
                                onChange={changeHandler}
                                placeholder="Post tilte.." />
                            </div>
                            <div className="group">
                                <label htmlFor="body" >Post Body</label>
                                <textarea type="text" name="body" id="body"
                                rows="6"
                                className="group__control"
                                value={state.body}
                                onChange={changeHandler}
                                placeholder="Post body..." />
                            </div>
                            <div className="group">
                                <label htmlFor="image" className="image__label">{currImage}</label>
                                <input type="file" name="image" id="image" onChange={fileHandler}
                                className="group__control"
                                 />
                            </div>
                           
                            <div className="group">
                                <input type="submit" name="" id=""
                                className="btn btn-default btn-block" value="Create post"
                                 />
                            </div>
                    </div>
                </div>
                <div className="col-6 p-15">
                    <div className="card">
                        <div className="group">
                            <div className="imagePreview">
                                {imagePreview? <img src={imagePreview} alt="" />:
                                ''}
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            </form>
        </div>
        </>
    )
}

export default Create;