import React from 'react';

export interface AppSidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
  renderContent?: () => React.ReactNode;
}
