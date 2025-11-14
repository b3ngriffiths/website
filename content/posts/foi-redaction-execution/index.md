---
title: "Expert DPO Advice, Amateur Redaction Execution"
date: 2025-11-14
draft: false
description: "I FOI'd how much a school pays for DPO services. Their botched redactions showed the gap between expert advice and execution support."
tags: ["data protection", "information governance", "FOI"]
categories: ["Privacy"]
---

On 27th October 2025, I submitted a Freedom of Information (FOI) request to a school in England. I was intrigued to learn how much they spent on outsourced Data Protection Officer services, and whether it represented fair value for the public purse.

The response I received on 11th November was prompt, professional, and included a carefully reasoned Public Interest Test explaining why they were withholding certain commercial information under Section 43(2) of the Freedom of Information Act. They argued that disclosing the vendor's pricing could undermine the company's ability to negotiate future contracts and harm their competitive position.

Fair enough. Except for one problem: **the redactions didn't work.**

What I discovered wasn't just a failed redaction - it was a perfect illustration of the gap between expert data protection advice and the staff actually executing it.

## The Failure
The school provided three documents: a PDF invoice, an Excel order sheet, and a cover letter. Both the PDF and Excel file had been "redacted" to hide the pricing information they'd decided to withhold.

When I opened the PDF, I could immediately see that something was off. The numbers had been covered with what appeared to be digital scribble marks, but the text beneath looked like it might still be visible on zoomed in inspection. It took a few more seconds to confirm what I suspected: the data was fully selectable. I could highlight it, copy it, and paste it elsewhere. I was also able to use any PDF reader to search the numbers instantly.

The Excel file was even worse. The "redaction" consisted of nothing more than changing the cell fill colour to black. A single click on the cell revealed the full content in the formula bar. And then it got worse: someone had simply hidden some columns rather than deleting them. Unhiding them revealed additional unredacted data that was presumably assumed to be withheld. No actual deletion, no proper redaction, just cosmetic hiding.

<figure>
  <video controls width="100%" preload="metadata">
    <source src="pdf-reconstruction.mp4" type="video/mp4">
    Your browser doesn't support video playback.
  </video>
  <figcaption>Demo: PDF redaction reveal</figcaption>
</figure>

<figure>
  <video controls width="100%" preload="metadata">
    <source src="spreadsheet-reconstruction.mp4" type="video/mp4">
    Your browser doesn't support video playback.
  </video>
  <figcaption>Demo: Spreadsheet redaction reveal</figcaption>
</figure>

> _The demos above reconstruct the redaction failure. The [REDACTED] markers are my additions to protect identifiers. The financial figures shown aren't the real data, but demonstrate the identical technical failure: fully selectable text in the PDF and visible cell contents in Excel._

## The Response
When I informed the school of the redaction failure, their response was prompt and professional. They apologised, provided properly redacted documents, and confirmed they were investigating the incident with their DPO provider.

But here's what makes their reply so illuminating. The school emphasised their commitment to "ensuring the security and protection of personal information" and confirmed they "work closely with [their DPO provider] to ensure that we always have a robust and effective data protection program in place." They highlighted their "comprehensive policies, procedures, and technical measures to secure personal data."

All of this could be true. The policies existed, procedures were documented, the DPO relationship was active.

And yet the execution failed spectacularly.

## The Gap Between Advice and Execution
Here's what makes this particularly amusing. This school pays [redacted] per year for outsourced DPO services from one of the region's largest providers. They're clearly investing in professional data protection expertise and genuinely trying to do the right thing.

Yet when it came to actually executing basic information governance in practice (you know, redacting a document for an FOI response), the fundamentals broke down.

The school has access to expert advice, guidance documents, templates, and helpline support. All the good stuff. But the person processing the FOI request still went for the 'if I cover my mouth, you can't hear me talking' approach to data security.

> Somewhere between the expert guidance and the actual FOI response, something got lost in translation.

But this isn't a failure of the DPO service provider. It's a structural gap in how these services work.

DPO-as-a-Service providers offer advice, guidance, and expertise. What they typically don't offer is hands-on delivery or quality assurance of the day-to-day information governance work done by staff. The DPO provides the framework, internal staff handle the implementation.

The school's representative had access to all the guidance and templates they needed - their response confirmed they have "comprehensive policies, procedures, and technical measures" in place. But when it came time to actually redact a document, something broke down. They lacked the skills, training, or confidence. Or perhaps they simply needed a concrete example of what proper redaction looks like.

> This is the reality for many schools: expert advice available, but under-resourced and under-skilled staff left to execute complex information governance tasks without adequate support or oversight.

To break it down another way, they pay for expert advice that likely supported them with detailed and correct justification for applying exemption… but it was wasted advice because they provided the data in execution anyway.

## Why This Matters
In this case, the consequences were relatively minor - I now know how much the school pays for their DPO service, hardly catastrophic information. But that's not the point.

When I informed the school of the redaction failure, I raised a more serious concern: if these same techniques (digital scribbles, black cell formatting) had been used for other requests, what else might they have inadvertently disclosed? The same methods that failed to protect commercial information could have exposed safeguarding information, student data, or confidential and personal information.

The school confirmed they were investigating their redaction procedures - exactly the right response. But this highlights how execution gaps often remain invisible until they fail in practice.

> **⚠️ The Real Risk**  
> This isn't about one failed redaction on commercial information, but a systematic gap between policy and practice that could affect far more sensitive data. If these methods were used for other requests, personal data could have been unintentionally disclosed.

So how do we close this gap?

## What Good Looks Like
Effective DPO services need to acknowledge this reality and help bridge the gap between advice and execution.

This doesn't necessarily mean the DPO does all the work (that would be neither practical nor affordable for most schools), but it does mean addressing the quality assurance problem. Options might include:

- Practical, hands-on training on technical execution (not just policy documents and advice)
- Optional quality review of sensitive outputs before release
- "Redaction as a service" for complex or high-risk requests
- Sample audits of completed work to identify systemic issues
- Clear escalation pathways when staff are uncertain

The key is recognising that templates and guidance alone don't prevent delivery failures when staff lack the foundational skills, time, or confidence to apply them correctly.

## The Responsibility Question
Here's the uncomfortable reality: schools can't outsource ultimate responsibility for information governance.

Under UK GDPR, the school is the data controller. They make the decisions, they carry the liability, and they're accountable for what happens with information in their care. The DPO service is there to advise, not to take over.

This means schools need internal staff with sufficient information governance capability to execute day-to-day tasks competently. But many schools are operating with overstretched staff juggling multiple responsibilities, without the specialised skills or time to handle complex information requests properly.

Advisory services can supplement capability, but they can't replace it. And they certainly can't make up for fundamental under-resourcing. Which means the question isn't just 'what should DPO services provide?' It's 'what should we demand, knowing we carry the ultimate responsibility?'

## What Schools Should Demand
If you're procuring or renewing DPO services, get clear on what you're actually paying for:

> **What advisory services typically provide:**
> - Expert advice and policy guidance
> - Templates and resources
> - Training materials and e-learning
> - Helpline support for queries

And crucially, understand what's _not_ included in most standard agreements:

> **What they typically don't provide:**
> - Hands-on execution of FOI responses, SARs, or data breaches
> - Quality assurance review of your outputs before they go out
> - Taking responsibility for decisions (that always stays with the data controller)
> - Compensating for under-resourced or under-skilled staff

Instead of accepting the standard package, ask these questions:

> **What you should push for:**
> - How does the service help us build internal capability, not just provide external expertise?
> - What quality assurance or review options are available for high-risk activities?
> - Can we escalate for hands-on support when we're uncertain?
> - How will you help us identify gaps between our policies and our practice?

The goal isn't to outsource your information governance problems. It's to build genuine capability within your organisation, with expert support that extends beyond policy documents.

---

## The Takeaway
The school did many things right. They acknowledged my request promptly, conducted a proper Public Interest Test, and invested in professional DPO services. The intent was there.

But intent without execution is just expensive policy documentation.

The gap between expert advice and amateur execution is where risk lives. Whether it's a failed redaction on an FOI response or a more serious data breach, having the right policies doesn't protect you if the people implementing them lack the capability to execute properly.

Schools should absolutely use DPO services where appropriate. But the critical issue is whether those services are designed to bridge the execution gap, or simply provide advice that never reaches the front line.

If you're paying for expertise that stops at guides and a helpline number, you're not paying for information governance. You're paying for liability insurance that won't pay out when you need it - **expertise that never reaches the work itself.**