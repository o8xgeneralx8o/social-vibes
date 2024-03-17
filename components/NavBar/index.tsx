import Image from "next/image";
import socialVibesLogo from '@/public/social-vibes-logo.svg'
const NavBar = () => {
    return (
        <div className='h-20 w-screen top-0 fixed bg-white border-b-2 border-slate-200 flex gap-2  px-2'>
            <Image src={socialVibesLogo} alt="social-vibes-logo" width={50} />
            <h1 className="flex items-center text-2xl text-black-vibes font-bold ">Social Vibes</h1>
        </div>
    )
}

export default NavBar;
