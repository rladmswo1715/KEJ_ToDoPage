import { ReactNode } from "react";

interface InnerLayoutProps {
  children: ReactNode;
  className?: string;
}

const InnerLayout = ({ children, className = "" }: InnerLayoutProps) => {
  return <div className={`w-full pl-12 mx-auto ${className}`}>{children}</div>;
};

export default InnerLayout;
