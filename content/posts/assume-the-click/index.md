---
title: "Assume the Click"
date: 2026-11-13
draft: false
description: "It's time to end phishing tests."
tags: ["phishing", "security awareness", "social engineering", "cyber resilience", "metrics"]
categories: ["Security"]
cover:
    image: "cover.jpg"
    alt: "A red fire alarm call point and its red warning sign mounted on a bare concrete wall"
    hiddenInSingle: false
    hiddenInList: true
---

The phishing click rate in your board pack measures how hard your security team made the test. It says very little about your people, and even less about your cyber resilience.

People should still be taught about social engineering. What needs to end is the test: tricking staff into clicking, counting who did, and reporting that count as a measure of security.

## Why It Looks Fine

I've seen these programmes run close up in multiple places. I understand why they are popular.

The chart goes the right way. Vendors publish figures like a click rate falling from 33% to 4% over twelve months,[^1] and most internal dashboards tell a similar story. The auditor asks for evidence of awareness training and gets it. The insurer's questionnaire has a box for it. It is cheap next to most security tooling and it largely runs itself.

Business leaders rarely get a security control with a number attached, let alone one that keeps improving.

The trouble is that the number is easy to manipulate. **Whoever picks the email decides the result.**

## What the Number Measures

In 2025, researchers at UC San Diego published the largest study of this practice so far. They ran ten simulated campaigns against 19,500 staff at UC San Diego Health over eight months.[^2]

An email posing as an Outlook password update caught under 2% of staff. However, another about a change to the vacation policy caught nearly 31%. Nothing changed between the two except the email lure.

That is what the click rate measures. A team under pressure to show improvement only has to send an easier email.

The training attached to the test did very little. Staff who got the training failed only about 2 percentage points less often than those who got none, and three quarters of them spent a minute or less on the page. By month eight, more than half the workforce had clicked at least once.

> We must remember humans will forever be fallible and their security awareness will lag behind evolving and emerging techniques.

An earlier study at ETH Zurich followed 14,000 employees for 15 months and found the same kind of training left some of them more likely to click.[^3]

None of this surprises me, because of what we ask people to do the rest of the week.

Don't click links in unexpected emails, except the one from the vetting agency you have never heard of, or the confidential HR survey hosted on someone else's domain. Don't open attachments, unless you work in accounts, where opening invoices from strangers is the job.

We set the rules and then break them ourselves. An attacker only has to look like one of the exceptions.

Increasingly they don't have to pretend at all. Attackers now send lures through real services such as DocuSign.[^4] Someone who checks the sender, and the headers, exactly as trained, will correctly conclude the email is genuine. They are right about the sender and wrong about the intent, and the training has nothing to say about that.

NCSC has made the same point: people need to click links from unfamiliar domains to do their work, and spotting a phish is not their job.[^5]

## Assume the Click

Email is one communication channel. The same request arrives by phone, text, WhatsApp, LinkedIn, Slack and Teams, and a programme that tests email clicks doesn't cover the full surface area. In this year's Verizon DBIR, phone-centric simulations had a higher median click rate than email: about 2% against 1.4%.[^6]

So, start from the other end. **Assume the click.** Someone will follow the link, open the attachment or read out the code. Plan for what they can reach once they have.

In 2022 the same attackers went after Twilio and Cloudflare with text messages pointing at fake login pages. Staff at both companies entered their credentials. Twilio was breached. At Cloudflare three employees fell for it and nothing was compromised, because every employee signs in with a hardware security key and a stolen password was not enough.[^7]

Cloudflare's staff clicked too. The difference was a control that still worked after the click.

> If one person's password is all that stands between an attacker and your business, you're cooked.

Passwords are not the only target. A growing number of lures skip the login page and talk the user into pasting a command into their own machine.[^8] A security key does nothing about that, which is why the list below goes wider than authentication.

Filtering before delivery is still a valuable control worth having. It is not the strongest control, but it clears away the obvious and leaves people less to deal with.

After delivery, the aim is to make a mistake matter less:

- Phishing-resistant authentication, so a stolen password is not enough
- No admin rights for everyday work
- An allowlist or approval step for software installs
- Secrets stored securely, not in plain text
- Canaries that give early warning when an account has been compromised

A compromised password or a malicious install still matters. Each of these makes it matter a lot less.

This aligns with NCSC's phishing guidance, which treats users spotting the email as one of four layers.[^9]

## Train the Report

People still have a part in this, and it is one they can actually do.

Nobody can spot every lure. Anybody can report one, including the person who has just clicked it. That report is the most useful one the security team will get.

It only works if reporting is safe. Someone who expects to be blamed for clicking will keep quiet, and security finds out late, if at all.

So keep talking to staff about social engineering. Show them real examples, across every channel, regularly. And make sure every one of them knows how to raise the alarm.

Then test that, in the open. **Test the ability to report, not the ability to detect.** Google's security team has argued for running phishing exercises like fire drills: announced in advance, with the aim of practising the report, not catching anyone out.[^10]

The ETH Zurich study that found click training backfiring also found that a simple report button turned staff into a fast detector of new campaigns, and they kept using it for the length of the study.[^3]

What happens after the report is on the security team, and that part is worth measuring. Once the first report lands, the clock is on to:

- Validate the report
- Remove the threat from every mailbox
- Block the infrastructure behind it
- Update detection so the next one is caught earlier

## Principles

**Assume the click.** Someone always will. Build so that one click is survivable, whichever channel the lure arrived on.

**Train the report, not the spot.** Stop asking people to out-think attackers. Ask them to tell you fast, and make it safe to do that after a mistake.

**Measure the system, not the staff.** Time to first report and time to contain say something about your cyber resilience. A click rate says something about the email you chose to send.

The click rate can come out of the board pack. What replaces it is a measure of how quickly the organisation notices and recovers.

[^1]: KnowBe4, [2026 Phishing by Industry Benchmarking Report](https://www.knowbe4.com/press/knowbe4-research-finds-global-phishing-susceptibility-drops-79-after-one-year-of-security-awareness-training), July 2026. The global average "Phish-prone Percentage" fell from 33.2% before training to 4.2% after one year.

[^2]: Ho et al., [Understanding the Efficacy of Phishing Training in Practice](https://sysnet.ucsd.edu/~voelker/pubs/phishtrain-oakland25.pdf), IEEE Symposium on Security and Privacy, 2025. The study covered 19,789 employees between January and October 2023. Click rates per lure ranged from 1.82% to 30.80%, trained users failed 1.7 percentage points less often than the control group, and 56% of staff failed at least once. UC San Diego [describes it](https://today.ucsd.edu/story/cybersecurity-training-programs-dont-prevent-employees-from-falling-for-phishing-scams) as the largest study of its kind to date.

[^3]: Lain, Kostiainen and Capkun, [Phishing in Organizations: Findings from a Large-Scale and Long-Term Study](https://arxiv.org/abs/2112.07498), ETH Zurich, 2022.

[^4]: KnowBe4 Threat Lab, [The Rise of Legitimate-Service Phishing](https://blog.knowbe4.com/the-rise-of-legitimate-service-phishing-1-in-10-phishing-emails-now-comes-from-a-platform-you-trust), October 2026. Nearly one in ten of the 544,000 threat emails tracked between June and August 2026 were sent through trusted services, with DocuSign and QuickBooks making up nearly two thirds of those.

[^5]: Dave Chismon, [Telling users to 'avoid clicking bad links' still isn't working](https://www.ncsc.gov.uk/blog-post/telling-users-to-avoid-clicking-bad-links-still-isnt-working), NCSC blog, December 2022.

[^6]: Verizon, [2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir), p. 50. Verizon notes it struggled to find companies running voice and text message simulations, so the phone-centric sample is small.

[^7]: Twilio, [Incident Report: Employee and Customer Account Compromise](https://www.twilio.com/blog/august-2022-social-engineering-attack), and Cloudflare, [The mechanics of a sophisticated phishing scam and how we stopped it](https://blog.cloudflare.com/2022-07-sms-phishing-attacks), both August 2022.

[^8]: [ESET Threat Report H1 2026](https://www.eset.com/int/business/threat-report/). Detections of ClickFix, the best-known form of this technique, grew by 108% between the second half of 2025 and the first half of 2026.

[^9]: NCSC, [Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing).

[^10]: Matt Linton, [On Fire Drills and Phishing Tests](https://security.googleblog.com/2024/05/on-fire-drills-and-phishing-tests.html), Google Security Blog, May 2024.

---
_Cover photo by [Jakub Żerdzicki](https://unsplash.com/photos/a-red-and-white-sign-on-a-concrete-wall-T-y-hZzNXWA) on [Unsplash](https://unsplash.com)._
