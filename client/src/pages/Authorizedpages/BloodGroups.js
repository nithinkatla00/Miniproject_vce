import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const BloodGroup = () =>{
    const history = useHistory()
    const state = useSelector(state => state.Auth.user)
    const [rows,setRows]=useState([]);
    const [search,setSearch]=useState('');
    useEffect(()=>{
        fetch('http://localhost:3000/bloodgroups',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            setRows(result.users)
        })
     },[])

    const onSearch=()=>{
        fetch('http://localhost:3000/bloodgroups',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json",
            },
            body:JSON.stringify({bloodgroup:search})
        }).then(res=>res.json())
        .then(result=>{
            console.log(result.users)
            setRows(result.users)
        })
    }
 
     const classes = useStyles();

  return (
    <>
    <div class="topnav">
        <input type="search" placeholder="bloodgroup" onChange={(e)=>{e.preventDefault();setSearch(e.target.value)}} />
    </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name(Blood donors)</TableCell>
            <TableCell align="right">college</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">bloodgroup</TableCell>
            <TableCell align="right">contact details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.college}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.bloodgroup}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
export default BloodGroup;



