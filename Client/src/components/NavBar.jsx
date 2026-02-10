import React, { useState }from 'react'
import { navbarStyles} from '../assets/dummyStyles'
import { Watch ,BaggageClaim } from 'lucide-react'; 
import {Link, useLocation, useNavigate } from 'react-router-dom'; 

const navItems = [ 
    { name: "Home", href: "/" }, 
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
]; 
const NavBar = () => {
  const [open , setOpen]=useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [active , setActive] = useState(location.pathname||"/");
  const handleNavClick = (href) =>{ 
    setActive(href); setOpen(false); 
    }
  return (
    <header className={navbarStyles.header}>
    <nav className={navbarStyles.nav} role ='navigation'> 
    <div className={navbarStyles.container}> 

    {/* BRAND LOGO*/}
     <div className={navbarStyles.brandContainer}>
        <div className={navbarStyles.logoContainer}>
            <Watch className={navbarStyles.logoIcon} /> 
        </div> 
            <Link to='/' onClick={()=> handleNavClick("/")}
              className={navbarStyles.logoLink}> 
              <span style={navbarStyles.logoTextStyle}
               className={navbarStyles.logoText}> 
               ChronoLit
                </span> 
                </Link> 
     </div> 
     {/* Desktop Navigation*/}
     <div className={navbarStyles.desktopNav}>
         {navItems.map((item)=>{ const isActive = active === item.href;
             return( <Link key={item.name} 
                to={item.href}
              onClick={()=> handleNavClick(item.href)}
               className={`${navbarStyles.navItemBase}
                ${ isActive
                    ? navbarStyles.navItemActive 
                    : navbarStyles.navItemInactive
                 }`} > 
                <span>
                {item.name} 
                </span> 
                <span className={`${navbarStyles.activeIndicator} ${ isActive 
                    ? navbarStyles.activeIndicatorVisible
                     : navbarStyles.activeIndicatorHidden 
                     }`}>
                </span>
                </Link> );
                })}
                </div>
                </div>
                </nav>
    </header>
  )
}

export default NavBar
