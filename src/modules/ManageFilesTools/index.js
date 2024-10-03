import { useMemo, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Alert } from "../../components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../store/manfiles";
import { setListImages } from "../../store/images";
import { setFilesUploaded } from "../../store/uploadfiles";
import { setListImagesAddAlbums } from "../../store/albums";
import { setOpenLoading } from "../../store/root";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons"

export default function ManageFilesTools() {
  // STATE
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { filesUploaded } = useSelector(state => state.uploadfiles);
  const { filesSelected } = useSelector(state => state.manfiles);
  const { listImages } = useSelector(state => state.images);
  const { titleAddAlbum, listImagesAddAlbums } = useSelector(state => state.albums);
  const [alertRemoveImage, setAlertRemoveImage] = useState({
    open: false,
    status: false,
    title: '',
    desc: '',
  });
  const [openModalSelectAlbums, setOpenModalSelectAlbums] = useState(false);
  const isCreateAlbums = useMemo(() => pathname === '/albums/create', [pathname]);

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
      const listImagesAddAlbumsFilter = listImagesAddAlbums.filter(item => !success.some(it => it.id === item.id));

      dispatch(clearFiles());
      dispatch(setListImages(listImagesFilter));
      dispatch(setFilesUploaded(listUploadedFilter));
      dispatch(setListImagesAddAlbums(listImagesAddAlbumsFilter));
    } catch (error) {
      console.error(error);
    }
  }

  const handleEventAddAlbums = () => {
    dispatch(setListImagesAddAlbums(filesSelected));
    setOpenModalSelectAlbums(true);
  }

  const handleAddNewAlbums = () => {
    setOpenModalSelectAlbums(false);
    navigate('/albums/create');
  }

  const handleEventCreateAlbum = async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + '/albums/create';
      const params = JSON.stringify({
        album_title: titleAddAlbum,
        list_images: listImagesAddAlbums,
      });
      const { data } = await axios.post(urlApi, params);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  
    dispatch(setOpenLoading(false));
  }
 
  // CLASS
  const cls = useMemo(() => ({
    wrap: clsx(
      'flex items-center justify-between py-3 px-5 pl-8 bg-white shadow-2xl shadow-slate-400/70 fixed top-0 right-0 left-72 z-30 transition-all',
      { 'translate-y-[-100%]': !filesSelected.length && !titleAddAlbum.length }
    ),
    tools: 'flex items-center',
    close: 'size-10 mr-2 rounded-full transition-all hover:bg-slate-100',
    btnNormal: 'size-10 rounded-full transition-all hover:bg-slate-100',
    btnCheck: 'size-10 rounded-full text-green-600 hover:bg-slate-100 disabled:text-slate-300',
    albumSelect: 'w-full',
    albumSelectAddNew: 'w-full',
    albumAddNewCta: 'px-5 py-3 border border-slate-300 rounded-lg',
    albumAddNewCtaIcon: 'mr-4'
  }), [filesSelected, titleAddAlbum]);

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
          {/* ADD IMAGES SELECTED TO ALBUMS */}
          <button
            className={cls.btnNormal}
            onClick={handleEventAddAlbums}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          {/* REMOVE IMAGES */}
          <button
            className={cls.btnNormal}
            onClick={handleEventOpenConfirmRemoveImage}
          >
            <FontAwesomeIcon icon={faTrash}/>
          </button>
          {/* ACCEPT CREATE ALBUMS */}
          {isCreateAlbums && 
            <button
              className={cls.btnCheck}
              onClick={handleEventCreateAlbum}
            >
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          }
        </div>
      </div>
      {/* POPUP SELECT ALBUMS */}
      <Modal open={openModalSelectAlbums} customClass="!max-w-96">
        <div className={cls.albumSelect}>
          <div className={cls.albumSelectAddNew}>
            <button
              className={cls.albumAddNewCta}
              onClick={handleAddNewAlbums}
            >
              <FontAwesomeIcon icon={faPlus} className={cls.albumAddNewCtaIcon}/>
              <span>Thêm mới</span>
            </button>
          </div>
        </div>
      </Modal>
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
