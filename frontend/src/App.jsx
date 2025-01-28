import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="page-container">
      <Router>
        <Header />
        <Table />
      </Router>
    </div>
  );
}

export default App;
