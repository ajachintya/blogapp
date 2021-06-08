import {useState,useEffect} from 'react';
import '../../css/components/register.css'
import '../../css/grid.css'
import {Helmet} from 'react-helmet';
import {useDispatch,useSelector} from 'react-redux';
import {postRegister} from '../../store/asyncActions/AauthAction';
import toast,{Toaster } from 'react-hot-toast';

const Register = (props)=>{
    const [state,setState] = useState({
        name:"",
        email:"",
        password:""
    })

    const {loading , registerErrors,user} = useSelector((state)=> state.AuthReducer)
   
    const dispatch = useDispatch();
    
    const chnageHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setState((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    useEffect(()=>{
        console.log("erroes",registerErrors);
        if(registerErrors.length>0){
            registerErrors.map((curr)=>{
                toast.error(`${curr.msg}`)
            })
        }
    },[registerErrors,user])

    const userRegister =async (e)=>{
        e.preventDefault();
      dispatch(postRegister(state))
    }

    return(
        <>
         <Helmet>
               <title>User Registration</title>
               <meta name="description" content="Welcome to registration page" />
           </Helmet>
            <div className="row mt-80">
               <Toaster  position="top-right"
                reverseOrder={false}/>
                <div class="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={userRegister}>
                            <div className="group">
                                    <h3 className="form-heading">Register</h3>
                                </div>
                                <div className="group">
                                    <input type="text"
                                     name="name" 
                                     className="group__control" 
                                     placeholder="Enter Name"
                                     value={state.name}
                                     onChange={chnageHandler} />
                                </div>
                                <div className="group">
                                    <input type="email"
                                     name="email" 
                                     className="group__control" 
                                     placeholder="Enter Email"
                                     value={state.email}
                                     onChange={chnageHandler} />
                                </div>
                                <div className="group">
                                    <input type="password"
                                     name="password" 
                                     className="group__control" 
                                     placeholder="Enter Password"
                                     value={state.password}
                                     onChange={chnageHandler} />
                                </div>
                                <div className="group">
                                    <input type="submit"
                                     className="btn btn-default btn-block"
                                     value={loading?"...":"Register"}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;