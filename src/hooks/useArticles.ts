'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { Article } from '@/types';

export function useArticles(category?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.public.getArticles(category);
      setArticles(response.data as Article[]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible de charger les articles.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { articles, isLoading, error, refresh };
}
