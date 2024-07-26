import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import CascadDropdown from "./CascadDropdown";
import { ChevronLeftIcon, SparklesIcon } from '@heroicons/react/20/solid'

const platform = [
  { name: 'Amazon', selectedColor: 'ring-green-500', imgUrl: '/public/logo_am.png' },
  { name: 'Shopify', selectedColor: 'ring-green-500', imgUrl: '/public/logo_sp.png' },
  { name: 'Alibaba', selectedColor: 'ring-green-500', imgUrl: '/public/logo_ab.png' },
  { name: 'Temu', selectedColor: 'ring-green-500', imgUrl: '/public/logo_tm.png' },
  { name: 'Shopee', selectedColor: 'ring-green-500', imgUrl: '/public/logo_xp.png' },
  { name: 'AliExpress', selectedColor: 'ring-green-500', imgUrl: '/public/logo_ae.png' },
  { name: 'Lazada', selectedColor: 'ring-green-500', imgUrl: '/public/logo_laz.png' },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function TextEditorPanel() {

  const [selectedColor, setSelectedColor] = useState(platform[0])

  return (
    <div className="w-[430px] min-w-[430px] px-4 pt-16 pb-4 bg-white h-screen overflow-y-auto">
      <a href='./' className="flex bg-gray-50 rounded-lg px-2 py-2 mt-4 hover:bg-gray-100">
        <span className="flex items-center justify-center"><ChevronLeftIcon className="h-6 w-6 mr-1" aria-hidden="true" />产品标题生成</span>
        <img className="w-16 ml-auto flex" src="img/1706771116585.webp" alt="Your Company" />
      </a>
     
        <div className="pt-4">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">选择电商平台 <span className="text-red-500">*</span></h2>

            <RadioGroup value={selectedColor} onChange={setSelectedColor}>
              <div className="mt-4 flex items-center space-x-2">
                {platform.map((platform) => (
                  <RadioGroup.Option
                    key={platform.name}
                    value={platform}
                    className={({ active, checked }) =>
                      classNames(
                        platform.selectedColor,
                        active && checked ? 'ring-2 ring-offset-1' : '',
                        !active && checked ? 'ring-2' : '',
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                      )
                    }
                  >
                    <RadioGroup.Label as="span" className="sr-only">
                      {platform.name}
                    </RadioGroup.Label>
                    <img className="w-auto m-auto" src={platform.imgUrl} alt="Choose your platform" />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

          </div>
          <div className="border-b border-gray-900/10 pb-12 mt-3">
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="skuname" className="block text-sm font-medium leading-6 text-gray-900">商品品类<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                <CascadDropdown />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900">商品名称<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 max-w">
                    <input
                      type="text"
                      name="productname"
                      id="productname"
                      autoComplete="productname"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="例如: 戴森吹风机"
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">0/30</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="advantages" className="block text-sm font-medium leading-6 text-gray-900">
                产品的优势<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="text-gray-400  rounded-md py-1.5 px-3  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-60">
                    <textarea
                      id="advantages"
                      name="advantages"
                      rows={3}
                      className="block w-full border-00 sm:text-sm sm:leading-6"
                      defaultValue={'请输入您产品的优势，例如高性价比和良好质量。'}
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">0/300</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="keywords" className="block text-sm font-medium leading-6 text-gray-900">关键词<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 max-w">
                    <input
                      type="text"
                      name="keywords"
                      id="keywords"
                      autoComplete="keywords"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="输入要排名的关键词。使用逗号分隔它们。"
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">0/30</span>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label htmlFor="tone" className="block text-sm font-medium leading-6 text-gray-900">
                  语气
                </label>
                <div className="mt-2">
                  <select
                    id="tone"
                    name="tone"
                    autoComplete="tone-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 max-w sm:text-sm sm:leading-6"
                  >
                    <option>专业</option>
                    <option>幽默</option>
                    <option>激情</option>
                  </select>
                </div>
              </div>

              <div className="col-span-3">
                <label htmlFor="languagewrit" className="block text-sm font-medium leading-6 text-gray-900">
                  翻译语言
                </label>
                <div className="mt-2">
                  <select
                    id="languagewrit"
                    name="languagewrit"
                    autoComplete="languagewrit-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 max-w sm:text-sm sm:leading-6"
                  >
                    <option>英文</option>
                    <option>中文</option>
                    <option>法语</option>
                  </select>
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
            className="flex items-center justify-center rounded-md bg-green-600 w-full py-4 text-sm font-semibold text-white opacity-50"
          >
            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-white animate-spin fill-emerald-500/70 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>生成中
          </button>
        </div>
    
    </div>
  );
}