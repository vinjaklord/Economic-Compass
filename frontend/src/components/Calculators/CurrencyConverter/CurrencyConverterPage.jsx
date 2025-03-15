import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './CurrencyConverterPage.module.css';

// Same logic as the CurrencyConverter.jsx
function CurrencyConverterPage() {
  const [formData, setFormData] = useState({
    baseCurrency: 'EUR',
    targetCurrency: 'USD',
    amount: '',
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

      setResult(response.data.convertedAmount);
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
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="BGN">BGN</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HUF">HUF</option>
            <option value="PLN">PLN</option>
            <option value="RON">RON</option>
            <option value="SEK">SEK</option>
            <option value="CHF">CHF</option>
            <option value="ISK">ISK</option>
            <option value="NOK">NOK</option>
            <option value="TRY">TRY</option>
            <option value="AUD">AUD</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CNY">CNY</option>
            <option value="HKD">HKD</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NZD">NZD</option>
            <option value="PHP">PHP</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="ZAR">ZAR</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="targetCurrency">Target Currency:</label>
          <select
            name="targetCurrency"
            value={formData.targetCurrency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="BGN">BGN</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HUF">HUF</option>
            <option value="PLN">PLN</option>
            <option value="RON">RON</option>
            <option value="SEK">SEK</option>
            <option value="CHF">CHF</option>
            <option value="ISK">ISK</option>
            <option value="NOK">NOK</option>
            <option value="TRY">TRY</option>
            <option value="AUD">AUD</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CNY">CNY</option>
            <option value="HKD">HKD</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
            <option value="MXN">MXN</option>
            <option value="MYR">MYR</option>
            <option value="NZD">NZD</option>
            <option value="PHP">PHP</option>
            <option value="SGD">SGD</option>
            <option value="THB">THB</option>
            <option value="ZAR">ZAR</option>
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
