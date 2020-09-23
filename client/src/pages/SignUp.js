import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
export const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [college,setCollege] = useState("")
    const [branch,setBranch] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","dmaps1tk0")
        fetch("https://api.cloudinary.com/v1_1/dmaps1tk0/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:3000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url,
                college,
                branch
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2 style={{color:"black"}}>Palisade</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
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
            <input
            type="text"
            placeholder="college Name"
            value={college}
            onChange={(e)=>setCollege(e.target.value)}
            />
            <input
            type="text"
            placeholder="Branch Name"
            value={branch}
            onChange={(e)=>setBranch(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #94c1e0 darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #94c1e0 darken-1"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/login">Already have an account ?</Link>
            </h5>
             
               
         
            
    
        </div>
      </div>
   )
}
