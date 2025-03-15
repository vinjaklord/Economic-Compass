import { useState } from 'react';
import { fetchAPI } from '../../../utils';
import styles from './PositionSizePage.module.css';
// Same logic as PositionSize.jsx
function PositionSizePage() {
  const [formData, setFormData] = useState({
    baseCurrency: 'eur',
    comparedTo: 'usd',
    accountSize: '',
    riskRatio: '',
    stopLoss: '',
    accountCurrency: 'eur',
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.calculatorForm}>
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
            type="text"
            name="accountSize"
            placeholder="Account Size"
            value={formData.accountSize}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="riskRatio">Risk Ratio (%):</label>
          <input
            type="text"
            name="riskRatio"
            placeholder="Risk Ratio (%)"
            value={formData.riskRatio}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stopLoss">Stop Loss (pips):</label>
          <input
            type="text"
            name="stopLoss"
            placeholder="Stop Loss (pips)"
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

        {result && (
          <div className={styles.result}>
            <h4>Lot Size:</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        <button type="submit" className={styles.calculateButton}>
          Calculate
        </button>
      </div>
    </form>
  );
}

export { PositionSizePage };
