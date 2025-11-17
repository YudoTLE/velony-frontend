'use client';

import { SidebarProvider } from '@shared/components/ui/sidebar';
import React from 'react';

import {
  APP_SIDEBAR_ACTIVE_COOKIE,
  APP_SIDEBAR_ACTIVE_MAX_AGE,
  APP_SIDEBAR_NAV_MAIN,
  APP_SIDEBAR_NAV_FOOTER,
} from '../lib/app-sidebar-config';
import { AppSidebarItem } from '../types/app-sidebar-item';

interface AppSidebarContextType {
  isOpen: boolean;
  active: AppSidebarItem | null;

  isDetailOpen: boolean;
  detail: React.ReactNode | null;

  open: () => void;
  close: () => void;
  setActive: (id: string) => void;

  openDetail: (content: React.ReactNode) => void;
  closeDetail: () => void;
  setDetail: (content: React.ReactNode | null) => void;
}

const AppSidebarContext = React.createContext<
  AppSidebarContextType | undefined
>(undefined);

export const useAppSidebarContext = () => {
  const ctx = React.useContext(AppSidebarContext);
  if (!ctx)
    throw new Error('useAppSidebarContext must be used within provider');
  return ctx;
};

interface AppSidebarProviderProps {
  children: React.ReactNode;
  initialActiveItem?: string;
}

export const AppSidebarProvider = ({
  children,
  initialActiveItem = '',
}: AppSidebarProviderProps) => {
  const items = [...APP_SIDEBAR_NAV_MAIN, ...APP_SIDEBAR_NAV_FOOTER];

  // MAIN PANEL STATE (left)
  const [activeId, setActiveId] = React.useState(initialActiveItem);
  const active = items.find((n) => n.id === activeId) || null;
  const isOpen = !!active;

  const setActive = (id: string) => {
    setActiveId(id);
    document.cookie = `${APP_SIDEBAR_ACTIVE_COOKIE}=${id}; path=/; max-age=${APP_SIDEBAR_ACTIVE_MAX_AGE}`;
  };

  const open = () => {
    if (!active) setActive(items[0]?.id || '');
  };

  const close = () => {
    setActiveId('');
    document.cookie = `${APP_SIDEBAR_ACTIVE_COOKIE}=; path=/; max-age=0`;
  };

  // DETAIL PANEL STATE (right)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detail, setDetailState] = React.useState<React.ReactNode | null>(null);

  const openDetail = (content: React.ReactNode) => {
    setDetailState(content);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setDetailState(null);
  };

  const setDetail = (content: React.ReactNode | null) => {
    setDetailState(content);
  };

  return (
    <AppSidebarContext.Provider
      value={{
        isOpen,
        active,

        isDetailOpen,
        detail,

        open,
        close,
        setActive,

        openDetail,
        closeDetail,
        setDetail,
      }}
    >
      <SidebarProvider
        openLeft={isOpen}
        openRight={isDetailOpen}
        style={
          {
            '--sidebar-width': '400px',
          } as React.CSSProperties
        }
      >
        {children}
      </SidebarProvider>
    </AppSidebarContext.Provider>
  );
};
