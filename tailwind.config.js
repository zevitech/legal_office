/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        beams: "url('/images/beams-home@95.jpg')",
        formHero: "url('/images/form-banner.jpg')",
        footer: "url('/images/Hero-Section-Background-05.jpg')",
        heroBanner: "url('/images/hero-banner.jpg')",
        homeBanner: "url('/images/ltm-home-hero.png')",
        itBanner: "url('/images/international-trademark.png')",
        strBanner: "url('/images/hero-image-trademark-registration.png')",
        aboutBg: "url('/images/about-bg.png')",
        contactBg: "url('/images/contact-bg.png')",
        faqBg: "url('/images/faq-page-bg.png')",
        freeSearch: "url('/images/free-trademark-search-bg.png')",
        renewal: "url('/images/trademark-renewal.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
