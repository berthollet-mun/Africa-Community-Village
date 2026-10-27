import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  HeartHandshake,
  Users,
  Building,
  HelpCircle,
  MessageSquare,
  Globe,
  Clock,
  ExternalLink
} from 'lucide-react';
import { ContactSubmission } from '../../types';
import { Button } from '../common/Button';
import { toast } from '../common/Toast';

export const ContactPage: React.FC = () => {
  const { language, siteSettings, addContactSubmission, triggerActionLoading } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'support' | 'partner'>('general');

  // Check URL hash on mount or change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#support') {
      setActiveTab('support');
      setFormData((prev) => ({ ...prev, category: 'Volunteer & Support' }));
      const el = document.getElementById('support');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#partner') {
      setActiveTab('partner');
      setFormData((prev) => ({ ...prev, category: 'Institutional Partnership' }));
      const el = document.getElementById('partner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.warning(
        isFr ? 'Veuillez remplir votre nom, email et message.' : 'Please fill in your name, email, and message.',
        isFr ? 'Champs Incomplets' : 'Missing Fields'
      );
      return;
    }

    setIsSending(true);
    triggerActionLoading(
      isFr ? 'Envoi de votre message...' : 'Transmitting message...',
      isFr ? 'En attente d’une suite favorable...' : 'Awaiting confirmation...'
    );

    try {
      const newSub: ContactSubmission = {
        id: `sub_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || `${formData.category} from ${formData.name}`,
        message: formData.message,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        read: false
      };

      await addContactSubmission(newSub);
      setSubmitted(true);
      toast.success(
        isFr
          ? 'Votre message a été transmis avec succès à l’antenne d’ACV à Goma.'
          : 'Your message has been successfully transmitted to the ACV team in Goma.',
        isFr ? 'Message Envoyé' : 'Message Transmitted'
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'General Inquiry',
        subject: '',
        message: ''
      });
    } catch (err) {
      toast.error(
        isFr ? 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.' : 'Failed to send message. Please retry.',
        isFr ? 'Erreur Réseau' : 'Error'
      );
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }
  };

  return (
    <div className="bg-[#fbf8fc] min-h-screen">
      {/* Banner Carousel */}
      <BannerCarousel pageRoute="/contact" />

      {/* Hero Header */}
      <section className="py-12 md:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>{isFr ? 'Prendre Contact' : 'Get In Touch'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            {t.nav.contact}
          </h1>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            {isFr
              ? 'Une question sur nos programmes ? Vous souhaitez nous rendre visite à Goma, soutenir notre cause ou devenir un partenaire institutionnel ? Notre équipe est à votre écoute.'
              : 'Have inquiries about our programs in Goma, wish to volunteer, or want to explore an institutional partnership? Our team is ready to connect.'}
          </p>

          {/* Quick Anchor Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <a
              href="#contact-form"
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'general'
                  ? 'bg-acv-green text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {isFr ? 'Formulaire Général' : 'General Contact'}
            </a>
            <a
              href="#support"
              onClick={() => {
                setActiveTab('support');
                setFormData((p) => ({ ...p, category: 'Volunteer & Support' }));
              }}
              className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'support'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              {isFr ? 'Soutien & Bénévolat (#support)' : 'Support & Volunteer (#support)'}
            </a>
            <a
              href="#partner"
              onClick={() => {
                setActiveTab('partner');
                setFormData((p) => ({ ...p, category: 'Institutional Partnership' }));
              }}
              className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'partner'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {isFr ? 'Partenariat Stratégique (#partner)' : 'Institutional Partner (#partner)'}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content: Info Cards & Form */}
      <section id="contact-form" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info & Location */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
                <h3 className="text-xl font-bold font-display text-stone-900 pb-3 border-b border-stone-100">
                  {isFr ? 'Nos Coordonnées Directes' : 'Headquarters & Channels'}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FAF6EF] rounded-xl text-[#690C07] shrink-0 border border-[#E2D7C3]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-label uppercase font-bold text-stone-500">
                        {isFr ? 'Bureau Principal' : 'Head Office'}
                      </div>
                      <p className="text-stone-900 font-semibold text-sm mt-0.5">
                        {siteSettings.address}
                      </p>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {isFr ? 'Accessible du Lundi au Samedi' : 'Open Mon - Sat • 08:30 - 17:00 CAT'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-700 shrink-0 border border-amber-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-label uppercase font-bold text-stone-500">
                        {isFr ? 'Courriel Officiel' : 'Email Addresses'}
                      </div>
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="text-stone-900 font-semibold text-sm block hover:text-acv-green transition-colors mt-0.5"
                      >
                        {siteSettings.email}
                      </a>
                      <a
                        href="mailto:partnership@acv-drc.org"
                        className="text-xs text-stone-600 hover:text-acv-green transition-colors block mt-0.5"
                      >
                        partnership@acv-drc.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-50 rounded-xl text-cyan-700 shrink-0 border border-cyan-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-label uppercase font-bold text-stone-500">
                        {isFr ? 'Téléphone & WhatsApp' : 'Phone & WhatsApp'}
                      </div>
                      <a
                        href={`tel:${siteSettings.phone.replace(/\\s+/g, '')}`}
                        className="text-stone-900 font-semibold text-sm block hover:text-acv-green transition-colors mt-0.5"
                      >
                        {siteSettings.phone}
                      </a>
                      <a
                        href="tel:+243977531777"
                        className="text-xs text-stone-600 hover:text-acv-green transition-colors block mt-0.5"
                      >
                        +243 977 531 777 (Field Coordination)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map Card */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100">
                    <div className="h-44 bg-linear-to-br from-[#232826] to-[#690C07] p-6 flex flex-col justify-between text-white relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-label uppercase font-bold tracking-wider text-[#EFA62B]">
                          Goma, North Kivu, DRC
                        </span>
                        <MapPin className="w-5 h-5 text-[#EFA62B]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Quartier Himbi • Lac Kivu</div>
                        <div className="text-xs text-stone-300">
                          Commune de Goma, République Démocratique du Congo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200/90 shadow-xs">
                <div className="mb-8">
                  <span className="text-xs font-label uppercase tracking-widest text-[#690C07] font-bold">
                    {isFr ? 'Formulaire de Correspondance' : 'Direct Correspondence'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-900 mt-1">
                    {isFr ? 'Envoyez-nous un message' : 'Send a Message to the ACV Team'}
                  </h2>
                  <p className="text-sm text-stone-600 mt-2">
                    {isFr
                      ? 'Remplissez le formulaire ci-dessous. Vos messages sont traités en priorité par notre secrétariat général à Goma.'
                      : 'Please complete the fields below. Submissions are monitored daily by our general secretariat in Goma.'}
                  </p>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-[#E0F2FE] border border-[#0E7490]/30 text-[#0E7490] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0E7490] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">
                        {isFr ? 'Message transmis avec succès !' : 'Message Sent Successfully!'}
                      </h4>
                      <p className="text-xs text-[#0E7490] mt-0.5">
                        {isFr
                          ? 'Merci de votre intérêt. Notre équipe prendra contact avec vous dans les plus brefs délais.'
                          : 'Thank you for connecting. Our secretariat will respond to your provided email within 48 hours.'}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? 'Nature de votre demande' : 'Inquiry Category'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'General Inquiry', labelEn: 'General', labelFr: 'Général' },
                        { id: 'Volunteer & Support', labelEn: 'Volunteer / Support', labelFr: 'Soutien / Bénévolat' },
                        { id: 'Institutional Partnership', labelEn: 'Partnership', labelFr: 'Partenariat' }
                      ].map((cat) => (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`py-2 px-3 rounded-lg text-xs font-label font-bold uppercase tracking-wider text-center border transition-all ${
                            formData.category === cat.id
                              ? 'bg-acv-green text-white border-acv-green shadow-xs'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          {isFr ? cat.labelFr : cat.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                        {isFr ? 'Nom complet *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isFr ? 'ex: Berthe Kanyere' : 'e.g. John Doe'}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                        {isFr ? 'Courriel *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.org"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                        {isFr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+243..."
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                        {isFr ? 'Sujet' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={isFr ? 'Objet de votre message' : 'Subject of inquiry'}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? 'Message *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isFr
                          ? 'Détaillez votre proposition, question ou projet...'
                          : 'Please describe how we can collaborate, or share your question...'
                      }
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSending}
                    loadingText={isFr ? 'Envoi en cours...' : 'Sending message...'}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isFr ? 'Envoyer le message' : 'Send Message to ACV'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Section: #support */}
      <section id="support" className="py-16 bg-amber-50/50 border-t border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                <span>Ancre #support</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-stone-900">
                {isFr ? 'Soutenez nos actions & devenez bénévole' : 'Support ACV & Volunteer With Us'}
              </h2>
              <p className="text-stone-700 leading-relaxed text-base">
                {isFr
                  ? 'Vous êtes jeune diplômé, agronome, médecin, enseignant ou passionné de justice climatique ? ACV accueille des bénévoles locaux et internationaux pour des immersions solidaires, des mentorats à distance et des missions de renforcement de capacités.'
                  : 'Whether you are an agronomist, educator, health practitioner, or youth mentor, ACV welcomes committed volunteers for both on-the-ground engagements in Goma and remote advisory solidarity.'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7490] shrink-0" />
                  <span>{isFr ? 'Missions de reboisement sur le terrain' : 'Direct participation in tree planting & agroforestry'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7490] shrink-0" />
                  <span>{isFr ? 'Animation d’ateliers numériques pour les jeunes' : 'Leading digital & vocational bootcamps for Goma youth'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7490] shrink-0" />
                  <span>{isFr ? 'Campagnes de santé mobile et hygiène' : 'Community hygiene & reproductive wellness outreach'}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="#contact-form"
                  onClick={() => {
                    setActiveTab('support');
                    setFormData((p) => ({ ...p, category: 'Volunteer & Support', subject: 'Volunteer Application' }));
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs font-label uppercase tracking-wider transition-colors"
                >
                  <span>{isFr ? 'Postuler comme Bénévole' : 'Apply as a Volunteer'}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-md aspect-4/3">
                <img
                  src="/public/assets/aistudio/15_f71655f6.jpeg"
                  alt="Volunteer Support"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Section: #partner */}
      <section id="partner" className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-4/3">
                <img
                  src="/public/assets/aistudio/4_289670c0.PNG"
                  alt="Partnership"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-stone-100 text-stone-800 border border-stone-200">
                <Building className="w-3.5 h-3.5 text-stone-700" />
                <span>Ancre #partner</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-stone-900">
                {isFr ? 'Construisons des Partenariats Stratégiques' : 'Institutional & Strategic Partnerships'}
              </h2>
              <p className="text-stone-700 leading-relaxed text-base">
                {isFr
                  ? 'ACV collabore avec des fondations internationales, agences de développement, instituts de recherche agronomique et entreprises responsables. Nous assurons une gouvernance transparente avec rapports d’audit réguliers et indicateurs d’impact vérifiés.'
                  : 'ACV collaborates with philanthropic foundations, research institutions, and impact funds seeking authentic, youth-led ground implementation in the Kivus. We provide robust financial governance, verified metrics, and rigorous storytelling.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 text-sm">
                    {isFr ? 'Co-conception de programmes' : 'Co-Program Design'}
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    {isFr ? 'Programmes sur mesure avec ancrage communautaire' : 'Tailored interventions addressing root climate/food security drivers'}
                  </div>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 text-sm">
                    {isFr ? 'Rapports d’Impact RCF' : 'Quarterly Audit Reporting'}
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    {isFr ? 'Transparence comptable et suivi photographique GPS' : 'Full traceability, open ledgers, and GPS-tagged milestones'}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="#contact-form"
                  onClick={() => {
                    setActiveTab('partner');
                    setFormData((p) => ({
                      ...p,
                      category: 'Institutional Partnership',
                      subject: 'Institutional Partnership Inquiry'
                    }));
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold text-xs font-label uppercase tracking-wider transition-colors"
                >
                  <span>{isFr ? 'Proposer un Partenariat' : 'Initiate Institutional Dialogue'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
