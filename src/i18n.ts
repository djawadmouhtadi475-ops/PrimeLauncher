import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "Prime Launcher",
      "dashboard": "Dashboard",
      "instances": "Instances",
      "content_hub": "Content Hub",
      "settings": "Settings",
      "about": "About",
      "play_now": "PLAY NOW",
      "ready_to_play": "Ready to Play",
      "mandatory_notice": "أول لانشر عربي | The First Arabic Minecraft Launcher",
      "studio": "GMU Studio (GMU Launcher)",
      "app_dev": "App Developer: djawad1",
      "web_dev": "Web Developer: egyptia26",
      "version": "Version 0.3.5"
    }
  },
  ar: {
    translation: {
      "app_name": "برايم لانشر",
      "dashboard": "الرئيسية",
      "instances": "الإصدارات",
      "content_hub": "مركز المحتوى",
      "settings": "الإعدادات",
      "about": "حول",
      "play_now": "العب الآن",
      "ready_to_play": "جاهز للعب",
      "mandatory_notice": "أول لانشر عربي | The First Arabic Minecraft Launcher",
      "studio": "ستوديو GMU (لانشر GMU)",
      "app_dev": "مطور التطبيق: djawad1",
      "web_dev": "مطور الويب: egyptia26",
      "version": "الإصدار 0.3.5"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
