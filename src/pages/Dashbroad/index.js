import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

// REDUX
import { useSelector } from "react-redux";

// IMAGES
import { clsx } from "clsx";
import Avatar_img from "../../assets/images/avatar.png";
import Time1_img from "../../assets/images/1.jpg";
import Time2_img from "../../assets/images/2.jpg";
import Time3_img from "../../assets/images/3.jpg";
import Time4_img from "../../assets/images/4.jpg";
import Time5_img from "../../assets/images/5.jpg";
import Time6_img from "../../assets/images/6.jpg";
import Time7_img from "../../assets/images/7.jpg";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHardDrive, faImages, faRss } from "@fortawesome/free-solid-svg-icons";
import Box from "../../components/Box";
import axios from "axios";

export default function Dashbroad() {
  // STATE
  const { config } = useSelector(state => state.root);
  const [dashboardData, setDashboardData] = useState({
    imagesnumber: 0,
    albumsNumber: 0,
    capacityNumber: '0 KB',
    directory: {
      months: 0,
      years: 0,
      yearStart: 0,
      yearsEnd: 0
    },
    current: {
      images: 0,
      albums: 0,
    }
  })
  const [inYearData, setinYearData] = useState({
    images: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    albums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const memoInYearData = useMemo(() => ({
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      datasets: [
        {
          label: 'Hình ảnh',
          data: inYearData.images,
          borderWidth: 1,
          yAxisID: 'y',
          order: 1,
        },
        {
          label: 'Albums',
          data: inYearData.albums,
          borderWidth: 2,
          type: 'line',
          yAxisID: 'y1',
          order: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          position: 'left',
        },
        y1: {
          position: 'right',
        },
      }
    },
    plugins: {
      colors: {
        enabled: false
      },
    }
  }), [inYearData]);
  const [yearsData, setYearData] = useState({
    yearsNumber: [0, 0, 0, 0, 0, 0],
    yearsCounter: [0, 0, 0, 0, 0, 0],
  });
  const memoYearData = useMemo(() => ({
    data: {
      labels: yearsData.yearsNumber,
      datasets: [
        {
          label: 'Hình ảnh',
          data: yearsData.yearsCounter,
          borderWidth: 1,
          backgroundColor: '#4bc0c0',
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Số lượng trong năm 2024'
      },
      colors: {
        enabled: false
      },
    }
  }), [yearsData])
  const [activities, setActivities] = useState([]);
  const [imageOfDay] = useState(() => {
    const now = new Date();
    const hours = now.getHours();

    if (4 <= hours && hours < 6) return Time1_img
    if (6 <= hours && hours < 9) return Time2_img
    if (9 <= hours && hours < 12) return Time3_img
    if (12 <= hours && hours < 15) return Time4_img
    if (15 <= hours && hours < 18) return Time5_img
    if (18 <= hours && hours < 22) return Time6_img
    if (22 <= hours || hours < 4) return Time7_img
    return Time1_img;
  });

  // SIDE EFFECT
  useEffect(() => {
    document.title = 'Bảng quản lý - ' + config.site_title;
    getDashboard();
  }, [config]);
  
  // METHOD
  const getDashboard = async () => {
    const urlApi = process.env.REACT_APP_API;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    Promise
      .all([
        axios.get(urlApi + '/images/count'),
        axios.get(urlApi + '/albums/count'),
        axios.get(urlApi + '/images/capacity'),
        axios.get(urlApi + '/directory/count'),
        axios.get(urlApi + `/images/countintime?month=${currentMonth}&year=${currentYear}`),
        axios.get(urlApi + `/albums/countintime?month=${currentMonth}&year=${currentYear}`),
        axios.get(urlApi + `/images/countinyear?year=${currentYear}`),
        axios.get(urlApi + `/albums/countinyear?year=${currentYear}`),
        axios.get(urlApi + `/images/countrecent?numberyearrecent=6`),
        axios.get(urlApi + `/activities`),
      ])
      .then((data) => {
        setDashboardData(oldData => ({
          ...oldData,
          imagesnumber: data[0].data.count,
          albumsNumber: data[1].data.count,
          capacityNumber: data[2].data.capacity,
          directory: { ...data[3].data },
          current: {
            images: data[4].data.count,
            albums: data[5].data.count,
          },
        }));
        setinYearData(oldData => ({
          ...oldData,
          images: data[6].data.count,
          albums: data[7].data.count,
        }));
        setYearData(oldData => {
          return {
            ...oldData,
            yearsNumber: data[8].data.yearsNumber,
            yearsCounter: data[8].data.yearsCounter,
          }
        });
        setActivities(data[9].data.map(item => {
          const dateSplit = item.date.split(' ');
          const time = dateSplit[1];
          const day = dateSplit[0];
        
          item = { ...item, time, day }

          return item;
        }));
      })
  }

  // CLASS
  const cls = {
    wrap: 'w-full',
    rowDashboard: 'grid grid-cols-2 gap-5 mb-5',
    coverDashboard: 'rounded-lg overflow-hidden relative',
    coverDashboardInfo: 'text-right absolute top-8 right-8',
    coverDashboardText1: 'block text-lg text-white font-thin',
    coverDashboardText2: 'block text-5xl text-white font-bold',
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
    rowBlackboard: 'grid grid-cols-4 grid-rows-1 gap-5',
    col1: 'col-span-2',
    col2: 'col-span-1',
    boxChart: 'h-80',
    activitiesBox: 'max-h-80 pr-2 overflow-hidden overflow-y-auto custom-scroll',
    activitiesItem: 'flex items-center mb-3',
    activitiesAvatar: 'size-8 mr-3 rounded-lg shrink-0 overflow-hidden',
    activitiesInfo: 'w-[calc(100%-(2rem+4rem+(0.75rem*2)))]',
    activitiesName: 'text-xs font whitespace-nowrap overflow-hidden text-ellipsis',
    activitiesEmail: 'text-[0.7rem] font-light whitespace-nowrap overflow-hidden text-ellipsis',
    activitiesDate: 'w-[4rem] ml-3 text-xs text-right shrink-0',
    activitiesTime: 'block',
    activitiesDay: 'block',
  }

  // RENDER
  return (
    <div className={cls.wrap} data-dashboard>
      <div className={cls.rowDashboard}>
        <div className={cls.coverDashboard} data-dashboard-cover>
          <img src={imageOfDay} alt=""/>
          <div className={cls.coverDashboardInfo}>
            <span className={cls.coverDashboardText1}>Hình ảnh</span>
            <span className={cls.coverDashboardText2}>{dashboardData.imagesnumber}</span>
          </div>
        </div>
        <div className={cls.groupBoxInfo}>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxAlbums)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>Albums</span>
            <span className={cls.boxInfoHightText}>{dashboardData.albumsNumber}</span>
            <FontAwesomeIcon icon={faImages} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxStore)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>Lưu trữ</span>
            <span className={cls.boxInfoHightText}>{dashboardData.capacityNumber}</span>
            <FontAwesomeIcon icon={faHardDrive} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxTime)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>{dashboardData.directory.years} năm và {dashboardData.directory.months} tháng</span>
            <span className={cls.boxInfoHightText}>{dashboardData.directory.yearStart} - {dashboardData.directory.yearEnd}</span>
            <FontAwesomeIcon icon={faCalendarDays} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxNew)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>{dashboardData.current.images} Hình mới</span>
            <span className={cls.boxInfoHightText}>{dashboardData.current.albums} Albums mới</span>
            <span className={cls.boxInfoLowText}>(tính trong tháng)</span>
            <FontAwesomeIcon icon={faRss} className={cls.boxInfoIcon}/>
          </div>
        </div>
      </div>
      <div className={cls.rowBlackboard}>
        <div className={cls.col1}>
          <Box title="Trong năm 2024" boxStyle="sky">
            <div className={cls.boxChart}>
              <Bar { ...memoInYearData }/>
            </div>
          </Box>
        </div>
        <div className={cls.col2}>
          <Box title="Các năm gần đây" boxStyle="teal">
            <div className={cls.boxChart}>
              <Bar { ...memoYearData } className={cls.chart}/>
            </div>
          </Box>
        </div>
        <div className={cls.col2}>
          <Box title="Hoạt động mới nhất" boxStyle="rose">
            <div className={cls.activitiesBox}>
              {activities && activities.map((item, index) => (
                <div className={cls.activitiesItem} key={index}>
                  <div className={cls.activitiesAvatar}>
                    <img src={Avatar_img} alt=""/>
                  </div>
                  <div className={cls.activitiesInfo}>
                    <p className={cls.activitiesName}>{item.displayname}</p>
                    <p className={cls.activitiesEmail}>{item.email}</p>
                  </div>
                  <div className={cls.activitiesDate}>
                    <span className={cls.activitiesTime}>{item.time}</span>
                    <span className={cls.activitiesDay}>{item.day}</span>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}