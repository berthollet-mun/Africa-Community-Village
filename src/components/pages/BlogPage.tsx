import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import {
  Search,
  Tag,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  X,
  Share2
} from 'lucide-react';
import { BlogPost } from '../../types';
import { SkeletonCard } from '../common/Skeleton';

export const BlogPage: React.FC = () => {
  const { language, blogPosts, isAdminAuthenticated, setAdminModalOpen, isLoading } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  // Categories
  const categories = [
    { id: 'all', labelEn: 'All Dispatches', labelFr: 'Toutes les actualités' },
    { id: 'environment', labelEn: 'Environment & Climate', labelFr: 'Environnement & Climat' },
    { id: 'youth', labelEn: 'Youth Leadership', labelFr: 'Leadership Jeunesse' },
    { id: 'agriculture', labelEn: 'Agroecology & Food', labelFr: 'Agroécologie & Alimentation' },
    { id: 'health', labelEn: 'Community Health', labelFr: 'Santé Communautaire' }
  ];

  // Helper getters for properties that might have dual naming
  const getPostImage = (p: BlogPost) =>
    p.image || p.imageUrl || '/assets/aistudio/8_5185b9b0.PNG';
  const getPostDate = (p: BlogPost) =>
    p.date || p.publishedDate || '2026';
  const getPostTags = (p: BlogPost) =>
    p.tags || ['Community', 'ACV', 'Goma'];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      post.category.toLowerCase().includes(selectedCategory);

    const title = isFr ? post.titleFr : post.titleEn;
    const excerpt = isFr ? post.excerptFr : post.excerptEn;
    const tags = getPostTags(post);
    const matchesSearch =
      searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost =
    blogPosts.find((p) => p.featured || p.isFeatured) || blogPosts[0];

  const handleShare = (postTitle: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#fbf8fc] min-h-screen">
      {/* Banner Carousel for /blog */}
      <BannerCarousel pageRoute="/blog" />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>{isFr ? 'Actualités & Publications' : 'Field Dispatches & Insights'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
                {t.nav.blog}
              </h1>
              <p className="mt-3 text-base md:text-lg text-stone-600 max-w-2xl">
                {isFr
                  ? 'Analyses, reportages de terrain et témoignages des jeunes acteurs de changement dans l’Est de la République Démocratique du Congo.'
                  : 'Critical insights, grassroots dispatches, and perspectives from youth builders in Eastern Democratic Republic of the Congo.'}
              </p>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#690C07] text-white text-xs font-label uppercase tracking-wider rounded-lg font-bold hover:bg-[#520905] transition-colors self-start md:self-end cursor-pointer shadow-sm"
              >
                <span>{isFr ? '+ Nouvel Article (Admin)' : '+ New Article (Admin)'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Article Hero */}
      {featuredPost && selectedCategory === 'all' && searchQuery === '' && (
        <section className="py-10 border-b border-stone-200 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px]">
                  <img
                    src={getPostImage(featuredPost)}
                    alt={featuredPost.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-acv-green text-white px-3 py-1 rounded-full text-xs font-label uppercase font-bold tracking-wider">
                    {isFr ? 'À la Une' : 'Featured Story'}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-label text-stone-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {getPostDate(featuredPost)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2
                      className="text-2xl md:text-3xl font-bold font-display text-stone-900 hover:text-acv-green transition-colors cursor-pointer"
                      onClick={() => setActivePost(featuredPost)}
                    >
                      {isFr ? featuredPost.titleFr : featuredPost.titleEn}
                    </h2>

                    <p className="text-stone-600 text-sm md:text-base leading-relaxed line-clamp-4">
                      {isFr ? featuredPost.excerptFr : featuredPost.excerptEn}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF6EF] text-[#690C07] border border-[#E2D7C3] flex items-center justify-center font-bold text-xs">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div className="text-xs font-medium text-stone-700">
                        {featuredPost.author}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => setActivePost(featuredPost)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#232826] hover:bg-[#690C07] text-white text-xs font-label uppercase tracking-wider rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      <span>{isFr ? 'Lire l’article complet' : 'Read Full Dispatch'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-label uppercase font-bold text-[#690C07] bg-[#FAF6EF] border border-[#E2D7C3] px-2.5 py-1 rounded">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search Bar */}
      <section className="py-8 bg-white border-b border-stone-200 sticky top-16 md:top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((c) => {
                const isActive = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-acv-green text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {isFr ? c.labelFr : c.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isFr ? 'Rechercher un article, un mot-clé...' : 'Search dispatches, tags...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && blogPosts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="article" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-800">
                {isFr ? 'Aucun article trouvé' : 'No articles matched your criteria'}
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                {isFr ? 'Essayez de modifier votre recherche ou catégorie.' : 'Try adjusting your search terms or filter.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-label uppercase tracking-wider bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold cursor-pointer"
              >
                {isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-acv-green/40 transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="aspect-16/10 relative overflow-hidden bg-stone-100">
                      <img
                        src={getPostImage(post)}
                        alt={post.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-label uppercase font-bold tracking-wider">
                        {post.category}
                      </div>
                    </div>

                    {/* Metadata & title */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-label text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {getPostDate(post)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-stone-900 group-hover:text-acv-green transition-colors line-clamp-2">
                        {isFr ? post.titleFr : post.titleEn}
                      </h3>

                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {isFr ? post.excerptFr : post.excerptEn}
                      </p>
                    </div>
                  </div>

                  {/* Footer tags and author */}
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate max-w-[130px]">{post.author}</span>
                    </div>

                    <div className="flex items-center gap-1 text-acv-green font-label font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>{isFr ? 'Lire' : 'Read'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal / Reader */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header Media */}
            <div className="relative aspect-16/9 w-full bg-stone-900">
              <img
                src={getPostImage(activePost)}
                alt={activePost.titleEn}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 bg-acv-green text-white px-3 py-1 rounded text-xs font-label uppercase font-bold tracking-wider">
                {activePost.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-label text-stone-500 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <User className="w-3.5 h-3.5 text-acv-green" />
                    {activePost.author}
                  </span>
                  <span>•</span>
                  <span>{getPostDate(activePost)}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>

                <button
                  onClick={() => handleShare(activePost.titleEn)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>
                    {copied
                      ? (isFr ? 'Lien copié !' : 'Link Copied!')
                      : (isFr ? 'Partager' : 'Share')}
                  </span>
                </button>
              </div>

              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-stone-900 leading-tight">
                {isFr ? activePost.titleFr : activePost.titleEn}
              </h2>

              <p className="text-lg text-stone-600 font-medium italic border-l-4 border-amber-500 pl-4 py-1">
                {isFr ? activePost.excerptFr : activePost.excerptEn}
              </p>

              <div className="prose max-w-none text-stone-800 leading-relaxed space-y-4 text-base pt-2">
                <p>
                  {isFr ? activePost.contentFr : activePost.contentEn}
                </p>
                <p>
                  {isFr
                    ? 'Grâce au soutien continu de nos partenaires et de notre réseau solidaire, les équipes d’Africa Community Village maintiennent une présence quotidienne sur le terrain. L’autonomie locale n’est pas un horizon lointain : elle s’édifie à chaque semence plantée, à chaque jeune fille scolarisée, à chaque comité villageois renforcé.'
                    : 'Through the steady support of our global solidarity network and local allies, Africa Community Village teams sustain daily field presence. Local autonomy is not an abstract horizon: it takes root with every indigenous seed sown, every girl supported in formal training, and every community circle mobilized.'}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-stone-100">
                {getPostTags(activePost).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-label"
                  >
                    <Tag className="w-3 h-3 text-stone-400" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="pt-6 flex items-center justify-between border-t border-stone-200">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-label uppercase font-bold cursor-pointer"
                >
                  {isFr ? 'Fermer' : 'Close Dispatch'}
                </button>
                <button
                  onClick={() => {
                    setActivePost(null);
                    window.location.hash = '/donate';
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold cursor-pointer shadow-md"
                >
                  {isFr ? 'Soutenir notre travail' : 'Support ACV Field Work'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
