import { useMemo, useRef, useState } from "react";

// COMPONENTS
import AlbumsItem from "../../components/AlbumsItem";
import ContextMenu from "../../components/ContextMenu";

// ICONS
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Albums() {
  // REF
  const _albums = useRef();

  // STATE
  const [listAlbums] = useState([
    {
      id: 1,
      title: 'Lorem Ipsum is simply dummy text of the printing',
      count: 12,
      thumb: 'https://fastly.picsum.photos/id/323/1024/768.jpg?hmac=dyw3O8tEM1SdQhMJNK0nyipazjYNDiZoZTa4GUSfIv0',
      link: '/album/1',
    },
    {
      id: 2,
      title: 'Scrambled it to make a type specimen book',
      count: 22,
      thumb: 'https://fastly.picsum.photos/id/324/1024/768.jpg?hmac=xnsrn34FoMOmOwJ8qI3vV8bfr0vtJQ45n59Ke88RaZs',
      link: '/album/2',
    },
    {
      id: 3,
      title: 'It has survived not only five centuries',
      count: 18,
      thumb: 'https://fastly.picsum.photos/id/433/1024/768.jpg?hmac=y5rwdoM6maqC7z7az-4GA9OVUNcs7ucKSDP_I6kJNZI',
      link: '/album/3',
    },
    {
      id: 4,
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      count: 28,
      thumb: 'https://fastly.picsum.photos/id/556/1024/768.jpg?hmac=A6j1cRUDZYgpdj7mPSf9k93jN_4N8ZgmcdSh67eymKs',
      link: '/album/4',
    },
    {
      id: 5,
      title: 'Discovered the undoubtable source',
      count: 77,
      thumb: 'https://fastly.picsum.photos/id/758/1024/768.jpg?hmac=o7H6IC-2flSvHUh_8PnNHFu3_QiKQlpfCI6ysJvwTIc',
      link: '/album/5',
    },
    {
      id: 6,
      title: 'The first line of Lorem Ipsum',
      count: 48,
      thumb: 'https://fastly.picsum.photos/id/81/1024/768.jpg?hmac=odWnMIj_zOgFtQ7nDn6WWLdohOCv9miIDdt6oSrB3h8',
      link: '/album/6',
    },
    {
      id: 7,
      title: 'There are many variations of passages of Lorem Ipsum available',
      count: 22,
      thumb: 'https://fastly.picsum.photos/id/181/1024/768.jpg?hmac=o2rIqbKjDJ--41SIschr9wTLCkLrtFkM7XEAN_ZiO-Q',
      link: '/album/6',
    },
    {
      id: 8,
      title: 'Lorem Ipsum is simply dummy text of the printing',
      count: 12,
      thumb: 'https://fastly.picsum.photos/id/323/1024/768.jpg?hmac=dyw3O8tEM1SdQhMJNK0nyipazjYNDiZoZTa4GUSfIv0',
      link: '/album/1',
    },
    {
      id: 9,
      title: 'Scrambled it to make a type specimen book',
      count: 22,
      thumb: 'https://fastly.picsum.photos/id/324/1024/768.jpg?hmac=xnsrn34FoMOmOwJ8qI3vV8bfr0vtJQ45n59Ke88RaZs',
      link: '/album/2',
    },
    {
      id: 10,
      title: 'It has survived not only five centuries',
      count: 18,
      thumb: 'https://fastly.picsum.photos/id/433/1024/768.jpg?hmac=y5rwdoM6maqC7z7az-4GA9OVUNcs7ucKSDP_I6kJNZI',
      link: '/album/3',
    },
    {
      id: 11,
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      count: 28,
      thumb: 'https://fastly.picsum.photos/id/556/1024/768.jpg?hmac=A6j1cRUDZYgpdj7mPSf9k93jN_4N8ZgmcdSh67eymKs',
      link: '/album/4',
    },
    {
      id: 12,
      title: 'Discovered the undoubtable source',
      count: 77,
      thumb: 'https://fastly.picsum.photos/id/758/1024/768.jpg?hmac=o7H6IC-2flSvHUh_8PnNHFu3_QiKQlpfCI6ysJvwTIc',
      link: '/album/5',
    },
    {
      id: 13,
      title: 'The first line of Lorem Ipsum',
      count: 48,
      thumb: 'https://fastly.picsum.photos/id/81/1024/768.jpg?hmac=odWnMIj_zOgFtQ7nDn6WWLdohOCv9miIDdt6oSrB3h8',
      link: '/album/6',
    },
    {
      id: 14,
      title: 'There are many variations of passages of Lorem Ipsum available',
      count: 22,
      thumb: 'https://fastly.picsum.photos/id/181/1024/768.jpg?hmac=o2rIqbKjDJ--41SIschr9wTLCkLrtFkM7XEAN_ZiO-Q',
      link: '/album/6',
    },
    {
      id: 15,
      title: 'The first line of Lorem Ipsum',
      count: 48,
      thumb: 'https://fastly.picsum.photos/id/81/1024/768.jpg?hmac=odWnMIj_zOgFtQ7nDn6WWLdohOCv9miIDdt6oSrB3h8',
      link: '/album/6',
    },
  ]);
  const [currentAlbum, setCurrentAlbum] = useState(0); // STORE ALBUM ID
  const [menuPosition, setMenuPosition] = useState({});
  const [openMenu, setOpenMenu] = useState(false);

  // METHOD
  const handleGetContextMenuPos = (data) => {
    setMenuPosition(oldData => ({...oldData, ...data}))
  };

  const handleSetCurrentAlbum = (id) => {
    setCurrentAlbum(() => id);
  };

  const handleOpenContextMenu = () => {
    setOpenMenu(true);
  }

  const handleCloseContextMenu = () => {
    setOpenMenu(false);
  }

  const handleViewAlbum = (id) => {
    console.log(`View ${id}`);
  }

  const handleRenameAlbum = (id) => {
    console.log(`Rename ${id}`);
  }

  const handleRemoveAlbum = (id) => {
    console.log(`Remove ${id}`);
  }

  // CONTEXT MENU
  const contextMenu = useMemo(() => ({
    open: openMenu,
    position: menuPosition,
    menus: [
      { text: 'Xem menu', icon: faEye, onClick: () => handleViewAlbum(currentAlbum) },
      { text: 'Đổi tên', icon: faEdit, onClick: () => handleRenameAlbum(currentAlbum) },
      { text: 'Xoá album', icon: faTrash, onClick: () => handleRemoveAlbum(currentAlbum) },
    ]
  }), [openMenu, currentAlbum, menuPosition]);

  // CLASS
  const cls = {
    wrap: 'grid grid-cols-5 gap-6 w-full relative',
  };

  // RENDER
  return (
    <div className={cls.wrap} ref={_albums} data-albums>
      {listAlbums && listAlbums.map((item, index) => (
        <AlbumsItem
          key={index}
          id={item.id}
          title={item.title}
          count={item.count}
          thumb={item.thumb}
          link={item.link}
          contextElement={_albums}
          contextMenu={contextMenu.menus}
          onOpenMenu={handleOpenContextMenu}
          onGetContextMenuPos={handleGetContextMenuPos}
          onGetCurrentAlbum={handleSetCurrentAlbum}
        />
      ))}
      <ContextMenu
        { ...contextMenu }
        onCloseMenu={handleCloseContextMenu}
      />
    </div>
  )
}