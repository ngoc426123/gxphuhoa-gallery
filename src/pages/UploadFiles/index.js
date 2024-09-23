import { useEffect, useState } from "react";

// COMPONENT
import { Form } from "../../components/commons/Form";

export default function UploadFiles() {
  // STATE
  const [albumTitle, setAlbumTitle] = useState('');

  // SIDE EFFECT
  useEffect(() => {
    if (!albumTitle) return;

    document.title = `${albumTitle !== '' ? albumTitle + ' -' : ''} Thư viện ảnh - Giáo Xứ Phú Hoà`;
  }, [albumTitle]);

  // CLASS
  const cls = {
    inputTitle: 'w-full mb-10',
    customClassInput: 'text-2xl px-0 border-b border-slate-400 bg-transparent rounded-none',
  };

  // RENDER
  return (
    <div className="">
      <div className={cls.inputTitle}>
        <Form.Input
          name="albumTitle"
          placeholder="Tên album..."
          onChange={e => setAlbumTitle(e.target.value)}
          customClassInput={cls.customClassInput}
        />
      </div>
    </div>
  )
}
