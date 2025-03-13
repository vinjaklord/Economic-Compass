import { useState, useEffect } from 'react';
import CalculatorCard from './CalculatorCard.jsx';
import styles from './CalculatorPage.module.css';
import useStore from '../../hooks/useStore.js';
import { fetchAPI } from '../../utils/index.js';

export default function CalculatorPage() {
  const [favoriteCard, setFavoriteCard] = useState(null);
  const { loggedInMember, raiseAlert } = useStore((state) => state);

  useEffect(() => {
    const storedMember = sessionStorage.getItem('lh_member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setFavoriteCard(member.favCalc || null);
    }
  }, []);

  const updateSessionStorage = async (newFavCalc) => {
    const updatedMember = {
      ...loggedInMember,
      favCalc: newFavCalc,
    };

    // Update sessionStorage locally
    sessionStorage.setItem('lh_member', JSON.stringify(updatedMember));

    // Sync with backend database using PATCH /members/:id
    try {
      await fetchAPI({
        method: 'patch',
        url: `/members/${loggedInMember._id}`, // Use member ID in URL
        data: {
          favCalc: newFavCalc, // Only send favCalc
        },
      });

      raiseAlert({
        severity: 'success',
        title: 'Success',
        text: 'Favorite calculator updated!',
      });
    } catch (error) {
      console.error('Failed to update database:', error);
      raiseAlert({
        severity: 'error',
        title: 'Error',
        text: 'Failed to update favorite calculator.',
      });
    }
  };

  const handleFavoriteToggle = (cardId) => {
    const newFavCalc = favoriteCard === cardId ? null : cardId;
    setFavoriteCard(newFavCalc);
    updateSessionStorage(newFavCalc);
  };

  return (
    <div className={styles.calculatorPage}>
      <div className={styles.cardWrapper}>
        <CalculatorCard
          id="posSize"
          image="/posSize.jpg"
          title="Position Size Calculator"
          description="The Position Size Calculator will calculate the required position size based on your currency pair, risk level (either in terms of percentage or money) and the stop loss in pips."
          isFavorited={favoriteCard === 'posSize'}
          onFavoriteToggle={() => handleFavoriteToggle('posSize')}
          link="/calculator/position-size"
        />
        <CalculatorCard
          id="currConvert"
          image="/currConvert.jpg"
          title="Currency Converter"
          description="Calculate currency conversion in real time with our free currency converter. Convert major or minor currencies, with accurate data from the European Central Bank."
          isFavorited={favoriteCard === 'currConvert'}
          onFavoriteToggle={() => handleFavoriteToggle('currConvert')}
          link="/calculator/currency-converter"
        />
      </div>
    </div>
  );
}
