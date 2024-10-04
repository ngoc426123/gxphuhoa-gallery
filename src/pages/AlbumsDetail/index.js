import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// COMPONENT
import { Form } from "../../components/commons/Form";
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";
import { setIdAlbum, setTitleAlbum, setTitleAlbumCompare, setListImagesAlbums } from "../../store/albums";
import { setOpenLoading } from "../../store/root";

export default function AlbumsDetail() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  // STATE
  const { filesSelected } = useSelector(state => state.manfiles);
  const { titleAlbum, listImagesAlbums } = useSelector(state => state.albums);
  const listImagesFill = useMemo(() => {
    if (!listImagesAlbums) return [];

    if (!filesSelected) return listImagesAlbums;

    return listImagesAlbums.map(item => {
      const isChecked = filesSelected.some(it => it.id === item.id);
      
      return { ...item, selected: isChecked };
    });
  }, [listImagesAlbums, filesSelected]);

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
  };

  const clear = useCallback(() => {
    dispatch(setIdAlbum(0));
    dispatch(setTitleAlbum(''));
    dispatch(setTitleAlbumCompare(''));
    dispatch(setListImagesAlbums([]));
  }, [dispatch]);

  const getDetail = useCallback(async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/${albumId}`;
      const { data } = await axios.get(urlApi);
      const { detail, images } = data;
      dispatch(setIdAlbum(detail.id));
      dispatch(setTitleAlbum(detail.name));
      dispatch(setTitleAlbumCompare(detail.name));
      dispatch(setListImagesAlbums(images));
    } catch (error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }, [dispatch, albumId]);

  // SIDE EFFECT
  useEffect(() => {
    clear();
    getDetail();
  }, [getDetail, clear]);

  useEffect(() => {
    document.title = `${titleAlbum !== '' ? titleAlbum + ' -' : ''} Thư viện ảnh - Giáo Xứ Phú Hoà`;

    return () => {
      dispatch(clearFiles());
      dispatch(setOpenManPopup(false));
    }
  }, [titleAlbum, dispatch]);


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
          value={titleAlbum}
          placeholder="Tên album..."
          onChange={e => dispatch(setTitleAlbum(e.target.value))}
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