export default function Card({
    children,
    title,
  }: Readonly<{
    children: React.ReactNode;
    title: string;
  }>) {
    return (
      <div className="p-6 rounded-lg shadow-md border border-neutral-800 h-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2> 
        <div>
          {children}
        </div>
      </div>
    );
  }
  