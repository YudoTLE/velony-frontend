import React from 'react';

export interface NavSidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
  renderContent?: () => React.ReactNode;
}
