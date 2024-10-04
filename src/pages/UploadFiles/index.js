import { useEffect, useMemo } from "react";

// COMPONENT
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";
import { setFilesUploaded } from "../../store/uploadfiles";

export default function UploadFiles() {
  const dispatch = useDispatch();

  // STATE
  const { config } = useSelector(state => state.root);
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

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
  }

  // SIDE EFFECT
  useEffect(() => {
    document.title = 'Hình Upload - ' + config.site_title;
  
    return () => {
      dispatch(clearFiles());
      dispatch(setFilesUploaded([]));
      dispatch(setOpenManPopup(false));
    }
  }, [dispatch, config]);

  // CLASS
  const cls = {
    inputTitle: 'w-full mb-10',
    customClassInput: 'text-2xl !px-0 border-0 border-b border-slate-400 bg-transparent rounded-none',
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
