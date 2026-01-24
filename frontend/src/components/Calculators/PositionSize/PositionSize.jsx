/* eslint-disable react/prop-types */
import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './PositionSize.module.css';

function PositionSize({ variant = 'dashboard' }) {
  const [formData, setFormData] = useState({
    baseCurrency: 'eur',
    comparedTo: 'usd',
    accountSize: '',
    riskRatio: '',
    stopLoss: '',
    accountCurrency: 'eur',
  });

  const [result, setResult] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);

  const isFullPage = variant === 'page';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = {
      baseCurrency: formData.baseCurrency,
      comparedTo: formData.comparedTo,
      accountSize: formData.accountSize,
      riskRatio: formData.riskRatio,
      stopLoss: formData.stopLoss,
      accountCurrency: formData.accountCurrency,
    };

    try {
      const response = await fetchAPI({
        method: 'post',
        url: '/position-size',
        data: form,
      });

      setResult(response.data.lotSize);
    } catch (err) {
      console.error('Error during calculation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerClass = isFullPage
    ? styles.calculatorFormPage
    : styles.calculatorForm;

  return (
    <form onSubmit={handleSubmit}>
      <div className={containerClass}>
        <h3>Position Size Calculator</h3>

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

        <div className={styles.formGroup}>
          <label htmlFor="accountSize">Account Size:</label>
          <input
            type="number"
            name="accountSize"
            placeholder="Enter account size"
            value={formData.accountSize}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="riskRatio">Risk Ratio (%):</label>
          <input
            type="number"
            name="riskRatio"
            placeholder="Enter risk ratio"
            value={formData.riskRatio}
            onChange={handleChange}
            step="0.1"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stopLoss">Stop Loss (pips):</label>
          <input
            type="number"
            name="stopLoss"
            placeholder="Enter stop loss"
            value={formData.stopLoss}
            onChange={handleChange}
          />
        </div>

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

        {result && result !== '0.00' && (
          <div className={styles.result}>
            <h4>Lot Size:</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        <button
          type="submit"
          className={`${styles.calculateButton} ${isLoading ? styles.loading : ''}`}
          disabled={isLoading}
        >
          {isLoading ? <span className={styles.spinner}></span> : 'Calculate'}
        </button>
      </div>
    </form>
  );
}

export { PositionSize };
