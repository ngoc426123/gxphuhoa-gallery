import { useState } from "react";
import axios from "axios";
import Cta from "../../components/commons/Cta";
import { Form } from "../../components/commons/Form";
import { Alert } from "../../components/Alert";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch } from "react-redux";
import { setOpenLoading, setUserAuthen } from "../../store/root";

// IMAGES
import Cover_img from "../../assets/images/cover.jpg";
import Logo_img from "../../assets/images/logo.png";
import { setLocalstorage } from "../../utils/localstorage";

const _ERROR_DEFINE = {
  'no_permission': {
    title: 'Từ chối quyền truy cập',
    desc: 'Bạn không có quyền truy cập vào trang quản lý này, vui lòng liên hệ quản trị viên',
  },
  'wrong_user': {
    title: 'Không đăng nhập được',
    desc: 'Đăng nhập thất bại, bạn vui lòng kiểm tra thông tin.',
  }
}

export default function Login() {
  // STATE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    status: false,
    title: '',
    desc: '',
  });

  // METHOD
  const handleKeyUp = (e) => {
    const { key, shiftKey, altKey, ctrlKey } = e;

    if (key === 'Enter') {
      if (shiftKey || altKey || ctrlKey) return;

      handleLogin();
    }
  }

  const handleLogin = async () => {
    if (!username || !password) {
      setAlert({
        open: true,
        status: 0,
        title: 'Không thể đăng nhập',
        desc: 'Bạn nhập thiếu Username hoặc Password, vui lòng kiểm tra lại.',
      });

      return;
    }

    dispatch(setOpenLoading(true));
    try {
      const urlAPI = process.env.REACT_APP_LOGIN_API + '/gallery-login';
      const urlAPPAPI = process.env.REACT_APP_API + '/activities/create';
      const params = { username, password };
      const loginData = await axios.post(urlAPI, params);
      const activitiesData = await axios.post(urlAPPAPI, loginData.data.data);

      dispatch(setUserAuthen(true));
      setLocalstorage('Gxphuhoa-user', activitiesData.data);
      setAlert({
        open: true,
        status: 1,
        title: 'Đăng nhập thành công',
        desc: 'Chúc mừng bạn đã đăng nhập thành công, nhấn nút CHUYỂN phía dưới để vô trang quản lý.',
      });
    } catch(error) {
      setAlert({
        open: true,
        status: 0,
        ..._ERROR_DEFINE[error.response.data.code]
      });
    }
    dispatch(setOpenLoading(false));
  };

  // CLASS
  const cls = {
    wrap: 'flex items-center justify-center w-full h-screen overflow-hidden',
    cover: 'w-1/2 h-full',
    logo: 'size-32 mb-6 drop-shadow-2xl',
    logoImage: '',
    coverImage: 'w-full h-full object-cover',
    loginBox: 'flex items-center justify-center flex-col w-1/2 h-full px-5',
    headingBox: 'text-lg font-thin',
    descBox: 'mb-14 text-3xl font-bold',
    noteBox: 'mb-3 font-thin text-stone-500',
    gxLink: 'text-cyan-400',
    formBox: 'w-full max-w-80',
  }

  // RENDER
  return (
    <>
      <div className={cls.wrap}>
        <div className={cls.cover}>
          <img className={cls.coverImage} src={Cover_img} alt=""/>
        </div>
        <div className={cls.loginBox}>
          <div className={cls.logo}>
            <img src={Logo_img} className={cls.logoImage} alt="Giáo Xứ Phú Hoà"/>
          </div>
          <h2 className={cls.headingBox}>GIÁO XỨ PHÚ HOÀ</h2>
          <div className={cls.descBox}>Thư Viện Ảnh</div>
          <div className={cls.noteBox}>* Sử dụng tài khoản <a className={cls.gxLink} href="https://gxphuhoa.org/admin" title="Admin Gx Phú Hoà">Gx Phú Hoà</a> để đăng nhập</div>
          <div className={cls.formBox}>
            <Form.Input
              name='username'
              value={username}
              placeholder='Tài khoản'
              onChange={e => setUsername(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <Form.Password
              name='password'
              value={password}
              placeholder='Mật khẩu'
              customClassGroup='mb-7'
              onChange={e => setPassword(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <Cta type="submit" block onClick={handleLogin}>Đăng nhập</Cta>
          </div>
        </div>
      </div>
      <Alert
        open={alert.open}
        status={alert.status}
        title={alert.title}
        desc={alert.desc}
        {...(alert.status ? {okCta: "Chuyển"} : {cancelCta: "Tắt"})}
        {...(alert.status
          ? { onClickOkCta: () => {
            setAlert(value => ({ ...value, open: false }));
            navigate('/');
          }}
          : { onClickCancelCta: () => { setAlert(value => ({ ...value, open: false })) } }
        )}
      />
    </>
  )
}