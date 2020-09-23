import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import CreateIcon from '@material-ui/icons/Create'

const Profile  = ()=>{
    const dispatch = useDispatch();
    const [mypics,setPics] = useState([])
    const state = useSelector(state => state.Auth.user)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('http://localhost:3000/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","cnq")
        fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('http://localhost:3000/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    const deletePost = (postid)=>{
        fetch(`http://localhost:3000/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = mypics.filter(item=>{
                return item._id !== result._id
            })
            setPics(newData)
        })
    }
   return (
       <div style={{maxWidth:"600px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
            <div style={{color:"black",fontSize:"15px",display:"flex",flexDirection:"row",paddingLeft:"5px",justifyContent:"center"}}>
                <h6>college:{state?state.college:"loading"}</h6>
                <h6 style={{paddingLeft:"10px"}}>branch:{state?state.branch:"loading"}</h6>
                <Link to="/updateinfo"><CreateIcon style={{marginLeft:"10px",cursor:"pointer"}}/></Link>
            </div>
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
            <div className="home">
           {
               mypics.map(item=>{
                   return(
                       <>
                       <h5 style={{marginLeft:"300px",color:"red",cursor:"pointer"}} onClick={()=>deletePost(item._id)}>delete</h5>
                       <div className="card home-card" key={item._id}>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                        </div> 
                        </>
                   )
               })
           }   
          
       </div>
       </div>
   )
}


export default Profile
