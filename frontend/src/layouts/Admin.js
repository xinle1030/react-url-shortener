import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import CreateForm from "views/admin/CreateForm.js";
import Report from "views/admin/Report.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Switch>
          <Route path="/home" exact component={CreateForm} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/:urlId" exact component={Report} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </>
  );
}
