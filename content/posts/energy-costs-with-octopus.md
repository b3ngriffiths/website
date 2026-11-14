---
title: "Slashing Energy Costs with Intelligent Octopus Tariffs (Real Data)"
date: 2023-10-07T10:00:00Z
draft: false
description: "How I paid less than £2 for electricity in the first month using Octopus Energy's intelligent tariffs and solar generation"
tags: ["energy"]
categories: ["Energy"]
---

In early September, Octopus Energy made a surprise but very welcome announcement they were going to increase the electricity export rate from 4.1p/kWh to an enticing 15p/kWh for Intelligent Octopus customers. The new tariff is aptly called [Octopus Outgoing](https://octopus.energy/smart/outgoing/).

Quite the jump, just over 3.6x the previous rate! My overnight import is 7.5p/kWh, so export pays about double what I pay to import.

## Aim

Optimise energy usage, solar generation, and battery setup to achieve significant cost savings.

## Strategy

The strategy I adopted this first month was to take the following steps:

- **Export more** - direct all Solar PV generation straight to the Grid
- **Load shift** - where possible, set timer on kitchen appliances (high consumers) to operate during night rate
- **Self-powered** - during the day power the home using solely stored energy (battery)
- **Overnight grid charging** - fill the battery and charge the EV

## Real data: How did it go?

### Daily Grid Import vs Export

{{< chart "grid-month" >}}


There are some notable items from this data to callout:

- Import is fairly consistent, as our daily house usage is.
- There are 3 sizeable import days, this would be the addition of charging the EV.
- Export is very varied, bad weather spells or cloud cover in the UK can really impact solar generation.
- Export is slowly tapering off, again aligned with solar generation which as expected is tailing off from summer peaks as the days get shorter.

### Cost Analysis

{{< chart "cost-analysis" >}}


Our electricity cost was only **£1.95**, for net 284.42 kWh usage which also included those three EV charges 🎉

#### What if I hadn't exported anything?

Instead of exporting all solar generation, if I kept it for self-powered use this would massively reduce import from the grid overnight. Assuming nothing was exported, which would be feasible between immediate use and storing in home battery, the import would reduce to only 284.4 kWh.

Whilst the import amount would have approximately halved, there is no income from export.

{{< chart "cost-without-export" >}}


Without exporting, our electricity cost would have been 11 times higher at **£21.33**.

Our electricity cost would have increased by nearly 10x to £21.33. Therefore, optimising for the export tariff was certainly cost effective.

### Time of Use

Amalgamated over the month, a view of when energy was imported and exported throughout the day.

{{< chart "time-of-use" >}}


The decision for timings has been driven by the tariff - [Intelligent Octopus Go](https://octopus.energy/smart/intelligent-octopus-go/)

- 05:30 - 23:30 = peak @ 29.58p/kWh
- 23:30 - 05:30 = off peak @ 7.5p/kWh

## Conclusion

The strategy proved to be cost effective for this time period.

I say, this time period, because it will vary month to month. For example, in the winter we may use more electricity and deplete our entire battery store (13.5 kWh) before 23:30 and would be consuming at peak rate. Therefore, exporting any generation earlier in the day would have been wasteful instead of using it to reduce this eventuality. Equally, solar generation will significantly drop through winter increasing the net grid usage - leading to higher import cost with less export income to offset.

It will be interesting (at least for me) to revisit this calculation armed with a full year worth of data, and analysis to determine whether this works all year round (assuming I don't deviate from this approach).

---

*The standing charge, which is a fixed cost and cannot be influenced, is excluded from all calculations. For the record it amounted to £16.62 for these 30 days, at a rate of 55.39p per day.*

*Not an Octopus Customer and interested? [Sign up via this link and we both get £50](https://share.octopus.energy/frost-human-425).*