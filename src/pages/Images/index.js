import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";

// COMPONENT
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setOpenLoading } from "../../store/root";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";
import { setListImages } from "../../store/images";

export default function Images() {
  const dispatch = useDispatch();

  // STATE
  const { config } = useSelector(state => state.root);
  const { filesSelected } = useSelector(state => state.manfiles);
  const { listImages } = useSelector(state => state.images);
  const listImagesFill = useMemo(() => {
    if (!listImages) return listImages;

    return listImages.map(item => {
      const isChecked = filesSelected.some(it => it.id === item.id);

      return { ...item, selected: isChecked};
    });
  }, [listImages, filesSelected])

  // METHOD
  const handleClickSelectImage = (imageItem) => {
    dispatch(selectFile(imageItem));
  }

  const getListImages = useCallback(async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlAPI = process.env.REACT_APP_API + '/images/list?start=0&perpage=20';
      const { data } = await axios.get(urlAPI);

      dispatch(setListImages(data.data));
    } catch(error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }, [dispatch]);

  // SIDE EFFECT
  useEffect(() => {
    getListImages();
  }, [getListImages]);

  useEffect(() => {
    document.title = 'Hình ảnh - ' + config.site_title;

    return () => {
      dispatch(clearFiles());
      dispatch(setOpenManPopup(false));
    }
  }, [dispatch, config]);

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
