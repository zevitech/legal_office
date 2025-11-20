export const stateList = [
  { value: "", label: "Select a state" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "AA", label: "Armed Forces Americas" },
  { value: "AE", label: "Armed Forces Europe, Canada, Africa and Middle East" },
  { value: "AP", label: "Armed Forces Pacific" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "MH", label: "Republic of Marshall Islands" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export const organizationTypes = [
  { id: 1, label: "LLC" },
  { id: 2, label: "C Corporation" },
  { id: 3, label: "S Corporation" },
  { id: 4, label: "Non Profit" },
  { id: 5, label: "Partnership" },
  { id: 6, label: "Solo Proprietorship" },
  { id: 7, label: "Trust" },
  { id: 8, label: "Other" },
];

export const serviceList = [
  { id: 1, text: "Protect your brand nationwide" },
  { id: 2, text: "Enforce and defend your rights" },
  { id: 3, text: "70% of Self Filers make a mistake, avoid that today" },
  {
    id: 4,
    text: "Full Preparation and Filing of your Official Trademark with Federal",
  },
];

export const navItems = [
  {
    id: 1,
    text: "Home",
    route: "/",
  },
  {
    id: 2,
    text: "Our Services",
    route: "/services",
    subItems: [
      {
        id: 1,
        text: "Trademark Registration",
        route: "/services/trademark-registration",
      },

      {
        id: 2,
        text: "Trademark Renewal",
        route: "/services/trademark-renewal",
      },
      {
        id: 3,
        text: "Trademark Revival",
        route: "/services/trademark-revival",
      },
    ],
  },
  {
    id: 3,
    text: "Contact Us",
    route: "/contact-us",
  },
  {
    id: 4,
    text: "About Us",
    route: "/about-us",
  },
  {
    id: 5,
    text: "FAQ",
    route: "/faq",
  },
];

export const mobileNavItems = [
  {
    id: 1,
    text: "Home",
    route: "/",
  },
  {
    id: 3,
    text: "Contact Us",
    route: "/contact-us",
  },
  {
    id: 4,
    text: "About Us",
    route: "/about-us",
  },
  {
    id: 5,
    text: "FAQ",
    route: "/faq",
  },
  {
    id: 6,
    text: "Our Services",
    route: "/services",
  },
  {
    id: 7,
    text: "Trademark Registration",
    route: "/services/trademark-registration",
  },

  {
    id: 8,
    text: "Trademark Renewal",
    route: "/services/trademark-renewal",
  },
  { id: 9, text: "Trademark Revival", route: "/services/trademark-revival" },
];

export const similarMarks = [
  {
    flag: "usa-flag.png",
    name: "United States",
    details: "4 Million+ Trademarks",
  },
  {
    flag: "canada-flag.png",
    name: "Canada",
    details: "2 Million+ Trademarks",
  },
  {
    flag: "eu-flag.png",
    name: "European Union",
    details: "2 Million+ Trademarks",
  },
  {
    flag: "uk-flag.png",
    name: "United Kingdom",
    details: "3 Million+ Trademarks",
  },
];

export const recentlyTrademarked = [
  "postman.png",
  "divina_life.png",
  "guard_link.png",
  "fross.png",
  "re.png",
  "postman.png",
  "divina_life.png",
  "guard_link.png",
  "fross.png",
  "re.png",
];

export const whyChooseUs = [
  {
    icon: "wcu-1.png",
    heading: "Expertise You Can Trust",
    details:
      "Our team of seasoned trademark professionals brings years of experience to ensure your brand is protected with precision. Let us guide you through the process with expert legal knowledge and a commitment to your success.",
  },
  {
    icon: "wcu-2.png",
    heading: "Comprehensive Trademark Services",
    details:
      "We offer a full suite of trademark services tailored to your needs. From application filing to brand monitoring, we handle everything to ensure your intellectual property is secured for the long term.",
  },
  {
    icon: "wcu-3.png",
    heading: "Personalized Support for Brand",
    details:
      "Your brand's journey is unique, and so is our approach. With personalized support from our dedicated team, you'll receive customized solutions that fit your business's goals, ensuring peace of mind throughout the trademark process",
  },
  {
    icon: "wcu-4.png",
    heading: "Fast and Reliable Registration Process",
    details:
      "Time is critical when it comes to protecting your brand. Our efficient and reliable registration process ensures that your trademark is filed and processed as quickly as possible, without compromising on quality.",
  },
];
