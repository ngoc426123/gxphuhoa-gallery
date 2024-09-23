import { useDropzone } from "react-dropzone"

export default function UploadFiles() {
  // METHOD
  const handleEventGetFileFromEvent = (e) => {
    console.log(e);
  }

  // DROP ZONE
  const { acceptedFiles } = useDropzone({
    getFilesFromEvent: handleEventGetFileFromEvent,
  });
  const files = acceptedFiles.map(f => (
    <li key={f.name}>
      {f.name} has <strong>myProps</strong>: {f.myProp === true ? 'YES' : ''}
    </li>
  ));

  // RENDER
  return (
    <div className="">
      {files}
    </div>
  )
}
