"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoriteTool {
  id: string;
  title: string;
  href: string;
}

interface FavoritesContextType {
  favorites: FavoriteTool[];
  addFavorite: (tool: FavoriteTool) => void;
  removeFavorite: (toolId: string) => void;
  toggleFavorite: (tool: FavoriteTool) => void;
  isFavorited: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = "toolkit-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载收藏数据
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = (tool: FavoriteTool) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === tool.id)) {
        return prev; // 已存在，不添加
      }
      return [...prev, tool];
    });
  };

  const removeFavorite = (toolId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== toolId));
  };

  const toggleFavorite = (tool: FavoriteTool) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === tool.id);
      if (exists) {
        return prev.filter(fav => fav.id !== tool.id);
      } else {
        return [...prev, tool];
      }
    });
  };

  const isFavorited = (toolId: string) => {
    return favorites.some(fav => fav.id === toolId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorited,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}