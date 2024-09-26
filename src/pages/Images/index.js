import { useEffect, useMemo, useState } from "react";

// COMPONENT
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";

export default function Images() {
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
    { id: 23, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 23, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 25, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 26, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 27, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
    { id: 28, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 29, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 30, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 31, src: 'https://fastly.picsum.photos/id/62/1024/768.jpg?hmac=fujaqnNsRyMqUKZSobIOIIyNdZaHR8kyyHkowAo3UB8' },
    { id: 32, src: 'https://fastly.picsum.photos/id/242/1024/768.jpg?hmac=W_lrOAnis6Yv_ouiT_ZGSHQ6Z3kITXya0rH7A5oM_TU' },
    { id: 33, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 34, src: 'https://fastly.picsum.photos/id/684/1024/768.jpg?hmac=fIAIeyseIe2x_phfC5TU0l2s7USxBaFrIwSR085G7nY' },
    { id: 35, src: 'https://fastly.picsum.photos/id/464/1024/768.jpg?hmac=QYUvTw317M4_-oNr1knfuUy72r4a11Aa18I2aQNd52Y' },
    { id: 36, src: 'https://fastly.picsum.photos/id/445/1024/768.jpg?hmac=DZz4DYcRWzRpDmJrAzeiGZVXBJqjJcw6GnPG4YcTXaA' },
    { id: 37, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 38, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 39, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 40, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 41, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 42, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
    { id: 43, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 44, src: 'https://fastly.picsum.photos/id/684/1024/768.jpg?hmac=fIAIeyseIe2x_phfC5TU0l2s7USxBaFrIwSR085G7nY' },
    { id: 45, src: 'https://fastly.picsum.photos/id/464/1024/768.jpg?hmac=QYUvTw317M4_-oNr1knfuUy72r4a11Aa18I2aQNd52Y' },
    { id: 46, src: 'https://fastly.picsum.photos/id/445/1024/768.jpg?hmac=DZz4DYcRWzRpDmJrAzeiGZVXBJqjJcw6GnPG4YcTXaA' },
    { id: 47, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 48, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 49, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 50, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 51, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 52, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
    { id: 53, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
    { id: 53, src: 'https://fastly.picsum.photos/id/125/1024/768.jpg?hmac=JzEh7DEbY6VKaVRAhj6oGOcxhzBKMjLbJj6bEXjB5QA' },
    { id: 55, src: 'https://fastly.picsum.photos/id/876/1024/768.jpg?hmac=I2z6_E2BE4gVWYMZjKK-kW58VarpMCzuTeI3p8m4sZI' },
    { id: 56, src: 'https://fastly.picsum.photos/id/703/1024/768.jpg?hmac=dUanVP7aduC0f7MCVpgCL7dAtMcrpDgv-217VGkWFKE' },
    { id: 57, src: 'https://fastly.picsum.photos/id/683/1024/768.jpg?hmac=Wag468b5Qju9uo-2p7eQXnshZir8WccZWgAFHSh9PYE' },
    { id: 58, src: 'https://fastly.picsum.photos/id/928/1024/768.jpg?hmac=fVPf2ZrD9n7YYUWHEID9CayzFj_VtBeQmc9I5rEaVj8' },
    { id: 59, src: 'https://fastly.picsum.photos/id/365/1024/768.jpg?hmac=3lcLRkG7Eo_aTshxhraEWqL0YC7KdzWJ6gN0D2HByCQ' },
    { id: 60, src: 'https://fastly.picsum.photos/id/179/1024/768.jpg?hmac=_kypuodHVjB0nX-ieswcI3-jKp2ncTDoQkSFpvlXQ5Y' },
  ]);
  const listImagesFill = useMemo(() => {
    if (!files) return listImages;

    return listImages.map(item => {
      const isChecked = files.some(it => it.id === item.id);
      
      item.selected = isChecked;

      return item;
    });
  }, [listImages, files])

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
  }

  // SIDE EFFECT
  useEffect(() => {
    document.title = 'Hình ảnh - Thư viện ảnh - Giáo Xứ Phú Hoà';

    return () => {
      dispatch(clearFiles());
      dispatch(setOpenManPopup(false));
    }
  }, [dispatch]);

  // CLASS
  const cls = {
    listImages: 'w-full',
  };

  // RENDER
  return (
    <div className="" data-upload-files>
      <div className={cls.listImages}>
        <ListImages
          list={listImagesFill}
          onSelectImage={handleClickSelectImage}
        />
      </div>
    </div>
  )
}
