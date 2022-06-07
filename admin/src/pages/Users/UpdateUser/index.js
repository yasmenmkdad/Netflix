// @mui material components
import Grid from "@mui/material/Grid";
// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars";
import DataTable from "examples/Tables/DataTable";

import MDInput from "components/MDInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "context/UserContext/UserContext";
import MDButton from "components/MDButton";

// import { UpdateUser } from "context/UserContext/apiCalls";
import { useLocation } from "react-router-dom";

function UpdateUserPage() {
  const location = useLocation();
  const [User, setUser] = useState(location.state.User);
  
  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...User, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    UpdateUser(User, dispatch);
    alert("Updated");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDTypography variant="h1" color="error">
        Updated User
      </MDTypography>
      <MDBox
        mt={1}
        py={1}
        px={7}
        variant="gradient"
        bgColor="light"
        borderRadius="lg"
        coloredShadow="dark"
      >
        <Grid container spacing={2} rowSpacing={3}>
        
          <Grid item xs={4}>
            <MDTypography variant="h4" color="inherit">
              Profile image
            </MDTypography>
          </Grid>
          <Grid item xs={8}>
            <MDInput
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
              username
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput type="text" value={User?.username} placeholder="username" name="username" onChange={handleChange} />
          </Grid>

          <Grid item xs={2}>
            <MDTypography variant="h4" color="inherit">
            email
            </MDTypography>
          </Grid>
          <Grid item xs={4}>
            <MDInput type="text" value={User?.desc} placeholder="email" name="email" onChange={handleChange} />
          </Grid>
          <Grid item marginX={50}>
            <MDButton onClick={handleUpdate}>Update</MDButton>
          </Grid>
        </Grid>
      </MDBox> */}
    </DashboardLayout>
  );
}

export default UpdateUserPage;
