# Final Pre-Production SEO Audit

Audit date: August 24, 2026  
Audited commit: `7e53e46`  
Release verdict: **HOLD**  
SEO health score: **78/100**

## Executive summary

The technical release, rendered schema, crawl discovery, tracking configuration, guide UI, canonical host, redirect, and isolated production build pass. Production should not be deployed until the business resolves a material pricing contradiction and the conversion funnel receives a metadata-only noindex directive.

## Scores

| Category | Score |
|---|---:|
| Technical SEO | 88/100 |
| Content quality | 61/100 |
| On-page SEO | 84/100 |
| Schema | 92/100 |
| Performance readiness | 70/100 |
| GEO / AI search | 75/100 |
| Images | 80/100 |

## Go-live blockers

### 1. Contradictory pricing and monitoring promises

The cost guide states that the $49, $149, and $249 service prices exclude the $350-per-class USPTO government fee. The existing checkout funnel states that a package includes the $350 government fee. Package data also conflicts about monitoring: the visible comparison shows no monitoring in Basic/Standard and six months in Advanced, while another package constant says one month is included.

The business must identify the actual contract and fulfillment policy. All customer-facing descriptions must then match it. This cannot be safely inferred from code.

### 2. Conversion funnel is indexable

`/trademark-register` is internally linked and has ordinary metadata without `noindex`. It can compete with the intended commercial page `/trademark-registration`. Apply `noindex, follow` to the funnel layout without changing its functionality. Reconsider robots blocking for child steps because a crawler cannot observe a page-level noindex when crawling is blocked.

## Passed checks

- Clean isolated build completed 89/89 routes.
- Clean production runtime returned 200 for primary public routes.
- Sitemap contains 34 unique static URLs, including all 20 guides.
- All 20 guides have unique titles, descriptions, self-canonicals, one H1, Article schema, Breadcrumb schema, official citations, related links, and a link to the primary commercial URL.
- Hub has CollectionPage, ItemList, and BreadcrumbList schema and links all 20 guides.
- `/guides` is linked from desktop navigation, mobile navigation, and footer.
- Old `/services/trademark-registration` permanently redirects to `/trademark-registration` and is excluded from the sitemap.
- Exactly one executable Google Ads ID: `AW-16565473053`.
- GTM remains `GTM-KJGHNHGM`; Clarity remains `ouge10k1z4`.
- No pending branch changes affect API, payment, form, funnel logic, client portal, or admin portal.
- Homepage and primary landing page each render one H1 and correct canonicals.
- Robots, sitemap, canonicals, schema URLs, and `/llms.txt` consistently use HTTPS `www`.

## High-priority warnings

- Seventeen new guides contain roughly 326–504 core words and use a similar template. Distinct intent is good, but legal/YMYL authority would be stronger with staged publication or substantive human expansion and review.
- No verified person author/reviewer, credential, first-hand evidence, or original research is available. Organization-only publishing is truthful but limits E-E-A-T.
- `/blogs` remains indexable and in the sitemap while Contentful currently has zero published posts.
- Contentful was unreachable during local builds. Static sitemap fallback works, but future dynamic blog URLs depend on production credentials/connectivity.
- Guide titles are generally long and may be truncated in search results.
- Article schema lacks a representative `image` property.
- Two guides receive no article-to-article inbound links, although both are linked from the hub.
- Homepage first-load JavaScript remains approximately 465 KB; landing page is 187 KB and guides are 166 KB.
- No live CrUX or PageSpeed field validation was available before deployment.

## Off-page SEO timing

Off-page work begins after the destination guides are live and crawlable. Outreach must use genuine business details and a verified human sender. No backlinks are currently claimed as acquired. After deployment, use the prepared outreach queue for eligible U.S. business organizations and educational resource publishers; do not use automated directories, paid link networks, fabricated reviews, or repetitive exact-match anchors.

