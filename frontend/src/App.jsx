import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {userInfo && <Navbar />}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="my-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
