import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserList } from "../../ReduxToolkit/AuthSlice";
import { assignedTaskToUser } from "../../ReduxToolkit/TaskSlice";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 2,
};

export default function UserList({ handleClose, open }) {
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId=queryParams.get("taskId")
  useEffect((item)=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
  },[])
  const handleAssignedTask = (user) =>{
    dispatch(assignedTaskToUser({userId:user.id,taskId:taskId}))
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth.users?.map((item,index) => (
            <>
              <div className="flex items-center justify-between w-full">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src="https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_1280.jpg" />
                    </ListItemAvatar>
                    <ListItemText secondary={item.email} primary={item.fullName} />
                  </ListItem>
                </div>
                <div>
                  <Button onClick={()=>handleAssignedTask(item)} className="customeButton">Select</Button>
                </div>
              </div>
              {index!==auth.users?.length-1 && <Divider variant="inset"/>}
            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
