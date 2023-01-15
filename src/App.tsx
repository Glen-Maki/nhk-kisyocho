import React from "react";
import "./App.css";
import {AppRouter} from "./router/AppRouter";
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen bg-sky-50 pt-5">
      <AppRouter >
          <ul>
              <li>
                  <Link to="/setting">Home</Link>
              </li>
              <li>
                  <Link to="/stop-timer">About</Link>
              </li>
          </ul>
      </AppRouter>
    </div>
  );
}

export default App;
