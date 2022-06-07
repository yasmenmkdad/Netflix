//  React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import Login from "pages/login/Login";
import NewMovie from "pages/Movies/NewMovie";
import TableMovie from "pages/Movies/Table";
import TableUsers from "pages/Users/Table";
import TableLists from "pages/list/Table";
import NewList from "pages/list/NewList";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Table Movie",
    key: "TableMovie",
    icon: <Icon fontSize="small">movieFilterIcon</Icon>,
    route: "/TableMovie",
    component: <TableMovie />,
  },
  {
    type: "collapse",
    name: "Table Users",
    key: "TableUsers",
    icon: <Icon fontSize="small">groupIcon</Icon>,
    route: "/TableUsers",
    component: <TableUsers />,
  },
  {
    type: "collapse",
    name: "Table Lists",
    key: "TableLists",
    icon: <Icon fontSize="small">listIcon</Icon>,
    route: "/TableLists",
    component: <TableLists />,
  },
  {
    type: "collapse",
    name: "New Movie",
    key: "NewMovie",
    icon: <Icon fontSize="small">addToPhotosIcon</Icon>,
    route: "/AddMovie",
    component: <NewMovie />,
  },
  {
    type: "collapse",
    name: "New List",
    key: "NewList",
    icon: <Icon fontSize="small">addToPhotosIcon</Icon>,
    route: "/AddList",
    component: <NewList />,
  },
];

export default routes;
