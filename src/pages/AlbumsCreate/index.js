import { useEffect, useMemo } from "react";

// COMPONENT
import { Form } from "../../components/commons/Form";
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, setOpenManPopup } from "../../store/manfiles";
import { setTitleAddAlbum } from "../../store/albums";

export default function AlbumsCreate() {
  const dispatch = useDispatch();

  // STATE
  const { config } = useSelector(state => state.root);
  const { titleAddAlbum, listImagesAddAlbums } = useSelector(state => state.albums);
  const { filesSelected } = useSelector(state => state.manfiles);
  const listImagesFill = useMemo(() => {
    if (!listImagesAddAlbums) return [];

    if (!filesSelected) return listImagesAddAlbums;

    return listImagesAddAlbums.map(item => {
      const isChecked = filesSelected.some(it => it.id === item.id);
      
      return { ...item, selected: isChecked };
    });
  }, [listImagesAddAlbums, filesSelected])

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
  }

  // SIDE EFFECT
  useEffect(() => {
    document.title = `${titleAddAlbum !== '' ? titleAddAlbum + ' -' : ''}` + config.site_title;

    return () => {
      dispatch(setOpenManPopup(false));
    }
  }, [titleAddAlbum, dispatch, config]);

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
          value={titleAddAlbum}
          placeholder="Tên album..."
          onChange={e => dispatch(setTitleAddAlbum(e.target.value))}
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
