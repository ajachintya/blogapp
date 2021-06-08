import React,{useState,useEffect} from 'react'
import {Helmet} from 'react-helmet';
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {updateImage} from '../store/asyncActions/PostActions'
import toast,{Toaster } from 'react-hot-toast';
import {RESET_UPDATE_IMAGE_ERROR} from '../store/types/postTypes'
import '../css/grid.css'
import '../css/components/create.css'
import '../css/components/register.css';


const EditImage = () => {
    const {id} = useParams();
    const [state,setState] = useState({
        image:'',
        imageName:'Choose Image',
        imagePreview:''
    });
    const history = useHistory();
    const {redirect,msg} = useSelector((state)=> state.PostReducer)
    const {editImageError} = useSelector((state)=>state.updateImage);


    const dispatch = useDispatch();
    useEffect(()=>{
        if(redirect){
            history.push('/dashboard');
        }
    },[redirect])

    useEffect(()=>{
        if(editImageError.length>0){
            editImageError.map((curr)=>{
                // console.log(curr.msg)
                toast.error(`${curr.msg}`)
            })
            dispatch({type:RESET_UPDATE_IMAGE_ERROR})
        }
    },[editImageError]);

    const fileHandler = (e)=>{
        if(e.target.files.length !== 0){
            
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setState({
                    ...state,
                    imagePreview:reader.result, 
                    imageName:e.target.files[0].name,
                    image:e.target.files[0]
                })
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const updateImages = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('id',id);
        formData.append('image',state.image);
        dispatch(updateImage(formData));
    }


    return (
        <div className="mt-100">
        <Helmet>
        <title>Edit image</title>
        <meta name="description" content="Update image" />
        </Helmet>
        <div className="container">
        <Toaster  position="top-right"
                reverseOrder={false}/>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                    <h3 className="card__h3">Update Image</h3>
                    <form onSubmit={updateImages}>
                    <div className="group">
                                <label htmlFor="image" className="image__label">{state.imageName}</label>
                                <input type="file" name="image" id="image" onChange={fileHandler}
                                className="group__control"
                                 />
                            </div>
                            <div className="group">
                            <div className="imagePreview">
                                {state.imagePreview? <img src={state.imagePreview} alt="" />:
                                ''}
                            </div>
                        </div>
                        <div className="group">
                                <input type="submit" name="" id=""
                                className="btn btn-default btn-block" value="Update image"
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

export default EditImage