'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/services/api';
import type { Article } from '@/types';

const PAGE_SIZE = 12;

export function useArticles(category?: string, initialArticles: Article[] = []) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(initialArticles.length === 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArticles.length >= PAGE_SIZE);
  const hasLoadedFromApi = useRef(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.public.getArticles(category, { page: 1, limit: PAGE_SIZE });
      setArticles(response.data);
      setPage(1);
      setHasMore(response.hasMore);
      hasLoadedFromApi.current = true;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible de charger les articles.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const response = await api.public.getArticles(category, { page: nextPage, limit: PAGE_SIZE });
      setArticles((current) => {
        const existingIds = new Set(current.map((article) => article.id));
        return [...current, ...response.data.filter((article) => !existingIds.has(article.id))];
      });
      setPage(nextPage);
      setHasMore(response.hasMore);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible de charger les articles suivants.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [category, hasMore, isLoadingMore, page]);

  useEffect(() => {
    if (initialArticles.length > 0 && !hasLoadedFromApi.current) {
      setArticles(initialArticles);
      setHasMore(initialArticles.length >= PAGE_SIZE);
      setIsLoading(false);
      return;
    }
    void refresh();
  }, [category, initialArticles, refresh]);

  return { articles, isLoading, isLoadingMore, error, hasMore, loadMore, refresh };
}
