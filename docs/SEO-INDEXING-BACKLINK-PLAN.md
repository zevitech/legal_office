# Google Indexing and Domain Authority Plan

## Current evidence

- Google can surface the homepage in a `site:` search, but that search is only a discovery hint and is not a substitute for Search Console URL Inspection.
- The production sitemap and robots endpoints are available in the current release foundation.
- The local Google SEO integration is not connected: no Search Console OAuth/service account, PageSpeed API key, or GA4 property is configured.
- The available backlink tier is Common Crawl only. Moz and Bing Webmaster credentials are not configured, so a complete referring-domain, anchor, toxicity, or link-velocity score would be misleading.

## Google indexing workflow

1. Verify a domain property for `legaltrademarkoffice.com` in Google Search Console.
2. Submit `https://www.legaltrademarkoffice.com/sitemap.xml` in the Sitemaps report.
3. Inspect and request indexing for the homepage and `/trademark-registration` after the preview branch is released.
4. Inspect each new educational URL after it is published and linked from the guides hub.
5. Review Page indexing weekly for four weeks: submitted versus indexed, duplicate canonical selection, crawled-not-indexed, and discovered-not-indexed.
6. Track queries and pages after Search Console's normal reporting delay; prioritize pages with impressions but positions 4–15.

Do not use Google's Indexing API for ordinary service or guide pages. Google documents that API for JobPosting and livestream BroadcastEvent pages. Sitemap submission, internal links, and URL Inspection are the appropriate workflow here.

## Backlink acquisition principles

- Build links to both the homepage and useful educational pages; do not force every link to the registration landing page.
- Prefer branded or natural anchors such as `Legal Trademark Office`, the naked domain, or the title of a cited guide.
- Do not buy links, use private blog networks, mass-submit generic directories, exchange sitewide footer links, or create exact-match anchor campaigns.
- Do not disavow links without a manual action, a documented negative-SEO attack, or a strongly verified toxic pattern.

## Priority campaigns

### 1. Entity and business citations

Claim and fully complete legitimate profiles where the company is eligible. Keep the legal entity name, phone, website, address/service area, and independent filing-support category consistent. Never claim government affiliation, law-firm status, attorney credentials, accreditation, awards, or ratings that cannot be verified.

Homepage target: branded citation links and naked-domain links.

### 2. Educational resource outreach

Publish the process, cost, search, classes, filing-basis, specimen, and checklist guides first. Each guide must cite current USPTO sources and provide original diagrams, checklists, or workflow screenshots. Outreach should pitch the genuinely useful resource—not payment for a link—to small-business resource libraries, incubators, entrepreneur education programs, chambers, and relevant publishers.

Target: links to the guide that best answers the publisher's audience question, with the guide title as the natural anchor.

### 3. Digital PR and original data

Create only evidence-backed first-party assets, for example anonymized counts of commonly missing application information or a documented customer workflow study. Publish the methodology, sample size, date range, and limitations. Pitch the resulting dataset or visual to business and intellectual-property reporters.

Target: editorial links to the original research, which internally links to the homepage and relevant service page.

### 4. Unlinked brand mentions

Monitor the company name and domain. Where a legitimate publisher already mentions the business without a link, request a link to the homepage. Do not contact complaint authors or independent reviewers merely to influence or suppress criticism.

### 5. Link reclamation

After Moz, Bing, or Search Console link data is connected, identify backlinks pointing to 404 or redirected URLs. Permanently redirect only when there is a genuinely equivalent destination; otherwise restore useful content or leave the 404.

## Measurement

Track monthly:

- valid indexed pages in Search Console;
- homepage and guide impressions/clicks;
- referring domains by quality tier;
- branded, naked, generic, partial-match, and exact-match anchor ratios;
- new and lost editorial links;
- links to the homepage versus commercial and educational pages;
- conversions attributed to organic landing pages.

No numeric backlink health score should be published until at least four of the seven required factors have reliable data.

## Access required for the next evidence level

- Google Search Console OAuth or service-account access to the domain property;
- a PageSpeed/CrUX API key for repeatable field and lab checks;
- GA4 property access for organic landing-page outcomes;
- free Moz API and Bing Webmaster credentials, or a paid backlink data provider, for anchor, spam, referring-domain, and competitor-gap evidence.
