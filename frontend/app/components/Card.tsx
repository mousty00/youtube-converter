import { JSX } from "react";

export default function Card({
    children,
    title,
    icon,
  }: Readonly<{
    children: React.ReactNode;
    title: string;
    icon: JSX.Element;
  }>) {
    return (
      <div className="p-6 rounded-lg shadow-md h-full">
        <div className="flex flex-row text-center gap-4 items-center">
          {icon && icon} 
          <h2 className="text-xl font-semibold mb-4 my-auto">{title}</h2> 
        </div>
        
        <div>
          {children}
        </div>
      </div>
    );
  }
  