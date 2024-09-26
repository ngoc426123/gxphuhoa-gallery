import { useCallback, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// ICON
import { faGear, faImages, faRightFromBracket, faSolarPanel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLocalstorage } from "../../utils/localstorage";

export default function MenuSidebar() {
  // SATTE
  const navigate = useNavigate();
 
  // METHODS
  const handleEventLogout = useCallback(() => {
    removeLocalstorage('Gxphuhoa-user');
    navigate('/login');
  }, [navigate]);

  // MEMO
  const menuItems = useMemo(() => {
    return [
      {
        menu: 'Dashboard',
        link: '/',
        icon: faSolarPanel
      },
      {
        menu: 'Hình ảnh',
        link: '/images',
        icon: faImages
      },
      {
        menu: 'Albums',
        link: '/albums',
        icon: faImages
      },
      {
        menu: 'Cài đặt',
        link: '/config',
        icon: faGear
      },
      {
        menu: 'Thoát',
        onClick: (e) => {
          e.preventDefault();
          handleEventLogout();
        },
        icon: faRightFromBracket
      },
    ]
  }, [handleEventLogout]);

  

  // CLASS
  const cls = {
    wrap: 'w-full',
    item: 'flex items-center text-slate-100 rounded transition-all hover:bg-blue-200/20',
    itemActive: 'bg-gradient-to-r from-blue-600 to-purple-600',
    li: 'mb-3',
    icon: 'flex items-center justify-center shrink-0 size-12 mr-3 bg-blue-400/25 rounded'
  };

  // RENDER
  return (
    <div className={cls.wrap}>
      <ul>
        {menuItems && menuItems.map((item, index) => (
          <li className={cls.li} key={index}>
            {item.link
              ? <NavLink
                  to={item.link}
                  className={({ isActive }) => `${cls.item} ${isActive ? cls.itemActive : null}`}
                >
                  <span className={cls.icon}>
                    <FontAwesomeIcon icon={item.icon}/>
                  </span>
                  <span>{item.menu}</span>
                </NavLink>
              : <a
                  href="#logou"
                  onClick={item.onClick}
                  className={cls.item}
                >
                  <span className={cls.icon}>
                    <FontAwesomeIcon icon={item.icon}/>
                  </span>
                  <span>{item.menu}</span>
                </a>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}