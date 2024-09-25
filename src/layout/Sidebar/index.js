// IMAGES
import Cover_img from "../../assets/images/cover.jpg";

// COMPONENT
import Profile from "../Profile";
import MenuSidebar from "../MenuSidebar";

export default function Sidebar() {
  // CLASS
  const cls = {
    sidebar: 'w-72 h-full px-5 py-8 bg-slate-950 shadow-2xl shadow-slate-950/50 fixed top-0 bottom-0 left-0 z-40 shrink-0',
    txtLogo: 'pb-6 mb-6 text-xl font-bold text-slate-100 border-b border-b-slate-600/70',
    bgOverlay: 'absolute top-0 right-0 bottom-0 left-0 pointer-events-none opacity-15'
  }

  // RENDER
  return (
    <div className={cls.sidebar} data-sidebar>
      <div className={cls.txtLogo}>THƯ VIỆN ẢNH</div>
      <Profile />
      <MenuSidebar />
      <div className={cls.bgOverlay} style={{ backgroundImage: `url(${Cover_img})` }}></div>
    </div>
  )
}