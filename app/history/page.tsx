'use client'

import {PageWarp} from "@/components/PageWarp";
import {Navbar} from "@/components/Navbar";
import {Sidebar} from "@/components/Sidebar";
import {useEffect, useRef, useState} from "react";
import LocalDB from "@/utils/localDB";
import Image from "next/image";
import localDB from "@/utils/localDB";
import Link from "next/link";
import NoContent from "@/components/base/NoContent";
import Preview from "@/components/base/Preview";
import TextPreview from "@/components/base/TextPreview";

export default function History() {

  const pageLoaded = useRef(false)

  const [removeImageList, setRemoveImageList] = useState<any>([])
  const [generationImageList, setGenerationImageList] = useState<any>([])
  const [generationTitleList, setGenerationTitleList] = useState<any>([])

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [openRemoveIndex, setOpenRemoveIndex] = useState(0)

  const [generationDialogOpen, setGenerationDialogOpen] = useState(false)
  const [openGenerationIndex, setOpenGenerationIndex] = useState(0)


  const [titleDialogOpen, setTitleDialogOpen] = useState(false)
  const [openTitleIndex, setOpenTitleIndex] = useState(0)

  const pageInit = async () => {
    await getRemoveList()
    await getImageGenerationList()
    await getTitleGenerationList()
  }

  const getTitleGenerationList = async () => {
    let generationKeys = await LocalDB.titleGeneration.keys()
    console.log('getTitleGenerationList keys =>', generationKeys)
    for (const key of generationKeys) {
      let data = await LocalDB.titleGeneration.get(key)
      console.log('getTitleGenerationList data =>', data)
      let _data = Object.assign({}, {data}, {key: key})
      console.log('getTitleGenerationList _data =>', _data)
      setGenerationTitleList((prev: any) => {
        return [...prev, _data]
      })
      console.log('getTitleGenerationList data =>', generationTitleList)
    }
  }

  const getImageGenerationList = async () => {
    let generationKeys = await LocalDB.imageGeneration.keys()
    console.log('getImageGenerationList keys =>', generationKeys)
    let _imageList: string | any[] = [];
    for (const key of generationKeys) {
      let data = await LocalDB.imageGeneration.get(key)
      data.forEach((item:any)=>{
        item.key = key
      })
      console.log('data =>', data)
      _imageList = _imageList.concat(data)
    }
    setGenerationImageList(_imageList)
    console.log('_imageList =>', _imageList)
  }

  const getRemoveList = async () => {
    let removeKeys = await LocalDB.remove.keys()
    for (const key of removeKeys) {
      let data = await LocalDB.remove.get(key)
      let _data = Object.assign({}, data, {key: key})
      setRemoveImageList((prev: any) => {
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

  const deleteGenerationFile = async (key: string , filename: string) => {
    let data = await LocalDB.imageGeneration.get(key)
    data = data.filter((item:any) => item.filename !== filename)
    if(data.length <= 0) {
      await localDB.imageGeneration.remove(key)
    }else{
      await localDB.imageGeneration.set(key, data)
    }
    await getImageGenerationList()
  }

  const deleteFile = async (key: string) => {
    await LocalDB.remove.remove(key)
    setRemoveImageList((prev: any) => {
      return prev.filter((item: any) => item.key !== key)
    })
  }

  const deleteGenerationTitle = async (key: string) => {
    await LocalDB.titleGeneration.remove(key)
    setGenerationTitleList((prev: any) => {
      return prev.filter((item: any) => item.key !== key)
    })
  }

  const openRemovePreview = (index:number) => {
    setRemoveDialogOpen(true)
    setOpenRemoveIndex(index)
  }

  const openGenerationPreview = (index:number) => {
    setGenerationDialogOpen(true)
    setOpenGenerationIndex(index)
  }

  const openTitlePreview = (index:number) => {
    setTitleDialogOpen(true)
    setOpenTitleIndex(index)
  }

  useEffect(() => {
    console.log('imagesList =>', removeImageList)
  }, [removeImageList]);

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
          <>
            <div className={'w-full h-16'}></div>
            <div className={'mt-6 pb-4 mb-4 text-white text-sm border-b border-gray-500'}>Background remover history
            </div>
            {
              removeImageList.length <= 0 ?
                <NoContent/>
                :
                <>
                  <div className="grid grid-cols-6 gap-4">
                    {
                      removeImageList.map((item: any, index: number) => {
                        return (
                          <div key={item.key} className={'bg-[#41405C] rounded-xl mx-auto'}>
                            <div className={'flex items-center justify-center w-32 h-32 p-2 cursor-pointer'} onClick={()=>{openRemovePreview(index)}}>
                              <Image src={item.thumbnail_url} alt={''} className={'max-w-full max-h-full w-auto h-auto'}
                                     width={150} height={150}/>
                            </div>
                            <div className="flex justify-center items-center pt-2 pb-4">

                              <Link href={`/imageGeneration?key=${item.key}`}
                                    className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
                                </svg>
                              </Link>
                              <div
                                className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}
                                onClick={() => {
                                  downloadFile(item.url)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                                </svg>
                              </div>
                              <div
                                className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}
                                onClick={() => {
                                  deleteFile(item.key)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
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
                  {
                    removeDialogOpen ? <Preview hasBg={true} initIndex={openRemoveIndex} imgList={removeImageList} isOpen={removeDialogOpen} onClose={()=>{setRemoveDialogOpen(false)}} /> : null
                  }
                </>
            }
          </>

          <>
            <div className={'w-full h-16'}></div>
            <div className={'mt-6 pb-4 mb-4 text-white text-sm border-b border-gray-500'}>Image generation history
            </div>
            {
              generationImageList.length <= 0 ?
                <NoContent/> : <>
                  <div className="grid grid-cols-6 gap-4">
                    {
                      generationImageList.map((item: any, index: number) => {
                        return (
                          <div key={item.filename} className={'bg-[#41405C] rounded-xl mx-auto'}>
                            <div className={'flex items-center justify-center w-32 h-32 p-2 cursor-pointer'} onClick={()=>{openGenerationPreview(index)}}>
                              <Image src={item.thumbnail_url} alt={''} className={'max-w-full max-h-full w-auto h-auto'}
                                     width={150} height={150}/>
                            </div>
                            <div className="flex justify-center items-center pt-2 pb-4">
                              <div
                                className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}
                                onClick={() => {
                                  downloadFile(item.url)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                                </svg>
                              </div>
                              <div
                                className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}
                                onClick={() => {
                                  deleteGenerationFile(item.key, item.filename)
                                }}>
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
                  {
                    generationDialogOpen ? <Preview initIndex={openGenerationIndex} imgList={generationImageList} isOpen={generationDialogOpen} onClose={()=>{setGenerationDialogOpen(false)}} /> : null
                  }
                </>
            }
          </>


          <>
            <div className={'w-full h-16'}></div>
            <div className={'mt-6 pb-4 mb-4 text-white text-sm border-b border-gray-500'}>Title generation history
            </div>
            {
              generationTitleList.length <= 0 ?
                <NoContent/> :
                <>
                  <div className="grid grid-cols-6 gap-4">
                    {
                      generationTitleList.map((item: any, index: number) => {
                        return (
                          <div key={item.key} className={'bg-[#41405C] rounded-xl mx-auto'}>
                            <div className={'flex items-start justify-center w-32 h-32 p-2 cursor-pointer'} onClick={()=>{openTitlePreview(index)}}>
                              <div className={'text-generation-wrap text-xs text-white line-clamp-6'}>
                                {item.data}
                              </div>
                            </div>
                            <div className="flex justify-center items-center pt-2 pb-4">
                              <div
                                className={'w-6 h-6 box-border border border-gray-500 rounded flex items-center justify-center cursor-pointer mx-1 text-gray-500 hover:border-gray-100 hover:text-gray-100'}
                                onClick={() => {
                                  deleteGenerationTitle(item.key)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
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
                  {
                    titleDialogOpen ?
                      <TextPreview initIndex={openTitleIndex} textList={generationTitleList} isOpen={titleDialogOpen}
                               onClose={() => {
                                 setTitleDialogOpen(false)
                               }}/> : null
                  }
                </>
            }
          </>
          <div className={'w-full h-16'}></div>
        </PageWarp>
      </div>
    </>
  )
}