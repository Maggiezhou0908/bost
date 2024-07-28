'use client'

import {PageWarp} from "@/components/PageWarp";
import {Navbar} from "@/components/Navbar";
import {Sidebar} from "@/components/Sidebar";
import {useEffect, useRef, useState} from "react";
import LocalDB from "@/utils/localDB";
import Image from "next/image";

export default function History() {

  const pageLoaded = useRef(false)

  const [imagesList, setImagesList] = useState<any>([])

  const pageInit = async () => {
    let removeKeys = await LocalDB.remove.keys()
    let generationKeys = await LocalDB.generation.keys()
    console.log('keys =>', removeKeys, generationKeys)
    for (const key of removeKeys) {
      let data = await LocalDB.remove.get(key)
      let _data = Object.assign({}, data, {key: key})
      console.log('remove data =>', key, _data)
      setImagesList((prev: any) => {
        return [...prev, _data]
      })
    }
  }

  const getFilenameFromUrl = (url: string) => {
    let match = url.match(/^.*\/([^?#]*)\??.*$/);
    return match ? match[1] : null;
  }

  const downloadFile = (url:string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = getFilenameFromUrl(url) as string;
    link.target = '_blank';
    link.click();
  }

  const deleteFile = async (key: string) => {
    await LocalDB.remove.remove(key)
    setImagesList((prev: any) => {
      return prev.filter((item: any) => item.key !== key)
    })
  }

  useEffect(() => {
    console.log('imagesList =>', imagesList)
  }, [imagesList]);

  useEffect(() => {
    if(pageLoaded.current) return
    pageLoaded.current = true;

    (async () => {
      await pageInit()
    })();

  }, [])


  return (
    <>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <PageWarp>
          {
            imagesList.length <= 0 ? <>
              <div className={'flex h-full items-center justify-center'}>
                <div>
                  <div className={'flex justify-center'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-12 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                  </div>
                  <div className={'text-sm text-white'}>No content yet, go generate it</div>
                </div>
              </div>
            </> : <>
              <div className={'w-full h-16'}></div>
              <div className={'mt-6 pb-4 mb-4 text-white text-sm border-b border-gray-500'}>Image generation history</div>
              <div className="grid grid-cols-6 gap-4">
                {
                  imagesList.map((item: any, index: number) => {
                    return (
                      <div key={item.key} className={'bg-[#41405C] rounded-xl'}>
                        <Image src={item.thumbnail_url} alt={''} width={300} height={300} />
                        <div className="flex justify-center items-center pt-2 pb-4">
                          <div className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'} onClick={()=>{downloadFile(item.url)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </div>
                          <div className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'} onClick={()=>{deleteFile(item.key)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </>
          }

        </PageWarp>
      </div>
    </>
  )
}