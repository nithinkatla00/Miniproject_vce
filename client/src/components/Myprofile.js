import React from 'react';
import {useSelector} from 'react-redux';

function Myprofile(){
    const state = useSelector(state => state.Auth.user)
    return(
        <>
        {state!=null?(
            <div>
                <img src={state.pic} style={{width:"160px",height:"120px",borderRadius:"50%"}}/>
                <div>
                    <h5>{state.name}</h5>
                    <p>{state.email}</p>
                </div>
            </div>
        ):null}
        </>
    );
}
export default Myprofile;