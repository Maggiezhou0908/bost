"use client"

import {XMarkIcon, ArrowDownTrayIcon} from '@heroicons/react/20/solid'
import {Tab} from '@headlessui/react'

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 2,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 3,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 4,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 5,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 6,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Preview = ({isOpen, onClose}) => {

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
          <span className='text-md font-medium flex  '>文件名</span>
          <button
            className="  text-gray-500 hover:text-gray-700"
            onClick={handleClose} // 添加关闭按钮点击的逻辑
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
        </div>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-xs py-1 px-2 bg-zinc-100 rounded'>1024X1024</span>
          <div className=' flex  gap-3.5'>
            <a href='#' className='py-1 px-2 text-sm'>删除</a>
            <a href='#' className='py-1 px-5 text-sm bg-zinc-100 rounded flex items-center'> <ArrowDownTrayIcon
              className="h-4 w-4 mr-1" aria-hidden="true"/>下载</a>
            <a href='#' className='py-1 px-5 text-sm bg-emerald-600 text-white rounded'>生成</a>
          </div>
        </div>
        <div className=' w-[500px]'>
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((image) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({selected}) => (
                      <>
                        <span className="sr-only">{image.name}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={image.src} alt="" className="h-full w-full object-cover object-center"/>
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
              {product.images.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image.src}
                    alt={image.alt}
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