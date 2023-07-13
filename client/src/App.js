import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Header from "./components/Home/Header/Header";
import { ColorModeContext } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";

function App() {
  // const [theme, colorMode] = useMode();
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />

    <div className="app">
      {/* <Header />/ */}
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
    </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
