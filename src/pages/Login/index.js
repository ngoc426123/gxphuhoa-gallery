import Cover_img from "../../assets/images/cover.jpg";
import Cta from "../../components/commons/Cta";
import { Form } from "../../components/commons/Form";
import { Modal } from "../../components/Modal";

export default function Login() {
  // CLASS
  const cls = {
    wrap: 'flex items-center justify-center w-full h-screen overflow-hidden',
    cover: 'w-1/2',
    coverImage: 'w-full h-full object-cover',
    loginBox: 'flex items-center justify-center flex-col w-1/2 h-full px-5',
    headingBox: 'text-lg font-thin',
    descBox: 'mb-14 text-4xl leading-tight font-bold',
    noteBox: 'mb-3 font-thin text-stone-500',
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
          <h2 className={cls.headingBox}>Giáo Xứ Phú Hoà</h2>
          <div className={cls.descBox}>Thư viện ảnh</div>
          <div className={cls.noteBox}>* Sử dụng tài khoản <a href="https://gxphuhoa.org/admin" title="Admin Gx Phú Hoà">Gx Phú Hoà</a> để đăng nhập</div>
          <div className={cls.formBox}>
            <form>
              <Form.Input
                name='username'
                placeholder='Tài khoản'
              />
              <Form.Password
                name='password'
                placeholder='Mật khẩu'
                customClassGroup=' mb-7'
              />
              <Cta type="button" block>Đăng nhập</Cta>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={true}
      >
        <p>Lorem Modal</p>
      </Modal>
    </>
  )
}