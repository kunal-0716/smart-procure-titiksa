import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    login: {
      title: 'Smart Procure',
      subtitle: 'Select a role to enter the demo',
      farmerBtn: 'Farmer Demo',
      officerBtn: 'Officer Demo',
      operatorBtn: 'Operator Demo',
      adminBtn: 'Admin Demo'
    },
    // ... add more translations here
  }
};

// Hindi translations (Demo translations)
const hi = {
  translation: {
    login: {
      title: 'स्मार्ट प्रोक्योर',
      subtitle: 'डेमो दर्ज करने के लिए एक भूमिका चुनें',
      farmerBtn: 'किसान डेमो',
      officerBtn: 'अधिकारी डेमो',
      operatorBtn: 'ऑपरेटर डेमो',
      adminBtn: 'एडमिन डेमो'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      hi,
      // Add placeholders for other 20 Indian languages to demonstrate architectural support
      as: { translation: {} }, // Assamese
      bn: { translation: {} }, // Bengali
      brx: { translation: {} }, // Bodo
      doi: { translation: {} }, // Dogri
      gu: { translation: {} }, // Gujarati
      kn: { translation: {} }, // Kannada
      ks: { translation: {} }, // Kashmiri
      kok: { translation: {} }, // Konkani
      mai: { translation: {} }, // Maithili
      ml: { translation: {} }, // Malayalam
      mni: { translation: {} }, // Manipuri
      mr: { translation: {} }, // Marathi
      ne: { translation: {} }, // Nepali
      or: { translation: {} }, // Odia
      pa: { translation: {} }, // Punjabi
      sa: { translation: {} }, // Sanskrit
      sat: { translation: {} }, // Santali
      sd: { translation: {} }, // Sindhi
      ta: { translation: {} }, // Tamil
      te: { translation: {} }, // Telugu
      ur: { translation: {} }, // Urdu (Requires RTL layout support handling in CSS based on lang="ur")
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
