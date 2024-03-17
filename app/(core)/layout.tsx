
import NavBar from '@/components/NavBar'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex flex-col h-screen ">


            <NavBar />

            <div className='flex-1 '>
                {children}
            </div>
        </div>
    );
}
