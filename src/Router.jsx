import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Welcome from "./routes/Welcome";
import Register from "./routes/Register";
import Privacy from "./routes/Privacy";
import Terms from "./routes/Terms";
import Login from "./routes/Login";

function PageRouter() {
  return (
    <div
      className="w-screen overflow-hidden text-text-color-theme h-screen"
      style={{
        backgroundImage: "url('/assets/images/background.png')",
        backgroundRepeat: true,
      }}
    >
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/toc" component={Terms} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
    </div>
  );
}

export default PageRouter;
