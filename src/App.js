import { Outlet } from "react-router-dom";
import Loading from "./modules/Loading";
import { useCallback, useEffect } from "react";
import axios from "axios";

// REDUX
import { setConfig } from "./store/root";
import { useDispatch } from "react-redux";

function App() {
  // STATE
  const dispatch = useDispatch();

  // METHOD
  const getConfig = useCallback(async () => {
    try {
      const apiURL = process.env.REACT_APP_API + '/options';
      const { data } = await axios.get(apiURL);

      dispatch(setConfig(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  // SIDE EFFECT
  useEffect(() => {
    getConfig();
  }, [getConfig]);

  // CLASS
  const cls = {
    app: 'max-w-full min-h-screen bg-slate-100'
  }

  // RENDER
  return (
    <div id="App" className={cls.app}>
      <Outlet />
      <Loading />
    </div>
  );
}

export default App;
