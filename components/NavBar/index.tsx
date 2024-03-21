import ColoredButton from '../ColoredButton';
import { FaSearch } from "react-icons/fa";
import Avatar from '../Avatar';
import Image from 'next/image';
import { IoIosNotifications } from "react-icons/io";
import { IoHome } from "react-icons/io5";


const NavBar = () => {
    return (
        <div className=' h-16  w-full bg-white top-0 fixed  border-b-2 border-slate-200  px-4 flex flex-row items-center justify-center   '>


            <div className='h-full  flex flex-row  gap-2'>
                <ColoredButton icon={<FaSearch size={30} />} iconAlwaysVisible={true} />
                <ColoredButton icon={
                    <IoHome size={30} />
                } title={'Social Vibes'} animated={true} longBorder={true} selected={true} />
                <ColoredButton icon={<IoIosNotifications size={30} />} iconAlwaysVisible={true} />


            </div>
            <div className=' absolute right-2 '>

                <Avatar />

            </div>



        </div>
    )
}

export default NavBar;
//items-center