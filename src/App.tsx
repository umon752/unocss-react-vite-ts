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
// components
import Toast from '@/views/components/Toast';
import Modal from '@/views/components/Modal';



const App = () => {
  //----------------------------
  // 進入元素可視範圍淡入淡出
  //----------------------------
  // const { addFadeRefs } = scrollFadeInRefGenerater(); 
  
  return (
    <>
      <Loading />
      <Toast />
      <Modal />
      <div className="flex flex-col min-h-100vh">
        <div className="flex-shrink-0">
          <Nav />
          {/* addFadeRefs={addFadeRefs} */}
          <Usage />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App