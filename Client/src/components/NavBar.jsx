import React, { useEffect, useState }from 'react'
import { navbarStyles} from '../assets/dummyStyles'
import { Watch ,BaggageClaim } from 'lucide-react'; 
import {Link, useLocation, useNavigate } from 'react-router-dom'; 
import { useCart } from '../CartContext';

const navItems = [ 
    { name: "Home", href: "/" }, 
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
]; 

const NavBar = () => {
  const{ totalItems} = useCart();
  const [loggedIn , setLoggedIn] = useState(()=>{
    try{
        return(
       localStorage.getItem("isLoggedIn") === "true" ||
       !!localStorage.getItem("authToken") //!! : it converts any value to a boolean.
        );
    } catch{
       return false ; 
    }
  })
  const [open , setOpen]=useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const [active , setActive] = useState(location.pathname||"/");

  const handleNavClick = (href) =>{ 
    setActive(href);
     setOpen(false); 
    }
    useEffect(() => {
       setActive(location.pathname||"/");
  }, [location]) ; 

  //to keep user logged-in for all the pages 
     useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "isLoggedIn" || e.key === "authToken") {
        try {
          const isNowLoggedIn =
            localStorage.getItem("isLoggedIn") === "true" ||
            !!localStorage.getItem("authToken");
          setLoggedIn(isNowLoggedIn);
        } catch {
          setLoggedIn(false);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
             return(
                 <Link key={item.name} 
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
                {/*Right Side*/}
                <div className={navbarStyles.rightActions}>
                    <Link to="/cart" className={navbarStyles.cartLink}>
                    <BaggageClaim className={navbarStyles.cartIcon} />
                    {totalItems >0  && (
                        <span className={navbarStyles.cartBadge}>
                            {totalItems}
                            </span>
                    )}
                    </Link>

                </div>
                </div>
                </nav>
    </header>
  )
}

export default NavBar
