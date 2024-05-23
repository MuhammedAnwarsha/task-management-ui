import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, Button } from "@mui/material";
import CreateNewTaskForm from "../Task/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../ReduxToolkit/AuthSlice";

const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "Done", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "Assigned", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "Not Assigned", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "Notification", role: ["ROLE_CUSTOMER"] },
];
const role = "ROLE_ADMIN";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("Home");

  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };
  const handleOpenCreateTaskModel = () => {
    setOpenCreateTaskForm(true);
  };

  const handleMenuChange = (item) => {
    const updatedParams=new URLSearchParams(location.search);

    if (item.name == "Create New Task") {
      handleOpenCreateTaskModel();
    }else if(item.name=="Home"){
      updatedParams.delete("filter")
      const queryString = updatedParams.toString();
      const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
      navigate(updatedPath);
    }else{
      updatedParams.set("filter",item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    }
    setActiveMenu(item.name);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="card min-h-[85vh] flex flex-col justify-center fixed  w-[20vw]">
        <div className="space-y-2 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "6rem", height: "6rem" }}
              className="border-2 border-[#c24dd0]"
              src="https://img.freepik.com/free-vector/time-management-marketers-teamwork-media-planning-media-representation-control-reach-your-client-best-media-plan_335657-23.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715126400&semt=ais_user"
            />
          </div>
          {menu
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <p
                onClick={() => handleMenuChange(item)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}
          <Button
            onClick={handleLogout}
            sx={{ padding: ".7rem", borderRadius: "2rem" }}
            fullWidth
            className="logoutButton"
          >
            Logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default Sidebar;
