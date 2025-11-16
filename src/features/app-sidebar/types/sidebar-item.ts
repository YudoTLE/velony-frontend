import React from 'react';

export interface SidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
  renderContent?: () => React.ReactNode;
}
