---
title: "Aura Black Edition"
description: "A high-frequency scalping strategy with a 78% win rate but a 1:2 risk-reward ratio, exposing users to significant tail risk despite low maximum drawdown."
platform: "MQL5"
monthlyReturn: "+4.2%"
maxDrawdown: "-15.4%"
subscribers: 4500
riskLevel: "High"
winRate: "undefined"
publishedAt: 2026-05-31
---

## Strategy Mechanics

- **Entry Logic**: Uses a combination of RSI divergence and Bollinger Band squeezes on the M15 timeframe. Entries are triggered when RSI(14) crosses above 30 (long) or below 70 (short) with a band width contraction below 0.0010.
- **Exit Logic**: Fixed take-profit at 20 pips, stop-loss at 40 pips. No trailing stop or break-even management.
- **Trade Frequency**: Averages 12 trades per day, with peak activity during London-New York overlap.
- **Risk per Trade**: Fixed 0.5% account equity per trade, but due to high frequency, daily exposure can exceed 6%.

## Drawdown Analysis

- **Historical Max Drawdown**: -15.4% occurred during a 3-day period in March 2023 when EUR/USD experienced a 200-pip gap due to a surprise ECB rate decision.
- **Recovery Time**: 47 trading days to recover from the max drawdown, indicating a slow recovery profile typical of high-frequency strategies.
- **Drawdown Duration**: Average drawdown period is 12 days, with 90% of drawdowns lasting less than 20 days. However, the tail risk is significant: the 99th percentile drawdown duration is 60 days.
- **Correlation with Volatility**: Drawdowns are strongly correlated (R²=0.78) with spikes in the VIX index above 25. During low-volatility regimes, the strategy performs well.

## Risk Warnings

- **No Martingale or Grid**: The strategy uses fixed lot sizes and does not employ martingale or grid systems. However, the high frequency and fixed stop-loss create a negative expectancy when accounting for slippage and commission.
- **Survivorship Bias**: The signal has only been active for 14 months. Backtested results show a 95% win rate, but live performance is 78%. The discrepancy suggests overfitting to historical data.
- **Tail Risk**: The 1:2 risk-reward ratio means that a series of losses can quickly erode gains. Monte Carlo simulation shows a 5% probability of a 30% drawdown over a 6-month period.
- **Slippage Sensitivity**: With an average trade duration of 4 minutes, slippage of 1 pip reduces net profit by 15%. During high-impact news, slippage can exceed 5 pips, turning profitable trades into losses.
- **Regulatory Risk**: The strategy relies on high leverage (1:30 or higher). Any regulatory changes limiting leverage could render the strategy unprofitable.

## Performance Metrics

- **Sharpe Ratio**: 0.9 (below the 1.0 threshold for attractive risk-adjusted returns)
- **Profit Factor**: 1.35 (low for a high-frequency strategy; typically >1.5 is desirable)
- **Average Trade Duration**: 4 minutes 12 seconds
- **Win Rate**: 78% (but average win is 20 pips, average loss is 40 pips)
- **Monthly Return**: +4.2% (gross of fees; net return after signal subscription is approximately +3.0%)

## Conclusion

Aura Black Edition is a high-frequency scalper with a deceptive win rate. The low profit factor and negative skewness make it unsuitable for risk-averse investors. The strategy is highly sensitive to market conditions and slippage. Prospective subscribers should allocate no more than 5% of their portfolio and monitor drawdowns closely.
