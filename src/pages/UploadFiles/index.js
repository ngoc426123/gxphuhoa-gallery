import { useEffect, useMemo, useState } from "react";

// COMPONENT
import { Form } from "../../components/commons/Form";
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";

export default function UploadFiles() {
  const dispatch = useDispatch();

  // STATE
  const { filesUploaded } = useSelector(state => state.uploadfiles);
  const { filesSelected } = useSelector(state => state.manfiles);
  const listImagesFill = useMemo(() => {
    if (!filesUploaded) return [];

    if (!filesSelected) return filesUploaded;

    return filesUploaded.map(item => {
      const isChecked = filesSelected.some(it => it.id === item.id);
      
      return { ...item, selected: isChecked };
    });
  }, [filesUploaded, filesSelected])
  const [albumTitle, setAlbumTitle] = useState('');

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
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
