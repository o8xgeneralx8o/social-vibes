
import NavBar from '@/components/NavBar'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex flex-col h-screen ">


            <NavBar />

            <div className=' mt-20 '>
                {children}
            </div>
        </div>
    );
}
