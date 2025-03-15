import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './CurrencyConverter.module.css'; // Import the CSS module for styling

function CurrencyConverter() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    baseCurrency: 'EUR', // Default base currency
    targetCurrency: 'USD', // Default target currency
    amount: '', // User can input an amount
  });

  // State to store the conversion result
  const [result, setResult] = useState('0.00');

  // Handles input field changes and updates the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  // Handles form submission and fetches conversion data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare the form data object
    const form = {
      baseCurrency: formData.baseCurrency,
      targetCurrency: formData.targetCurrency,
      amount: formData.amount,
    };

    try {
      // Make an API request to convert the currency
      const response = await fetchAPI({
        method: 'post',
        url: '/currency-converter',
        data: form,
      });

      // Update the state with the conversion result
      setResult(response.data.convertedAmount);
    } catch (err) {
      console.error('Error during calculation:', err); // Log any errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.currConvertForm}>
        <h3>Currency Converter</h3>

        {/* Base Currency Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="baseCurrency">Base Currency:</label>
          <select
            name="baseCurrency"
            value={formData.baseCurrency}
            onChange={handleChange}
          >
            {/* Currency options */}
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

        {/* Target Currency Selection */}
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

        {/* Amount Input */}
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

        {/* Submit Button */}
        <button type="submit" className={styles.convertButton}>
          Convert
        </button>

        {/* Display the conversion result */}
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

export { CurrencyConverter };
