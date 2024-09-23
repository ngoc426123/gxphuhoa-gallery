// COMPONENT
import Cta from "../commons/Cta";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function UploadTopbar() {
  return (
    <Cta ctaStyle='outline'>
      <FontAwesomeIcon icon={faUpload} className="mr-2"/>
      <span>Upload</span>
    </Cta>
  );
}
