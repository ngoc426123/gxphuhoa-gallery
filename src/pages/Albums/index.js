import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// COMPONENTS
import AlbumsItem from "../../components/AlbumsItem";
import ContextMenu from "../../components/ContextMenu";
import { Modal } from "../../components/Modal";
import { Form } from "../../components/commons/Form";
import Cta from "../../components/commons/Cta";
import { Alert } from "../../components/Alert";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

// IMAGES
import NullImage_img from "../../assets/images/null-image.jpg";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setListAlbums, setMore, setStart } from "../../store/albums";
import { setOpenLoading } from "../../store/root";

import axios from "axios";

export default function Albums() {
  const dispatch = useDispatch();

  // REF
  const _albums = useRef();

  // STATE
  const { listAlbums, start, perpage, more } = useSelector(state => state.albums);
  const { config } = useSelector(state => state.root);
  const [currentAlbum, setCurrentAlbum] = useState(0); // STORE ALBUM ID
  const [menuPosition, setMenuPosition] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [albumTitleModal, setAlbumTitleModal] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    status: false,
    title: '',
    desc: '',
  });

  // METHOD
  const getList = useCallback(async () => {
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

  const handleGetContextMenuPos = (data) => {
    setMenuPosition(oldData => ({...oldData, ...data}))
  };

  const handleSetCurrentAlbum = (id) => {
    setCurrentAlbum(() => id);
  };

  const handleOpenContextMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseContextMenu = () => {
    setOpenMenu(false);
  };

  const handleViewAlbum = (id) => {
    console.log(`View ${id}`);
  };

  const handleOpenPopupRenameAlbum = () => {
    setOpenModal(true);
  };

  const handleClosePopupRenameAlbum = () => {
    setOpenModal(false);
  };

  const handleEventUpdateAlbumName = async () => {
    if (!albumTitleModal.length) return;

    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/update/${currentAlbum}`;
      const params = JSON.stringify({ album_title: albumTitleModal });
      const { data: { albumsID, albumsTitle } } = await axios.put(urlApi, params);
      const listAlbumsCopy = [...listAlbums];
      const listAlbumsFilter = listAlbumsCopy.map(item => {
        if (item.id === albumsID) {
          item = { ...item, name: albumsTitle };
        }

        return item;
      });

      dispatch(setListAlbums(listAlbumsFilter));
      setOpenModal(false);
      setAlbumTitleModal('')
    } catch (error) {
      console.error(error);
    }
    
    dispatch(setOpenLoading(false));
  };

  const handleEventKeyupUpdateAlbumName = (e) => {
    const { key, shiftKey, altKey, ctrlKey } = e;

    if (key === 'Enter') {
      if (shiftKey || altKey || ctrlKey) return;

      handleEventUpdateAlbumName();
    }
  };

  const handleOpenPopupRemoveAlbum = useCallback(() => {
    const listAlbumsCopy = [...listAlbums];
    const { name } = listAlbumsCopy.filter(item => item.id === currentAlbum)[0];

    setAlert(data => ({
      ...data,
      open: true,
      status: 2,
      title: `Xoá Album: ${name}`,
      desc: 'Bạn muốn xoá Album này chứ. Ảnh có trong album bị xoá vẫn còn trên hệ thống, thao tác này chỉ xoá album.'
    }))
  }, [listAlbums, currentAlbum]);

  const handleClosePopupRemoveAlbum = () => {
    setAlert(data => ({ ...data, open: false }));
  };

  const handleEventRemoveAlbum = async () => {
    dispatch(setOpenLoading(true));

    try {
      const urlApi = process.env.REACT_APP_API + `/albums/remove/${currentAlbum}`;
      const { data: { albumsID } } = await axios.delete(urlApi);
      const listAlbumsCopy = [...listAlbums];
      const listAlbumsFilter = listAlbumsCopy.filter(item => item.id !== albumsID);

      dispatch(setListAlbums(listAlbumsFilter));
      setAlert(data => ({ ...data, open: false }));
    } catch (error) {
      console.error(error);
    }
    
    dispatch(setOpenLoading(false));
  };

  const handleEventLoadMore = async () => {
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
    document.title = 'Albums - ' + config.site_title;
    !listAlbums.length && getList();
  }, [listAlbums, getList, config]);

  // CONTEXT MENU
  const contextMenu = useMemo(() => ({
    open: openMenu,
    position: menuPosition,
    menus: [
      { text: 'Xem menu', icon: faEye, onClick: () => handleViewAlbum() },
      { text: 'Đổi tên', icon: faEdit, onClick: () => handleOpenPopupRenameAlbum() },
      { text: 'Xoá album', icon: faTrash, onClick: () => handleOpenPopupRemoveAlbum() },
    ]
  }), [openMenu, menuPosition, handleOpenPopupRemoveAlbum]);

  // CLASS
  const cls = {
    wrap: 'grid grid-cols-5 gap-6 w-full relative',
    albumAddNewClose: 'size-12 bg-slate-200 absolute top-0 right-0',
    btnmore: 'py-5 mt-5 text-center',
  };

  // RENDER
  return (
    <>
      <div className={cls.wrap} ref={_albums} data-albums>
        {listAlbums && listAlbums.map((item, index) => (
          <AlbumsItem
            key={`${item.id}-${index}`}
            id={item.id}
            title={item.name}
            count={item.sl}
            thumb={item?.thumbnail?.thumbUrl || NullImage_img}
            link={`/albums/${item.id}`}
            contextElement={_albums}
            contextMenu={contextMenu.menus}
            onOpenMenu={handleOpenContextMenu}
            onGetContextMenuPos={handleGetContextMenuPos}
            onGetCurrentAlbum={handleSetCurrentAlbum}
          />
        ))}
        <ContextMenu
          { ...contextMenu }
          onCloseMenu={handleCloseContextMenu}
        />
      </div>
      {more && 
        <div className={cls.btnmore}>
          <Cta onClick={handleEventLoadMore}>Xem thêm</Cta>
        </div>
      }
      <Modal open={openModal}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Form.Label text="Tên album"/>
          <Form.InputGroup>
            <Form.Input
              id="albumTitleModal"
              value={albumTitleModal}
              placeholder="Nhập tên album..."
              onChange={(e) => setAlbumTitleModal(e.target.value)}
              onKeyUp={handleEventKeyupUpdateAlbumName}
            />
            <Cta
              type="button"
              onClick={handleEventUpdateAlbumName}
            >
              OK
            </Cta>
          </Form.InputGroup>
        </form>
        <button
          className={cls.albumAddNewClose}
          onClick={handleClosePopupRenameAlbum}
        >
          <FontAwesomeIcon icon={faClose}/>
          
        </button>
      </Modal>
      <Alert
        open={alert.open}
        status={alert.status}
        title={alert.title}
        desc={alert.desc}
        okCta="Đồng ý"
        onClickOkCta={handleEventRemoveAlbum}
        cancelCta="Không"
        onClickCancelCta={handleClosePopupRemoveAlbum}
      />
    </>
  )
}