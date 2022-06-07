// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars";
import DataTable from "examples/Tables/DataTable";

// Data
import { UserContext } from "context/UserContext/UserContext";
import { useContext, useEffect } from "react";
import { deleteUser, getUsers } from "context/UserContext/apiCalls";

import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function TableUsers() {
  const { Users, dispatch } = useContext(UserContext);
  // console.log(dispatch);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    alert("deleted");
  };

  // The Violation Feature 
  const userViolating = Users[getRandomInt(0, Users.length)]
  console.log(userViolating)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); 
}
  const notify =() =>{
    toast.error(`User @${userViolating.username} has violated our Terms and Policies!`, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
      });
  }
  
  useEffect( () => { setTimeout(() =>{
    notify()
  },3000)}, [])


  const UserTitle = ({ image, name, color }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" color= {color}>
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "username", accessor: "username", width: "20%", align: "left" },
    { Header: "email", accessor: "email", width: "30%", align: "left" },
    { Header: "createdAt", accessor: "createdAt", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  let rows = Users.map((item) => {
    if (item !== userViolating)
        return {
        username: <UserTitle image={item.profilePic} name={item.username} color="text" />,
        email: (
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {item.email}
          </MDTypography>
        ),
        createdAt: (
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {item.createdAt}
          </MDTypography>
        ),
        action: (
          <MDBox lineHeight={1} textAlign="left">
          {/* <Link to={"/User/" + item._id} state={{ List: item}}>
            <MDButton>
              <Icon color="info">edit</Icon>
            </MDButton>
          </Link> */}
          <MDButton onClick={() => handleDelete(item._id)}>
            <Icon color="text">deleteIcon</Icon>
          </MDButton>
        </MDBox>
        )
      };
      else return {
        username: <UserTitle image={item.profilePic} name={item.username} color="error" />,
      email: (
        <MDTypography display="block" variant="caption" color="error" fontWeight="medium">
          {item.email}
        </MDTypography>
      ),
      createdAt: (
        <MDTypography display="block" variant="caption" color="error" fontWeight="medium">
          {item.createdAt}
        </MDTypography>
      ),
      action: (
        <MDBox lineHeight={1} textAlign="left">
        {/* <Link to={"/User/" + item._id} state={{ List: item}}>
          <MDButton>
            <Icon color="info">edit</Icon>
          </MDButton>
        </Link> */}
        <MDButton onClick={() => handleDelete(item._id)}>
          <Icon color="error">deleteIcon</Icon>
        </MDButton>
      </MDBox>
      )
    };
  });

  return (
    <DashboardLayout>
       <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        />
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TableUsers;
