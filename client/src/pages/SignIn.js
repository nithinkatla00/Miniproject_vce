import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import * as authLogin from '../store/actions/authactions'
export const SignIn  = ()=>{
    const state= useSelector(state => state.Auth)!=null?true:false;
    const dispatch=useDispatch()
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        dispatch(authLogin.login(email,password))
        if(state){
        history.push('/posts')
        }

    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2 style={{color:"black"}}>Palisade</h2>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #94c1e0 darken-1"
            onClick={()=>PostData()}
            >
                Login
            </button>
            <h5>
                <Link to="/signup">Dont have an account ?</Link>
            </h5>
    
        </div>
      </div>
   )
}

