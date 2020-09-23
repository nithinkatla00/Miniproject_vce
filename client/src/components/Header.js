import React, { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import { Link,useHistory } from "react-router-dom";
import Toolbar from "../pages/Toolbar";
import Myprofile from "./Myprofile";
import * as authLogin from "../store/actions/authactions"
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const Header = () => {
  const dispatch=useDispatch()
  const history=useHistory();
  const auth = useSelector(state => state.Auth.user)!=null?true:false;
  const logoutUser=()=>{
    dispatch(authLogin.logout());
    history.push('/')
  }
  useEffect(()=>{
    const M = window.M;
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {draggable:true,edge:"left"});
    },[]);
  })
  return (
    <div>
    <nav style={{lineHeight: "unset"}}>
    <div className="nav-wrapper" style={{ backgroundColor: "#e3f2fd" }}>
    <a href="#" data-target="slide-out" className="sidenav-trigger"><i class="material-icons">menu</i></a>
      <Link to="/" className="brand-logo">Palisade</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {auth ? (
              <>
                <li>
                  <Link to="/posts">
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/followingposts">
                    Followingposts
                  </Link>
                </li>
                <li>
                  <Link to="/createpost">
                    UploadPost
                  </Link>
                </li>
                <li style={{marginTop:"5px"}}>
                  <Link to="/join">
                    <QuestionAnswerIcon fontSize="large" color="action"/>
                  </Link>
                </li>
                <li> 
                  <Toolbar />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    LogIn
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
      </ul>
    </div>
  </nav>
  <ul id="slide-out" className="sidenav" style={{ backgroundColor: "#e3f2fd" }}>
    {auth ? (
              <div style={{marginTop:"20px"}}>
                <li><div className="user-view">
                  <Myprofile />
                </div></li>
                <li><div className="divider"></div></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/followingposts">
                    Followingposts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createpost">
                    UploadPost
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blooddonor">
                    Blood donors
                  </Link>
                </li>
                <li>
                  <Link to="/join">
                    <QuestionAnswerIcon fontSize="large" color="action"/>chat
                  </Link>
                </li>
                <li className="nav-item">
                  <button class="btn waves-effect waves-light" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <div style={{marginTop:"20px"}}>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    LogIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </div>
            )}
  </ul>
  </div>
  );
}

  
export default Header;
