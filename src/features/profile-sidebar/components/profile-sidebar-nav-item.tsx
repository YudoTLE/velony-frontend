import Link from 'next/link';

interface ProfileSidebarItemProps {
  data: { title: string; url: string; icon: React.ElementType };
}

export const ProfileSidebarNavItem = ({ data }: ProfileSidebarItemProps) => {
  const Icon = data.icon;

  return (
    <Link
      href={data.url}
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 border-b-1 px-4 py-3 text-sm leading-tight first:border-t"
    >
      <Icon size={16} />
      {data.title}
    </Link>
  );
};
