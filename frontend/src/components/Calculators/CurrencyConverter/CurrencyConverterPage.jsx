import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './CurrencyConverterPage.module.css'; // Import the CSS module

function CurrencyConverterPage() {
  const [formData, setFormData] = useState({
    baseCurrency: 'EUR',
    targetCurrency: 'USD',
    amount: '', // Still starts empty, but user can now input a value
  });

  const [result, setResult] = useState('0.00');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      baseCurrency: formData.baseCurrency,
      targetCurrency: formData.targetCurrency,
      amount: formData.amount,
    };

    try {
      const response = await fetchAPI({
        method: 'post',
        url: '/currency-converter',
        data: form,
      });

      setResult(response.data.convertedAmount); // Correct property
    } catch (err) {
      console.error('Error during calculation:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.currConvertForm}>
        <h3>Currency Converter</h3>

        <div className={styles.formGroup}>
          <label htmlFor="baseCurrency">Base Currency:</label>
          <select
            name="baseCurrency"
            value={formData.baseCurrency}
            onChange={handleChange}
          >
            {/* Currency options */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="targetCurrency">Target Currency:</label>
          <select
            name="targetCurrency"
            value={formData.targetCurrency}
            onChange={handleChange}
          >
            {/* Currency options */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
        </div>

        <button type="submit" className={styles.convertButton}>
          Convert
        </button>

        {result && (
          <div className={styles.result}>
            <h4>Calculation Result:</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </form>
  );
}

export { CurrencyConverterPage };
