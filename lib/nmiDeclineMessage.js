/**
 * Turn an NMI gateway response into something a customer can act on.
 *
 * The raw `responsetext` ("DECLINE", "Pickup card", "Invalid merchant account")
 * was being shown verbatim at checkout, which reads as alarming and tells the
 * customer nothing useful.
 *
 * Only problems the customer can actually fix on the page get a specific
 * message. Anything genuinely refused by the issuing bank — or any unrecognised
 * gateway error — points them at their bank, which is the only place that can
 * resolve it.
 *
 * NMI response_code reference: 2xx are issuer declines, 3xx gateway/config
 * errors, 4xx risk/fraud rejections.
 */

// Card-detail problems. These are worth naming precisely: the customer can
// correct them without contacting anyone.
const FIXABLE = {
  // Invalid card number
  220: "That card number doesn't look right. Please check it and try again.",
  221: "That card number doesn't look right. Please check it and try again.",
  // Invalid expiry
  222: "The expiry date looks incorrect. Please check it and try again.",
  223: "That card appears to have expired. Please use a different card.",
  // Invalid CVV / security code
  225: "The security code looks incorrect. Please check the 3 digits on the back of your card and try again.",
  // AVS / address mismatch
  // (NMI returns 200 with an avsresponse for these; handled separately below.)
};

const BANK_MESSAGE =
  "Payment unsuccessful. Please contact your bank, or try a different card.";

// Text patterns that identify a card-detail problem when no usable code is
// returned. Gateways are inconsistent about codes, so this is a safety net.
const FIXABLE_PATTERNS = [
  { re: /invalid.*(card|account) number|card number.*invalid/i, message: FIXABLE[220] },
  { re: /expir/i, message: FIXABLE[223] },
  { re: /cvv|cvc|security code|card code/i, message: FIXABLE[225] },
  { re: /invalid.*(zip|postal)|avs/i, message: "The billing ZIP code doesn't match your card. Please check it and try again." },
];

/**
 * @param {object} parsed  Parsed NMI response (response, response_code, responsetext)
 * @returns {string} A customer-facing message. Never the raw gateway text.
 */
export function nmiDeclineMessage(parsed = {}) {
  const code = Number(parsed.response_code);
  const text = String(parsed.responsetext || "");

  if (Number.isFinite(code) && FIXABLE[code]) return FIXABLE[code];

  for (const { re, message } of FIXABLE_PATTERNS) {
    if (re.test(text)) return message;
  }

  // Everything else — issuer declines, insufficient funds, fraud holds,
  // gateway/configuration errors — is not something the customer can correct
  // here, and the specifics are not safe to expose.
  return BANK_MESSAGE;
}
