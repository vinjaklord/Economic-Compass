import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './PositionSize.module.css';

function PositionSize() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    baseCurrency: 'eur',
    comparedTo: 'usd',
    accountSize: '',
    riskRatio: '',
    stopLoss: '',
    accountCurrency: 'eur',
  });

  // State to store the calculated position size result
  const [result, setResult] = useState('0.00');

  // Handles input field changes and updates the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  // Handles form submission and fetches position size calculation
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare the form data object to send in the API request
    const form = {
      baseCurrency: formData.baseCurrency,
      comparedTo: formData.comparedTo,
      accountSize: formData.accountSize,
      riskRatio: formData.riskRatio,
      stopLoss: formData.stopLoss,
      accountCurrency: formData.accountCurrency,
    };

    try {
      // Make an API request to calculate the position size
      const response = await fetchAPI({
        method: 'post',
        url: '/position-size',
        data: form,
      });

      // Update the state with the calculated lot size
      setResult(response.data.lotSize);
    } catch (err) {
      console.error('Error during calculation:', err); // Log any errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.calculatorForm}>
        <h3>Position Size Calculator</h3>

        {/* Base Currency Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="baseCurrency">Base Currency:</label>
          <select
            name="baseCurrency"
            value={formData.baseCurrency}
            onChange={handleChange}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
            <option value="aud">AUD</option>
            <option value="cad">CAD</option>
            <option value="chf">CHF</option>
            <option value="nzd">NZD</option>
            <option value="cny">CNY</option>
            <option value="inr">INR</option>
            <option value="krw">KRW</option>
            <option value="mnx">MXN</option>
            <option value="brl">BRL</option>
            <option value="rub">RUB</option>
            <option value="sgd">SGD</option>
            <option value="hkd">HKD</option>
            <option value="zar">ZAR</option>
            <option value="try">TRY</option>
            <option value="nok">NOK</option>
            <option value="sek">SEK</option>
          </select>
        </div>

        {/* Compared To Currency Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="comparedTo">Compared To:</label>
          <select
            name="comparedTo"
            value={formData.comparedTo}
            onChange={handleChange}
          >
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
            <option value="aud">AUD</option>
            <option value="cad">CAD</option>
            <option value="chf">CHF</option>
            <option value="nzd">NZD</option>
            <option value="cny">CNY</option>
            <option value="inr">INR</option>
            <option value="krw">KRW</option>
            <option value="mnx">MXN</option>
            <option value="brl">BRL</option>
            <option value="rub">RUB</option>
            <option value="sgd">SGD</option>
            <option value="hkd">HKD</option>
            <option value="zar">ZAR</option>
            <option value="try">TRY</option>
            <option value="nok">NOK</option>
            <option value="sek">SEK</option>
          </select>
        </div>

        {/* Account Size Input */}
        <div className={styles.formGroup}>
          <label htmlFor="accountSize">Account Size:</label>
          <input
            type="number"
            name="accountSize"
            placeholder="Enter Account Size"
            value={formData.accountSize}
            onChange={handleChange}
          />
        </div>

        {/* Risk Ratio Input */}
        <div className={styles.formGroup}>
          <label htmlFor="riskRatio">Risk Ratio (%):</label>
          <input
            type="number"
            name="riskRatio"
            placeholder="Enter Risk Ratio (%)"
            value={formData.riskRatio}
            onChange={handleChange}
          />
        </div>

        {/* Stop Loss Input */}
        <div className={styles.formGroup}>
          <label htmlFor="stopLoss">Stop Loss (pips):</label>
          <input
            type="number"
            name="stopLoss"
            placeholder="Enter Stop Loss (pips)"
            value={formData.stopLoss}
            onChange={handleChange}
          />
        </div>

        {/* Account Currency Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="accountCurrency">Account Currency:</label>
          <select
            name="accountCurrency"
            value={formData.accountCurrency}
            onChange={handleChange}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
            <option value="aud">AUD</option>
            <option value="cad">CAD</option>
            <option value="chf">CHF</option>
            <option value="nzd">NZD</option>
            <option value="cny">CNY</option>
            <option value="inr">INR</option>
            <option value="krw">KRW</option>
            <option value="mnx">MXN</option>
            <option value="brl">BRL</option>
            <option value="rub">RUB</option>
            <option value="sgd">SGD</option>
            <option value="hkd">HKD</option>
            <option value="zar">ZAR</option>
            <option value="try">TRY</option>
            <option value="nok">NOK</option>
            <option value="sek">SEK</option>
          </select>
        </div>

        {/* Display the calculated lot size */}
        {result && (
          <div className={styles.result}>
            <h4>Lot Size:</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.calculateButton}>
          Calculate
        </button>
      </div>
    </form>
  );
}

export { PositionSize };
