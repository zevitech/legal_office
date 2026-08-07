# Legal Trademark Office — Google Ads/GTM funnel

The website loads one container: `GTM-KJGHNHGM`. Google Ads and GA4 destinations
must be configured inside that container. Do not add a second hard-coded `gtag.js`
snippet to the website, because that can duplicate hits.

## Production dataLayer events

| Event | Funnel step | Recommended use |
| --- | ---: | --- |
| `lto_form_start` | 1 | GA4 observation only |
| `lto_qualified_lead` | 1 | Google Ads secondary conversion |
| `lto_classification_complete` | 2 | GA4/secondary funnel observation |
| `lto_package_selected` | 3 | GA4/secondary funnel observation |
| `lto_addon_change` | 4 | GA4 observation only |
| `lto_begin_checkout` | 4 | Google Ads secondary conversion |
| `lto_purchase` | 5 | Google Ads primary conversion |

All events include `funnel_id`, `funnel_step`, and `service_type`. The purchase
event also includes `transaction_id`, `value`, and `currency`. The transaction ID
and browser-session deduplication prevent a thank-you refresh from counting a
second purchase. Qualified Lead and Purchase include SHA-256 hashed email and
phone matching signals under `user_data` when valid contact data is available.
Raw contact data is never pushed to the data layer. Development/local-preview
events are suppressed.

## GTM configuration checklist

1. Publish one Google tag for the old Legal Trademark Office Ads account
   (`AW-16565473053`) on **Initialization – All Pages**.
2. Keep one Conversion Linker tag on **All Pages**.
3. Create Custom Event triggers matching the event names above exactly.
4. Connect `lto_purchase` to the old account's Purchase conversion label. Pass
   `value`, `currency`, and `transaction_id` from Data Layer Variables.
5. Set Purchase as **Primary** and Begin Checkout/Qualified Lead as **Secondary**
   in Google Ads. Do not attach two Google Ads conversion tags with the same
   conversion ID and label to one event.
6. Enable enhanced conversions for the account and accept Google's customer-data
   terms. In the Qualified Lead and Purchase conversion tags, configure a
   **Custom JavaScript/user-provided data variable** that reads the event's
   `user_data.sha256_email_address` and `user_data.sha256_phone_number` values.
   These values are already normalized and SHA-256 hashed. Never send trademark
   answers, uploaded files, addresses, or card details to Google Ads.
7. Preview the full production funnel in Tag Assistant before publishing. Confirm
   each event appears once, and confirm Purchase appears only after a successful
   payment response.

The website stores `gclid`, `wbraid`, and `gbraid` when present and includes them
in the paid lead payload for attribution.
