"use client"

import {XMarkIcon, ArrowDownTrayIcon} from '@heroicons/react/20/solid'
import {Tab} from '@headlessui/react'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Preview = ({imgList, isOpen, onClose}:{imgList: [], isOpen: boolean, onClose: (val?: string) => void}) => {

  console.log('imgList =>', imgList)

  const handleClose = () => {
    onClose(''); // 清空输入的文本
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={handleClose} // 添加点击除开弹窗的区域关闭弹窗的逻辑
      ></div>

      <div className="bg-white p-6 rounded shadow z-50">

        <div className='flex justify-between items-center mb-5'>
          <span className='text-md font-medium flex  '>Preview</span>
          <button
            className="  text-gray-500 hover:text-gray-700"
            onClick={handleClose} // 添加关闭按钮点击的逻辑
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
        </div>
        <div className=' w-[400px]'>
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {imgList.map((image:any) => (
                  <Tab
                    key={image.filename}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({selected}) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={image.url} alt="" className="h-full w-full object-cover object-center"/>
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-emerald-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {imgList.map((image: any) => (
                <Tab.Panel key={image.filename}>
                  <img
                    src={image.thumbnail_url}
                    alt={''}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>


      </div>


    </div>
  );
};

export default Preview;