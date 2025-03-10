import Table from '../Table/Table';
import News from '../News_Sentiment/News.jsx';
import { PositionSize } from '../Calculators/PositionSize';

const Dashboard = () => {
  return (
    <div
      className="page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <div
        className="dashboard-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '55% 45%', // Still works with wider elements
          gridTemplateRows: 'auto 1fr',
          gap: '20px',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="calculator-container"
          style={{
            gridColumn: '2 / 3',
            gridRow: '1 / 2',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <PositionSize />
        </div>
        <div
          className="table-container"
          style={{
            gridColumn: '1 / 2',
            gridRow: '1 / 3',
          }}
        >
          <Table />
        </div>
        <div
          className="news-container"
          style={{
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
          }}
        >
          <News />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
