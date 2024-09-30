import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

// COMPONENT
import Cta from "../../components/commons/Cta";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faAngleDown, faAngleUp, faCircleCheck, faClose, faImage } from "@fortawesome/free-solid-svg-icons";

export default function UploadHandle() {
  // REF
  const _progressListRef = useRef();

  // DROPZONE
  const { open } = useDropzone({
    onDrop: (files) => handleEventOnDrop(files),
  });

  // STATE
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const filesCount = useMemo(() => files.length, [files]);

  // METHOD
  const handleEventOnDrop = (files) => {
    setFiles(files);
    setOpenPopup(true);
    navigate('/upload-files');
  };

  const handleToggle = () => {
    setHideProgress(value => !value);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
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
            Có {filesCount}/100 đang được upload...
          </p>
          <button className={cls.close} onClick={handleClosePopup}>
            <FontAwesomeIcon icon={faClose}/>
          </button>
        </div>
        <div className={cls.progress} ref={_progressListRef}>
          {files && files.map((file) => (
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
