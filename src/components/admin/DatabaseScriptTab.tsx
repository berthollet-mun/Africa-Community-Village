import React, { useState, useMemo } from 'react';
import {
  Database,
  Download,
  Copy,
  CheckCircle2,
  FileCode,
  Terminal,
  Server,
  Layers,
  Search,
  RefreshCw,
  HelpCircle,
  FileJson,
  Code2,
  Table as TableIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  generateSqlScript,
  generatePrismaSchema,
  SqlDialect,
  SqlExportOptions,
  DatabaseExportData
} from '../../utils/databaseScriptGenerator';

interface DatabaseScriptTabProps {
  isFr: boolean;
  showToast: (msg: string) => void;
}

export const DatabaseScriptTab: React.FC<DatabaseScriptTabProps> = ({ isFr, showToast }) => {
  const {
    siteSettings,
    pages,
    banners,
    programs,
    teamMembers,
    founders,
    fieldStaff,
    governance,
    articles,
    media,
    partners,
    donors,
    testimonials,
    stats,
    adminUsers,
    contactSubmissions,
    auditLogs
  } = useApp();

  const [dialect, setDialect] = useState<SqlDialect>('postgres');
  const [activeFormat, setActiveFormat] = useState<'sql' | 'json' | 'prisma'>('sql');
  const [includeDropTable, setIncludeDropTable] = useState(true);
  const [includeDdl, setIncludeDdl] = useState(true);
  const [includeDml, setIncludeDml] = useState(true);
  const [includeTransaction, setIncludeTransaction] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTableDetails, setSelectedTableDetails] = useState<string | null>(null);

  // Compile export data object
  const exportData: DatabaseExportData = useMemo(() => ({
    siteSettings,
    pages,
    banners,
    programs,
    teamMembers,
    founders,
    fieldStaff,
    governance,
    articles,
    media,
    partners,
    donors,
    testimonials,
    stats,
    adminUsers,
    contactSubmissions,
    auditLogs
  }), [
    siteSettings,
    pages,
    banners,
    programs,
    teamMembers,
    founders,
    fieldStaff,
    governance,
    articles,
    media,
    partners,
    donors,
    testimonials,
    stats,
    adminUsers,
    contactSubmissions,
    auditLogs
  ]);

  // Table summary counts
  const tableStats = useMemo(() => [
    { name: 'site_settings', count: 1, labelFr: 'Paramètres du site', labelEn: 'Site Settings', icon: 'Settings' },
    { name: 'pages', count: pages.length || 7, labelFr: 'Pages & Métadonnées', labelEn: 'Static Pages', icon: 'Compass' },
    { name: 'banner_slides', count: banners.length, labelFr: 'Bannières Hero', labelEn: 'Banner Slides', icon: 'Layers' },
    { name: 'program_pillars', count: programs.length, labelFr: 'Piliers & Projets', labelEn: 'Program Pillars', icon: 'Sparkles' },
    { name: 'team_members', count: teamMembers.length, labelFr: 'Équipe ACV', labelEn: 'Team Members', icon: 'Users' },
    { name: 'founders', count: founders.length || 2, labelFr: 'Fondateurs', labelEn: 'Founders', icon: 'ShieldCheck' },
    { name: 'field_staff', count: fieldStaff.length || 3, labelFr: 'Personnel de Terrain', labelEn: 'Field Staff', icon: 'MapPin' },
    { name: 'governance_members', count: governance.length || 2, labelFr: 'Gouvernance & Conseils', labelEn: 'Governance', icon: 'Shield' },
    { name: 'articles', count: articles.length, labelFr: 'Articles & Actualités', labelEn: 'Articles & News', icon: 'FileText' },
    { name: 'media_library', count: media.length, labelFr: 'Fichiers Médias', labelEn: 'Media Files', icon: 'FolderOpen' },
    { name: 'partners', count: partners.length, labelFr: 'Partenaires', labelEn: 'Partners', icon: 'Handshake' },
    { name: 'donors', count: donors.length, labelFr: 'Dons & Contrib.', labelEn: 'Donations', icon: 'Heart' },
    { name: 'testimonials', count: testimonials.length, labelFr: 'Témoignages Terrains', labelEn: 'Testimonials', icon: 'Quote' },
    { name: 'impact_stats', count: stats.length || 4, labelFr: 'Statistiques Clés', labelEn: 'Impact Stats', icon: 'TrendingUp' },
    { name: 'admin_users', count: adminUsers.length, labelFr: 'Administrateurs', labelEn: 'Admin Accounts', icon: 'Users' },
    { name: 'contact_submissions', count: (contactSubmissions || []).length, labelFr: 'Messages Reçus', labelEn: 'Inquiries', icon: 'MessageSquare' },
    { name: 'audit_logs', count: (auditLogs || []).length, labelFr: 'Journal d’Audit', labelEn: 'Audit Logs', icon: 'Clock' }
  ], [
    pages.length,
    banners.length,
    programs.length,
    teamMembers.length,
    founders.length,
    fieldStaff.length,
    governance.length,
    articles.length,
    media.length,
    partners.length,
    donors.length,
    testimonials.length,
    stats.length,
    adminUsers.length,
    contactSubmissions,
    auditLogs
  ]);

  const totalRecords = useMemo(() => {
    return tableStats.reduce((acc, curr) => acc + curr.count, 0);
  }, [tableStats]);

  // Generate current output
  const outputScript = useMemo(() => {
    if (activeFormat === 'json') {
      return JSON.stringify(exportData, null, 2);
    }
    if (activeFormat === 'prisma') {
      return generatePrismaSchema();
    }
    const options: SqlExportOptions = {
      dialect,
      includeDropTable,
      includeDdl,
      includeDml,
      includeComments: true,
      includeTransaction
    };
    return generateSqlScript(exportData, options);
  }, [activeFormat, dialect, includeDropTable, includeDdl, includeDml, includeTransaction, exportData]);

  // Filtered lines for display
  const filteredLines = useMemo(() => {
    if (!searchFilter.trim()) return outputScript;
    const filterLower = searchFilter.toLowerCase();
    const lines = outputScript.split('\n');
    const matched = lines.filter((l) => l.toLowerCase().includes(filterLower));
    return matched.length > 0
      ? `-- Filtre: "${searchFilter}" (${matched.length} lignes correspondantes)\n\n` + matched.join('\n')
      : `-- Aucun résultat pour "${searchFilter}"`;
  }, [outputScript, searchFilter]);

  const scriptSizeBytes = useMemo(() => {
    return new Blob([outputScript]).size;
  }, [outputScript]);

  const scriptSizeFormatted = useMemo(() => {
    if (scriptSizeBytes < 1024) return `${scriptSizeBytes} B`;
    return `${(scriptSizeBytes / 1024).toFixed(1)} KB`;
  }, [scriptSizeBytes]);

  // Actions
  const handleCopy = () => {
    navigator.clipboard?.writeText(outputScript);
    setCopied(true);
    showToast(isFr ? 'Script de base de données copié !' : 'Database script copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = activeFormat === 'json'
      ? `acv_database_backup_${new Date().toISOString().slice(0, 10)}.json`
      : activeFormat === 'prisma'
      ? 'schema.prisma'
      : `acv_database_${dialect}_${new Date().toISOString().slice(0, 10)}.sql`;

    const mimeType = activeFormat === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([outputScript], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(isFr ? `Fichier "${filename}" téléchargé !` : `File "${filename}" downloaded!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#690C07] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFA62B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFA62B] text-[#232826] text-xs font-label uppercase font-extrabold tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>{isFr ? 'Export Schéma & Données' : 'Schema & Data Export'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              {isFr ? 'Script de la Base de Données du Site' : 'Complete Website Database Script'}
            </h2>
            <p className="text-sm text-[#F3EDE1]/90 leading-relaxed font-sans">
              {isFr
                ? 'Obtenez en 1 clic l’ensemble du script SQL prêt à l’emploi (DDL tables, index, contraintes et DML données réelles) pour déployer ou sauvegarder toute la base de données d’Africa Community Village.'
                : 'Instantly generate and download the production-ready SQL script (tables, indexes, foreign keys, and live seed records) to deploy or backup the entire Africa Community Village database.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#690C07] hover:bg-[#F3EDE1] font-label text-xs uppercase font-extrabold tracking-wider shadow-sm transition-all cursor-pointer active:scale-95"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-[#0E7490]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Copier le Script' : 'Copy Script')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EFA62B] hover:bg-[#D98E16] text-[#232826] font-label text-xs uppercase font-extrabold tracking-wider shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isFr ? 'Télécharger (.SQL / .JSON)' : 'Download Script'}</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] font-label uppercase text-[#EFA62B] block font-bold">
              {isFr ? 'Tables Créées' : 'Total Tables'}
            </span>
            <span className="text-xl font-bold font-label text-white">17 tables</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] font-label uppercase text-[#EFA62B] block font-bold">
              {isFr ? 'Enregistrements' : 'Total Records'}
            </span>
            <span className="text-xl font-bold font-label text-white">{totalRecords} lignes</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] font-label uppercase text-[#EFA62B] block font-bold">
              {isFr ? 'Taille du Script' : 'Script Size'}
            </span>
            <span className="text-xl font-bold font-label text-white">{scriptSizeFormatted}</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[11px] font-label uppercase text-[#EFA62B] block font-bold">
              {isFr ? 'Format Actif' : 'Engine / Format'}
            </span>
            <span className="text-xl font-bold font-label text-white uppercase">
              {activeFormat === 'sql' ? dialect : activeFormat}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel: Engine selector & Export Options */}
      <div className="bg-[#FAF6EF] rounded-3xl border border-[#E2D7C3] p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Format Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F3EDE1] rounded-2xl border border-[#E2D7C3]">
            <button
              onClick={() => setActiveFormat('sql')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-label uppercase font-bold tracking-wider cursor-pointer transition-all ${
                activeFormat === 'sql'
                  ? 'bg-[#690C07] text-white shadow-xs'
                  : 'text-[#232826] hover:bg-[#FAF6EF]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>SQL Script</span>
            </button>
            <button
              onClick={() => setActiveFormat('json')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-label uppercase font-bold tracking-wider cursor-pointer transition-all ${
                activeFormat === 'json'
                  ? 'bg-[#690C07] text-white shadow-xs'
                  : 'text-[#232826] hover:bg-[#FAF6EF]'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON Backup</span>
            </button>
            <button
              onClick={() => setActiveFormat('prisma')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-label uppercase font-bold tracking-wider cursor-pointer transition-all ${
                activeFormat === 'prisma'
                  ? 'bg-[#690C07] text-white shadow-xs'
                  : 'text-[#232826] hover:bg-[#FAF6EF]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Prisma ORM</span>
            </button>
          </div>

          {/* SQL Dialect Selector (visible when SQL format active) */}
          {activeFormat === 'sql' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-label uppercase font-bold text-[#232826]/70">
                {isFr ? 'Moteur SQL :' : 'SQL Engine:'}
              </span>
              <div className="inline-flex rounded-xl p-1 bg-[#F3EDE1] border border-[#E2D7C3]">
                {[
                  { id: 'postgres', label: 'PostgreSQL / Supabase / Neon' },
                  { id: 'mysql', label: 'MySQL / MariaDB' },
                  { id: 'sqlite', label: 'SQLite' }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDialect(d.id as SqlDialect)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-label font-bold cursor-pointer transition-all ${
                      dialect === d.id
                        ? 'bg-[#0E7490] text-white shadow-xs'
                        : 'text-[#232826] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SQL Options Toggles */}
        {activeFormat === 'sql' && (
          <div className="pt-4 border-t border-[#E2D7C3] flex flex-wrap items-center gap-6 text-xs font-label">
            <span className="font-bold uppercase tracking-wider text-[#232826]">
              {isFr ? 'Options du Script :' : 'Script Options:'}
            </span>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeDdl}
                onChange={(e) => setIncludeDdl(e.target.checked)}
                className="w-4 h-4 rounded text-[#690C07] focus:ring-[#690C07] border-[#E2D7C3]"
              />
              <span className="text-[#232826] font-medium">
                {isFr ? 'Création de tables (DDL)' : 'Create Tables (DDL)'}
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeDml}
                onChange={(e) => setIncludeDml(e.target.checked)}
                className="w-4 h-4 rounded text-[#690C07] focus:ring-[#690C07] border-[#E2D7C3]"
              />
              <span className="text-[#232826] font-medium">
                {isFr ? 'Données réelles du site (INSERT INTO)' : 'Seed Live Data (INSERT INTO)'}
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeDropTable}
                onChange={(e) => setIncludeDropTable(e.target.checked)}
                className="w-4 h-4 rounded text-[#690C07] focus:ring-[#690C07] border-[#E2D7C3]"
              />
              <span className="text-[#232826] font-medium">
                {isFr ? 'DROP TABLE IF EXISTS' : 'DROP TABLE IF EXISTS'}
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeTransaction}
                onChange={(e) => setIncludeTransaction(e.target.checked)}
                className="w-4 h-4 rounded text-[#690C07] focus:ring-[#690C07] border-[#E2D7C3]"
              />
              <span className="text-[#232826] font-medium">
                {isFr ? 'Transaction (BEGIN / COMMIT)' : 'Transaction (BEGIN / COMMIT)'}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Tables Breakdown Cards */}
      <div className="bg-[#FAF6EF] rounded-3xl border border-[#E2D7C3] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-[#690C07]" />
            <h3 className="font-display font-bold text-base text-[#232826]">
              {isFr ? 'Inventaire des 17 Tables de la Base de Données' : 'Inventory of 17 Database Tables'}
            </h3>
          </div>
          <span className="text-xs font-label text-[#232826]/70">
            {isFr ? `${totalRecords} lignes incluses dans le dump` : `${totalRecords} rows included in dump`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {tableStats.map((tbl) => (
            <div
              key={tbl.name}
              onClick={() => setSelectedTableDetails(selectedTableDetails === tbl.name ? null : tbl.name)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                selectedTableDetails === tbl.name
                  ? 'bg-[#690C07] text-white border-[#690C07] shadow-sm'
                  : 'bg-[#F3EDE1] text-[#232826] border-[#E2D7C3] hover:border-[#690C07]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold truncate block">
                  {tbl.name}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-label ${
                  selectedTableDetails === tbl.name
                    ? 'bg-[#EFA62B] text-[#232826]'
                    : 'bg-white text-[#232826] border border-[#E2D7C3]'
                }`}>
                  {tbl.count}
                </span>
              </div>
              <span className={`text-[11px] block truncate ${
                selectedTableDetails === tbl.name ? 'text-[#F3EDE1]/90' : 'text-[#232826]/70'
              }`}>
                {isFr ? tbl.labelFr : tbl.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code / Script Viewer */}
      <div className="bg-[#232826] text-stone-100 rounded-3xl shadow-xl border border-stone-800 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-black/40 border-b border-stone-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#690C07] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#EFA62B] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#0E7490] inline-block" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
              <Terminal className="w-3.5 h-3.5 text-[#EFA62B]" />
              <span>
                {activeFormat === 'json'
                  ? 'acv_database_dump.json'
                  : activeFormat === 'prisma'
                  ? 'schema.prisma'
                  : `acv_${dialect}_script.sql`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search in script */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={isFr ? 'Filtrer le script (ex: articles)...' : 'Filter script (e.g., articles)...'}
                className="pl-8 pr-3 py-1 bg-stone-900 border border-stone-700 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#EFA62B] w-48 sm:w-64"
              />
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[#EFA62B] text-xs font-label uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? (isFr ? 'Copié' : 'Copied') : (isFr ? 'Copier' : 'Copy')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>{isFr ? 'Télécharger' : 'Download'}</span>
            </button>
          </div>
        </div>

        {/* Script Content Viewer */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[560px] overflow-y-auto font-mono text-xs leading-relaxed text-stone-300 select-all">
          <pre className="whitespace-pre">
            {filteredLines}
          </pre>
        </div>
      </div>

      {/* Deployment & CLI instructions */}
      <div className="bg-[#FAF6EF] rounded-3xl border border-[#E2D7C3] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[#0E7490]" />
          <h3 className="font-display font-bold text-base text-[#232826]">
            {isFr ? 'Comment Exécuter Ce Script sur Votre Serveur ou Hébergeur' : 'How to Execute This Script on Your Database'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E2D7C3] space-y-2">
            <span className="text-xs font-label font-bold text-[#690C07] uppercase tracking-wider block">
              1. PostgreSQL / Supabase / Neon
            </span>
            <p className="text-xs text-[#232826]/80 leading-relaxed font-sans">
              {isFr
                ? 'Collez le script dans le SQL Editor de Supabase ou Neon, ou exécutez via la ligne de commande :'
                : 'Paste the script directly into Supabase / Neon SQL Editor, or run via psql CLI:'}
            </p>
            <div className="p-2.5 rounded-lg bg-[#232826] text-white font-mono text-[11px] overflow-x-auto">
              psql -U username -d acv_db -f acv_database_postgres.sql
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2D7C3] space-y-2">
            <span className="text-xs font-label font-bold text-[#0E7490] uppercase tracking-wider block">
              2. MySQL / phpMyAdmin / cPanel
            </span>
            <p className="text-xs text-[#232826]/80 leading-relaxed font-sans">
              {isFr
                ? 'Dans phpMyAdmin, allez dans l’onglet « Importer » ou exécutez dans le terminal MySQL :'
                : 'In phpMyAdmin, go to the "Import" tab, or execute via MySQL CLI:'}
            </p>
            <div className="p-2.5 rounded-lg bg-[#232826] text-white font-mono text-[11px] overflow-x-auto">
              mysql -u root -p acv_db &lt; acv_database_mysql.sql
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2D7C3] space-y-2">
            <span className="text-xs font-label font-bold text-[#EFA62B] uppercase tracking-wider block">
              3. SQLite / Fichier Local
            </span>
            <p className="text-xs text-[#232826]/80 leading-relaxed font-sans">
              {isFr
                ? 'Pour une application autonome ou un test local rapide en SQLite :'
                : 'For lightweight local testing or embedded database with SQLite:'}
            </p>
            <div className="p-2.5 rounded-lg bg-[#232826] text-white font-mono text-[11px] overflow-x-auto">
              sqlite3 acv_database.db &lt; acv_database_sqlite.sql
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
