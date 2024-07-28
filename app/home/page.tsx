'use client'

import {PageWarp} from "@/components/PageWarp";
import Image from "next/image";
import {Navbar} from "@/components/Navbar";
import {Sidebar} from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <PageWarp>
          <div className={'w-full h-16'}></div>
          <div className={'w-full h-10'}></div>
          <div className={'mb-6'}>
            <div className={'text-2xl text-white mb-2'}>Hello, Maggie✨</div>
            <div className={'text-white'}>Boost helps you improve the productivity, efficiency and quality of e-commerce
              products.
            </div>
          </div>

          <div
            className={'w-full rounded-xl h-60 bg-[#42415E] flex items-center text-center justify-center mb-10 border border-dashed border-white'}>
            <Image src={"/home/exp@2x.png"} alt={'exp'} width={192} height={152}/>
            <div className={'ml-8'}>
              <div className={'text-white text-sm mb-2'}>Start from a Photo</div>
              <div className={'text-gray-500 text-xs mb-1'}>Drag and drop your image anywhere on this page</div>
              <div className={'text-gray-500 text-xs relative mb-4'}>
                <div className={'absolute top-2/4 left-0 bg-gray-500 w-5/12 h-px z-0'}></div>
                <div className={'absolute top-2/4 right-0 bg-gray-500 w-5/12 h-px z-z-0'}></div>
                OR
              </div>
              <Link href={'/backgroundRemover'} className={'flex cursor-pointer items-center justify-center mx-auto w-40 h-10 bg-[#D2FF04] rounded-2xl cursor-pointer'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Select a photo
              </Link>
            </div>
          </div>

          <div className={'mb-6'}>
            <div className={'text-white text-sm mb-4'}>Image Editor</div>
            <div className={'flex'}>
              <div className={'mr-4'}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Background_Remover.png'} alt={'Background Remover'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Background Remover</div>
              </div>
              <div className={'mr-4'}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Image_Generation.png'} alt={'Image Generation'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Image Generation</div>
              </div>
            </div>
          </div>

          <div className={'mb-6'}>
            <div className={'text-white text-sm mb-4'}>Text Editor</div>
            <div className={'flex'}>
              <div className={'mr-4'}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Title_Generation.png'} alt={'Title Generation'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Title Generation</div>
              </div>
              <div className={'mr-4'}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Title_Optimization.png'} alt={'Title Optimization'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Title Optimization</div>
              </div>
              <div className={'mr-4'}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Product_Description.png'} alt={'Product Description'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Product Description</div>
              </div>
              <div className={''}>
                <div
                  className={'w-40 h-28 bg-[#42415E] rounded-xl flex items-center justify-center box-border border border-solid border-[#42415E] cursor-pointer hover:border-[#D2FF04]'}>
                  <Image src={'/home/Image_Copywriting.png'} alt={'Image Copywriting'} width={80} height={72}/>
                </div>
                <div className={'text-xs text-white text-center mt-2'}>Image Copywriting</div>
              </div>
            </div>
          </div>

        </PageWarp>
      </div>
    </>
  )
}
