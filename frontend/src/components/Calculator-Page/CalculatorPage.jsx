import { useState, useEffect } from 'react';
import CalculatorCard from './CalculatorCard.jsx';
import styles from './CalculatorPage.module.css';
import useStore from '../../hooks/useStore.js';
import { fetchAPI } from '../../utils/index.js';

export default function CalculatorPage() {
  const [favoriteCard, setFavoriteCard] = useState(null);

  const { loggedInMember, raiseAlert } = useStore((state) => state);

  // On component mount, check localStorage for a stored member and set the favorite calculator card
  useEffect(() => {
    const storedMember = localStorage.getItem('lh_member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setFavoriteCard(member.favCalc || null); // Set favorite calculator from localStorage
    }
  }, []); // Empty dependency array ensures this only runs on mount

  // Function to update localStorage and backend when the favorite calculator is changed
  const updatelocalStorage = async (newFavCalc) => {
    const updatedMember = {
      ...loggedInMember,
      favCalc: newFavCalc,
    };

    // Update the localStorage with the new favorite calculator
    localStorage.setItem('lh_member', JSON.stringify(updatedMember));

    try {
      await fetchAPI({
        method: 'patch',
        url: `/members/${loggedInMember._id}`,
        data: {
          favCalc: newFavCalc, // Send only the updated favorite calculator
        },
      });

      raiseAlert({
        severity: 'success',
        title: 'Success',
        text: 'Favorite calculator updated!',
      });
    } catch (error) {
      
    }
  };

  const handleFavoriteToggle = (cardId) => {
    // if card is not favorite select it if not - unselect
    const newFavCalc = favoriteCard === cardId ? null : cardId;
    setFavoriteCard(newFavCalc);
    updatelocalStorage(newFavCalc);
  };

  return (
    <div className={styles.calculatorPage}>
      <div className={styles.cardWrapper}>
        {/* Position Size*/}
        <CalculatorCard
          id="posSize"
          image="/posSize.jpg"
          title="Position Size Calculator"
          description="The Position Size Calculator will calculate the required position size based on your currency pair, risk level and the stop loss in pips."
          isFavorited={favoriteCard === 'posSize'}
          onFavoriteToggle={() => handleFavoriteToggle('posSize')}
          link="/calculator/position-size"
        />

        {/* Currency Converter */}
        <CalculatorCard
          id="currConvert"
          image="/currConvert.jpg"
          title="Currency Converter"
          description="Calculate currency conversion in real time with our free currency converter. Convert major or minor currencies, with accurate data from the European Central Bank."
          isFavorited={favoriteCard === 'currConvert'}
          onFavoriteToggle={() => handleFavoriteToggle('currConvert')}
          link="/calculator/currency-converter"
        />

        {/* Leverage Calculator Card (Coming Soon) */}
        <CalculatorCard
          id="levCalc"
          image="/comingSoon.jpg"
          title="Leverage Calculator"
          description="The leverage calculator will calculate the required leverage to open your trading position based on your account currency, the traded currency pair and trade size."

          // isFavorited={favoriteCard === 'levCalc'}
          // onFavoriteToggle={() => handleFavoriteToggle('levCalc')}
          // link="/calculator/position-size"
        />

        {/* Profit Calculator Card (Coming Soon) */}
        <CalculatorCard
          id="profitCalc"
          image="/comingSoon.jpg"
          title="Profit Calculator"
          description="Use our Profit Calculator to calculate your expected profit or loss in money and pips based on your entry and exit prices, lot size and trade direction."

          // isFavorited={favoriteCard === 'profitCalc'}
          // onFavoriteToggle={() => handleFavoriteToggle('profitCalc')}
          // link="/calculator/currency-converter"
        />
      </div>
    </div>
  );
}
