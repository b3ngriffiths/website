---
title: "Your SOC Metrics Aren't Measuring Security"
date: 2026-03-30
draft: false
description: "MTTR, alert volume, false positive rate. The SOC metrics everyone reports, that tell executives nothing about the organisation's cyber resilience."
tags: ["security operations", "SOC", "cyber resilience", "metrics"]
categories: ["Security"]
cover:
    image: "cover.jpg"
    alt: "Close-up of an aircraft cockpit instrument panel showing multiple gauges and dials, all displaying readings but none showing the destination"
    hiddenInSingle: false
    hiddenInList: true
---

Keeping the status quo was a mistake.

I was building a SOC, in-housing all the outsourced capabilities from a Managed Security Services Provider (MSSP), and I had been asked to provide some specific metrics for an internal governance board. The same metrics the MSSP had been reporting. I provided them without questioning whether they were still appropriate, or whether they'd be the right ones for us going forward. **They were not.**

The following week, after the governance board, I received questions from our CTO: "Why have alerts gone up this month?" Quickly followed by, "What can you do to get that number down?"

It was my fault. The metrics were rubbish. They provided no context, no indication whether the Security Operations Centre (SOC) was performing well, and no insight into whether we were improving the organisation's cyber resilience. I'd handed executives a set of numbers that invited exactly the wrong questions.

Metrics are a necessary evil. Executives want evidence the investment in security is delivering value. Fair enough. Security leaders need to demonstrate that the headcount, tooling, and operational spend is justified. That pressure isn't going anywhere.

The problem isn't that we measure. It's what we've chosen to measure.

The industry has defaulted to a handful of SOC metrics, such as Mean Time to Detect (MTTD), Mean Time to Acknowledge (MTTA), Mean Time to Triage (MTTT), Mean Time to Respond/Remediate (MTTR), alert volume, pipeline latency, and false positive rate. They appear in vendor dashboards, board reports, and security maturity assessments. They've become the accepted language for communicating SOC performance.

The uncomfortable question: do any of them actually tell you whether the organisation is more resilient to cyber threats? At a tactical level, within the SOC, these metrics have some value. The team has the context to interpret them, understands what's behind the numbers, and can act on them accordingly. But the moment they leave the SOC and land on a board slide, that context evaporates. The SOC exists to protect the organisation's ability to operate, detecting, containing, and responding to threats before they disrupt critical services. That's a question about resilience. These metrics don't answer it.

## The Defaults

These metrics became the standard for understandable reasons. They're easy to collect, easy to automate, and produce clean numbers for a slide deck. Vendor tooling generates them by default. They feel intuitive: faster is better, fewer false positives is better, lower volume means less noise.

They're also popularised by MSSPs, who need repeatable, scalable metrics that work across clients without requiring deep context about any single environment. That makes sense for their operating model.

Dashboards pre-built into security tools are often designed to show the value of the tool, not the value of the SOC using it. Report these and you're measuring tool performance, not SOC effectiveness.

And because these metrics are simple to produce, they become the metrics that get produced. Not because they're the right ones, but because they're the __available__ ones. The industry gravitates toward what's easy to count rather than what matters.

## Measuring the Machine, Not the Mission

Every one of these metrics describes the mechanics of the SOC. How fast, how many, what ratio. They're __operational metadata__. They tell you the machine is running, but nothing about the quality of its output, or whether the organisation is any safer because of it.

Take the speed metrics. An MTTR of 15 minutes looks great on a dashboard. It looks far less great when you ask what actually happened in those 15 minutes. Was the investigation thorough? Was the scope of compromise fully understood? Were all affected systems identified? Were containment actions verified? Were early forensic artefacts captured? Or did someone triage at surface level, apply the most obvious remediation, and close the ticket to hit the target?

A SOC that optimises alert handling speed will very likely achieve that goal, and the numbers will keep looking better, right up until an attacker shows up. **Speed of closure is not the same as quality of response.**

None of these metrics ask whether the work was done well. An engineer who spends two hours conducting a thorough investigation, confirming scope, validating containment, and documenting findings will perform worse on the dashboard than one who closes the ticket in 20 minutes with a surface-level assessment. **The metric can't tell the difference**. Which engineer would you rather have responding to an actual breach?

This isn't theoretical. Engineers learn what gets measured and optimise for it, because their performance reviews, their workload assessments, and their team's reporting all depend on those numbers. When the metric rewards speed, you get speed. When the metric doesn't measure quality, quality becomes optional.

> **"Show me the incentive and I'll show you the outcome."** — Charlie Munger  

When speed is the incentive, speed is what you get. Not quality. Not completeness. Not resilience.

The SRE community learned this lesson years ago. They distinguish between Service Level Indicators (what you measure) and Service Level Objectives (what you target), and they're careful to note that not every indicator needs to become an objective. The SOC world hasn't absorbed that lesson. We take every metric we can easily collect and immediately turn it into a target, then wonder why behaviour optimises for the target rather than the outcome.

## The Context Problem

Even setting aside the metadata bias, these metrics share a deeper flaw. They mean almost nothing without significant context. Context that leadership rarely has, and rarely seeks.

Take alert volume.

Your SOC handled 1,500 alerts this month, up from 1,000 last month. Is that good or bad?

**🟢 It could be positive:**
> - New data sources were onboarded, expanding detection coverage
> - New detection rules were deployed and are being worked through tuning
> - Alert volume increased but more are handled via automation, so engineer workload hasn't changed

**🔴 Or it could be negative:**
> - Greater interest from an external threat actor
> - Increased external scanning and probing
> - Security controls degrading or misconfigured
> - A backlog of detection engineering work, with rules generating noise that should have been tuned

The same number, two entirely different stories. The metric alone tells you nothing about which one you're living.

Now flip it. Alert volume dropped from 1,500 to 1,000. Progress?

**🟢 Maybe:**
> - Better detection engineering and tuning reduced noise
> - The threat landscape genuinely quietened
> - Security engineering improvements have reduced the attack surface, meaning fewer genuine triggers

**🔴 Or maybe not:**
> - A telemetry pipeline failed and you're missing data
> - A SIEM ingestion error means logs aren't being processed, so detections have nothing to fire against
> - Someone has over-tuned the signal to noise ratio and now some rules are near redundant, missing a significant proportion of true positives
> - You're not seeing fewer threats. You're seeing fewer alerts about threats that are still there

Without context, the number is meaningless.

Yet these are the numbers that go on board slides. Green arrow down on alert volume. Green arrow down on MTTR. Everything looks great, right up until it doesn't. And when executives do question the shifts, the context required to explain what they mean for cyber resilience is rarely something they have the technical background to interpret, or the appetite to engage with.

## The AI Amplifier

This problem gets worse, not better, with AI.

Here are some headline claims by AI SOC vendors:

> - "Investigate alerts in <4 minutes"  
> - "Reduce Mean Time to Resolution (MTTR) by 70-90%"  
> - "95% alert noise reduction"  
> - "Reduced MTTR from hours to under three minutes"  
> - "60% faster investigations"  

If your metrics already incentivise speed over quality, pointing AI at the same targets accelerates the race toward the wrong outcomes. AI won't fix measuring the wrong things. It will pursue them with more efficiency and at greater scale, driving the same flawed metrics further in the same flawed direction.

The question isn't whether those vendor numbers are real. It's whether they represent genuine security value to your environment, or just faster execution of a process that was already optimising for the wrong things.

Watch especially for vendors selling false positive reduction and noise filtering as a headline feature. Even if the filtering is accurate, those products are treating the symptom rather than the root cause. Instead of improving detection engineering to eliminate false positives at source, they're optimising a metric downstream while the underlying detection quality remains poor. You end up with a weaker detection engineering capability, rising AI costs (these vendors often charge per alert), and a dependency on a product that masks problems you should be fixing.

Data quality and process quality are prerequisites for AI to deliver meaningful outcomes. These default metrics measure neither.

## What Good Looks Like

I'm not going to prescribe a specific set of replacement metrics. That would contradict the core problem. Every organisation is different: a SOC for a regional healthcare provider where downtime could affect patient safety will measure success differently than one in a law firm where the consequence is client confidentiality. One-size-fits-all metrics don't work, and anyone selling you a universal dashboard is selling you a tool metric, not a security outcome.

But there are principles that should guide what you choose to measure.

**Measure quality, not just speed.** [Rafał Kitab](https://secopsathome.com/) argues that Quality Assurance (QA) should come before any other metric: without it, what good is MTTA/MTTR in the green if alerts aren't resolved correctly? Even a simple QA process, sampling completed investigations to verify they were thorough, transforms every other metric you collect. Without it, you're just measuring how fast your team ticks boxes.

**Measure what your specific environment needs.** A startup with a three-person security team needs fundamentally different metrics than a heavily regulated critical third party that must demonstrate cyber resilience to regulators as a condition of operating. Your risk profile, your industry, your regulatory obligations, and your SOC's maturity should dictate what you track. For some organisations, tabletop exercises and purple team outcomes will tell you more than any automated dashboard ever could. Resist the temptation to adopt someone else's framework wholesale.

**Connect metrics to each other.** A single metric in isolation is almost always misleading. [Anton Chuvakin](https://medium.com/anton-on-security) advocates for a mesh of interconnected metrics, because without connecting them, the number is often meaningless. MTTR alongside investigation quality. Alert volume alongside detection coverage and tuning activity. Detection engineering maturity feeding into all of it. If your board report shows a single number with a green arrow, you're not measuring cyber resilience. You're decorating a slide.

**Measure outcomes, not activity.** Stop asking "how many cases did we close and how fast" and start asking "is our detection and response capability improving." Are investigations more thorough than three months ago? Are detection gaps closing? Could your SOC handle a real incident better today than last quarter? These are harder to measure than MTTR. That's exactly why they matter more.

## The Takeaway

The metrics the industry has settled on measure activity, not effectiveness. They tell you how fast your team moves, not how well they protect the organisation's ability to operate.

If your board slide shows green on MTTR but you've never reviewed whether those investigations were actually complete, you're not reporting on cyber resilience. You're reporting on speed, and hoping nobody notices the difference.

The metrics your SOC reports should answer one question: **is the organisation more resilient to cyber threats this month than last?** If they can't answer that, they aren't measuring security. They're just counting.
