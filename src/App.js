import { Outlet } from "react-router-dom";
import Loading from "./modules/Loading";

function App() {
  // CLASS
  const cls = {
    app: 'max-w-full h-screen bg-slate-100'
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
