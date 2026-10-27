import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { Button } from './Button';
import {
  ChevronDown,
  Menu,
  X,
  Lock,
  Globe,
  Heart,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { language, setLanguage, currentRoute, navigateTo, currentUser } = useApp();
  const t = useTranslation(language);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  const isAboutActive = currentRoute.startsWith('/about');
  const isProgramsActive = currentRoute.startsWith('/programs');

  const navLinkClass = (isActive: boolean) =>
    `group relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer select-none ${
      isActive ? 'text-[#690C07] font-bold' : 'text-[#232826] hover:text-[#690C07]'
    }`;

  const renderUnderline = (isActive: boolean) => (
    <span
      className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#690C07] transition-transform duration-300 ease-out origin-left ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F3EDE1]/95 backdrop-blur-md border-b border-[#E2D7C3] shadow-xs">
      {/* Top Banner Ribbon - Dominant Deep Red */}
      <div className="w-full bg-[#690C07] text-white py-1.5 px-4 text-xs font-label">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EFA62B] animate-pulse"></span>
            <span className="truncate">
              {language === 'fr'
                ? 'Relèvement Communautaire par la Jeunesse · Est de la RDC | Goma · Bukavu · Beni'
                : 'Youth-Led Community Recovery in Eastern DR Congo | Goma · Bukavu · Beni'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-rose-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EFA62B]" />
              {language === 'fr' ? 'Initiative Citoyenne Autonome' : 'Autonomous Grassroots Initiative'}
            </span>
            <span>·</span>
            <span>Ubuntu: « I am because we are »</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark & Logo */}
        <button
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 sm:gap-3.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#690C07] rounded-xl p-1 transition-transform duration-200 active:scale-98 min-w-0 shrink"
        >
          {/* Enhanced high-contrast, large logo badge for high visibility */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white ring-2 ring-[#690C07]/35 shadow-sm flex items-center justify-center p-0.5 shrink-0 overflow-hidden group-hover:ring-[#690C07] group-hover:shadow-md transition-all duration-200">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.24.00_f60ee00b.jpeg"
              alt="Africa Community Village Logo (ACV)"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display font-extrabold text-sm sm:text-lg md:text-xl text-[#232826] tracking-tight leading-tight group-hover:text-[#690C07] transition-colors truncate">
              Africa Community Village
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-label text-[11px] sm:text-xs text-[#690C07] font-black tracking-wider uppercase">
                ACV
              </span>
              <span className="text-[10px] text-stone-400">·</span>
              <span className="font-label text-[10px] sm:text-[11px] text-[#0E7490] font-bold tracking-wider uppercase truncate">
                Goma, DRC
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (with animated underline) */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-[#232826]">
          {/* Home */}
          <button
            onClick={() => navigateTo('/')}
            className={navLinkClass(currentRoute === '/')}
          >
            <span>{t.nav.home}</span>
            {renderUnderline(currentRoute === '/')}
          </button>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('/about')}
              className={`${navLinkClass(isAboutActive)} flex items-center gap-1`}
            >
              <span>{t.nav.about}</span>
              <ChevronDown className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
              {renderUnderline(isAboutActive)}
            </button>

            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 mt-1 z-50"
                >
                  <button
                    onClick={() => { navigateTo('/about/our-story'); setAboutDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.ourStory}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/about/our-team'); setAboutDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.ourTeam}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/about/governance'); setAboutDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.governance}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/about/field-notes'); setAboutDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.fieldNotes}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Programs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProgramsDropdownOpen(true)}
            onMouseLeave={() => setProgramsDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('/programs')}
              className={`${navLinkClass(isProgramsActive)} flex items-center gap-1`}
            >
              <span>{t.nav.programs}</span>
              <ChevronDown className="w-4 h-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
              {renderUnderline(isProgramsActive)}
            </button>

            <AnimatePresence>
              {programsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 mt-1 z-50"
                >
                  <button
                    onClick={() => { navigateTo('/programs/education-youth'); setProgramsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.education}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/programs/nature-biodiversity'); setProgramsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.nature}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/programs/agriculture-food-security'); setProgramsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.agriculture}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/programs/health-wellbeing'); setProgramsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.health}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                  <button
                    onClick={() => { navigateTo('/programs/socio-economic-empowerment'); setProgramsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#18181B] hover:bg-[#F5F5F4] hover:text-[#690C07] transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{t.nav.livelihoods}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#690C07]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Approach */}
          <button
            onClick={() => navigateTo('/approach')}
            className={navLinkClass(currentRoute === '/approach')}
          >
            <span>{t.nav.approach}</span>
            {renderUnderline(currentRoute === '/approach')}
          </button>

          {/* Blog */}
          <button
            onClick={() => navigateTo('/blog')}
            className={navLinkClass(currentRoute.startsWith('/blog'))}
          >
            <span>{t.nav.blog}</span>
            {renderUnderline(currentRoute.startsWith('/blog'))}
          </button>

          {/* Contact */}
          <button
            onClick={() => navigateTo('/contact')}
            className={navLinkClass(currentRoute === '/contact')}
          >
            <span>{t.nav.contact}</span>
            {renderUnderline(currentRoute === '/contact')}
          </button>
        </nav>

        {/* Zone 3: Actions (Language, Admin, Donate CTA, Hamburger) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-label font-bold text-[#232826] hover:text-[#690C07] bg-[#FAF6EF] border border-[#E2D7C3] rounded-full hover:bg-[#F3EDE1] transition-all active:scale-95 shadow-xs"
            title={language === 'en' ? 'Passer en Français' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-[#0E7490]" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Admin shortcut icon */}
          {currentUser ? (
            <button
              onClick={() => navigateTo('/admin/dashboard')}
              className="p-1.5 sm:p-2 text-xs font-label font-semibold text-[#690C07] hover:bg-[#F9EBEA] bg-[#FAF6EF] border border-[#690C07] rounded-full transition-all active:scale-95 flex items-center gap-1 shadow-xs"
              title="Admin Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden xl:inline text-xs">Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('/admin/login')}
              className="p-1.5 sm:p-2 text-[#4B5550] hover:text-[#232826] hover:bg-[#FAF6EF] rounded-full transition-all active:scale-95"
              title="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Primary Action Button: Donate (Dominant Primary Red CTA) */}
          <div className="hidden sm:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigateTo('/donate')}
              icon={<Heart className="w-3.5 h-3.5 fill-white" />}
            >
              {t.nav.donate}
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-[#232826] hover:bg-[#FAF6EF] rounded-lg transition-colors focus:outline-none shrink-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[68px] sm:top-[74px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 z-50 lg:hidden bg-[#F3EDE1] border-b border-[#E2D7C3] px-5 pt-4 pb-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1">
                {/* Mobile Drawer Brand Header for clear visibility */}
                <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-[#FAF6EF] border border-[#E2D7C3]">
                  <div className="w-12 h-12 rounded-full bg-white ring-2 ring-[#690C07]/40 p-0.5 shadow-xs shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.24.00_f60ee00b.jpeg"
                      alt="Logo ACV"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-sm text-[#232826] leading-tight truncate">
                      Africa Community Village
                    </p>
                    <p className="font-label text-[11px] text-[#690C07] font-extrabold uppercase tracking-wider">
                      ACV · Est de la RDC
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => { navigateTo('/'); setMobileMenuOpen(false); }}
                  className={`text-left px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    currentRoute === '/'
                      ? 'text-[#690C07] font-bold bg-[#F9EBEA]'
                      : 'text-[#232826] hover:bg-[#FAF6EF]'
                  }`}
                >
                  {t.nav.home}
                </button>

                {/* About Submenu with Accordion */}
                <div className="border-t border-[#E2D7C3] pt-1">
                  <div className="flex items-center justify-between px-3 py-2">
                    <button
                      onClick={() => { navigateTo('/about'); setMobileMenuOpen(false); }}
                      className="font-bold text-sm text-[#232826] hover:text-[#690C07]"
                    >
                      {t.nav.about}
                    </button>
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="p-1 text-stone-500 hover:text-stone-800"
                      aria-label="Toggle About submenu"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileAboutOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 pb-2 space-y-1 border-l-2 border-[#690C07]/30 ml-3"
                    >
                      <button
                        onClick={() => { navigateTo('/about/our-story'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.ourStory}
                      </button>
                      <button
                        onClick={() => { navigateTo('/about/our-team'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.ourTeam}
                      </button>
                      <button
                        onClick={() => { navigateTo('/about/governance'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.governance}
                      </button>
                      <button
                        onClick={() => { navigateTo('/about/field-notes'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.fieldNotes}
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Programs Submenu with Accordion */}
                <div className="border-t border-stone-100 pt-1">
                  <div className="flex items-center justify-between px-3 py-2">
                    <button
                      onClick={() => { navigateTo('/programs'); setMobileMenuOpen(false); }}
                      className="font-bold text-sm text-[#18181B] hover:text-[#690C07]"
                    >
                      {t.nav.programs}
                    </button>
                    <button
                      onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                      className="p-1 text-stone-500 hover:text-stone-800"
                      aria-label="Toggle Programs submenu"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileProgramsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {mobileProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 pb-2 space-y-1 border-l-2 border-[#690C07]/30 ml-3"
                    >
                      <button
                        onClick={() => { navigateTo('/programs/education-youth'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.education}
                      </button>
                      <button
                        onClick={() => { navigateTo('/programs/nature-biodiversity'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.nature}
                      </button>
                      <button
                        onClick={() => { navigateTo('/programs/agriculture-food-security'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.agriculture}
                      </button>
                      <button
                        onClick={() => { navigateTo('/programs/health-wellbeing'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.health}
                      </button>
                      <button
                        onClick={() => { navigateTo('/programs/socio-economic-empowerment'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#3F493F] hover:text-[#690C07]"
                      >
                        · {t.nav.livelihoods}
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="border-t border-stone-100 pt-1 space-y-1">
                  <button
                    onClick={() => { navigateTo('/approach'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                      currentRoute === '/approach'
                        ? 'text-[#690C07] font-bold bg-[#FAF6EF] border border-[#E2D7C3]'
                        : 'text-[#18181B] hover:bg-stone-50'
                    }`}
                  >
                    {t.nav.approach}
                  </button>
                  <button
                    onClick={() => { navigateTo('/blog'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                      currentRoute.startsWith('/blog')
                        ? 'text-[#690C07] font-bold bg-[#FAF6EF] border border-[#E2D7C3]'
                        : 'text-[#18181B] hover:bg-stone-50'
                    }`}
                  >
                    {t.nav.blog}
                  </button>
                  <button
                    onClick={() => { navigateTo('/contact'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
                      currentRoute === '/contact'
                        ? 'text-[#690C07] font-bold bg-[#FAF6EF] border border-[#E2D7C3]'
                        : 'text-[#18181B] hover:bg-stone-50'
                    }`}
                  >
                    {t.nav.contact}
                  </button>
                </div>

                {/* Mobile Full-width Donate Button */}
                <div className="pt-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => { navigateTo('/donate'); setMobileMenuOpen(false); }}
                    icon={<Heart className="w-4 h-4 fill-white" />}
                  >
                    {t.nav.donate}
                  </Button>
                </div>

                <div className="border-t border-stone-200/80 pt-4 mt-2 flex items-center justify-between">
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-label font-bold text-[#18181B] bg-stone-100 rounded-lg active:scale-95 transition-all"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#0E7490]" />
                    <span>{language === 'en' ? 'Passer en Français' : 'Switch to English'}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo(currentUser ? '/admin/dashboard' : '/admin/login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-label text-[#6F7A6E] hover:text-[#18181B]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{currentUser ? 'Admin Dashboard' : 'Admin'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
