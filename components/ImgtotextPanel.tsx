import { ChevronLeftIcon, SparklesIcon, PhotoIcon } from '@heroicons/react/20/solid'

export function ImgtotextPanel() {
  return (
    <div className="w-[430px] min-w-[430px] px-4 pt-16 pb-4 bg-white h-screen overflow-y-auto">
      <a href='./' className="flex bg-gray-50 rounded-lg px-2 py-2 mt-4 hover:bg-gray-100">
        <span className="flex items-center justify-center"><ChevronLeftIcon className="h-6 w-6 mr-1" aria-hidden="true" />产品图卖点生成</span>
        <img className="w-16 ml-auto flex" src="img/1706771293727.webp" alt="Your Company" />
      </a>
      <form>
        <div className="pt-4">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">上传图片</h2>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span>点击上传图片</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">或拖拽上传</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 items-center justify-center">
        <div className="flex justify-between items-center pb-3">
          <span className="flex text-sm items-center"><SparklesIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true" />消耗1点<span className=" text-zinc-400">（共20点）</span></span>
          <a href="" className="text-xs text-green-600">免责声明</a>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center rounded-md bg-green-600 w-full py-4 text-sm font-semibold text-white hover:bg-green-700 "
        >
          <SparklesIcon className="h-5 w-5 mr-2" aria-hidden="true" />生成卖点
        </button>
      </div>
      </form>
    </div>
  );
}