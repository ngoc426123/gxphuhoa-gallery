export default function ListImages(props) {
  // PROPS
  const { list } = props;

  // CLASS
  const cls = {
    wrap: 'grid grid-cols-6 gap-2 w-full',
    imageItem: 'cursor-pointer',
    image: 'aspect-[4/3] object-cover'
  }

  // RENDER
  return (
    <div className={cls.wrap} data-list-images>
      {list && list.map((item) => (
        <div className={cls.imageItem} key={item.id}>
          <img src={item.src} alt=""/>
        </div>
      ))}
    </div>
  )
}
