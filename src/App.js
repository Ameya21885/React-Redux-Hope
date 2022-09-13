import Login from "./Login";
import Admin from "./layouts/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./views/Dashboard/";
import Universities from "./views/Universities/";
import Colleges from "./views/Colleges/";
import Streams from "./views/Streams/";
import Courses from "./views/Courses/";
import Users from "./views/Users";
import Years from "./views/Years";
import Notifications from "./views/Notifications";
import Banners from "./views/Banners";
import Categories from "./views/Categories";
import Videos from "./views/Videos";
import Blog from "./views/Blog";


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route exact path="dashboard" element={<DashBoard />} />
              <Route path="universities" element={<Universities />} />
              <Route path="colleges" element={<Colleges />} />
              <Route path="streams" element={<Streams />} />
              <Route path="courses" element={<Courses />} />
              <Route path="users" element={<Users />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="years" element={<Years />} />
              <Route path="banners" element={<Banners />} />
              <Route path="categories" element={<Categories />} />
              <Route path="videos" element={<Videos />} />
              <Route path="blog" element={<Blog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
