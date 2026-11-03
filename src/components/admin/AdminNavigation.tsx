import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Database,
  FileText,
  FolderOpen,
  Handshake,
  Heart,
  LayoutDashboard,
  Layers,
  MapPin,
  MessageSquare,
  Quote,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export type AdminTab =
  | 'overview' | 'pages' | 'banners' | 'programs' | 'team' | 'founders'
  | 'fieldStaff' | 'governance' | 'articles' | 'media' | 'partners'
  | 'donors' | 'testimonials' | 'stats' | 'inbox' | 'users' | 'settings'
  | 'audit' | 'database';

type CountKey = Exclude<AdminTab, 'overview' | 'settings' | 'audit' | 'database'>;

interface AdminNavigationProps {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
  isFr: boolean;
  isSuperAdmin: boolean;
  counts: Partial<Record<CountKey, number>>;
}

type NavItem = {
  id: AdminTab;
  labelEn: string;
  labelFr: string;
  icon: React.ReactNode;
  badge?: string;
  unread?: boolean;
};

const contentItems: NavItem[] = [
  { id: 'banners', labelEn: 'Banners & hero', labelFr: 'Bannières & hero', icon: <Layers className="h-4 w-4" /> },
  { id: 'programs', labelEn: 'Pillars & KPIs', labelFr: 'Piliers & métriques', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'articles', labelEn: 'Articles & notes', labelFr: 'Articles & récits', icon: <FileText className="h-4 w-4" /> },
  { id: 'pages', labelEn: 'Static pages', labelFr: 'Pages statiques', icon: <Compass className="h-4 w-4" /> },
  { id: 'media', labelEn: 'Media library', labelFr: 'Médiathèque', icon: <FolderOpen className="h-4 w-4" /> }
];

const peopleItems: NavItem[] = [
  { id: 'team', labelEn: 'Our team', labelFr: 'Équipe ACV', icon: <Users className="h-4 w-4" /> },
  { id: 'founders', labelEn: 'Founders', labelFr: 'Fondateurs', icon: <ShieldCheck className="h-4 w-4" /> },
  { id: 'fieldStaff', labelEn: 'Field agents', labelFr: 'Staff terrain', icon: <MapPin className="h-4 w-4" /> },
  { id: 'governance', labelEn: 'Governance', labelFr: 'Gouvernance', icon: <Shield className="h-4 w-4" /> },
  { id: 'partners', labelEn: 'Partners', labelFr: 'Partenaires', icon: <Handshake className="h-4 w-4" /> },
  { id: 'testimonials', labelEn: 'Field stories', labelFr: 'Témoignages', icon: <Quote className="h-4 w-4" /> }
];

const operationsItems: NavItem[] = [
  { id: 'database', labelEn: 'Database & export', labelFr: 'Base de données & export', icon: <Database className="h-4 w-4 text-[#EFA62B]" />, badge: 'SQL' },
  { id: 'inbox', labelEn: 'Inquiries', labelFr: 'Boîte de réception', icon: <MessageSquare className="h-4 w-4" />, unread: true },
  { id: 'donors', labelEn: 'Donations ledger', labelFr: 'Registre des dons', icon: <Heart className="h-4 w-4" /> },
  { id: 'stats', labelEn: 'Impact counters', labelFr: 'Compteurs d’impact', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'settings', labelEn: 'Settings', labelFr: 'Paramètres', icon: <Settings className="h-4 w-4" /> },
  { id: 'audit', labelEn: 'Audit log', labelFr: 'Journal d’audit', icon: <Clock className="h-4 w-4" /> }
];

const NavButton: React.FC<{
  item: NavItem;
  active: boolean;
  isFr: boolean;
  count?: number;
  onClick: () => void;
}> = ({ item, active, isFr, count, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left font-label text-xs font-bold uppercase tracking-wider transition-colors ${
      active ? 'bg-[#690C07] text-white shadow-xs' : 'text-stone-700 hover:bg-[#FAF6EF] hover:text-[#690C07]'
    }`}
  >
    <span className="flex min-w-0 items-center gap-2.5">{item.icon}<span className="truncate">{isFr ? item.labelFr : item.labelEn}</span></span>
    {item.badge ? (
      <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? 'bg-[#EFA62B] text-[#232826]' : 'bg-[#EFA62B]/20 text-[#690C07]'}`}>{item.badge}</span>
    ) : typeof count === 'number' ? (
      <span className={`rounded-full px-2.5 py-0.5 text-xs ${active ? 'bg-white/25 text-white' : item.unread && count > 0 ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-600'}`}>{count}</span>
    ) : null}
  </button>
);

export const AdminNavigation: React.FC<AdminNavigationProps> = ({ activeTab, onChange, isFr, isSuperAdmin, counts }) => {
  const [open, setOpen] = useState(false);
  const groups = [
    { titleEn: 'Content & programs', titleFr: 'Contenus & programmes', items: contentItems },
    { titleEn: 'People & governance', titleFr: 'Communauté & terrain', items: peopleItems },
    { titleEn: 'Operations & system', titleFr: 'Opérations & système', items: operationsItems }
  ];

  const select = (tab: AdminTab) => {
    onChange(tab);
    setOpen(false);
  };

  return (
    <aside className="lg:col-span-3" aria-label={isFr ? 'Navigation de l’administration' : 'Admin navigation'}>
      <div className="sticky top-20 space-y-1 rounded-3xl border border-stone-200/90 bg-white p-3.5 shadow-xs">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mb-2 flex w-full items-center justify-between rounded-2xl border border-stone-200/80 bg-stone-50 p-2.5 text-left lg:hidden"
          aria-expanded={open}
        >
          <span className="font-label text-xs font-bold uppercase tracking-wider text-stone-800">{isFr ? 'Menu de navigation' : 'Navigation menu'}</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <div className={`${open ? 'block' : 'hidden'} space-y-1 lg:block`}>
          <p className="px-3 pb-1 pt-2 font-label text-[11px] font-extrabold uppercase tracking-wider text-stone-400">{isFr ? 'Tableau de bord' : 'Dashboard'}</p>
          <NavButton
            item={{ id: 'overview', labelEn: 'Overview', labelFr: 'Vue d’ensemble', icon: <LayoutDashboard className="h-4 w-4" /> }}
            active={activeTab === 'overview'}
            isFr={isFr}
            onClick={() => select('overview')}
          />
          {groups.map((group) => (
            <React.Fragment key={group.titleEn}>
              <p className="px-3 pb-1 pt-3.5 font-label text-[11px] font-extrabold uppercase tracking-wider text-stone-400">{isFr ? group.titleFr : group.titleEn}</p>
              {group.items.map((item) => (
                <NavButton key={item.id} item={item} active={activeTab === item.id} isFr={isFr} count={counts[item.id as CountKey]} onClick={() => select(item.id)} />
              ))}
            </React.Fragment>
          ))}
          {isSuperAdmin && (
            <NavButton
              item={{ id: 'users', labelEn: 'Admin users', labelFr: 'Utilisateurs admin', icon: <ShieldCheck className="h-4 w-4" /> }}
              active={activeTab === 'users'}
              isFr={isFr}
              count={counts.users}
              onClick={() => select('users')}
            />
          )}
        </div>
      </div>
    </aside>
  );
};
