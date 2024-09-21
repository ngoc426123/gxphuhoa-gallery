import { Outlet } from "react-router-dom";

function App() {
  // CLASS
  const cls = {
    app: 'max-w-full min-h-screen bg-stone-100'
  }
  // RENDER
  return (
    <div id="App" className={cls.app}>
      <Outlet />
    </div>
  );
}

export default App;
