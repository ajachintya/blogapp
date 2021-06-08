import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {postLogin} from '../../store/asyncActions/AauthAction'
import '../../css/components/register.css'
import '../../css/grid.css'
import {Helmet} from 'react-helmet';
import toast,{Toaster } from 'react-hot-toast';
const Login = ()=>{
    const [loginState,setLoginState] = useState({
        email:'',
        password:''
    })
    const {loading , loginErrors,user} = useSelector((state)=> state.AuthReducer)
    const dispatch = useDispatch();
    const chnageHandler = (e)=>{
        setLoginState({
            ...loginState,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        console.log("erroes",loginErrors);
        if(loginErrors.length>0){
            loginErrors.map((curr)=>{
                console.log(curr.msg)
                toast.error(`${curr.msg}`)
            })
        }
    }, [loginErrors])
    

    const loginHandler= async (e)=>{
        e.preventDefault(); 
       dispatch(postLogin(loginState));
    }
    return(
        <>
         <Helmet>
               <title>User Login</title>
               <meta name="description" content="Welcome to login page" />
           </Helmet>
            <div className="row mt-80">
            <Toaster  position="top-right"
                reverseOrder={false}/>
                <div class="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={loginHandler}>
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                </div>
                                <div className="group">
                                    <input type="email"
                                     name="email" 
                                     className="group__control" 
                                     placeholder="Enter Email" 
                                     value={loginState.email}
                                         onChange={chnageHandler}
                                     />
                                </div>
                                <div className="group">
                                    <input type="password"
                                     name="password" 
                                     className="group__control" 
                                     placeholder="Enter Password"
                                     value={loginState.password}
                                     onChange={chnageHandler} />
                                </div>
                                <div className="group">
                                    <input type="submit"
                                     className="btn btn-default btn-block"
                                     value={loading?"...":"Login"} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;