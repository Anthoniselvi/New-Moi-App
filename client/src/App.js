import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./pages/Sidebar/Sidebar";
import { useUserAuth } from "./auth";
import EventsPage from "./pages/Events/EventsPage";
import CreateEvent from "./pages/Events/CreateEvent";
import Profile from "./pages/Profile/Profile";
import SingleEventPage from "./pages/Events/SingleEventPage";

function App() {
  const auth = useUserAuth();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    console.log("Auth-User useEffect : " + JSON.stringify(auth.user));
  }, [auth.user]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* {auth.user ? <Sidebar /> : null} */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              {auth.user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/eventslist" element={<EventsPage />} />
                  <Route path="/newevent" element={<CreateEvent />} />
                  <Route path="/eventpage" element={<SingleEventPage />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
