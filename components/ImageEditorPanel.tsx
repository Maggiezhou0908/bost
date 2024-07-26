import CascadDropdown from "./CascadDropdown";
import { Uploadimg } from "./base/Uploadimg";
import { ImageStyle } from "./ImageStyle";
import { ChevronLeftIcon, SparklesIcon } from '@heroicons/react/20/solid'


export function ImageEditorPanel() {

  return (
    <div className="w-[430px] min-w-[430px]  pt-16 pb-4 bg-white h-screen overflow-y-auto">
      <div className="px-4">
      <a href='./' className="flex bg-gray-50 rounded-lg px-2 py-2 mt-4 hover:bg-gray-100">
        <span className="flex items-center justify-center"><ChevronLeftIcon className="h-6 w-6 mr-1" aria-hidden="true" />产品图生成</span>
        <img className="w-16 ml-auto flex" src="img/1706771276140.webp" alt="Your Company" />
      </a>

      <div className="pt-4">
      {/* 图片上传组件，如果图片已经上次可以使用：XXX组件。如果选择已扣图片则已扣图片有选择状态 */}
      <Uploadimg />
      
        <div className="border-b border-gray-900/10 py-3 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900 pb-2">风格配置</h2>
          <CascadDropdown />
        </div>
        <div className="mb-28">
        <ImageStyle />
        </div>
      </div>
      </div>
      <div className="items-center justify-center fixed bottom-0 w-[430px] min-w-[430px] px-3 bg-white border-t border-gray-900/10 pb-4">
        <div className="flex justify-between items-center py-3">
          <span className="flex text-sm items-center"><SparklesIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true" />消耗1点<span className=" text-zinc-400">（共20点）</span></span>
          <a href="" className="text-xs text-green-600">免责声明</a>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center rounded-md bg-green-600 w-full py-4 text-sm font-semibold text-white hover:bg-green-700 "
        >
          <SparklesIcon className="h-5 w-5 mr-2" aria-hidden="true" /> 开始生成
        </button>
      </div>

    </div>
  );
}