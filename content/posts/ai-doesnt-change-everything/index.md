---
title: "AI Doesn't Change Everything"
date: 2026-08-10
draft: false
description: "AI changes the speed, scale, and cost of attacks. It does not change what cyber resilience is, and a security team can take on a debt it never writes down."
tags: ["cyber resilience", "AI", "security operations", "leadership"]
categories: ["Security"]
cover:
    image: "cover.jpg"
    relative: true
    alt: "Workers on scaffolding against the stone facade of an ornate building"
    hiddenInSingle: false
    hiddenInList: true
---

You may have noticed my posts to date have stayed away from AI.

That has been deliberate.

Not because I'm anti-AI, or some kind of sceptic. Quite the opposite, in my professional and personal life I have been an avid and early adopter.

My concern has been the pace of change across the AI landscape, which continues to evolve exponentially. I'd like my posts to hold *some* longevity, so that between an idea forming and a post going live, the ground hasn't materially shifted, and it isn't embarrassing to look back on within the year.

Today, I will continue to leave the direct topic alone (at least for now). Because what has made AI hard for me to write about is also the thing worth writing about.

The capabilities change weekly. In the few years since ChatGPT landed in late 2022 and took LLMs mainstream, we've gone from GenAI, to agentic systems, to memory and tool-use harnesses, and the ground is still moving. What sits underneath all of that does not.

Most AI security writing chases the surface: which model, which capability, which threat this week. The layer beneath moves far more slowly, and it's the layer that actually keeps your organisation standing.

So this isn't a post about what AI can do. It's a post about what stays true regardless. AI changes the speed, the scale, and the economics of attacks against you. **It does not change what cyber resilience is.**

## Resilience Hasn't Moved

Let's be clear what *Resilience* really means.

Cyber resilience is the ability to absorb a hit, keep operating, and recover. It is *not* prevention. Prevention assumes you can keep the bad thing out. Resilience assumes you sometimes won't, and asks whether you can survive the blow and carry on.

That definition predates and survives AI untouched. The frameworks have said the same thing for years: you will be compromised eventually, and what matters most is what happens next.

## What AI Actually Changes

Three things, and only three things, really matter for resilience.

**Speed.** An attack that took days can now move through a network in minutes. The window to detect, decide, and contain shrinks with it.

**Scale.** The same attack used to cost effort per target. It can now run against thousands for the same money.

**Economics.** You used to need a skilled operator. Now you need a subscription, or an open-source model and some compute.

None of this is a new *type* of threat. It is the threats you already know, arriving faster, broader, and cheaper. Which is exactly why the fundamentals matter more.

## When There's No Time to Ask

When an attack compresses from days to minutes, there is no time to deliberate on a decision. The moment will pass. The call has to be made at the edge, by the person closest to the problem, in the moment.

I have written before about why [prescriptive runbooks cap a team](/posts/not-paid-to-think/) rather than build one. AI sharpens that argument into a resilience requirement. A team trained to follow steps and escalate the unfamiliar will freeze at exactly the speed AI operates. A team that understands intent and is trusted to act within it will not.

**The organisations leaning hardest on documented, step-by-step process are the least ready for AI-speed incidents.** They have mistaken documentation for readiness. A runbook is a record of how you handled the last thing. It is not judgment, and judgment is the only thing fast enough.

## Resilience Debt

My youngest son wanted to be just like his big brother - off the balance bike and onto a "proper" bike with pedals. His birthday rolls around and we buy him one, which came from the shop with stabilisers and we left them on.

Within a few hours he was flying around the garden. Pedalling, steering, grinning. From nothing to confident in an afternoon.

In newfound confidence he wanted to try with the stabilisers off, and it was immediately clear to him he could not ride. Not slower, not wobblier, he genuinely couldn't do it because he had never once had to balance and pedal. The stabilisers hadn't taught him the fundamental, and had hidden the fact he never had it.

Balance was the thing that mattered. The stabilisers accelerated everything *except* the thing that mattered, and did it so convincingly that the gap stayed invisible until the support came off.

**That is what AI does to a security function that adopts it without thinking.**

Point AI at your operations and capability appears overnight. Faster triage, more detection rules, faster response, fewer things falling through the cracks. It looks like maturity. But if the underlying capability was never built, or has quietly faded because the AI now does it for you, you haven't become more resilient. You have taken on **resilience debt.**

The bill arrives the moment the AI is unavailable, compromised, guardrails triggered, or simply wrong, and you find out whether anyone can still ride the bike.

### The Unrecorded Debt

The debt is borrowed at the business case, and recorded nowhere. Every AI proposal quantifies the gains - hours saved, faster output, capability uplift, headcount avoided. Those gains are often real, and usually larger than the debt. But every gain carries some resilience trade-off, because the capability you stop exercising is exactly where the saving came from. **The trade-off is never zero, and it's never written down.** Not in the risk register, not in the security review, not in the board pack.

A simple example. AI generates your detection rules end to end, no human input or review. The business case writes itself: use cases that took days now ship in minutes. What it doesn't record is everything the engineer would have built by writing them. Frameworks like Palantir's [Alerting and Detection Strategy](https://github.com/palantir/alerting-detection-strategy-framework) exist precisely because **a good detection is mostly thinking**: the goal, the technical context, the blind spots and assumptions baked into every rule. An engineer who has worked through that knows what each detection can and cannot see, and carries that organisational context straight into incident response when one fires. The hours saved went into the business case. The understanding lost did not.

We would never accept a business case that ignored the security trade-offs of a new system. Yet AI business cases skip the resilience trade-off as standard.

This is not the automation debate rerun. Traditional automation is deterministic. It does the same thing every time, and when it breaks, it breaks loudly. You verify it once, when you build it. AI is non-deterministic. It can fail differently every time, silently, and plausibly. Verification stops being a build-time task and becomes a permanent one, demanding exactly the expertise the debt erodes.

And the debt compounds across careers. Judging AI output takes expertise[^1], and expertise is built by doing the work: the investigations, the detection tuning, the unglamorous reps that AI eats first. Your experienced engineers can catch the AI being wrong because they built their judgment before it arrived. The engineers who join after won't get that chance, through no fault of their own, because the formative work has been automated away. Nobody adopting at pace can explain where their senior engineers of 2031 come from if AI is doing the foundational work of 2026. Which leads somewhere uncomfortable: **some inefficiency is worth protecting.** Not every task should be automated just because it can be. Some of that work is where judgment gets built, and keeping engineers in it isn't waste. It's how you service the debt.

The debt isn't confined to security operations either. Organisations shipping AI-generated code at pace, vibe-coding their way to production without the engineering discipline to match, are accruing the same debt inside their own systems. Incident response depends on people who understand how the thing actually works. If the AI wrote it and nobody carried that understanding forward, diagnosis slows just as attack timelines are compressing.

Recovery in an AI world means operating when the AI is not there. If you can't, you didn't get stronger but borrowed strength, and the debt is still owed.

And make no mistake about who owes it. You can delegate the work to AI. You cannot delegate the accountability for what it does. When the debt comes due, it's your name on the incident report, not the vendor's.

## What This Asks of You

I won't hand you a checklist. That would be its own kind of runbook.

But the principles follow directly from everything above.

- **Capture the resilience trade-off at the point of the business case.** Before the gain is banked, name what capability is being traded for it, who stops doing what, and how that debt will be serviced. If the proposal can't articulate the trade-off, the answer isn't no. It's not yet.
- **Rehearse operating without it.** Deliberately. The way you would rehearse any recovery scenario, because that is what it is. If AI is load-bearing in your operations, then "AI unavailable" is a disaster recovery case, and an unrehearsed one is a debt you haven't measured.
- **Measure whether you can still function, not how fast AI made you.** I have [argued before](/posts/soc-metrics/) that speed metrics flatter a SOC while telling you nothing about its resilience. AI pointed at those same metrics just races toward the wrong target faster. The question is not how quick you are with the AI. It is whether you can stand without it.
- **Anchor every decision on resilience, not speed.** Every adoption, every capability, every dashboard gain, judged against one question: does this make us better able to absorb a hit and recover, or does it just make the numbers greener while the foundation hollows out.

## The Takeaway

AI does not change everything, as the industry headlines would have you believe.

AI changes how fast you find out whether your fundamentals were ever real. Compressed timelines, larger scale, cheaper attacks: all of it shortens the gap between adopting something and discovering what it was quietly resting on.

Adopting fastest is the wrong test. The test is whether you can still ride the bike when the stabilisers come off.

[^1]: Daniel Miessler makes a related observation he calls the [AI expertise trap](https://danielmiessler.com/blog/avoid-the-ai-expertise-trap): the further a topic sits from your expertise, the smarter an AI sounds. The corollary here is that resilience debt erodes exactly the expertise needed to judge.

  ---
_Cover photo by [Jon Tyson](https://unsplash.com/photos/3-men-climbing-on-ladder-gIuwiRLL0TU) on [Unsplash](https://unsplash.com)._