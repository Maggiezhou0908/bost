import { useState } from 'react';
import Preview from './base/Preview';
import { TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';


const content = [
  { name: '抠图-2024/03/02', imgUrl: 'img/testpp.webp', href: '#',},
  { name: '抠图-2024/03/02', imgUrl: 'img/testpp.webp', href: '#',},
  { name: '抠图-2024/03/02', imgUrl: 'img/trstppp.png', href: '#',},
  { name: '抠图-2024/03/02', imgUrl: 'img/trstppp.png', href: '#',},
  { name: '抠图-2024/03/02', imgUrl: 'img/12312312.webp', href: '#',},
  { name: '抠图-2024/03/02', imgUrl: 'img/zczcz.webp', href: '#',},
]

export function ImageEditorList() {


  const [PreviewOpen, isPreviewOpen] = useState(false);

  const handlexButtonClick = () => {
    isPreviewOpen(true);
  };

  const handleClosePreview = () => {
    isPreviewOpen(false);
  };


    return (
        <div className='flex-1 pt-20 h-screen overflow-y-auto'>
          <div className='w-full px-8 pt-2 pb-4'>
          <div className="w-full border-b border-gray-900/10 pb-3">
          <h2 className="text-base font-semibold leading-7 text-gray-900">生成</h2>
          </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {content.map((content) => (
                <li key={content.name} className="col-span-1">
                  <div className="group rounded-xl bg-white hover:bg-slate-100 pr-1 pt-4">
                    <div className="px-3 pb-4 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:bg-slate-100 lg:h-40">
                      <a 
                      onClick={handlexButtonClick}
                      href={content.href}>
                        <img
                          className="w-full h-full object-contain object-center"
                          src={content.imgUrl}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className='flex justify-center text-xs pt-2 pb-3 pl-2'>
                  <button type="button" className="flex px-1 items-center border rounded-md mr-2 text-white bg-green-600 border-green-600 hover:text-white hover:bg-green-700">
                  生成
                  </button>
                  <button type="button" className="flex px-1 items-center border rounded-md mr-2 text-green-600 border-green-600 hover:text-white hover:bg-green-600">
                  <ArrowDownTrayIcon className="h-5 w-4 " aria-hidden="true" />
                  </button>
                  <button type="button" className="flex px-1 items-center border rounded-md mr-2 text-green-600 border-green-600 hover:text-white hover:bg-green-600">
                  <TrashIcon className="h-5 w-4 " aria-hidden="true" />
                  </button>
                   </div>

                  </div>
                  <div className='mt-2 text-sm text-center'>
                    <a href={content.href} className=" text-gray-900 hover:text-gray-600">
                      <p >{content.name}</p>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>   
          <Preview isOpen={PreviewOpen} onClose={handleClosePreview} />       
        </div>
        );
    }