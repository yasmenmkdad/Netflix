// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

//  React components
import MDBox from "components/MDBox";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars";
import ProfileInfoCard from "examples/Cards/InfoCards";

// Overview page components
import Header from "layouts/profile/Header";

function Overview() {
  var currentAdmin = localStorage.getItem("user");
  // console.log(currentAdmin.username)
  // console.log(currentAdmin["username"])
  currentAdmin = currentAdmin.replace(/"/g, "");
  currentAdmin = currentAdmin.replace(/'/g, "");
  currentAdmin = currentAdmin.replace(/{/g, "");
  currentAdmin = currentAdmin.replace(/}/g, "");
  var PropCurrentAdmin = currentAdmin.toString().split(",");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container>
            <Grid item xs={12} md={6} xl={8} sx={{ display: "flex" }}>
              <ProfileInfoCard
                title="profile information"
                description=""
                info={{
                  fullName: PropCurrentAdmin[2].split(":")[1],
                  email: PropCurrentAdmin[3].split(":")[1],
                  StartJob: PropCurrentAdmin[5].split(":")[1],
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              {/* <ProfilesList title="conversations" profiles={profilesListData} shadow={false} /> */}
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
