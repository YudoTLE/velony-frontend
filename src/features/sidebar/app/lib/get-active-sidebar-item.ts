import { cookies } from 'next/headers';

import {
  SIDEBAR_ACTIVE_ITEM_COOKIE,
  DEFAULT_ACTIVE_ITEM,
} from './app-sidebar-config';

export async function getActiveSidebarItem(): Promise<string> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SIDEBAR_ACTIVE_ITEM_COOKIE);
  return cookie?.value || DEFAULT_ACTIVE_ITEM;
}
