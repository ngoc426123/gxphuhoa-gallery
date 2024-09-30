import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import clsx from "clsx";

// COMPONENT
import Cta from "../../components/commons/Cta";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faAngleDown, faAngleUp, faCircleCheck, faClose, faImage } from "@fortawesome/free-solid-svg-icons";

export default function UploadHandle() {
  // DROPZONE
  const { open } = useDropzone({
    onDrop: (fls) => handleEventOnDrop(fls),
  });

  // STATE
  const navigate = useNavigate();
  const [filesUp, setFilesUp] = useState([]);
  const [per] = useState(2);
  const [start] = useState(0);
  const [end] = useState(per + start);
  const [openPopup, setOpenPopup] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const filesCount = useMemo(() => filesUp.length, [filesUp]);

  // METHOD
  const handleEventOnDrop = (files) => {
    setFilesUp(() => files);
    setOpenPopup(true);
    handleUpload(files);
    navigate('/upload-files');
  };

  const handleToggle = () => {
    setHideProgress(value => !value);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleUpload = async (files) => {
    if (!files.length) return;

    const fileUpload = files.filter((item, index) => start <= index && index < end);
    const data = new FormData();
    
    setFilesUp(() => files);
    
    [...fileUpload].forEach((file, index) => {
      data.append(index, file, file.name);
    });

    try {
      const apiUrl = process.env.REACT_APP_API + '/upload';
      const resonse = await axios.post(apiUrl, data);
      const leftFiles = files.filter(item => !fileUpload.includes(item));

      console.log(resonse);
      setFilesUp(() => leftFiles);
      handleUpload(leftFiles);
    } catch (error) {
      console.log(error);
    }
  };

  // CLASS
  const cls = {
    popup: 'w-80 bg-white rounded-md rounded-bl-none rounded-br-none shadow-2xl shadow-slate-400/70 overflow-hidden fixed right-3 bottom-0 z-30 transition-all',
    head: 'px-4 py-3 bg-slate-200 relative cursor-pointer',
    iconToggle: 'mr-2',
    close: 'size-6 absolute top-1/2 right-3 translate-y-[-50%] transition-all hover:text-blue-600',
    progress: clsx(
      'w-full max-h-60 overflow-hidden overflow-y-auto custom-scroll',
      { 'hidden': hideProgress }
    ),
    itemUpload: 'p-3 pr-14 list-none overflow-hidden text-ellipsis whitespace-nowrap relative hover:bg-slate-200',
    iconItemUpload: 'size-4 mr-3',
    iconItemUploadStatus: 'size-6 text-green-600 absolute top-1/2 right-3 translate-y-[-50%]',
    span: 'pointer-events-none',
  };

  // RENDER
  return (
    <>
      <Cta ctaStyle='outline' onClick={open}>
        <FontAwesomeIcon icon={faUpload} className="mr-2"/>
        <span className="inline-block">Upload</span>
      </Cta>
      {openPopup && <div className={cls.popup} data-upload-progress-popup>
        <div className={cls.head} onClick={handleToggle}>
          <p>
            <FontAwesomeIcon icon={hideProgress ? faAngleUp : faAngleDown} className={cls.iconToggle}/>
            Có -/{filesCount} đang được upload...
          </p>
          <button className={cls.close} onClick={handleClosePopup}>
            <FontAwesomeIcon icon={faClose}/>
          </button>
        </div>
        <div className={cls.progress}>
          {filesUp && filesUp.map((file) => (
            <li key={file.name} className={cls.itemUpload}>
              <FontAwesomeIcon icon={faImage} className={cls.iconItemUpload}/>
              <span className={cls.span}>{file.name}</span>
              <FontAwesomeIcon icon={faCircleCheck} className={cls.iconItemUploadStatus}/>
            </li>
          ))}
        </div>
      </div>}
    </>
  );
}
