"use client"

import {XMarkIcon, ArrowDownTrayIcon} from '@heroicons/react/20/solid'
import {Tab} from '@headlessui/react'
import {useState} from "react";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Preview = ({imgList, initIndex = 0, isOpen, onClose}:{imgList: [], initIndex: number, isOpen: boolean, onClose: (val?: string) => void}) => {

  console.log('imgList =>', imgList)

  const [selectedIndex, setSelectedIndex] = useState(()=> initIndex)

  const handleLeft = () => {
    console.log(selectedIndex)
    if(selectedIndex <= 0) return
    setSelectedIndex(selectedIndex-1)
  }

  const handleRight = () => {
    console.log(selectedIndex)
    if(selectedIndex >= imgList.length -1) return
    setSelectedIndex(selectedIndex+1)
  }

  const handleClose = () => {
    onClose(''); // 清空输入的文本
  };

  const getFilenameFromUrl = (url: string) => {
    let match = url.match(/^.*\/([^?#]*)\??.*$/);
    return match ? match[1] : null;
  }

  const downloadFile = () => {
    let url = imgList[selectedIndex]['url'] || ''
    if(!url) return
    const link = document.createElement('a');
    link.href = url;
    link.download = getFilenameFromUrl(url) as string;
    link.target = '_blank';
    link.click();
  }

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
          <Tab.Group as="div" className="flex flex-col-reverse" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List style={{display: 'none'}}>
              {imgList.map((image:any, index:number) => (
                <Tab>{index}</Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {imgList.map((image: any) => (
                <Tab.Panel key={image.filename}>
                  <div key={image.filename} className={'w-full h-96 flex items-center justify-center bg-amber-100 box-bg'}>
                    <img
                      src={image.url}
                      alt={''}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          <div className={'flex items-center justify-center pt-4'}>
            <div className={'w-10 h-10 rounded-full bg-slate-100 cursor-pointer flex items-center mx-4 justify-center hover:bg-slate-200'} onClick={handleLeft}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
              </svg>
            </div>
            <div className={'w-10 h-10 rounded-full bg-slate-100 cursor-pointer flex items-center mx-4 justify-center hover:bg-slate-200'} onClick={handleRight}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>
          </div>
          <div className={'w-full h-10 rounded-full text-center flex items-center justify-center bg-[#D2FF04] cursor-pointer mt-4'} onClick={downloadFile}>Download</div>
        </div>


      </div>


    </div>
  );
};

export default Preview;