// components
import Editor from '@/views/components/Editor';

type NewEditorProps = {};

const NewEditor: React.FC<NewEditorProps> = () => {
  return (
    <>
      <div className="g-grid">
        {/* 文字段落 */}
        <div id="T1">
          <div className="g-grid">
            <Editor />
          </div>
        </div>
        {/* 左圖右文 */}
        <div id="T2">
          <div className="g-grid grid-cols-1 md:grid-cols-2">
            <div>
              <img
                className="w-full"
                src="./src/assets/images/test.jpg"
                alt=""
              />
            </div>
            <div>
              <Editor />
            </div>
          </div>
        </div>
        {/* 右圖左文 */}
        <div id="T3">
          <div className="g-grid grid-cols-1 md:grid-cols-2">
            <div className="md:order-2">
              <img
                className="w-full"
                src="./src/assets/images/test.jpg"
                alt=""
              />
            </div>
            <div>
              <Editor />
            </div>
          </div>
        </div>
        {/* 單張圖片 */}
        <div id="T4">
          <div className="g-grid">
            <div>
              <img
                className="w-full"
                src="./src/assets/images/test.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 程式碼 */}
        <div id="T5"></div>
        {/* 左圖右圖 */}
        <div id="T6">
          <div className="g-grid grid-cols-1 md:grid-cols-2">
            <div>
              <img
                className="w-full"
                src="./src/assets/images/test.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="w-full"
                src="./src/assets/images/test.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEditor;
