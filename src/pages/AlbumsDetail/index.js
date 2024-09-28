import { useEffect, useMemo, useState } from "react";

// COMPONENT
import { Form } from "../../components/commons/Form";
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";

export default function AlbumsDetail() {
  const dispatch = useDispatch();

  // STATE
  const { files } = useSelector(state => state.manfiles);
  const [listImages] = useState([
    { id: 1, src: 'https://fastly.picsum.photos/id/62/1024/768.jpg?hmac=fujaqnNsRyMqUKZSobIOIIyNdZaHR8kyyHkowAo3UB8' },
    { id: 2, src: 'https://fastly.picsum.photos/id/242/1024/768.jpg?hmac=W_lrOAnis6Yv_ouiT_ZGSHQ6Z3kITXya0rH7A5oM_TU' },
    { id: 3, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 4, src: 'https://fastly.picsum.photos/id/684/1024/768.jpg?hmac=fIAIeyseIe2x_phfC5TU0l2s7USxBaFrIwSR085G7nY' },
    { id: 5, src: 'https://fastly.picsum.photos/id/464/1024/768.jpg?hmac=QYUvTw317M4_-oNr1knfuUy72r4a11Aa18I2aQNd52Y' },
    { id: 6, src: 'https://fastly.picsum.photos/id/445/1024/768.jpg?hmac=DZz4DYcRWzRpDmJrAzeiGZVXBJqjJcw6GnPG4YcTXaA' },
    { id: 7, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 8, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 9, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 10, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 11, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 12, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
    { id: 13, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 14, src: 'https://fastly.picsum.photos/id/684/1024/768.jpg?hmac=fIAIeyseIe2x_phfC5TU0l2s7USxBaFrIwSR085G7nY' },
    { id: 15, src: 'https://fastly.picsum.photos/id/464/1024/768.jpg?hmac=QYUvTw317M4_-oNr1knfuUy72r4a11Aa18I2aQNd52Y' },
    { id: 16, src: 'https://fastly.picsum.photos/id/445/1024/768.jpg?hmac=DZz4DYcRWzRpDmJrAzeiGZVXBJqjJcw6GnPG4YcTXaA' },
    { id: 17, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 18, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 19, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 20, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 21, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 22, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
  ]);
  const listImagesFill = useMemo(() => {
    if (!files) return listImages;

    return listImages.map(item => {
      const isChecked = files.some(it => it.id === item.id);
      
      item.selected = isChecked;

      return item;
    });
  }, [listImages, files])
  const [albumTitle, setAlbumTitle] = useState('Album phong cảnh nội bộ 2024');

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem))
  }

  // SIDE EFFECT
  useEffect(() => {
    return () => {
      dispatch(clearFiles());
      dispatch(setOpenManPopup(false));
    }
  }, [dispatch]);

  useEffect(() => {
    document.title = `${albumTitle !== '' ? albumTitle + ' -' : ''} Thư viện ảnh - Giáo Xứ Phú Hoà`;
  }, [albumTitle]);

  // CLASS
  const cls = {
    inputTitle: 'w-full mb-10',
    customClassInput: 'text-2xl !px-0 border-0 border-b border-slate-400 bg-transparent rounded-none',
    listImages: 'w-full',
  };

  // RENDER
  return (
    <div className="" data-upload-files>
      <div className={cls.inputTitle} data-input-title>
        <Form.Input
          name="albumTitle"
          value={albumTitle}
          placeholder="Tên album..."
          onChange={e => setAlbumTitle(e.target.value)}
          customClassInput={cls.customClassInput}
        />
      </div>
      <div className={cls.listImages}>
        <ListImages
          list={listImagesFill}
          onSelectImage={handleClickSelectImage}
        />
      </div>
    </div>
  )
}