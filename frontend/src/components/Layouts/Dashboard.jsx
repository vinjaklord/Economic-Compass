import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import News from '../News_Sentiment/News.jsx';
import { PositionSize } from '../Calculators/PositionSize/PositionSize.jsx';
import { CurrencyConverter } from '../Calculators/CurrencyConverter/CurrencyConverter.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const [favCalc, setFavCalc] = useState(null);
  const calcComponents = {
    posSize: PositionSize,
    currConvert: CurrencyConverter,
  };

  const DefaultCalculator = PositionSize;

  useEffect(() => {
    const storedMember = localStorage.getItem('lh_member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setFavCalc(member.favCalc || null);
    } else {
      setFavCalc(null);
    }
  }, []);

  const SelectedCalculator =
    favCalc !== null
      ? calcComponents[favCalc] || DefaultCalculator
      : DefaultCalculator;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        <div className="dashboard-table">
          <Table variant="dashboard" />
        </div>
        <div className="dashboard-right-column">
          <div className="dashboard-calculator">
            <SelectedCalculator />
          </div>
          <div className="dashboard-news">
            <News variant="dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
