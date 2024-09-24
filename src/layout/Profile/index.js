import { useState } from "react";
import { getLocalstorage } from "../../utils/localstorage";

// IMAGE
import Avatar_img from "../../assets/images/avatar.png";

export default function Profile() {
  // STATE
  const [user] = useState(getLocalstorage('Gxphuhoa-user'));

  // CLASS
  const cls = {
    wrap: 'flex items-start w-full pb-6 mb-6 border-b border-b-slate-600/70',
    avatar: 'size-10 mr-3 rounded-lg overflow-hidden',
    name: 'text-slate-100',
    email: 'text-sm text-slate-400 font-thin',
  };

  // RENDER
  return (
    <div className={cls.wrap} data-profile>
      <div className={cls.avatar}>
        <img src={Avatar_img} alt={user?.display_name || ''} />
      </div>
      <div>
        <p className={cls.name}>Xin chào</p>
        <p className={cls.name}><strong>{user?.display_name || ''}</strong></p>
        <p className={cls.email}>{user?.user_email || ''}</p>
      </div>
    </div>
  );
}