import { Link } from "react-router-dom";

// ICONS
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AlbumsItem(props) {
  // PROPS
  const { id, title, count, thumb, link } = props;

  // CLASS
  const cls = {
    albums: 'group w-full mb-6 relative',
    imageWrap: 'mb-1 rounded overflow-hidden',
    image: 'aspect-[1/1] object-cover', 
    info: 'w-full',
    title: 'block mb-1 text-sm',
    count: 'block text-xs text-slate-500',
    link: 'absolute top-0 right-0 bottom-0 left-0',
    tgl: 'size-10 text-slate-100 bg-slate-900/30 rounded-full outline-0 absolute top-3 right-3 z-40 opacity-0 transition-all group-hover:opacity-100'
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
      <button type="button" className={cls.tgl}>
        <FontAwesomeIcon icon={faEllipsisVertical}/>
      </button>
    </div>
  )
}
