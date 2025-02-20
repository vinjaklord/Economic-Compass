import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import News from "./components/News_Sentiment/News";
import { PositionSize } from "./components/Calculators/PositionSize";

function App() {
  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Router>
        <Header />
        <div className="dashboard-container" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "30px" }}>
          <div className="table-container" style={{ flex: "0 0 65%" }}>
            <Table />
          </div>
          <div className="news-container" style={{ flex: "0 0 45%" }}>
            <News />
          </div>
        </div>

        {/* Wrapper for PositionSize component */}
        <div className="position-size-wrapper">
          <PositionSize />
        </div>
      </Router>
    </div>
  );
}

export default App;
