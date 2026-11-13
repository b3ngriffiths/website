---
title: "You're Not Paid To Think"
date: 2026-05-28
draft: false
description: "Prescriptive runbooks feel like maturity but they're capping your security team. What special forces understand about empowerment, and why your SOC should too."
tags: ["security operations", "leadership", "cyber resilience"]
categories: ["Security"]
cover:
    image: "cover.jpg"
    relative: true
    alt: "A starling murmuration sweeping over a seaside pier at sunset, thousands of birds moving as one against a warm sky over the sea"
    hiddenInSingle: false
    hiddenInList: true
---

> "You're not paid to think."

I'm sure this phrase will spark _fond_ memories if you're ex-military.

It was a joke… or _was_ it.

I would hear this said as 'banter' after a baffling decision had come down the chain of command, from some lofty heights. Or traded as a knowing joke between people who knew better but didn't dare say so.

Sometimes it wasn't a joke at all, but an excuse not to override an order they knew was sub-optimal or downright wrong, through fear of discipline... or simply because leadership was weak.

## Over-Command

My early career in the military gave me a close look at what happens when command structures are heavily embedded and optimised for control rather than capability.

Decisions that were entirely feasible to be made at that level would travel up the chain anyway. Not because the person raising them lacked the ability to decide, often they didn't, but because the culture didn't give them permission to. The result was slow decisions, disorganised responses, and over time, people who lost both the situational awareness to know the right call and the confidence to make it. **If no one ever trusts you to decide, eventually you stop trying to.**

I'm not describing catastrophic failure. Evidently things _worked_. I'm describing a steady erosion of capability that's hard to see when you're inside it.

## Decentralised Command

Decentralised command is simple to state and hard to live: **leaders set the intent and the boundaries, then trust the people closest to the problem to decide how to act within them.**

Years later, whilst reading about how special forces operate, something clicked.

The contrast isn't about talent but command philosophy. The conventional military structure I was used to _directs_: specific orders, defined steps, decisions that escalate before they're acted on.

A special forces model works differently. The commander communicates intent, defines the operating parameters, and then largely steps back. Not because they're passive, but because they've done the harder upstream work: building a team that understands the mission deeply enough to make good decisions without being told what those decisions should be. [^1]

In the moment, there's no constant barrage of instruction. Operators have space to act, to adapt, to exercise judgment within a framework they've fully internalised. The command hasn't gone anywhere. It's been built into the team in advance.

That's a fundamentally different model, and one I'd like to see more Security Operations teams adopt.

## Why Default to Runbooks

Before continuing, it's worth exploring why prescriptive runbooks are so common and defaulted to by security leaders.

I can see it as one of a few things, sometimes more than one.

1. **Inexperience** - leaders who haven't operated at the front line of security response often don't know what good judgment looks like in practice. So they document the exact steps they believe should be followed, steps that even they could execute, and mistake that documentation for operational maturity. It gives them confidence the work will be done correctly. What it actually does is cap the ceiling of what their team can achieve.
2. **Cover** - if everything is pre-determined and documented, the leader is protected. If something goes wrong, the runbook was followed. If something goes right, the runbook worked. Either way, the leader is covered. The runbook stops being about enabling the team and becomes about insulating the leader.
3. **Compliance** - regulators, auditors and insurers ask to see documented procedures, so they get written. The runbook's existence becomes the evidence of due diligence, regardless of whether it produces good outcomes. Nobody is asking whether it makes the team better.
4. **Incidents** - post-incident reviews that produce new runbook steps as their primary output. Something went wrong, so a step gets added to prevent it happening again. Repeated over years, the runbook becomes a graveyard of past failures. Increasingly prescriptive, increasingly disconnected from the threat landscape as it actually looks now. _The team is rehearsing for the last incident, not the next one._

None of these produce a resilient capability. They lead to a security operations team that is slower than it should be and less confident than it could be. A team dependent on _instruction_, rather than one that understands _intent_, knows its operating boundaries, and has the situational awareness and confidence to make security operations genuinely effective.

## What It Takes

The special forces model translates more directly to security operations than you might realise.

It starts with intent. Not a list of assets to protect, but genuine organisational context: what we're protecting and why, what matters most, what a bad outcome actually looks like for the business. Most security teams can recite the crown jewels but far fewer could articulate _why_ a particular system or dataset matters more than another under pressure.

Intent is what lets an operator decide under pressure. Isolating a compromised host stops the threat spreading, but it takes the production payment platform offline. Contain the incident, or keep payments running? A runbook rarely tells you which matters more. **An operator who knows whether the business values payment integrity or availability more can make that call on the spot, and get it right.**

It requires shared understanding of operating parameters, not a flowchart of decisions, but a clear sense of where the boundaries are and the reasoning behind them. That understanding is what separates an operator handling an edge case with judgment from one following a runbook step they've never questioned. It also means knowing where your own remit ends and the next person's begins, so that under pressure handoffs are clean, quick and nothing falls through the gap.

It means building confidence deliberately. In my own teams, the decisions I've seen made most effectively weren't made by people following prescriptive runbooks step by step. They were made by operators who had confidence in a high-level process and the ability to apply judgment within it. That confidence doesn't arrive with the job offer. It's built through investment, through trust extended incrementally, through leaders who treat good judgment as something to develop rather than something to replace with documentation.

None of this means a new starter should be let loose on day one. A junior operator genuinely needs the runbook, they haven't yet built the judgment to be trusted without one. That's the point: **the runbook is scaffolding.** It supports someone while they build the understanding to operate without it. The failure isn't using runbooks to develop people, _it's never taking the scaffolding down_, leaving experienced operators following steps long after they should have been trusted to think.

And it requires leaders to accept that empowerment carries risk. An operator acting on judgment will occasionally get it wrong in ways a runbook follower wouldn't… because the runbook follower wasn't really making decisions at all. That trade-off is worth it, **a team that can think is more valuable than a team that can only execute.**

## Runbooks Have a Place

This isn't a case for throwing out all your documentation. Please don't do that.

If the focus is right, they can be genuinely useful. A tangible artefact to put in front of a customer, auditor or regulator. A memory jog for the tricky procedures you don't run often enough to remember cold. And the act of writing one is valuable in itself, it forces you to explore the operating environment, map the boundaries, work out who owns what, identify blindspots, and see which tools come into play in which scenario.

That last point matters most, **the value is in the understanding the creation builds, not the document it produces.** The danger is when the artefact replaces that understanding rather than reflecting it.

This is an argument for treating it differently.

A runbook should encode your team's judgment, not replace it. It should answer "what do we typically do here, and why" not "here are the exact steps you must follow or escalate." It's a subtle distinction but the operational difference is significant.

Run exercises that test decision-making, not procedure compliance. Ask where operators hesitated and why, not just whether the right action was taken.

A fair challenge, particularly in regulated sectors: doesn't an auditor or regulator demand demonstrable, repeatable process? They do. But that's not the same as demanding prescriptive step-following. What they want is evidence of control, accountability, and competence. A documented decision framework, clear escalation thresholds, demonstrable training, and honest post-incident review are all repeatable and auditable. None of them require an operator to follow a script. **Empowerment and demonstrable process aren't opposites.** Confusing the two is how you end up auditable and ineffective at the same time.

The military figured this out. Special forces didn't become effective through better checklists. They became effective by building people who could think, decide, and act within a framework of shared understanding, and by giving those people the space to do so.

Your security team can operate the same way. **But not while the runbook is doing the thinking for them.**

[^1]: Ex-military readers will know the UK already teaches Mission Command - situation, mission, intent... My point is that in reality, the surrounding culture defeats it in day-to-day practice.

---

_Cover photo by [Rhys Kentish](https://unsplash.com/photos/silhouette-of-birds-flying-over-the-sea-during-sunset-ExhIp8DuHD8) on [Unsplash](https://unsplash.com)._