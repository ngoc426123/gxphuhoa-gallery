import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Alert } from "../../components/Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../store/manfiles";
import { setListImages } from "../../store/images";
import { setFilesUploaded } from "../../store/uploadfiles";
import {
  setIdAlbum,
  setTitleAlbum,
  setTitleAlbumCompare,
  setListImagesAlbums,
  setListImagesAddAlbums,
  setTitleAddAlbum,
  setListAlbums,
  setStart,
  setMore,
} from "../../store/albums";
import { setOpenLoading } from "../../store/root";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faClose, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons"

// IMAGES
import NullImage_img from "../../assets/images/null-image.jpg";

export default function ManageFilesTools() {
  // STATE
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { filesUploaded } = useSelector(state => state.uploadfiles);
  const { filesSelected } = useSelector(state => state.manfiles);
  const { listImages } = useSelector(state => state.images);
  const {
    idAlbums,
    titleAlbum,
    listImagesAlbums,
    listAlbums,
    titleAddAlbum,
    titleAlbumCompare,
    listImagesAddAlbums,
    start,
    perpage,
    more,
  } = useSelector(state => state.albums);
  const [alertRemoveImage, setAlertRemoveImage] = useState({
    open: false,
    status: false,
    title: '',
    desc: '',
  });
  const [openModalSelectAlbums, setOpenModalSelectAlbums] = useState(false);
  const isCreateAlbumsPage = useMemo(() => pathname === '/albums/create', [pathname]);
  const avaiableCTACreateAlbums = useMemo(() => titleAddAlbum.length, [titleAddAlbum]);
  const isAlbumsDetailPage = useMemo(() => !!params.albumId, [params]);
  const avaiableCTAEditAlbums = useMemo(() => titleAlbum !== titleAlbumCompare, [titleAlbum, titleAlbumCompare]);

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

    dispatch(setOpenLoading(true));

    try {
      const params = JSON.stringify(filesSelected);
      const urlAPI = process.env.REACT_APP_API + '/images/remove';
      const { data: { success } } = await axios.delete(urlAPI, { data: params });
      const listImagesFilter = listImages.filter(item => !success.some(it => it.id === item.id));
      const listUploadedFilter = filesUploaded.filter(item => !success.some(it => it.id === item.id));
      const listImagesAddAlbumsFilter = listImagesAddAlbums.filter(item => !success.some(it => it.id === item.id));
      const listImagesAlbumsFilter = listImagesAlbums.filter(item => !success.some(it => it.id === item.id));

      dispatch(clearFiles());
      dispatch(setListImages(listImagesFilter));
      dispatch(setFilesUploaded(listUploadedFilter));
      dispatch(setListImagesAddAlbums(listImagesAddAlbumsFilter));
      dispatch(setListImagesAlbums(listImagesAlbumsFilter));
    } catch (error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }

  const handleEventAddAlbums = () => {
    if (!filesSelected.length) return;

    dispatch(setListImagesAddAlbums(filesSelected));
    setOpenModalSelectAlbums(true);
  }

  const handleEventCloseAddAlbums = () => {
    setOpenModalSelectAlbums(false);
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
      const listAlbumsAdd = [data.data, ...listAlbums];
      const albumsID = data.data.id;

      dispatch(setListAlbums(listAlbumsAdd));
      dispatch(setTitleAddAlbum(''));
      dispatch(setListImagesAddAlbums([]));
      navigate(`albums/${albumsID}`);
    } catch (error) {
      console.error(error);
    }
  
    dispatch(setOpenLoading(false));
  }

  const handleEventEditAlbum = async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/update/${idAlbums}`;
      const params = JSON.stringify({ album_title: titleAlbum });
      const { data: { albumsID, albumsTitle } } = await axios.put(urlApi, params);
      const listAlbumsCopy = [...listAlbums];
      const listAlbumsFilter = listAlbumsCopy.map(item => {
        if (item.id === albumsID) {
          item = { ...item, name: albumsTitle };
        }

        return item;
      });

      dispatch(setListAlbums(listAlbumsFilter));
      dispatch(setIdAlbum(albumsID));
      dispatch(setTitleAlbum(albumsTitle));
      dispatch(setTitleAlbumCompare(albumsTitle));
    } catch (error) {
      console.error(error);
    }
  
    dispatch(setOpenLoading(false));
  }

  const getListAlbums = useCallback(async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/list?start=${start}&perpage=${perpage}`;
      const { data } = await axios.get(urlApi);

      dispatch(setListAlbums(data.data));
      dispatch(setMore(data.more));
    } catch(error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }, [dispatch, start, perpage]);

  const handleEventAppendImageToAlbum = async ($albumID) => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/append/${$albumID}`;
      const { data } = await axios.put(urlApi, { data: filesSelected });
      const albumsID = data.data.id;
      const listAlbumsCopy = [...listAlbums];
      const listAlbumsFilter = listAlbumsCopy.map(item => {
        if (item.id === albumsID) {
          item = { ...item, ...data.data };
        }

        return item;
      });

      dispatch(setListAlbums(listAlbumsFilter));
      setOpenModalSelectAlbums(false);
      navigate(`albums/${albumsID}`);
    } catch (error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  }

  const handleEventLoadMoreAlbums = async () => {
    const nextStart = start + perpage;

    dispatch(setOpenLoading(true));
    dispatch(setStart(nextStart));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/list?start=${nextStart}&perpage=${perpage}`;
      const { data } = await axios.get(urlApi);

      dispatch(setListAlbums(data.data));
      dispatch(setMore(data.more));
    } catch(error) {
      console.error(error);
    }

    dispatch(setOpenLoading(false));
  };

  // SIDE EFFECT
  useEffect(() => {
    !listAlbums.length && getListAlbums();
  }, [listAlbums, getListAlbums]);

  // CLASS
  const cls = useMemo(() => ({
    wrap: clsx(
      'flex items-center justify-between py-3 px-5 pl-8 bg-white shadow-2xl shadow-slate-400/70 fixed top-0 right-0 left-72 z-30 transition-all',
      { 'translate-y-[-100%]': !filesSelected.length && !titleAddAlbum.length && !avaiableCTAEditAlbums }
    ),
    tools: 'flex items-center',
    close: 'size-10 mr-2 rounded-full transition-all hover:bg-slate-100',
    btnNormal: 'size-10 rounded-full transition-all hover:bg-slate-100',
    btnCheck: 'size-10 rounded-full text-green-600 hover:bg-slate-100 disabled:text-slate-300',
    popupAddAlbums: '!max-w-96 py-14 pb-4 !px-2',
    albumSelect: 'w-full',
    albumSelectAddNew: 'w-full',
    albumAddNewCta: 'block w-full px-8 pl-[2.8rem] py-4 text-left transition-all hover:bg-slate-200',
    albumAddNewCtaIcon: 'mr-4',
    albumAddNewClose: 'size-12 bg-slate-200 absolute top-0 right-0',
    albumAddList: 'max-h-80 overflow-hidden overflow-y-auto custom-scroll',
    albumAddItem: 'flex items-center px-8 py-3 cursor-pointer transition-all hover:bg-slate-200',
    albumAddItemImage: 'size-10 mr-4 rounded-lg overflow-hidden shrink-0',
    albumAddItemImg: 'size-16',
    albumAddItemName: 'text-sm',
    ctaMoreWrap: 'text-center',
    ctaMore: 'text-center text-sm text-slate-400 italic outline-0 transition-all hover:text-blue-600',
  }), [filesSelected, titleAddAlbum, avaiableCTAEditAlbums]);

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
          {isCreateAlbumsPage && 
            <button
              className={cls.btnCheck}
              onClick={handleEventCreateAlbum}
              disabled={!avaiableCTACreateAlbums ? 'disabled' : ''}
              data-cta-create-album
            >
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          }
          {/* ACCEPT EDIT ALBUMS */}
          {isAlbumsDetailPage && 
            <button
              className={cls.btnCheck}
              onClick={handleEventEditAlbum}
              disabled={!avaiableCTAEditAlbums ? 'disabled' : ''}
              data-cta-edit-album
            >
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          }
        </div>
      </div>
      {/* POPUP SELECT ALBUMS */}
      <Modal open={openModalSelectAlbums} customClass={cls.popupAddAlbums}>
        <div className={cls.albumSelect}>
          <div className={cls.albumSelectAddNew}>
            <button
              className={cls.albumAddNewCta}
              onClick={handleAddNewAlbums}
            >
              <FontAwesomeIcon icon={faPlus} className={cls.albumAddNewCtaIcon}/>
              <span>Tạo mới album</span>
            </button>
          </div>
          <div className={cls.albumAddList}>
            {listAlbums && listAlbums.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={cls.albumAddItem}
                onClick={() => handleEventAppendImageToAlbum(item.id)}
              >
                <div className={cls.albumAddItemImage}>
                  <img src={item?.thumbnail?.thumbUrl || NullImage_img} className={cls.albumAddItemImg} alt=""/>
                </div>
                <div className={cls.albumAddItemName}>{item.name}</div>
              </div>
            ))}
            {more && 
              <div className={cls.ctaMoreWrap}>
                <button
                  type="button"
                  className={cls.ctaMore}
                  onClick={handleEventLoadMoreAlbums}
                >
                  Xem thêm
                </button>
              </div>
            }
          </div>
          <button
            className={cls.albumAddNewClose}
            onClick={handleEventCloseAddAlbums}
          >
            <FontAwesomeIcon icon={faClose}/>
          </button>
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
