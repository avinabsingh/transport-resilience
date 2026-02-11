import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({children}){

  return (
    <div className="app-container">

      <Sidebar />

      <div className="content">
        <Header />
        {children}
      </div>

    </div>
  );
}
