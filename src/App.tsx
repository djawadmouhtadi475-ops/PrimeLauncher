import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { open } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import { Play, Library, DownloadCloud, Settings, Info, X, Monitor, Globe, Youtube, Languages } from 'lucide-react';

const LINKS = {
  website: 'https://primelauncherar.netlify.app/',
  discord: 'https://discord.gg/Dtwcwhhv4j',
  youtube: 'https://www.youtube.com/@PrimeLauncher'
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAbout, setShowAbout] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('blue');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(lang);
  }, [lang]);

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');
  const openLink = async (url: string) => await open(url);

  const themeClasses = {
    light: 'bg-gray-100 text-gray-900',
    dark: 'bg-gray-900 text-white',
    oled: 'bg-black text-white'
  }[theme];

  return (
    <div className={`flex h-screen w-screen font-sans ${themeClasses}`}>
      <nav className="w-64 flex flex-col justify-between p-4 border-r border-gray-800/50 bg-opacity-50">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2 pt-4">
            <div className={`w-8 h-8 rounded-md bg-${accent}-600 flex items-center justify-center font-bold text-white shadow-lg`}>
              P
            </div>
            <h1 className="font-bold text-xl">{t('app_name')}</h1>
          </div>

          <div className="space-y-2">
            <NavButton icon={<Play />} label={t('dashboard')} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} accent={accent} />
            <NavButton icon={<Library />} label={t('instances')} active={activeTab === 'instances'} onClick={() => setActiveTab('instances')} accent={accent} />
            <NavButton icon={<DownloadCloud />} label={t('content_hub')} active={activeTab === 'content'} onClick={() => setActiveTab('content')} accent={accent} />
            <NavButton icon={<Settings />} label={t('settings')} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} accent={accent} />
          </div>
        </div>

        <div className="space-y-2">
          <button onClick={toggleLanguage} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">
            <Languages size={20} /> <span className="font-medium">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <button onClick={() => setShowAbout(true)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition">
            <Info size={20} /> <span className="font-medium">{t('about')}</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 relative overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardTab t={t} accent={accent} />}
        {activeTab === 'instances' && <InstancesTab t={t} />}
      </main>

      <AnimatePresence>
        {showAbout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setShowAbout(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{t('app_name')}</h2>
                <p className={`text-${accent}-400 font-bold mb-4`}>{t('mandatory_notice')}</p>
                <p className="text-sm text-gray-400">{t('version')} | {t('studio')}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mb-6 text-sm text-center">
                <p className="text-white font-medium mb-1">{t('app_dev')}</p>
                <p className="text-white font-medium">{t('web_dev')}</p>
              </div>

              <div className="flex flex-col gap-3">
                <SocialBtn icon={<Globe size={18}/>} label="Official Website" onClick={() => openLink(LINKS.website)} color="bg-blue-600" />
                <SocialBtn icon={<Monitor size={18}/>} label="Discord Server" onClick={() => openLink(LINKS.discord)} color="bg-indigo-600" />
                <SocialBtn icon={<Youtube size={18}/>} label="YouTube Channel" onClick={() => openLink(LINKS.youtube)} color="bg-red-600" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ icon, label, active, onClick, accent }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${active ? `bg-${accent}-600/10 text-${accent}-500 border border-${accent}-500/20` : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
      {icon} <span className="font-medium">{label}</span>
    </button>
  );
}

function SocialBtn({ icon, label, onClick, color }: any) {
  return <button onClick={onClick} className={`flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition opacity-90 hover:opacity-100 ${color}`}>{icon} {label}</button>;
}

function DashboardTab({ t, accent }: any) {
  return (
    <div className="p-10 h-full flex flex-col justify-end pb-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10" />
        <img src="https://www.minecraft.net/content/dam/games/minecraft/key-art/MC-Vanilla-Keyart.jpg" alt="BG" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative z-20">
        <h1 className="text-5xl font-extrabold text-white mb-2">{t('ready_to_play')}</h1>
        <p className="text-xl text-gray-300 mb-8">Vanilla Minecraft 1.20.4</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`bg-${accent}-500 hover:bg-${accent}-400 text-white font-bold text-2xl py-5 px-16 rounded-xl shadow-2xl flex items-center gap-4`}>
          <Play fill="currentColor" size={32} /> {t('play_now')}
        </motion.button>
      </div>
    </div>
  );
}

function InstancesTab({ t }: any) {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">{t('instances')}</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center"><Monitor className="text-gray-400" /></div>
            <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded">Forge</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">RLCraft</h3>
          <p className="text-gray-400 text-sm mb-4">1.12.2 • 164 Mods</p>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium">Manage Instance</button>
        </div>
      </div>
    </div>
  );
}
