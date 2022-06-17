import React from "react";
import styles from "./styles.module.scss"
import {useTranslation} from "react-i18next";

const Settings = () => {
  const {t, i18n} = useTranslation()
    const changleLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
  return(
      <div className={styles.container}>
          <h1>{t("mainApp.setting.title")}</h1>
          <div className={styles.changeLang}>
              <h2 onClick={() => changleLanguage('ru')} className={styles.buttonLang}>RU</h2>
              <h2 onClick={() => changleLanguage('en')} className={styles.buttonLang}>EN</h2>
          </div>
      </div>
  )
}

export default Settings