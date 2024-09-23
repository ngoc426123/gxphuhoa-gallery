import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

// COMPONENT
import Cta from "../../components/commons/Cta";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// REDUX
import { useDispatch } from "react-redux";
import { setFiles, setOpenProgressPopup } from "../../store/uploadfiles";

export default function UploadTopbar() {
  // STATE
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // METHOD
  const handleEventOnDrop = (files) => {
    dispatch(setOpenProgressPopup(true));
    dispatch(setFiles(files));
    navigate('/upload-files');
  };

  // DROPZONE
  const { open } = useDropzone({
    onDrop: handleEventOnDrop,
  });

  // RENDER
  return (
    <Cta ctaStyle='outline' onClick={open}>
      <FontAwesomeIcon icon={faUpload} className="mr-2"/>
      <span>Upload</span>
    </Cta>
  );
}
