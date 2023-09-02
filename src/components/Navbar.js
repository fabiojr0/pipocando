import IconLink from "./IconLink";
import { House, FilmReel, Video, MagnifyingGlass } from "@phosphor-icons/react";


const Navbar = () => {
    const logo = process.env.PUBLIC_URL + '/assets/logo.png'

    const linkList = [
        
        {
            page: "/",
            icon:  <House size={20}/>,
            label: "Home"
        },
        {
            page: "/movies",
            icon:  <FilmReel size={20}/>,
            label: "Movies"
        },
        {
            page: "/",
            icon: <img src={logo} className="h-5" alt="Logo"/>,
            label: "Pipocando"
        },
        {
            page: "/series",
            icon: <Video size={20}/>,
            label: "Series"
        },
        {
            page: "/search",
            icon:  <MagnifyingGlass size={20}/>,
            label: "Search"
        }
    ]
    return <nav className="w-screen flex justify-between fixed bottom-0 px-2 sm:px-0 pt-2 z-50 sm:sticky sm:top-0 sm:h-screen sm:w-20 sm:bottom-auto sm:flex-col">
        <span className="w-full h- h-full absolute bg-navBg backdrop-blur-md top-0 left-0 sm:bg-transparent"></span>
        <div className="w-full flex justify-between sm:flex-col h-full text-zinc-50 z-10 sm:py-2 sm:justify-start sm:gap-4 navbar">
            {linkList.map((link) => {
                return <IconLink page={link.page} label={link.label} icon={link.icon} key={link.label}/>
            })}
        </div>
    </nav>
}

export default Navbar;