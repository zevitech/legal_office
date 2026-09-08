// Intake descriptions only: new activities require attorney classification review.
export const extraIndustries = [
  ["Real estate & property", ["Real estate brokerage", "Property management", "Vacation property rentals", "Real estate development", "Home inspection", "Real estate photography"]],
  ["Travel & hospitality", ["Hotel or guest accommodation", "Vacation rental hosting", "Travel planning", "Tour guide services", "Event venue rental", "Campground or RV park"]],
  ["Home goods & lifestyle", ["Furniture and home furnishings", "Candles and home fragrances", "Kitchenware and cookware", "Home decor and artwork", "Bedding and bath products", "Home appliances"]],
  ["Events & celebrations", ["Wedding planning", "Party and event planning", "Event equipment rental", "Event photography and videography", "Florist and floral arrangements", "DJ and live entertainment"]],
  ["Community & nonprofit", ["Charitable fundraising", "Community outreach programs", "Religious organization services", "Membership association", "Volunteer coordination", "Social support services"]],
  ["Security & personal services", ["Security guard services", "Security system installation", "Locksmith services", "Personal concierge services", "Personal shopping", "Laundry and dry cleaning"]],
  ["Creators & digital products", ["Social media content creation", "Podcast production", "Digital templates and downloads", "Online creator education", "Photography licensing", "Subscription content publishing"]],
].map(([name, labels]) => ({name, activities: labels.map(label => ({label, classNo: null, reviewRequired: true}))}));

const synonyms = {
  realtor: "real estate brokerage", airbnb: "vacation rental", youtuber: "content creation",
  influencer: "social media", dropshipping: "online retail", ecommerce: "e commerce",
  tshirt: "clothing", tshirts: "clothing", hoodie: "clothing", hoodies: "clothing",
  barber: "salon", plumber: "plumbing", electrician: "electrical", app: "software",
  apps: "software", freelancer: "consulting", bookkeeping: "accounting",
};
export const normalizeSearch = text => String(text).toLowerCase().replace(/\bt[ -]?shirts?\b/g, "clothing").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const stem = word => word.length > 4 ? word.replace(/s$/, "") : word;
function closeWord(a, b) {
  if (a.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (b.length >= a.length) j++;
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}
export function matchesBusiness(text, query) {
  const source = normalizeSearch(text);
  const words = normalizeSearch(query).split(" ").filter(Boolean);
  return words.every(word => source.includes(word) || source.split(" ").some(token => stem(token) === stem(word) || closeWord(token, word)) || (synonyms[word] && synonyms[word].split(" ").every(alias => source.includes(alias))));
}
export function suggestActivities(groups, description) {
  // Suggestions must not use fuzzy/manual-search matching: goods != foods,
  // sports != esports. Generic words alone do not establish business intent.
  const ignored = new Set("i we a an the and or for to of my our business sell sells selling provide providing make making have want with in is it online goods products services service custom also do does".split(" "));
  const words = normalizeSearch(description).split(" ").filter(word => word.length > 2 && !ignored.has(word));
  const source = normalizeSearch(description);
  const sportsProducts = /\b(sports?|sporting) (goods|equipment|products)\b/.test(source);
  const printing = /\b(print|prints|printing|embroidery)\b/.test(source);
  const tokenMatch = (label, word) => {
    const tokens = normalizeSearch(label).split(" ").map(stem);
    const aliases = { ...synonyms, print: "printing", prints: "printing", sporting: "sports" };
    return tokens.includes(stem(word)) || !!(aliases[word] && aliases[word].split(" ").every(alias => tokens.includes(stem(alias))));
  };
  const relevant = (item, word) => {
    if (sportsProducts && /\b(sports|sporting)\b/.test(word)) return item.label === "Sporting goods";
    if (printing && /design/.test(word) && !/\bfashion design\b/.test(source)) return item.label === "Custom printing or embroidery";
    return tokenMatch(item.label, word);
  };
  const mentionsPets = /\b(pet|pets|animal|animals|dog|dogs|cat|cats)\b/.test(normalizeSearch(description));
  const ranked = groups.flatMap(group => group.activities.map(activity => ({...activity, industry: group.name, score: words.reduce((score, word) => score + (relevant(activity, word) ? 2 : 0), 0)})))
    .filter(item => item.score > 0 && (mentionsPets || item.industry !== "Pets & animals"))
    .sort((a,b) => b.score - a.score);
  // Represent separate business activities before adding more of the same kind.
  const chosen = [];
  for (const word of words) {
    const match = ranked.find(item => relevant(item, word));
    if (match && !chosen.some(item => item.label === match.label)) chosen.push(match);
  }
  for (const item of ranked) {
    if (!chosen.some(existing => existing.label === item.label)) chosen.push(item);
  }
  return chosen;
}
