// components
// import Select from '@/views/components/Select';

const Form: React.FC = () => {
  return (
    <>
      <form action="" className="bg-blue-50 rounded-[8px] p-[20px]">
        {/* input */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="input_0" className="u-h4">
              input
            </label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              <input
                type="text"
                name="input_0"
                id="input_0"
                placeholder="請輸入"
                className="w-100%"
              />
              <button
                type="button"
                className="i-material-symbols:close-small-outline-rounded flex-shrink-0"
              ></button>
            </div>
            <div className="text-gray u-caption mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* select */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="select_0" className="u-h4">
              select
            </label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              {/* <Select name={'select'} 
              control={null} 
              options={[
                { label: '蘋果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
                { label: '芒果', value: 'mango' },
              ]}
            /> */}
              <select
                name="select_0"
                id="select_0"
                className="w-100%"
                defaultValue=""
              >
                <option value="" disabled>
                  請選擇
                </option>
                <option value="0" key="0">
                  0
                </option>
                <option value="1" key="1">
                  1
                </option>
                <option value="2" key="2">
                  2
                </option>
              </select>
              <button
                type="button"
                className="i-material-symbols:keyboard-arrow-down-rounded flex-(shrink-0)"
              ></button>
            </div>
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* checkbox */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <div className="u-h4">checkbox</div>
          </div>
          <div>
            <div className="flex flex-(items-center) gap-[10px]">
              <div className="u-text relative flex flex-(items-center justify-between) gap-[4px]">
                <input
                  type="checkbox"
                  name="check_0"
                  id="check_0_0"
                  className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0"
                />
                <div className="relative w-[20px] h-[20px] border-(solid 1 gray) rounded-[4px] after:(content-['✔'] text-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="check_0">選項</label>
              </div>
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input
                  type="checkbox"
                  name="check_0"
                  id="check_0_1"
                  className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0"
                />
                <div className="relative w-[20px] h-[20px] border-(solid 1 gray) rounded-[4px] after:(content-['✔'] text-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="check_1">選項</label>
              </div>
            </div>
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* radio */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <div className="u-h4">radio</div>
          </div>
          <div>
            <div className="flex flex-(items-center) gap-[10px]">
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input
                  type="radio"
                  name="radio_0"
                  id="radio_0_0"
                  className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0"
                />
                <div className="w-[20px] h-[20px] relative border-(solid 1 gray) rounded-[50px] after:(content-[''] w-[10px] h-[10px] rounded-[50px] bg-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="radio_0">選項</label>
              </div>
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input
                  type="radio"
                  name="radio_0"
                  id="radio_0_1"
                  className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0"
                />
                <div className="w-[20px] h-[20px] relative border-(solid 1 gray) rounded-[50px] after:(content-[''] w-[10px] h-[10px] rounded-[50px] bg-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="radio_1">選項</label>
              </div>
            </div>
            <div className="text-gray u-caption mt-4">備註文字</div>
          </div>
        </div>
        {/* textarea */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="textarea_0" className="u-h4">
              textarea
            </label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              <textarea
                name="textarea_0"
                id="textarea_0"
                cols={30}
                rows={10}
                maxLength={1000}
                placeholder="請輸入"
                className="w-100%"
              ></textarea>
            </div>
            <div className="text-gray u-caption mt-[4px]">備註文字</div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue text-white rounded-[4px] p-[8px]"
        >
          送出
        </button>
      </form>
    </>
  );
};

export default Form;
