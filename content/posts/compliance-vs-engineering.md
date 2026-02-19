---
title: "Collectively Blind"
date: 2026-02-19
draft: false
description: "Why security compliance and engineering teams keep disagreeing, and why that disagreement, handled right, might be the most valuable thing in your security function."
tags: ["security", "compliance", "security engineering", "governance", "cognitive diversity"]
categories: ["Security"]
---

I've been privy to some pretty ~~intense~~ exciting inter-security-team ~~arguments~~ discussions through my career. I've worked across both security compliance and security engineering, and currently operate somewhere between the two. That vantage point has shown me something uncomfortable: these teams clash constantly, and it's not because either side is incompetent.

They're wrong in different directions, and that difference is worth paying attention to. In some ways, the fact they argue at all is the good news. It means there's cognitive diversity in the room. The real danger is when everyone agrees.

Fair warning: what follows is an overgeneralisation. And one that's not unique to these security teams. But sometimes a useful generalisation surfaces something that nuance alone can't reach.

## Same Threat, Different Picture

In 2001, researchers at the University of Michigan showed two groups, one American and one Japanese, identical video clips of underwater scenes.[^1] When asked to describe what they'd seen, the Americans talked about the fish. Size, colour, direction. The Japanese talked about the water, the rocks, the plants, the environment surrounding those fish.

Both were describing the same scene. But they were seeing different things. American culture skews individualistic, so they focused on distinct objects. Japanese culture skews interdependent, so they focused on context and environment. When the researchers moved the same fish into a new environment, the Japanese struggled to recognise them. When the environment changed but the fish stayed the same, the Americans didn't notice.

Swap the cultures for disciplines, and the pattern holds:

|  | Compliance | Engineering |
|:---|:---|:---|
| **Sees** | Controls, policies, audit evidence, frameworks | System architecture, attack surfaces, runtime behaviour |
| **Measures** | Control presence and evidence-ability | Technical effectiveness under real conditions |
| **Misses** | When the environment shifts beneath their controls | When a well-understood system faces new regulatory requirements |
| **Asks** | "Can we prove this control exists?" | "Does this control actually do what it claims?" |
| **Worst day** | A nuanced audit question they struggle to answer | Implementing a complex control for compliance that adds limited security value and real operational trade-offs |

Same threat landscape. Genuinely different picture.

## Confident and Wrong

Here's where it gets dangerous.

In a study on group decision-making at Columbia Business School, teams were given a murder mystery to solve.[^2] Half the teams were composed of four friends. The other half were three friends plus a stranger, someone from outside their social group.

The diverse teams got the right answer 75% of the time. The homogenous teams got it right 54% of the time. But the more revealing finding was about confidence. The homogenous teams found the process agreeable. They spent most of their time, well, agreeing. They were far more confident they'd reached the right answer.

**The homogenous groups didn't just underperform. They underperformed while being more confident they were right.**

A compliance team reviewing its own controls library will likely conclude it's robust. An engineering team assessing the technical reality will likely conclude those controls don't go far enough, aren't implemented correctly, or miss the broader threat where resource could be better focused.

The shared goal is protecting the business from threats. Risk management is where these perspectives should collide. But compliance typically owns that activity, and when the group assessing risk is homogenous, confidence in those decisions grows in direct proportion to the blindspots they can't see.

> Try this: ask someone in your security function, "What's your blindspot?"
>
> If they answer immediately, they're probably demonstrating the very problem. A genuine blindspot is, by definition, something you can't readily see. If someone pauses and genuinely struggles, that discomfort might mean they're closer to the right track.

## You Don't See What You've Never Had to Carry

The journalist Reni Eddo-Lodge once described a period when she couldn't afford the full train fare to work and had to cycle part of the way instead. Lugging her bike up and down station staircases, she suddenly noticed something she'd never seen before: the majority of stations had no ramps, no lifts, no accessible routes. The problem was invisible, not because it didn't exist, but because her **experience** had never required her to see it.

**Compliance and governance professionals** are shaped by frameworks, external audits, customer assurances, regulatory penalties, legal exposure, and board-level accountability. Their daily reality is control presence and evidence-ability. It's what they're constantly asked for.

**Security engineering professionals** are shaped by technical security posture, secure engineering behaviours, and threat models. They see the true robustness of controls, their breadth, depth, and technical effectiveness. A passed audit is only part of the picture they see every day.

Both are valid. But each team tends to assume their reality is the complete one.

Security governance is typically owned by compliance teams. That's not inherently dangerous. But if engineering isn't in the room when risk assessments and governance decisions are made, those decisions are shaped entirely by one frame.

## Obviously...

Let's make this concrete. Phishing simulation programmes. A staple.

To compliance, regular phishing simulations are a control. Send campaigns, measure click rates, show reduction over time. It evidences awareness, gives the board a metric they can track, and demonstrates due diligence to auditors and regulators. Repeat clickers get targeted training. It evidences that the organisation is actively managing human risk, not just hoping people are careful. It's "obviously" good security practice.

To engineering, fewer clicks doesn't mean lower risk. Users might just be reading fewer emails, or recognising the campaign format rather than developing real threat instincts. Meanwhile, a well-crafted spear phish will bypass that "training" entirely. The metric measures compliance with simulations, not resilience to real attacks. The real question isn't whether users click, it's whether your technical controls can detect, contain, and limit the damage when they do. It's "obviously" the wrong metric.

Both teams are right from their vantage point. Both are also incomplete.

## Who Gets the Credit?

There's one more structural factor that makes this harder, and it's rarely discussed openly.

Compliance gets visible, measurable, upfront wins. Audits passed. Certifications achieved. Frameworks mapped. The team can point to artefacts and say: "we did this."

Engineering's wins are invisible until something fails. Good security engineering means nothing happens. No breach, no incident, no downtime. But it also means the business operates with minimal friction from security controls, and where trade-offs are introduced, they're understood and communicated. None of that gets noticed when it's working.

**Compliance is rewarded for presence of evidence. Engineering is only noticed for absence of failure.**

Over time, this skews organisational attention towards compliance outputs, not because they're more important, but because they're more visible. When leadership asks "how's our security posture?", whoever holds the visible artefacts frames the answer. The engineering perspective may never get airtime.

It gets worse. When something does go wrong, engineering takes the hit: why didn't you stop it? Compliance rarely faces the same question. The framework was in place. The audit passed. The fact that documented controls didn't prevent the breach becomes an engineering problem, not a governance one.

This isn't a people problem. It's a structural one.

## So What?

I'm not going to prescribe an exact fix (sorry). This isn't that kind of post. But here are some questions worth asking.

- When did you last invite a compliance person to an engineering incident postmortem? When did you last invite an engineer to a risk assessment or a control design review?
- Who sits on your security governance board? If it's one discipline, you have a homogenous group making decisions about a complex problem. The research says they'll be confident. The research also says they'll be wrong more often than they think.
- When engineering raises concerns about control effectiveness, where does that feedback go? Does it reach the same forum that approved the control?
- Are your security metrics reported by one team or shaped by both? When leadership asks "how's our security posture?", whose perspective frames the answer?
- What would it look like to treat the disagreement between these teams as signal rather than friction?

Because if compliance and engineering see the same threats the same way, you don't have alignment. You have a collective blindspot with twice the headcount.

---

I've worked both sides. I've been the person writing the policy and the person discovering why it doesn't survive contact with reality. Neither experience alone gave me the full picture. Both together got me closer. I'm still hesitant to claim I can see it all.

If you read this and your immediate reaction was "this doesn't apply to my team", you might want to sit with that for a moment.

*Views expressed are my own.*

[^1]: Nisbett, R. E. & Masuda, T. (2001). Culture and the physical environment: Holistic versus analytic perceptual affordances. *Psychological Science*, 12(3), 205-210.
[^2]: Phillips, K. W., Liljenquist, K. A. & Neale, M. A. (2009). Is the pain worth the gain? The advantages and liabilities of agreeing with socially distinct newcomers. *Personality and Social Psychology Bulletin*, 35(3), 336-350.