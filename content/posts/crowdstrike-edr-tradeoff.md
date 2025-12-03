---
title: "The CrowdStrike Lesson: Security vs Operational Risk"
date: 2024-07-22
draft: false
description: "Lessons from the CrowdStrike outage: the hidden tradeoff between bleeding-edge threat protection and operational risk in EDR deployments"
tags: ["CrowdStrike", "EDR", "Security Operations"]
categories: ["Security"]
---

What the world doesn't need right now is another CrowdStrike hot take... so here's mine.

I'm not here to throw any more at CrowdStrike. They've had enough. There was a mistake with big impact.[^1] It happens.

[^1]: On 19th July 2024, CrowdStrike released a routine content configuration update for their Falcon Windows sensor. A defect in this update caused system crashes (BSOD) for Windows hosts that pulled the update between 04:09 and 05:27 UTC. The issue was identified and reverted at 05:27 UTC, but recovery required manual remediation on affected systems.

There is a lesson to be learnt though: every security control carries a tradeoff, and in this case it's operational risk. But this recent event serves to remind us.

**We cannot just blindly push security controls; there are tradeoffs which must be understood.**

If you deploy an Endpoint Detection and Response (EDR) solution in production and choose to be at the bleeding edge of threat updates, this will do wonders for threat management, enabling faster response to emerging threats and keeping your detection capabilities current with the evolving threat landscape. However, you are also accepting an internet connected privileged binary operated by a third-party, and with it the bleeding edge of any potential bugs, false positives and supply chain compromise.

Remember this was a content update, not a sensor software update issue, therefore the n-1 strategy didn't apply here. Because EDR content updates are typically pushed near real-time to maintain threat protection, the standard deployment safeguards (staging, canary deployments, where you test updates on 5-10% of systems before full rollout) that would catch a buggy software release simply weren't in play.

These EDR vendors are also balancing their service between the two; their reputation suffers whether they miss a critical threat or push a buggy update.

The real-world impact of this tradeoff became immediately visible in how organisations responded. A week ago all these impacted companies[^2] would have boasted about their strong security controls, and flown through customer/vendor security due diligence reviews. In the immediate aftermath, third-party risk teams rapidly scrambled to identify their exposure internally and across materially significant vendors, viewing such dialled up security controls less favourably.

[^2]: The outage impacted approximately 8.5 million Windows devices globally. Major organisations affected included airlines (Delta, United, American Airlines with thousands of flight cancellations), healthcare providers (mass appointment cancellations and delayed procedures), banks and financial services (transaction processing disruptions), emergency services (911 systems in multiple US states), and broadcasters (Sky News went off-air). The manual remediation requirement meant recovery took days for many organisations.

**Key takeaway:** This isn't about CrowdStrike. This has happened before with other security providers and will happen again. I'm not saying whether you should or shouldn't be at the forefront of threat management updates. Whatever you decide, ensure you understand the risk. What security tooling do you have deployed, and do you understand its security vs operational risk?