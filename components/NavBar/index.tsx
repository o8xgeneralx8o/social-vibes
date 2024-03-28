import Avatar from '../Avatar';
import { MdNotifications } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import SocialVibesLogo from '../SocialVibesLogo';
import RoundedButton from '../RoundedButton';
import SearchBar from '../SearchBar';


const NavBar = () => {
    return (
        <div className=' z-50 h-16  w-full bg-white top-0 fixed  border-b-2 border-slate-200  px-2 flex flex-row items-center  justify-between   '>

            <div className='min-w-12 sm:min-w-28'>
                <SocialVibesLogo />
            </div>

            <div className='flex-grow max-w-[750px] '>
                <SearchBar />
            </div>



            <div className='flex flex-row gap-2 justify-end min-w-24 sm:min-w-28'>
                <RoundedButton isSelected={true} selected={<MdNotifications size={28} />} notSelected={< MdOutlineNotifications size={28} />} />


                <Avatar />

            </div>


        </div>
    )
}

export default NavBar;
//items-center