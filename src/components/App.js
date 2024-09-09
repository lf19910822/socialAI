import React, { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    // localstorage中是否存在token？
    localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };


  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  return (
    // 此处main只是route handling
    <div className="App">
      <ResponsiveAppBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
