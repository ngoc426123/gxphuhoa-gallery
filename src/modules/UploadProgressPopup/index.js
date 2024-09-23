// REDUX
import { useSelector } from "react-redux";

export default function UploadProgressPopup() {
  // STATE
  const { openProgressPopup, files } = useSelector(state => state.uploadfiles);

  // CLASS
  const cls = {
    popup: 'w-80 bg-slate-100 fixed right-3 bottom-0'
  }

  // RENDER
  return {
    false: <></>,
    true: (
      <div className={cls.popup}>
        <Files files={files}/>
      </div>
    )
  }[openProgressPopup]
}

function Files(props) {
  return props.files.map(f => (
    <li key={f.name}>
      {f.name} has <strong>myProps</strong>: {f.myProp === true ? 'YES' : ''}
    </li>
  ));
}