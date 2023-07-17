// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider, useAuthContext } from "./auth";
import { UserAuthContextProvider, useUserAuth } from "./auth";

function Root() {
  const auth = useUserAuth();
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <App auth={auth} />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
