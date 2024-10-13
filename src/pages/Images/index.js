import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";

// COMPONENT
import ListImages from "../../components/ListImages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setOpenLoading } from "../../store/root";
import { selectFile, clearFiles, setOpenManPopup } from "../../store/manfiles";
import { setListImages, setMore, setStart } from "../../store/images";
import Cta from "../../components/commons/Cta";

export default function Images() {
  const dispatch = useDispatch();

  // STATE
  const { config } = useSelector(state => state.root);
  const { filesSelected } = useSelector(state => state.manfiles);
  const { listImages, start, perpage, more, } = useSelector(state => state.images);
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
      const urlAPI = process.env.REACT_APP_API + `/images/list?start=${start}&perpage=${perpage}`;
      const { data } = await axios.get(urlAPI);

      dispatch(setListImages(data.data));
      dispatch(setMore(data.more));
    } catch(error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }, [dispatch, start, perpage]);

  const handleEventLoadMore = async () => {
    const nextStart = start + perpage;

    dispatch(setOpenLoading(true));
    dispatch(setStart(nextStart));

    try {
      const urlAPI = process.env.REACT_APP_API + `/images/list?start=${nextStart}&perpage=${perpage}`;
      const { data } = await axios.get(urlAPI);

      dispatch(setListImages(data.data));
      dispatch(setMore(data.more));
    } catch(error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  };

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
    btnmore: 'py-5 mt-5 text-center'
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
      {more && 
        <div className={cls.btnmore}>
          <Cta onClick={handleEventLoadMore}>Xem thêm</Cta>
        </div>
      }
    </div>
  )
}
