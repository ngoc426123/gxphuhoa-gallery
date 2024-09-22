// IMAGE
import Loading_img from "../../assets/images/Loading.svg";

// REDUX
import { useSelector } from "react-redux";

export default function Loading() {
  // STATE
  const { openLoading } = useSelector(state => state.root);

  // CLASS
  const cls = {
    loading: 'flex items-center justify-center w-screen h-screen px-5 bg-sky-950/60 text-center fixed top-0 left-0 z-40'
  }

  // RENDER
  return {
    false: <></>,
    true: (
      <div className={cls.loading}>
        <img src={Loading_img} alt="Loading" />
      </div>
    )
  }[openLoading]
}
