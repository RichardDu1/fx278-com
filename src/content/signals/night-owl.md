---
title: "Night Owl"
description: "A high-frequency scalping strategy trading EURUSD and GBPUSD on M15, employing a martingale recovery system with 5x multiplier and 7-level grid, yielding high win rate but extreme tail risk."
platform: "MQL5"
monthlyReturn: "+8.7%"
maxDrawdown: "-22.3%"
subscribers: 3200
riskLevel: "High"
winRate: "undefined"
publishedAt: 2026-05-31
---

## Strategy Mechanics

- **Instruments**: EURUSD, GBPUSD (spot)
- **Timeframe**: M15 scalping
- **Entry Logic**: Stochastic (14,3,3) oversold/overbought cross + EMA (50) slope filter
- **Exit Logic**: Take profit at 8 pips; no stop loss; martingale recovery on loss
- **Position Sizing**: Base lot 0.01 per $1000; after loss, next trade lot = base * 5^(loss count) up to 7 levels
- **Grid System**: Opens 3 counter-trend orders at 10-pip intervals when floating loss exceeds 2%

## Drawdown Analysis

- **Historical Max DD**: -22.3% (occurred during NFP spike, March 2023)
- **Average DD**: -4.1% (median), but tail events show -15%+ every 6 months
- **Recovery Time**: Mean 12 days; worst 47 days
- **Equity Curve**: Steep upward slope with sudden -10% drops; 80% of drawdowns occur within 2 hours

## Risk Warnings

- **Martingale Exposure**: 5x multiplier leads to geometric lot growth: 0.01 → 0.05 → 0.25 → 1.25 → 6.25 → 31.25 → 156.25 lots. A 7th loss would require $15,625 margin per $1000 account.
- **Survivorship Bias**: Signal started after surviving 2022; backtest excludes 2015 SNB crash where similar systems blew up.
- **Correlation Risk**: Both pairs trade same logic; simultaneous losses double margin calls.
- **Broker Dependency**: Requires ECN with 0.1 pip spread; slippage during news can trigger grid overflow.
- **Regulatory**: Not compliant with ESMA leverage caps; retail traders may face forced closure.

## Performance Metrics

| Metric | Value |
|--------|-------|
| Monthly Return (avg) | +8.7% |
| Annualized Return | +174% |
| Sharpe Ratio | 1.2 |
| Win Rate | 82% |
| Profit Factor | 1.8 |
| Average Trade Duration | 4 min |
| Trades per Month | 450 |
| Maximum Consecutive Losses | 7 |

## Conclusion

Night Owl generates consistent small wins but carries a non-zero probability of catastrophic loss. The martingale system mathematically guarantees eventual ruin given infinite time. Suitable only for risk-tolerant capital allocated to high-risk strategies, with strict maximum drawdown stop at -30%.
