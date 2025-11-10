'use client';

import React from 'react';

import { navFooter, navMain } from './app-sidebar-nav-data';
import {
  SIDEBAR_ACTIVE_ITEM_COOKIE,
  SIDEBAR_ACTIVE_ITEM_MAX_AGE,
  DEFAULT_ACTIVE_ITEM,
} from '../lib/app-sidebar-config';
import { SidebarItem } from '../types/sidebar-item';

interface AppSidebarContextType {
  activeItem: SidebarItem;
  handleActiveItemChange: (id: string) => void;
}

const AppSidebarContext = React.createContext<
  AppSidebarContextType | undefined
>(undefined);

export const useAppSidebarContext = () => {
  const context = React.useContext(AppSidebarContext);

  if (context === undefined) {
    throw new Error(
      'useAppSidebarContext must be used within AppSidebarProvider',
    );
  }

  return context;
};

interface AppSidebarProviderProps {
  children: React.ReactNode;
  initialActiveItem?: string;
}

export const AppSidebarProvider = ({
  children,
  initialActiveItem = DEFAULT_ACTIVE_ITEM,
}: AppSidebarProviderProps) => {
  const [activeItemId, setActiveItemId] =
    React.useState<string>(initialActiveItem);

  const activeItem = [...navMain, ...navFooter].find(
    (nav) => nav.id === activeItemId,
  )!;

  const handleActiveItemChange = (id: string) => {
    setActiveItemId(id);
    document.cookie = `${SIDEBAR_ACTIVE_ITEM_COOKIE}=${id}; path=/; max-age=${SIDEBAR_ACTIVE_ITEM_MAX_AGE}`;
  };

  return (
    <AppSidebarContext.Provider value={{ activeItem, handleActiveItemChange }}>
      {children}
    </AppSidebarContext.Provider>
  );
};
