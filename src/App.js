import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme/Darktheme";
import Navbar from "./Page/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Auth from "./Page/Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import { fetchTasks } from "./ReduxToolkit/TaskSlice";

function App() {

  const dispatch = useDispatch();
  const { task,auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")))
  }, [auth.jwt]);
  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;
