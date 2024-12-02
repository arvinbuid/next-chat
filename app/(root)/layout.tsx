import SidebarWrapper from '@/components/ui/shared/sidebar/SidebarWrapper';
import React from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default layout;
