import { Routes, Route } from 'react-router-dom';
// helpers
import '@/assets/tsx/helpers/checkBrowser';
import '@/assets/tsx/helpers/checkDevice';
import '@/assets/tsx/helpers/setPropertyVh';
// import scrollFadeInRefGenerater from '@/assets/tsx/helpers/scrollFadeInRefGenerater';

// layout
import Loading from '@/views/layout/Loading';
import Nav from '@/views/layout/Nav';
import Footer from '@/views/layout/Footer';
import Usage from '@/views/pages/Usage';
import Form from '@/views/pages/Form';
import ReactHookForm from '@/views/pages/ReactHookForm';
import TanstackForm from '@/views/pages/TanstackForm';
import NotFound from '@/views/pages/NotFound';
// components
import Toast from '@/views/components/Toast';
import Modal from '@/views/components/Modal';



const App = () => {
  return (
    <>
      <Loading />
      <Toast />
      <Modal />
      <div className="flex flex-col min-h-100vh">
        <div className="flex-shrink-0">
          <Nav />
          <Routes>
            <Route path="/" element={<Usage />} />
            <Route path="form" element={<Form />} />
            {/* <Route path="/layout" element={<Layout />}>
              <Route index element={<LayoutList />}></Route>
              <Route pat６６h=":id" element={<LayoutContent />}></Route>
            </Route> */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App