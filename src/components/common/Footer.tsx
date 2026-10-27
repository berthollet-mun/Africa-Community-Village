import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import {
  MapPin,
  Mail,
  Phone,
  ArrowUp,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo, siteSettings, currentUser } = useApp();
  const t = useTranslation(language);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#232826] text-white relative">
      {/* African Pattern Top Ribbon */}
      <div className="african-ribbon-border w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white ring-2 ring-[#690C07]/60 p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.24.00_f60ee00b.jpeg"
                  alt="ACV Africa Community Village"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  Africa Community Village
                </span>
                <span className="font-label text-xs text-[#EFA62B] font-extrabold tracking-wider uppercase">
                  ACV · Goma, DRC
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {t.footer.orgDesc}
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#EFA62B] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#690C07] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#0E7490] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#8B1510] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs font-label text-neutral-500">
              {siteSettings.registrationNumber}
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-label text-xs uppercase tracking-widest text-[#EFA62B] font-bold block">
              {t.footer.explore}
            </span>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => navigateTo('/about/our-story')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.ourStory}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about/our-team')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.ourTeam}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about/governance')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.governance}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/approach')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.approach}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/blog')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about/field-notes')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.fieldNotes}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold block">
              {t.footer.programs}
            </span>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => navigateTo('/programs/education-youth')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.education}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/programs/nature-biodiversity')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.nature}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/programs/agriculture-food-security')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.agriculture}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/programs/health-wellbeing')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.health}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/programs/socio-economic-empowerment')} className="hover:text-[#EFA62B] transition-colors text-left">
                  {t.nav.livelihoods}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-label text-xs uppercase tracking-widest text-[#0E7490] font-bold block">
              {t.footer.getInTouch}
            </span>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EFA62B] shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#690C07] shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:underline">
                  {siteSettings.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0E7490] shrink-0" />
                <a href={`tel:${siteSettings.phone}`} className="hover:underline">
                  {siteSettings.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-label text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">
                {t.footer.newsletterTitle}
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#690C07] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#690C07] hover:bg-[#520905] text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors font-label"
                >
                  {t.footer.join}
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[#0E7490] text-xs mt-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7490]" />
                  <span>
                    {language === 'fr' ? 'Merci pour votre confiance !' : 'Thank you for standing with us!'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Ubuntu Philosophy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-label">
          <div className="flex items-center gap-3">
            <span>{t.footer.rights}</span>
            <span>·</span>
            <span className="text-[#EFA62B]">{t.footer.motto}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo(currentUser ? '/admin/dashboard' : '/admin/login')}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{currentUser ? 'Admin Dashboard' : 'Admin'}</span>
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>{t.common.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
