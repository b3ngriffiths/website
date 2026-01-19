---
title: "I Red Teamed Our Red Team in 6 Minutes"
date: 2026-01-18
draft: false
description: "How I impersonated our CISO and phished the people who socially engineer for a living"
tags: ["security", "social engineering", "Microsoft 365", "red team", "insider threat"]
categories: ["Security"]
cover:
    image: "cover.jpg"
    alt: "Office scene showing a Blue Team member with 'CISO... honestly' badge reaching for a confidential Red Team report while the Red Team operator works obliviously at their laptop"
    hiddenInSingle: false
    hiddenInList: true
---

Those of you who know me personally won't find this hard to believe, but at times, I can be mischievous. Nothing illegal, often for my own amusement or to validate a point.

Let me share a story with you.

Winter 2024, a member of the vulnerability management team sent me an interesting article.  Not a typical vulnerability, there was nothing to 'patch', but a feature in official Microsoft tool that could present a security weakness.

The article detailed how Microsoft Bookings, a legitimate scheduling tool enabled by default in most Microsoft 365 tenants, automatically provisions working mailboxes when you create shared booking pages. No IT approval needed, no helpdesk ticket, just a few clicks for instant creation. The mailbox looks legitimate because it *is* legitimate: real Microsoft 365 mailbox, passes SPF/DKIM/DMARC checks, sits right alongside every other mailbox in your tenant.

Reading the article, I immediately saw the potential. And obviously, I had to test it.
As Security Operations, I'm part of the defenders, the blue team, those on a mission to detect and respond to threats.  Our Red Team, as part of Offensive Security, are motivated by the exact opposite; thinking and acting like attackers, breaking things, finding weaknesses, designing social engineering and challenging trust assumptions.

Target acquired, our healthy rivalry made the choice obvious.

## The Setup
Microsoft Bookings includes a feature called "Shared Booking Pages" - it's designed to let teams create appointment scheduling without IT involvement. Completely legitimate business functionality and enabled by default in most tenants (be warned IT administrators and security teams, more on that later).

When you create a shared booking page, you are asked to give it a name.  Let's say "John Doe". Microsoft automatically provisions a fully functional mailbox based on that name: `JohnDoe@company.com` - just removes the spaces, no questions asked.

No approval workflow. No IT ticket. No security review. Just instant mailbox creation, entirely bypassing your organisation's normal account provisioning controls.

I created a booking page using our CISO's name. Microsoft helpfully provisioned the mailbox: `FirstnameLastname@company.com` instead of the legitimate `Firstname.Lastname@company.com`. Close enough to pass a glance test, even harder to notice if the email client truncates the address on a smaller screen, but different enough to be technically distinct.

The mailbox was now live. I could simply access the mailbox and send and receive emails. It appeared in our Global Address List alongside legitimate accounts. From a technical perspective, it was indistinguishable from any other mailbox in our tenant.

Then I sent an email to the Red Team operator:
```
Hi,

I am with the board looking for a copy of latest red team report. Can you send me pdf please?

Thanks,

Firstname Lastname
CISO
[usual email signature]
```
Urgent, plausible, authority-driven.  All the classic social engineering pressure points we train people to spot.

Would it work?

**They responded in minutes, 6 minutes to be exact.** Full report, no questions asked.

It was only a few hours later when the Red Team operator must have mentioned the board request to our actual CISO that things clicked.

Given my role in security incident response a Zoom call came flying in soon after. A slightly flustered CISO and Red Team operator, rapidly trying to establish what had happened and how.  

Unbeknown to them, they called the perp. I fessed up and explained it was me, there was visible relief and laughter. Oops. I was then asked to give CISO a heads-up before running tests involving executive impersonation.

The Red Team took it very well.  Banter!

But here's the uncomfortable reality. The red team report was relatively low-risk in my hands. What if someone with malicious intent had discovered this technique?

## The Worst Part? It Could Have Been Much Worse
This technique doesn't require sophisticated access. Any user with a Microsoft 365 account can do this. That means two threat scenarios:

- **Malicious insiders** - disgruntled employees, rogue contractors, anyone with legitimate credentials and bad intent.

- **Compromised accounts** - an attacker who's phished even a single low-privilege user now has a pathway to impersonate anyone in your organisation.

Once they have that foothold, here's some ideas of what becomes possible:

**Internal scenarios:**
- Abuse internal processes to request privileged access or credentials, enabling lateral movement and privilege escalation
- Impersonate HR to gather personal employee information or conduct fake disciplinary procedures
- Create "IT Security" mailbox requesting password resets or audit data from helpdesk
- Pose as Finance/Accounts Payable to alter vendor payment details mid-transaction
- Appear as an internal system or tool, such as an expenses platform, to manipulate users
- Send company-wide communications appearing to be from leadership during a crisis

**External scenarios:**
- Impersonate customer support to harvest credentials from clients
- Pose as procurement to manipulate supplier contracts or payment terms
- Send malicious attachments to partners appearing to be from legitimate company contacts
- Hijack domain verification emails by creating `admin@`, `hostmaster@`, or `webmaster@` addresses

## What This Really Shows

Insider threat doesn't require malicious intent. It requires access, opportunity, and organisational trust.

The gap between security awareness training and actual behaviour under pressure is significant. Everyone "knows" to verify sender addresses. Everyone "knows" to question urgent requests from leadership. But knowing and doing are different things, especially when the email looks legitimate, comes from a trusted domain, carries the weight of authority, and demands urgency.

Even security professionals have blind spots. Our Red Team's entire job is thinking like attackers, yet they fell for an insider scenario because it exploited organisational trust rather than technical vulnerabilities. That's the uncomfortable reality: insider attacks don't look like attacks. They look like normal business operations until they're not.

**Technical controls have limits.** Microsoft Bookings exists because it solves a legitimate business need - it allows teams to manage appointments and shared calendars efficiently. Blocking it entirely would create friction and drive users to find workarounds, probably less secure ones. The security challenge isn't preventing the feature from existing, it's detecting when it's being abused.

**Trust assumptions create risk.** We implement SPF, DKIM, DMARC. We deploy email threat protection controls. We train users to spot suspicious indicators in emails from external senders. But we collectively assume internal emails are safe. That assumption is precisely what attackers, whether internal or external actors, would look to abuse.

The Red Team learned something valuable: being right about external threats doesn't make you immune to internal ones. They think like malicious insiders professionally, but that doesn't mean they can't be fooled by one.

And I learned that while testing security controls is part of my remit, going rogue and impersonating senior leadership, whilst highly entertaining, probably warranted a conversation first. Lesson learned.

## How To Detect This Before It Becomes A Problem
After the initial amusement wore off, we needed to actually fix this. Here's what we did, and what you can do if you're concerned about this in your environment.

### Step 1: Audit What Already Exists
First, understand your current exposure. Check what Bookings mailboxes exist:
```
Connect-ExchangeOnline
Get-Mailbox -RecipientTypeDetails SchedulingMailbox
```
For each one, investigate:
- Who created it and when?
- Is it actively used?
- Does the name look suspicious (executives, system accounts)?

We found a handful of abandoned booking pages. None were malicious, but that was luck, not security controls.

### Step 2: Assess Business Need
Determine whether anyone actually needs Shared Booking Pages. Talk to the teams who created them.
For us, nobody needed it. Teams had moved to other solutions.

### Step 3: Implement Detection (Immediately)
While auditing, you need protection against new abuse. When a Booking page is created, Exchange Online logs a `New-SchedulingMailbox` event.

I really hope you're collecting these Microsoft 365 audit logs.

For smaller organisations, it may be feasible to review all `New-SchedulingMailbox` events manually.

For larger organisations or multi-nationals, focus your alerts on higher-risk indicators:
- Display name matches existing executives (fuzzy matching for variations)
- Created by users outside expected departments
- Typosquatting patterns mimicking internal services or tools (e.g. "ITSupport" vs legitimate "IT.Support")
- Created outside business hours
- Multiple created in rapid succession

We implemented detection immediately, to provide that coverage during that audit period.  Zero alerts, but if someone had tried we'd have caught it.

### Step 4: Prevention
Once the audit confirmed no business need, we disabled it:
```
Connect-ExchangeOnline
Set-OrganizationConfig -BookingsEnabled $false
```
**If your organisation genuinely needs Bookings:**
1. Claim high-value addresses preemptively (`admin@`, `postmaster@`, `hostmaster@`, `finance@`, `hr@`, `legal@`, etc.)
2. Restrict creation to specific departments via policy
3. Maintain continuous monitoring for suspicious mailbox creation patterns via detection rules

Our detection rule stayed active even after disabling Bookings. If the setting regresses accidentally, we'll know immediately.

--- 

### **Further Reading**
For the full technical breakdown of Microsoft Bookings security implications, Geoff Jones at Cyberis has written an excellent deep-dive: [Microsoft Bookings - Facilitating Impersonation](https://www.cyberis.com/article/microsoft-bookings-facilitating-impersonation).