import Table from '../Table/Table';
import News from '../News_Sentiment/News'; // Your News component
import { PositionSize } from '../Calculators/PositionSize'; // Your PositionSize component

const Dashboard = () => {
  return (
    <div
      className="page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div
        className="dashboard-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '30px',
        }}
      >
        <div className="table-container" style={{ flex: '0 0 65%' }}>
          <Table />
        </div>
        <div className="news-container" style={{ flex: '0 0 45%' }}>
          <News />
        </div>
      </div>
      <div className="position-size-wrapper">
        <PositionSize />
      </div>
    </div>
  );
};

export default Dashboard;
