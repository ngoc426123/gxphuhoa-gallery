import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

export default function ContextMenu(props) {
  // REF
  const _menu = useRef();

  // PROPS
  const { open, menus, position, onCloseMenu } = props;

  // SIDE EFFECT
  useEffect(() => {
    function handleClickOutside(e) {
      if (!_menu) return;
  
      const $menu = _menu.current;
  
      if ($menu && !$menu.contains(e.target)) {
        onCloseMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [onCloseMenu]);

  // CLASS
  const cls = {
    menu: 'w-48 px-2 py-2 bg-slate-200 rounded shadow-2xl shadow-slate-700/70 absolute z-40',
    menuItem: 'block w-full h-10 px-3 text-left rounded transition-all hover:bg-slate-300',
    menuIcon: 'mr-3'
  };

  // RENDER
  return {
    false: <></>,
    true: (
      <div className={cls.menu} style={{ ...position }} ref={_menu}>
        <ul>
          {menus && menus.map((item, index) => (
            <button className={cls.menuItem} key={index}>
              <FontAwesomeIcon icon={item.icon} className={cls.menuIcon}/>
              <span>{item.text}</span>
            </button>
          ))}
        </ul>
      </div>
    ),
  }[open]
}