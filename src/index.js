import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import App from './App';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    suppotedLngs: ["eng", "ru", "uz", "es"],
    fallbackLng: "eng",
    detection: {
      order: ["path", 'cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'subdomain'],
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

const loading = (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense fallback={loading}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.Suspense>

);