import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// hooks
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useShareSocial } from '@/hooks/useShareSocial';
import { useCopyUrl } from '@/hooks/useCopyUrl';
import { useObserverFade } from '@/hooks/useObserverFade';
import { useCounter } from '@/hooks/useCounter';
import { useCursor } from '@/hooks/useCursor';
// components
import DefaultImg from '@/views/components/DefaultImg';
import Breadcrumb from '@/views/components/Breadcrumb';
import Pagination from '@/views/components/Pagination';
import Tag from '@/views/components/Tag';
import Card from '@/views/components/Card';
import Header from '@/views/components/Header';
import Editor from '@/views/components/Editor';
import NewEditor from '@/views/components/NewEditor';
import Spinner from '@/views/components/Spinner';
import Accordion from '@/views/components/Accordion';
import Tab from '@/views/components/Tab';
import { showToast } from '@/redux/slice/toastSlice';
import { showModal } from '@/redux/slice/modalSlice';
import Form from '@/views/pages/Form';
import ReactHookForm from '@/views/pages/ReactHookForm';
// import TanstackForm from '@/views/pages/TanstackForm';

type H1Props = {
  text: string;
};

const H1: React.FC<H1Props> = ({ text }) => {
  return (
    <div className="u-h1 font-bold text-blue-500 border-b-solid border-1 py-16 my-16">{text}</div>
  );
};

type H2Props = {
  text: string;
};

const H2: React.FC<H2Props> = ({ text }) => {
  return (
    <div className="u-h2 font-bold text-blue-500 border-b-solid border-1 py-16 my-16">{text}</div>
  );
};

type H3Props = {
  text: string;
};

const H3: React.FC<H3Props> = ({ text }) => {
  return (
    <div className="u-h3 font-bold text-blue-500 my-20">{text}</div>
  );
};

type DirectionProps = {
  text: string | JSX.Element;
  isLast?: boolean;
};

const Direction: React.FC<DirectionProps> = ({ text, isLast = false }) => {
  return (
    <div className={`bg-blue-50 rounded-8 px-16 py-12 ${isLast ? '' : 'mb-10'}`}>{text}</div>
  );
};

type UsageProps = {
  addFadeRefs: React.RefObject<HTMLDivElement>;
};

const Usage: React.FC<UsageProps> = () => {
  const dispatch = useDispatch();
  const scrollToTop = useScrollToTop();
  const copyUrl = useCopyUrl();
  const shareSocial = useShareSocial();
  useObserverFade('[data-fade]');
  const countersRef = useRef<HTMLDivElement | null>(null);
  let counterInstance = null;

  useCursor({
    enableLinkHover: true,
    linkClass: ['w-50', 'h-50'],
    activeClass: ['opacity-100'],
    // enableHideCursor: true,
    // enableTouch: true,
    // enter(e) {
      // console.log('enter', e);
    // },
    move(e, cursor) {
      if(e.target.dataset.cursorBox) {
        const box = e.target;
        cursor.textContent = 'box';
        box.addEventListener('mouseleave', () => {
          cursor.textContent = '';
        });
      }
      // console.log('move', e, cursor);
    },
    // leave(e, cursor) {
      // console.log('leave', e), cursor;
    // },
  });

  console.log('countersRef 1', countersRef);
  useEffect(() => {
    console.log('countersRef 2', countersRef);
    
    // countersRef.current.forEach((el) => {
      // counter 可包含非純數字
      counterInstance = useCounter({
        selector: countersRef.current,
        duration: 2000,
        startTime: 500,
        delay: 100,
        startNum: 50,
        done() {
          console.log('counter done');
        }
      });
    // })
    
    // const run = () => {
      counterInstance.run();
    // }

    // counter 只可設定純數字
    // const orgCounterInstance = useCounter({
    //   selector: '.js-org-counter',
    //   duration: 2000,
    //   startTime: 500,
    //   delay: 100,
    //   startNum: 10,
    //   randomMode: {
    //     enable: false,
    //     thousandComma: true,
    //   },
    //   done() {
    //     console.log('org counter done');
    //   }
    // });
  }, [countersRef])

  useEffect(() => {
    dispatch(
      showToast({
        text: '提示訊息',
        icon: 'i-material-symbols:language',
      })
    )
  }, [])
  return (
    <>
      <div className="g-container pt-15 pb-50">
        <H1 text={'Usage'} />

        <H2 text={'Cursor'} />
        <div className="w-300 h-300 bg-blue-300 u-flex-center flex-col gap-10" data-cursor-area="0">
          <a href="#!" className="rounded-4 bg-blue-800 text-white p-8">連結</a>
          <button type="button" className="rounded-4 bg-blue-800 text-white p-8">按鈕</button>
          <div className="w-100 h-100 bg-blue-500 u-flex-center text-white" data-cursor-box>區域</div>
        </div>
        <div className="w-30 h-30 rounded-full bg-white fixed top-0 left-0 pointer-events-none mix-blend-difference opacity-0 transition-[opacity,width,height] duration-200 ease-linear" data-cursor="0"></div>

        <div className="w-300 h-300 bg-blue-300 u-flex-center flex-col gap-10" data-cursor-area="1">
          <a href="#!" className="rounded-4 bg-blue-800 text-white p-8">連結</a>
          <button type="button" className="rounded-4 bg-blue-800 text-white p-8">按鈕</button>
          <div className="w-200 u-img-contain" data-cursor-img="./src/assets/images/test.jpg"></div>
        </div>
        <div className="pointer-events-none fixed top-0 left-0 opacity-0 transition-[opacity,width,height] duration-200 ease-linear" data-cursor="1"></div>


        <H2 text={'Counter'} />
        {/* 123,567.98 */}
        <div className="u-h2 text-blue fw-bold mb-10" ref={countersRef} data-counter="123,567.98"></div>
        {/* <div className="u-h2 text-blue fw-bold mb-10" ref={countersRef} data-counter="123"></div> */}
        <h3 className="inline-block bg-blue-50 rounded-8 px-16 py-12 mb-10">可包含非純數字</h3>
        <div className="flex gap-10">
          {/* <button type="button" className="rounded-4 bg-main text-white p-8" onClick={run}>可包含非純數字 run</button> */}
          {/* <button type="button" className="rounded-4 bg-main text-white p-8" onClick={counterInstance.stop}>可包含非純數字 stop</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={counterInstance.start}>可包含非純數字 start</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={counterInstance.reset}>可包含非純數字 reset</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={counterInstance.restart}>可包含非純數字 restart</button> */}
        </div>
        <br/>
        {/* <div className="u-h2 text-blue fw-bold mb-10 js-org-counter" data-counter="1000"></div>
        <h3 className="inline-block bg-blue-50 rounded-8 px-16 py-12 mb-10">只可設定純數字</h3>
        <div className="flex gap-10">
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={orgCounterInstance.run}>只可設定純數字 run</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={orgCounterInstance.stop}>只可設定純數字 stop</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={orgCounterInstance.start}>只可設定純數字 start</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={orgCounterInstance.reset}>只可設定純數字 reset</button>
          <button type="button" className="rounded-4 bg-main text-white p-8" onClick={orgCounterInstance.restart}>只可設定純數字 restart</button>
        </div> */}


        {/* TODO */}
        <H2 text={'Form'} />
        <Form />


        <H3 text={'React Hook Form'} />
        <ReactHookForm />


        <H3 text={'TanStack Form'} />
        {/* <TanstackForm /> */}
        

        <Direction text={'左右方向(適用於所有書寫方向)｜margin、padding、text-align 使用 ms/me/mx/ps/pe/px/text-start/text-end'} isLast={true} />

        <H2 text={'HTML (Reset)'} />
        <button type="button">按鈕</button>
        <a href="#!">連結</a>
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
        <h6>h6</h6>
        <ul>
          <li>項目一</li>
        </ul>
        <ol>
          <li>項目一</li>
        </ol>
        <p>文字</p>
        <b>粗體文字</b>
        <i>斜體文字</i>
        <label htmlFor="">label</label>

        <H2 text={'Grid'} />
        <div className="g-grid grid-cols-2 sm-grid-cols-4">
          <div className="w-full h-100 bg-blue-300"></div>
          <div className="w-full h-100 bg-blue-300"></div>
          <div className="w-full h-100 bg-blue-300"></div>
          <div className="w-full h-100 bg-blue-300"></div>
        </div>

        <H2 text={'Icon'} />
        <div className='flex flex-items-center'>
          <div className='me-4'>使用 presetIcons.collections 自訂 icon (此方式預設會將圖示變成 data:image，所以設定顏色無效)｜</div>
          <div className="i-custom:circle text-blue-300"></div>
        </div>
        <div className='flex flex-items-center'>
          <div className='me-4'>使用 presetIcons.collections 自訂 icon (加上 ?mask 會將圖示變成 mask image，可以設定顏色) ｜</div>
          <div className="i-custom:circle?mask text-blue-300"></div>
        </div>
        <div className='flex flex-items-center'>
          <div className='me-4'>安裝 iconify 的 icon｜</div>
          <div className="i-material-symbols:language text-blue-300"></div>
        </div>
        <div className='flex flex-items-center'>
          <div className='me-4'>使用 svg iconfont｜</div>
          <svg className="u-icon icon-upload text-blue-300"><use xlinkHref="./src/assets/images/icon/symbol-defs.svg#icon-upload"></use></svg>
        </div>

        <H2 text={'Hover'} />
        <div className="hover:text-blue-300">在觸碰和非觸碰裝置皆有效的 hover</div>

        <br />

        <div className="@hover:text-blue-300">只在非觸碰裝置上有效的 hover</div>

        <br />

        <div className="parent">parent 父層 hover 子層 (觸碰和非觸碰裝置皆有效)
          <div className="parent-hover:(text-blue-500)">子層</div>
        </div>

        <div className="parent">parent 父層 hover 子層 (只在非觸碰裝置上有效)
          <div className="@parent-hover:(text-blue-500)">子層</div>
        </div>

        <br />

        <div className="group">group 父層 hover 巢狀子層 (觸碰和非觸碰裝置皆有效)
          <div>子層
            <div className="group-hover:(text-blue-500)">子層</div>
            子層
          </div>
        </div>

        <div className="group">group 父層 hover 巢狀子層 (只在非觸碰裝置上有效)
          <div>子層
            <div className="@group-hover:(text-blue-500)">子層</div>
            子層
          </div>
        </div>

        <br />

        <div>
          <button type="button" className="peer">peer hover 相鄰元素 (觸碰和非觸碰裝置皆有效)</button>
          <div className="peer-hover:(text-blue-500)">相鄰元素</div>
        </div>

        <div>
          <button type="button" className="peer">peer hover 相鄰元素 (只在非觸碰裝置上有效)</button>
          <div className="@peer-hover:(text-blue-500)">相鄰元素</div>
        </div>

        <H2 text={'Peer'} />
        <div className="bg-blue-50 rounded-8 px-16 py-12 mb-10">
          讓 B 元素根據 A 元素的狀態變化而改變樣式
        </div>
        <div>
          <input type="checkbox" className="peer hidden" id="toggle" />
          <label htmlFor="toggle" className="block p-4 border-(1 solid blue-300) peer-checked:(bg-blue-300)">
          B 元素 (peer-checked)
          </label>
        </div>

        <br />

        <div>
          <button type="button" className="peer">A 元素 (peer-active)</button>
          <div className="peer-active:(text-blue)">B 元素</div>
        </div>

        <br />

        <div>
          <button type="button" className="peer">A 元素 (peer-focus)</button>
          <div className="peer-focus:(text-blue)">B 元素</div>
        </div>

        <br />

        <div>
          <button type="button" className="peer" disabled>A 元素 (peer-disabled)</button>
          <div className="peer-disabled:(text-gray)">B 元素</div>
        </div>

        <H2 text={'Compile class transformer'} />
        <div className=":uno: bg-blue-300 text-white rounded-8 px-18 py-8 mb-10">class 最前方加入「:uno:」瀏覽器預覽亂數顯示 class</div>
        <div className="bg-blue-300 text-white rounded-8 px-18 py-8">瀏覽器預覽正常顯示 class</div>

        <H2 text={'Variant group transformer'} />
        <div className="hover:(bg-blue-300 text-white) font-(medium base) rounded-8 px-18 py-8">class 合併寫法</div>

        <H2 text={'Ratio image'} />
        <div className="w-50%">
          <div className="u-ratio-[16x9]">
            <img className="u-img-ratio" src="./src/assets/images/test.jpg" alt="" />
          </div>
        </div>

        <H2 text={'Background image'} />
        <div className="bgi-[test.jpg] bg-cover w-100 h-100"></div>

        <H2 text={'vw 計算'} />
        <div className="vw-width-[500] bg-blue-300 text-white rounded-8 px-18 py-8">可使用 width、margin、padding、height、fontSize</div>

        <div className="mt-64 mb-32">
          <div className="b-b-dotted b-blue-300 border-width-4 mb-4"></div>
          <div className="b-b-dotted b-blue-300 border-width-4"></div>
        </div>

        <H1 text={'Components'} />

        <H2 text={'Breadcrumb'} />
        <Breadcrumb items={[
          {
            text: '第一層',
            href: '#!'
          },
          {
            text: '第二層',
            href: '#!'
          },
          {
            text: '當前',
            href: '#!'
          }
        ]} />

        <H2 text={'Pagination'} />
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />

        <H2 text={'Btn'} />
        <div className="flex items-center gap-8 mb-8">
          <button type="button" className="inline-flex flex-justify-center items-center border-1 border-solid bg-main text-white rounded-4 px-14 py-10 u-transition-ease @hover:(u-transition-ease)">按鈕</button>
        </div>

        <H2 text={'Tag'} />
        <Tag text={'標籤'} />

        <H2 text={'Default image'} />
        <Direction text={<>
          參數說明:<br />
          src: 圖片路徑 (如果值為空、null、undefined，會帶入 defaultSrc 路徑)<br />
          defaultSrc: 預設圖路徑<br />
          alt: 描述文字<br />
          className: class 名稱
        </>} />
        <DefaultImg src="" defaultSrc="./src/assets/images/test-default.jpg" alt="" className="" />

        <H2 text={'Card'} />
        <Direction text={<>
          參數說明:<br />
          img.url: 圖片路徑 (如果值為空、null、undefined，會帶入 defaultSrc 路徑)<br />
          img.defaultUrl: 預設圖路徑<br />
          img.alt: 描述文字<br />
          img.className: 圖片 className<br />
          content.title: 標題<br />
          content.text: 內文<br />
          link.href: 連結
          link.blank: 是否另開視窗
        </>} />
        <ul className="g-grid grid-cols-1 sm:grid-cols-2 xxl:grid-cols-3">
          <li>
            <Card img={{
              url:'',
              defaultUrl: './src/assets/images/test-default.jpg',
              alt:'',
              className:'',
            }}
            content={{
              title: '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標',
              text: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文',
            }}
          link={{
            href: '#!',
            blank: true
          }} />
          </li>
          <li>
            <Card img={{
              url: './src/assets/images/test.jpg',
              defaultUrl: './src/assets/images/test-default.jpg',
              alt: '',
              className: '',
            }}
            content={{
              title: '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標',
              text: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文',
            }}
            link={{
              href: '#!',
              blank: true
            }} />
          </li>
          <li>
            <Card img={{
              url: './src/assets/images/test.jpg',
              defaultUrl: './src/assets/images/test-default.jpg',
              alt: '',
              className: '',
            }}
              content={{
                title: '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標',
                text: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文',
              }} />
          </li>
          <li>
            <Card img={{
              url: './src/assets/images/test.jpg',
              defaultUrl: './src/assets/images/test-default.jpg',
              alt: '',
              className: '',
            }}
              content={{
                title: '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標',
                text: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文',
              }} />
          </li>
          <li>
            <Card img={{
              url: './src/assets/images/test.jpg',
              defaultUrl: './src/assets/images/test-default.jpg',
              alt: '',
              className: '',
            }}
              content={{
                title: '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標',
                text: '內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文',
              }} />
          </li>
        </ul>

        <H2 text={'Header'} />
        <Direction text={<>
          參數說明:<br />
          img.url: 圖片路徑 (如果值為空、null、undefined，會帶入 defaultSrc 路徑)<br />
          defaultUrl: 預設圖路徑<br />
          img.alt: 描述文字<br />
          img.ratio: 圖片比例 (ex: 16x9)<br />
          content.title: 標題
        </>} />
        <Header
          img={{
            url: './src/assets/images/test.jpg',
            defaultUrl: './src/assets/images/test-default.jpg',
            alt: '',
            ratio: 'u-ratio-[1920x300]',
          }}
          content={{
            title: '標題'
          }}
        />

        <H2 text={'Spinner'} />
        <Spinner active={true} />

        <H2 text={'Accordion'} />
        <Accordion array={[
          { title: '標題1', text: '內容1' },
          { title: '標題2', text: '內容2' },
          { title: '標題3', text: '內容3' },
        ]} />

        <H2 text={'Tab'} />
        <Tab array={[
          { title: '標題1', text: '內容1' },
          { title: '標題2', text: '內容2' },
          { title: '標題3', text: '內容3' },
          { title: '標題4', text: '內容4' },
          { title: '標題55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555', text: '內容5' },
        ]} />

        {/* TODO */}
        <H2 text={'Modal'} />
        <button type="button" className="rounded-4 bg-main text-white p-8" onClick={() => {
          dispatch(
            showModal({
              type: 'msg',
              title: '彈窗標題',
              text: '彈窗文字',
              btn: {
                text: '確認',
                url: 'https://www.google.com/'
              }
            })
          )
        }}>外捲軸 modal</button>
        ｜
        <button type="button" className="rounded-4 bg-main text-white p-8" onClick={() => {
          dispatch(
            showModal({
              type: 'inner',
              title: '標題標題標題標題標題標題標題標題',
              text: '文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字',
              btn: {
                text: '確認',
              }
            })
          )
        }}>內捲軸 modal</button>

        <H2 text={'編輯器'} />
        <Editor />

        <H2 text={'新式編輯器'} />
        <NewEditor />

        <div className="mt-64 mb-32">
          <div className="b-b-dotted b-blue-300 border-width-4 mb-[4]"></div>
          <div className="b-b-dotted b-blue-300 border-width-4"></div>
        </div>

        <H1 text={'Methods'} />

        <H2 text={'ScrollToTop'} />
        <button type="button" className="text-white bg-main rounded-4 p-4" onClick={() => scrollToTop({ top: 500 })}>scrollToTop</button>

        <H2 text={'ObserveFade'} />
        <div className="flex gap-10">
          <div className="w-200 h-200 bg-blue-300" 
            data-fade="in" 
            data-fade-duration="800" 
            data-fade-delay="100"
            data-fade-once="false"
          >
          </div>
          <div className="w-200 h-200 bg-blue-300"
            odata-fade="up" 
            data-fade-duration="800" 
            data-fade-delay="200"
            >
          </div>
          <div className="w-200 h-200 bg-blue-300"
            odata-fade="up" 
            data-fade-duration="800" 
            data-fade-delay="300"
            >
          </div>
        </div>

        <H2 text={'Share'} />
        <div className="flex gap-10">
          <button type="button" className="text-white bg-main rounded-4 p-4" onClick={copyUrl}>copy</button>
          <button type="button" className="text-white bg-main rounded-4 p-4" onClick={() => shareSocial('fb')}>fb share</button>
          <button type="button" className="text-white bg-main rounded-4 p-4" onClick={() => shareSocial('line')}>line share</button>
          <button type="button" className="text-white bg-main rounded-4 p-4" onClick={() => shareSocial('x')}>x share</button>
        </div>

      </div>
    </>
  );
};

export default Usage;
