import { Link } from "react-router-dom";

// ICONS
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AlbumsItem(props) {
  // PROPS
  const {
    id,
    title,
    count,
    thumb,
    link,
    contextElement,
    contextMenu,
    onGetContextMenuPos,
    onGetCurrentAlbum,
    onOpenMenu,
  } = props;

  // METHOD
  const getMenuDim = () => {
    return { menuWidth: 192, menuHeight: contextMenu.length * 40 }
  }

  const getContextProps = () => {
    if (!contextElement) return { contextWidth: 0, contextHeight: 0, contextX: 0, contextY: 0 };

    const _element = contextElement.current;

    return {
      contextWidth: _element.clientWidth,
      contextHeight: _element.clientHeight,
      contextX: _element.offsetLeft,
      contextY: _element.offsetTop,
    };
  }

  const handleClickMenu = (button) => { 
    const { innerWidth, innerHeight, scrollX, scrollY } = window;
    const { x, y, width, height } = button.target.getBoundingClientRect();
    const { contextWidth, contextHeight, contextX, contextY } = getContextProps();
    const { menuWidth, menuHeight } = getMenuDim();
    const onRight = x + menuWidth > innerWidth;
    const onBottom = y + menuHeight > innerHeight;

    onGetContextMenuPos({
      ...(onRight ? { right: (contextX + contextWidth) - (x + width) } : { left: x + scrollX - contextX }),
      ...(onBottom ? { bottom: (contextY + contextHeight) - (y + scrollY + height) } : { top: y + scrollY - contextY }),
    });
    onGetCurrentAlbum(id);
    onOpenMenu(true);
  }

  // CLASS
  const cls = {
    albums: 'group w-full mb-6 relative',
    imageWrap: 'mb-1 rounded overflow-hidden',
    image: 'aspect-[1/1] object-cover bg-black', 
    info: 'w-full',
    title: 'block mb-1 text-sm',
    count: 'block text-xs text-slate-500',
    link: 'absolute top-0 right-0 bottom-0 left-0',
    tgl: 'size-10 text-slate-100 bg-slate-900/30 rounded-full outline-0 absolute top-3 right-3 z-40 opacity-0 transition-all group-hover:opacity-100',
    iconTgl: 'pointer-events-none',
  }

  // RENDER
  return (
    <div className={cls.albums} data-album={id}>
      <div className={cls.imageWrap}>
        <img src={thumb} className={cls.image} alt={title} />
      </div>
      <div className={cls.info}>
        <h3 className={cls.title}>{title}</h3>
        <span className={cls.count}>{count} tấm</span>
      </div>
      <Link to={link} className={cls.link}/>
      <button
        type="button"
        className={cls.tgl}
        onClick={(e) => handleClickMenu(e)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} className={cls.iconTgl}/>
      </button>
    </div>
  )
}
