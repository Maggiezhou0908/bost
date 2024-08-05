"use client"

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from 'next/navigation'
import toast from "react-hot-toast";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  console.log('pathname', pathname)

  // console.log('pathname', router)
  const getActiveClass = (path: string) => classNames(
    pathname === path ?
      'h-10 leading-10 px-2 mb-4 flex items-center rounded-lg border text-sm text-[#D2FF04] bg-[#333249] border-black cursor-pointer nav-bar-btn':
      'h-10 leading-10 px-2 mb-4 flex items-center rounded-lg border text-sm text-white border-[#1F1E30] hover:bg-[#333249] hover:text-[#D2FF04] hover:border-black cursor-pointer nav-bar-btn'
  )
  return (
    <div className="w-[260px] min-w-[260px] px-4 bg-[#1F1E30] h-screen overflow-y-auto">
      <div className={'w-full h-16'}></div>
      <div className={'w-full h-10'}></div>
      <Link href={'/home'}>
        <div className={getActiveClass('/home')}>
          <div className="w-6 h-6 mr-2 inline-block relative">
            <Image src={pathname === '/home' ? '/icon/home_click.svg':'/icon/home_default.svg'} alt={''} width={24} height={24}/>
            <Image src={'/icon/home_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
          </div>
          Home
        </div>
      </Link>
      <Link href={'/history'}>
        <div className={getActiveClass('/history')}>
          <div className="w-6 h-6 mr-2 inline-block relative">
            <Image src={pathname === '/history' ? '/icon/history_click.svg':'/icon/history_big.svg'} alt={''} width={24} height={24}/>
            <Image src={'/icon/history_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
          </div>
          Generation history
        </div>
      </Link>
      <div className={'text-white text-sm mb-4'}>Image Editor</div>
      <Link href={'/backgroundRemover'}>
        <div className={getActiveClass('/backgroundRemover')}>
          <div className="w-6 h-6 mr-2 inline-block relative">
            <Image src={pathname === '/backgroundRemover' ? '/icon/removebg_click.svg':'/icon/removebg_big.svg'} alt={''} width={24} height={24}/>
            <Image src={'/icon/removebg_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
          </div>
          Background Remover
        </div>
      </Link>
      <Link href={'/imageGeneration'}>
        <div className={getActiveClass('/imageGeneration')}>
          <div className="w-6 h-6 mr-2 inline-block relative">
            <Image src={'/icon/imagegeneration_big.svg'} alt={''} width={24} height={24}/>
            <Image src={'/icon/imagegeneration_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
          </div>
          Image Generation
        </div>
      </Link>
      <div className={'text-white text-sm mb-4'}>Text Editor</div>
      <Link href={'/titleGeneration'}>
        <div className={getActiveClass('/titleGeneration')}>
          <div className="w-6 h-6 mr-2 inline-block relative">
            <Image src={'/icon/titlegeneration_big.svg'} alt={''} width={24} height={24}/>
            <Image src={'/icon/titlegeneration_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
          </div>
          Titile Generation
        </div>
      </Link>
      <div
        onClick={() => {
          toast.error('coming soon')
        }}
        className="nav-bar-btn h-10 leading-10 px-2 mb-4 flex items-center text-white rounded-lg border border-[#1F1E30] hover:bg-[#333249] hover:text-[#D2FF04] hover:border-black cursor-pointer">
        <div className="w-6 h-6 mr-2 inline-block relative">
          <Image src={'/icon/titleoptimization_big.svg'} alt={''} width={24} height={24}/>
          <Image src={'/icon/titleoptimization_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
        </div>
        Titile Optimization
      </div>
      <div
        onClick={() => {
          toast.error('coming soon')
        }}
        className="nav-bar-btn h-10 leading-10 px-2 mb-4 flex items-center text-white rounded-lg border border-[#1F1E30] hover:bg-[#333249] hover:text-[#D2FF04] hover:border-black cursor-pointer">
        <div className="w-6 h-6 mr-2 inline-block relative">
          <Image src={'/icon/productdescription_big.svg'} alt={''} width={24} height={24}/>
          <Image src={'/icon/productdescription_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
        </div>
        Product Description
      </div>
      <div
        onClick={() => {
          toast.error('coming soon')
        }}
        className="nav-bar-btn h-10 leading-10 px-2 flex items-center text-white rounded-lg border border-[#1F1E30] hover:bg-[#333249] hover:text-[#D2FF04] hover:border-black cursor-pointer">
        <div className="w-6 h-6 mr-2 inline-block relative">
          <Image src={'/icon/imagetotext_big.svg'} alt={''} width={24} height={24}/>
          <Image src={'/icon/imagetotext_click.svg'} alt={''} width={24} height={24} className={'active-icon absolute left-0 top-0 opacity-0'} />
        </div>
        Image Copywriting
      </div>
    </div>
  )
}