import { useMemo } from "react";

import { faGear, faImages, faRightFromBracket, faSolarPanel } from "@fortawesome/free-solid-svg-icons";

export default function MenuSidebar() {
  // STATE
  const menuItems = useMemo(() => {
    return [
      { menu: 'Dashboard', link: '/', icon: faSolarPanel },
      { menu: 'Albums', link: '/albums', icon: faImages },
      { menu: 'Cài đặt', link: '/config', icon: faGear },
      { menu: 'Thoát', link: '/logout', icon: faRightFromBracket },
    ]
  }, []);

  // CLASS
  const cls = {
    wrap: 'w-full'
  };

  // RENDER
  return (
    <div className={cls.wrap}></div>
  )
}