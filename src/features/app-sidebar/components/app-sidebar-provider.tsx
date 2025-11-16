'use client';

import { convertTime } from '@shared/lib/time';
import React from 'react';

import { navFooter, navMain } from './app-sidebar-nav';
import { SidebarItem } from '../types/sidebar-item';

const SIDEBAR_ACTIVE_ITEM_COOKIE = 'sidebar_active_item';
const SIDEBAR_ACTIVE_ITEM_MAX_AGE = convertTime('7d');

interface AppSidebarContextType {
  activeItem: SidebarItem | null;
  handleActiveItemChange: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
  initialActiveItem = '',
}: AppSidebarProviderProps) => {
  const [activeItemId, setActiveItemId] =
    React.useState<string>(initialActiveItem);

  const activeItem =
    [...navMain, ...navFooter].find((nav) => nav.id === activeItemId) || null;

  const isOpen = !!activeItem;

  const handleActiveItemChange = (id: string) => {
    setActiveItemId(id);
    document.cookie = `${SIDEBAR_ACTIVE_ITEM_COOKIE}=${id}; path=/; max-age=${SIDEBAR_ACTIVE_ITEM_MAX_AGE}`;
  };

  const setIsOpen = (open: boolean) => {
    if (!open) {
      setActiveItemId('');
      document.cookie = `${SIDEBAR_ACTIVE_ITEM_COOKIE}=; path=/; max-age=0`;
    }
  };

  return (
    <AppSidebarContext.Provider
      value={{
        activeItem,
        handleActiveItemChange,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </AppSidebarContext.Provider>
  );
};
