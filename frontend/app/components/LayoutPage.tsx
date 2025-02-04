
export default function LayoutPage({children, className}: Readonly<{
    children: React.ReactNode;
    className: string;
  }>){
    return(
        <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 gap-6">
            <div className={` ${className}`} >
                {children}
            </div>
        </main>
    )
}