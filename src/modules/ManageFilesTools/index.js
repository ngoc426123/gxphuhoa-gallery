// REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../store/manfiles";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { useMemo } from "react";
import clsx from "clsx";

export default function ManageFilesTools() {
  // STATE
  const dispatch = useDispatch();
  const { files } = useSelector(state => state.manfiles);

  // METHOD
  const handleClearFiles = () => {
    dispatch(clearFiles());
  };
 
  // CLASS
  const cls = useMemo(() => ({
    wrap: clsx(
      'flex items-center justify-between py-3 px-5 pl-8 bg-white shadow-2xl shadow-slate-400/70 fixed top-0 right-0 left-72 z-30 transition-all',
      { 'translate-y-[-100%]': !files.length }
    ),
    tools: 'flex items-center',
    close: 'size-10 mr-2 rounded-full transition-all hover:bg-slate-100',
    trash: 'size-10 rounded-full transition-all hover:bg-slate-100'
  }), [files]);

  // RENDER
  return (
    <div className={cls.wrap} data-manage-file-tools>
      <div className={cls.tools}>
        <button
          className={cls.close}
          onClick={handleClearFiles}
        >
          <FontAwesomeIcon icon={faX}/>
        </button>
        <span>Đã chọn {files.length} ảnh</span>
      </div>
      <div className={cls.tools}>
        <button className={cls.trash}><FontAwesomeIcon icon={faTrash}/></button>
      </div>
    </div>
  )
}
