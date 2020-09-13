import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
    console.log(props)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (item)=>(
    <div style={modalStyle} className={classes.paper}>
    {
        item.comments.map(record=>{
        return(
            <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
        )
        })
    }
    <form onSubmit={(e)=>{
        e.preventDefault()
        props.makeComment(e.target[0].value,item._id)
        e.target[0].value=''
    }}>
        <input type="text" placeholder="add a comment" />  
    </form>
    </div>
  );

  return (
    <div>
      <ChatBubbleOutlineIcon onClick={handleOpen} style={{cursor:"pointer",marginLeft:"15px"}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body(props.item)}
      </Modal>
    </div>
  );
}
