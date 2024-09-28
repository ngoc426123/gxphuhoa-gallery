import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// IMAGES
import { clsx } from "clsx";
import Cover_img from "../../assets/images/dashboard-cover.svg";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHardDrive, faImages, faRss } from "@fortawesome/free-solid-svg-icons";
import Box from "../../components/Box";

export default function Dashbroad() {
  // STATE
  const [inYearData] = useState({
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      datasets: [
        {
          label: 'Hình ảnh',
          data: [45, 26, 103, 55, 104, 204, 87, 99, 104, 135, 202, 302],
          borderWidth: 1,
          yAxisID: 'y',
          order: 1,
        },
        {
          label: 'Albums',
          data: [2, 5, 1, 2, 2, 3, 1, 2, 1, 7, 2, 4],
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
  });
  const [yearsData] = useState({
    data: {
      labels: ['2022', '2023', '2024', '2020', '2018', '2019'],
      datasets: [
        {
          label: 'Hình ảnh',
          data: [2468, 1892, 1567, 1502, 1190, 892],
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
  });
  const [activities] = useState([
    { avatar: 'https://fastly.picsum.photos/id/700/100/100.jpg?hmac=piWdXztkLPFsF6n2D-c8d-_Xj4LDXaZ4xJgGXpVQ9gg', name: 'Thức Đỗ', email: 'thucdo123@gmail.com', time: '12:30 08/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/700/100/100.jpg?hmac=piWdXztkLPFsF6n2D-c8d-_Xj4LDXaZ4xJgGXpVQ9gg', name: 'Thức Đỗ', email: 'thucdo123@gmail.com', time: '12:30 08/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/468/100/100.jpg?hmac=9PvsPN0iS2LwjNELceXwL6QqGZ_k_5REaTKA87h8Xok', name: 'Minh Ngọc', email: 'minhngoc.ith@gmail.com', time: '10:30 08/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Chung Nguyễn', email: 'chungnguyen.abc@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Long Đỗ', email: 'dolong123@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Chung Nguyễn', email: 'chungnguyen.abc@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Chung Nguyễn', email: 'chungnguyen.abc@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Long Đỗ', email: 'dolong123@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/76/100/100.jpg?hmac=ml0woYXAgAWkn_dBMBSpXJI7hNZtd8VPsad15xxn_co', name: 'Chung Nguyễn', email: 'chungnguyen.abc@gmail.com', time: '12:30 06/03/1024' },
    { avatar: 'https://fastly.picsum.photos/id/700/100/100.jpg?hmac=piWdXztkLPFsF6n2D-c8d-_Xj4LDXaZ4xJgGXpVQ9gg', name: 'Thức Đỗ', email: 'thucdo123@gmail.com', time: '12:30 08/03/1024' },
  ]);

  // SIDE EFFECT
  useEffect(() => {
    document.title = 'Bảng quản lý - Thư viện ảnh - Giáo Xứ Phú Hoà';
  }, []);

  // CLASS
  const cls = {
    wrap: 'w-full',
    rowDashboard: 'grid grid-cols-2 gap-5 mb-5',
    coverDashboard: 'rounded-lg overflow-hidden relative',
    coverDashboardInfo: 'text-right absolute top-8 right-8',
    coverDashboardText1: 'block text-lg text-sky-700 font-thin',
    coverDashboardText2: 'block text-5xl text-sky-800 font-bold',
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
    activitiesAvatar: 'size-10 mr-3 rounded-lg shrink-0 overflow-hidden',
    activitiesInfo: 'w-[calc(100%-(2.5rem+6rem+(0.75rem*2)))]',
    activitiesName: 'text-sm font whitespace-nowrap overflow-hidden text-ellipsis',
    activitiesEmail: 'text-sm font-light whitespace-nowrap overflow-hidden text-ellipsis',
    activitiesTime: 'w-24 ml-3 text-xs shrink-0',
  }

  // RENDER
  return (
    <div className={cls.wrap} data-dashboard>
      <div className={cls.rowDashboard}>
        <div className={cls.coverDashboard} data-dashboard-cover>
          <img src={Cover_img} alt=""/>
          <div className={cls.coverDashboardInfo}>
            <span className={cls.coverDashboardText1}>Hình ảnh</span>
            <span className={cls.coverDashboardText2}>14567</span>
          </div>
        </div>
        <div className={cls.groupBoxInfo}>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxAlbums)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>Albums</span>
            <span className={cls.boxInfoHightText}>273</span>
            <FontAwesomeIcon icon={faImages} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxStore)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>Lưu trữ</span>
            <span className={cls.boxInfoHightText}>1Gb</span>
            <FontAwesomeIcon icon={faHardDrive} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxTime)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>6 năm và 57 tháng</span>
            <span className={cls.boxInfoHightText}>2019 - 2024</span>
            <FontAwesomeIcon icon={faCalendarDays} className={cls.boxInfoIcon}/>
          </div>
          <div className={clsx(cls.boxInfo, cls.boxInfoBefore, cls.boxNew)} data-dashboard-info>
            <span className={cls.boxInfoSubText}>142 Hình mới</span>
            <span className={cls.boxInfoHightText}>2 Albums mới</span>
            <span className={cls.boxInfoLowText}>(tính trong tháng)</span>
            <FontAwesomeIcon icon={faRss} className={cls.boxInfoIcon}/>
          </div>
        </div>
      </div>
      <div className={cls.rowBlackboard}>
        <div className={cls.col1}>
          <Box title="Trong năm 2024" boxStyle="sky">
            <div className={cls.boxChart}>
              <Bar { ...inYearData }/>
            </div>
          </Box>
        </div>
        <div className={cls.col2}>
          <Box title="Các năm gần đây" boxStyle="teal">
            <div className={cls.boxChart}>
              <Bar { ...yearsData } className={cls.chart}/>
            </div>
          </Box>
        </div>
        <div className={cls.col2}>
          <Box title="Hoạt động mới nhất" boxStyle="rose">
            <div className={cls.activitiesBox}>
              {activities && activities.map((item, index) => (
                <div className={cls.activitiesItem} key={index}>
                  <div className={cls.activitiesAvatar}>
                    <img src={item.avatar} alt=""/>
                  </div>
                  <div className={cls.activitiesInfo}>
                    <p className={cls.activitiesName}>{item.name}</p>
                    <p className={cls.activitiesEmail}>{item.email}</p>
                  </div>
                  <div className={cls.activitiesTime}>{item.time}</div>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}