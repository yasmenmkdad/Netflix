import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

//  React context
import { useMaterialUIController, setOpenConfigurator, setDarkMode } from "context/UIContext";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handleDarkMode = () => setDarkMode(dispatch, 1);
  const handleLightMode = () => setDarkMode(dispatch, 0);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Setting</MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Change Theme</MDTypography>
          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkMode}
              disabled={disabled}
              fullWidth
            >
              Dark
            </MDButton>
            <MDBox sx={{ mx: 1, width: "2rem", minWidth: "2rem" }} />
            <MDButton
              color="light"
              variant="gradient"
              onClick={handleLightMode}
              disabled={disabled}
              fullWidth
            >
              Light
            </MDButton>
          </MDBox>
        </MDBox>

        <Divider />
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
