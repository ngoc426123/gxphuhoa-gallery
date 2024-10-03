import { useMemo, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Alert } from "../../components/Alert";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../store/manfiles";
import { setListImages } from "../../store/images";
import { setFilesUploaded } from "../../store/uploadfiles";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons"

export default function ManageFilesTools() {
  // STATE
  const dispatch = useDispatch();
  const { filesUploaded } = useSelector(state => state.uploadfiles);
  const { filesSelected } = useSelector(state => state.manfiles);
  const { listImages } = useSelector(state => state.images);
  const [alertRemoveImage, setAlertRemoveImage] = useState({
    open: false,
    status: false,
    title: '',
    desc: '',
  });

  // METHOD
  const handleClearFiles = () => {
    dispatch(clearFiles());
  };

  const handleEventOpenConfirmRemoveImage = () => {
    if (!filesSelected.length) return;

    setAlertRemoveImage(oldData => ({
      ...oldData,
      open: true,
      status: 2,
      title: `Xoá hình ảnh, số lượng ${filesSelected.length} tấm`,
      desc: 'Bạn thật sự muốn xoá các hình này ra khỏi hệ thống, sẽ không thể khôi phục.',
    }))
  }

  const handleEventCloseConfirmRemoveImage = () => {
    setAlertRemoveImage(oldData => ({
      ...oldData,
      open: false,
      status: 0,
      title: null,
      desc: null,
    }));
  }

  const handleEventRemoveImage = async () => {
    setAlertRemoveImage(oldData => ({
      ...oldData,
      open: false,
      status: 0,
      title: null,
      desc: null,
    }));

    try {
      const params = JSON.stringify(filesSelected);
      const urlAPI = process.env.REACT_APP_API + '/images/remove';
      const { data: { success } } = await axios.delete(urlAPI, { data: params });
      const listImagesFilter = listImages.filter(item => !success.some(it => it.id === item.id));
      const listUploadedFilter = filesUploaded.filter(item => !success.some(it => it.id === item.id));

      dispatch(clearFiles());
      dispatch(setListImages(listImagesFilter));
      dispatch(setFilesUploaded(listUploadedFilter));
    } catch (error) {
      console.error(error);
    }
  }
 
  // CLASS
  const cls = useMemo(() => ({
    wrap: clsx(
      'flex items-center justify-between py-3 px-5 pl-8 bg-white shadow-2xl shadow-slate-400/70 fixed top-0 right-0 left-72 z-30 transition-all',
      { 'translate-y-[-100%]': !filesSelected.length }
    ),
    tools: 'flex items-center',
    close: 'size-10 mr-2 rounded-full transition-all hover:bg-slate-100',
    trash: 'size-10 rounded-full transition-all hover:bg-slate-100'
  }), [filesSelected]);

  // RENDER
  return (
    <>
      <div className={cls.wrap} data-manage-file-tools>
        <div className={cls.tools}>
          <button
            className={cls.close}
            onClick={handleClearFiles}
          >
            <FontAwesomeIcon icon={faX}/>
          </button>
          <span>Đã chọn {filesSelected.length} ảnh</span>
        </div>
        <div className={cls.tools}>
          {/* REMOVE IMAGES */}
          <button
            className={cls.trash}
            onClick={handleEventOpenConfirmRemoveImage}
          >
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </div>
      </div>
      {/* REMOVE ALERT */}
      <Alert
        open={alertRemoveImage.open}
        status={alertRemoveImage.status}
        title={alertRemoveImage.title}
        desc={alertRemoveImage.desc}
        okCta="Đồng ý"
        onClickOkCta={handleEventRemoveImage}
        cancelCta="Không"
        onClickCancelCta={handleEventCloseConfirmRemoveImage}
      />
    </>
  )
}
