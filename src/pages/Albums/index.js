import { useState } from "react";

// COMPONENTS
import AlbumsItem from "../../components/AlbumsItem";

export default function Albums() {
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
  ]);

  // CLASS
  const cls = {
    wrap: 'grid grid-cols-5 gap-6 w-full',
    followMenu: 'w-24 h-32 bg-slate-200 rounded shadow-2xl shadow-slate-700/70 fixed opacity top-25 left-25'
  };

  // RENDER
  return (
    <div className={cls.wrap} data-albums>
      {listAlbums && listAlbums.map((item, index) => (
        <AlbumsItem
          key={index}
          title={item.title}
          count={item.count}
          thumb={item.thumb}
          link={item.link}
        />
      ))}
      {/* FOLLOW MENU */}
      <div className={cls.followMenu}>
        lorem
      </div>
    </div>
  )
}