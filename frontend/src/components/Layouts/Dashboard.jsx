import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import News from '../News_Sentiment/News.jsx';
import { PositionSize } from '../Calculators/PositionSize/PositionSize.jsx';
import { CurrencyConverter } from '../Calculators/CurrencyConverter/CurrencyConverter.jsx';

const Dashboard = () => {
  const [favCalc, setFavCalc] = useState(null);
  const calcComponents = {
    posSize: PositionSize,
    currConvert: CurrencyConverter,
  };

  const DefaultCalculator = PositionSize;

  // Load favCalc from sessionStorage when logged in, otherwise use default sjnfdkngkjdfnglsdfgnjsnfgskgnlsnjgs
  useEffect(() => {
    const storedMember = sessionStorage.getItem('lh_member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setFavCalc(member.favCalc || null);
    } else {
      setFavCalc(null);
    }
  }, []);

  // Select the calculator: use favCalc if set (logged in), otherwise DefaultCalculator
  const SelectedCalculator =
    favCalc !== null
      ? calcComponents[favCalc] || DefaultCalculator
      : DefaultCalculator;

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
          gridTemplateColumns: '55% 45%',
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
          <SelectedCalculator />
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
