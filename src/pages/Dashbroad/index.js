// IMAGES
import { clsx } from "clsx";
import Cover_img from "../../assets/images/dashboard-cover.svg";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHardDrive, faImages, faRss } from "@fortawesome/free-solid-svg-icons";

export default function Dashbroad() {
  // CLASS
  const cls = {
    wrap: 'w-full',
    rowDashboard: 'grid grid-cols-2 gap-5 mb-8',
    coverDashboard: 'rounded-lg overflow-hidden relative',
    coverDashboardInfo: 'text-right absolute top-8 right-8',
    coverDashboardText1: 'block text-lg font-thin',
    coverDashboardText2: 'block text-5xl font-bold',
    groupBoxInfo: 'grid grid-cols-2 grid-rows-2 gap-5',
    boxInfo: 'w-full px-5 py-5 bg-black rounded-lg text-slate-100 overflow-hidden relative',
    boxInfoBefore: 'before before:w-[150%] before:h-[120%] before:bg-slate-900/20 before:absolute before:rotate-[-25deg] before:top-[3rem] before:left-[1rem] before:pointer-events-none',
    boxInfoIcon: 'size-12 absolute bottom-5 right-5',
    boxAlbums: 'bg-purple-600',
    boxStore: 'bg-green-600',
    boxTime: 'bg-orange-600',
    boxNew: 'bg-teal-600',
    boxInfoSubText: 'block text-md font-thin relative',
    boxInfoHightText: 'block text-2xl font-bold relative',
    boxInfoLowText: 'block text-sm font-thin text-slate-100/60 relative',
    rowBlackboard: 'grid grid-cols-4 gap-5',
    col1: 'col-span-3',
    col2: 'col-span-1',
  }

  // RENDER
  return (
    <div className={cls.wrap}>
      <div className={cls.rowDashboard}>
        <div className={cls.coverDashboard}>
          <img src={Cover_img} alt=""/>
          <div className={cls.coverDashboardInfo}>
            <span className={cls.coverDashboardText1}>Hình ảnh</span>
            <span className={cls.coverDashboardText2}>14567</span>
          </div>
        </div>
        <div className={cls.groupBoxInfo}>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxAlbums)}>
            <span className={cls.boxInfoSubText}>Albums</span>
            <span className={cls.boxInfoHightText}>273</span>
            <FontAwesomeIcon icon={faImages} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxStore)}>
            <span className={cls.boxInfoSubText}>Lưu trữ</span>
            <span className={cls.boxInfoHightText}>1Gb</span>
            <FontAwesomeIcon icon={faHardDrive} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxTime)}>
            <span className={cls.boxInfoSubText}>6 năm và 57 tháng</span>
            <span className={cls.boxInfoHightText}>2019 - 2024</span>
            <FontAwesomeIcon icon={faCalendarDays} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxNew)}>
            <span className={cls.boxInfoSubText}>142 Hình mới</span>
            <span className={cls.boxInfoHightText}>2 Albums mới</span>
            <span className={cls.boxInfoLowText}>(tính trong tháng)</span>
            <FontAwesomeIcon icon={faRss} className={cls.boxInfoIcon}/>
          </div>
        </div>
      </div>
      <div className={cls.rowBlackboard}>
        <div className={cls.col1}>
          hình ảnh mới
        </div>
        <div className={cls.col2}>
          hoạt động mới
        </div>
      </div>
    </div>
  )
}