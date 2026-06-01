import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export function RootLayout({ view, setView, listCount }) {
  return (
    <div className="page-container">
      <Header view={view} setView={setView} listCount={listCount} />
      <Outlet />
      <Footer />
    </div>
  );
}
