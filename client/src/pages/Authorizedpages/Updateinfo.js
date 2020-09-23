import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import M from 'materialize-css'
const BloodGroup = () =>{
    const dispatch = useDispatch();
    const history = useHistory()
    const state = useSelector(state => state.Auth.user)
    const [username,setName] = useState(state.name)
    const [number,setNumber] = useState(state.number)
    const [bloodgroup,setBloodgroup] = useState(state.bloodgroup)
    const [interests,setInterests] = useState(state.interests)
    const [donatingblood,setDonatingblood] = useState(state.donatingblood)
    const [experience,setExperience] = useState(state.experience)
    const [currentsem,setCurrentsem] = useState(state.currentsem)
    const updateFields = ()=>{
        if(!username ||!number||!bloodgroup||!interests||!donatingblood){
            M.toast({html: "fill all details",classes:"#c62828 red darken-3"})
        }
        else{
        fetch("http://localhost:3000/updatedetails",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                username,
                bloodgroup,
                interests,
                donatingblood,
                experience,
                currentsem, 
                number
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
                dispatch({type:"UPDATEINFO",payload:{name:username,bloodgroup,interests,donatingblood,experience,currentsem,number}})
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/profile')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    }

    return(
        <div className="row" style={{width:"50%",marginTop:"30px"}}>
            <div className="row">
                <div className="input-field col s6">
                <input id="username" type="text" className="validate" onChange={(e)=>{e.preventDefault();setName(e.target.value)}} />
                <label for="username">User name</label>
                </div>
                <div className="input-field col s4">
                <input id="bloodgroup" type="text" className="validate" onChange={(e)=>{e.preventDefault();setBloodgroup(e.target.value)}} />
                <label for="bloodgroup">bloodgroup</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                <input id="interests" type="text" className="validate" onChange={(e)=>{e.preventDefault();setInterests(e.target.value.split(','))}} />
                <label for="interests">interests</label>
                </div>
                <div className="input-field col s6">
                <input id="experiences" type="text" className="validate" onChange={(e)=>{e.preventDefault();setExperience(e.target.value.split(','))}} />
                <label for="experiences">experiences</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s2">
                <input  id="currentsem" type="text" className="validate" onChange={(e)=>{e.preventDefault();setCurrentsem(e.target.value)}}/>
                <label for="currentsem">passing year</label>
                </div>
                <div className="input-field col s3">
                    <input id="donatingblood" type="text" className="validate" onChange={(e)=>{e.preventDefault();setDonatingblood(e.target.value)}} />
                    <label for="donatingblood">donate blood</label>
                </div>
                <div className="input-field col s6">
                    <input id="mobilenumber" type="tel" placeholder="mobile number" className="validate" onChange={(e)=>{e.preventDefault();setNumber(e.target.value)}} />
                </div>
            </div>
            <button className="btn waves-effect waves-light #94c1e0 darken-1" onClick={()=>updateFields()}>
            update info
            </button>
        </div>
    )
}
export default BloodGroup;