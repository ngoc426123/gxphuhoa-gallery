import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListImages(props) {
  // PROPS
  const { list, onSelectImage } = props;

  // CLASS
  const cls = {
    wrap: 'grid grid-cols-6 gap-2 w-full',
    imageItem: 'group cursor-pointer relative before before:h-12 before:bg-gradient-to-t before:from-transparent before:to-black/70 before:absolute before:top-0 before:right-0 before:left-0 before:transition-all before:opacity-0 hover:before:opacity-100',
    image: 'aspect-[4/3] object-cover',
    icon: 'size-4 text-white absolute top-3 right-3 transition-all opacity-0 group-hover:opacity-100',
    iconSelected: '!text-blue-600 opacity-100',
  }

  // RENDER
  return (
    <div className={cls.wrap} data-list-images>
      {list && list.map((item, index) => (
        <div
          key={index}
          className={cls.imageItem}
          onClick={() => onSelectImage(item)}
        >
          <img src={item.src} alt=""/>
          <FontAwesomeIcon
            className={`${cls.icon} ${item.selected ? cls.iconSelected : ''}`}
            icon={item.selected ? faCircleCheck : faCircle}
          />
        </div>
      ))}
    </div>
  )
}
