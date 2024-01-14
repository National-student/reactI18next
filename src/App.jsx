import { useTranslation } from "react-i18next";
import { Language } from "./language/Language";
import i18next from "i18next";
import cookie from "js-cookie"
import { useEffect } from "react";

const LangIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className="bi bi-translate"
    viewBox="0 0 16 16"
  >
    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
  </svg>
);


function App() {
  const { t } = useTranslation();

  const currentLanguageCode = cookie.get("i18next") || "eng"

  const currentLanguage = Language.find(l => l.code === currentLanguageCode)

  const releaseDate = new Date("2023-01-14");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    document.title = t("app_title")
  }, [t])

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <LangIcon />
          </button>
          <ul className="dropdown-menu">
            {Language.map(({ code, name, country_code }) => (
              <li
                className="d-flex align-items-center dropdown-item"
                key={country_code}
              >
                <span style={{opacity: code === currentLanguageCode ? .5 : 1}} className={`fi fi-${country_code}`}></span>
                <button className="dropdown-item" disabled={code === currentLanguageCode } onClick={() => i18next.changeLanguage(code)}>{name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <h1 className="fw-bold mb-3">{t("welcome_message")}</h1>
        <p>{t("days_since_birthday", { number_of_days })}</p>
      </div>
    </div>
  );
}

export default App;
