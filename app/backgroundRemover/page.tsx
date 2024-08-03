'use client'

import {PageWarp} from "@/components/PageWarp";
import {Navbar} from "@/components/Navbar";
import Link from "next/link";
import Uploader from "@/components/image/uploader";
import {useRef, useState} from "react";
import toast from "react-hot-toast";
import LocalDB from "@/utils/localDB";
import classNames from "classnames";
import NoContent from "@/components/base/NoContent";
import Image from "next/image";
const WORKFLOW_ID = 'kqO68KnfWiR0-qHl1JPi4';


export default function BackgroundRemover() {


  const runWorkflow = useRef('');

  const [fetching, setFetching] = useState(false);
  const [sourceUrl, setSourceUrl] = useState<string>('')
  const [removeUrl, setRemoveUrl] = useState<string>('')
  const [removeUrlLoaded, setRemoveUrlLoaded] = useState<boolean>(false)


  const getFilenameFromUrl = (url: string) => {
    let match = url.match(/^.*\/([^?#]*)\??.*$/);
    return match ? match[1] : null;
  }

  const loadRemoveUrl = (url: string) => {
    // 创建一个新的 Image 对象
    setRemoveUrl(url)
    let image = new window.Image();
    // 监听图片加载完成的事件
    image.onload = function () {
      console.log('图片加载完成！');
      // 在这里可以进行其他操作，例如将图片添加到页面上
      setRemoveUrlLoaded(true)
    };

    // 设置要加载的图片路径
    image.src = url;

  }

  const handleUploadSuccess = async ({id, url}: { id: string, url: string }) => {
    setSourceUrl(url);
    const _toast = toast.loading('remove background is working , please wait')
    const localRemoveFile = await LocalDB.remove.get(id)
    if (localRemoveFile) {
      toast.dismiss(_toast)
      loadRemoveUrl(localRemoveFile.url)
      console.log('use cache remove file', localRemoveFile)
      setFetching(false)
      return
    }
    const fileName = getFilenameFromUrl(url)
    const files = {}
    // @ts-ignore
    files[`/input/${fileName}`] = url
    try {
      const removeResponse = await fetch('/api/comfy', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          'workflow_id': WORKFLOW_ID,
          'prompt': {
            "1": {
              "inputs": {
                "image": fileName,
                "upload": "image"
              },
              "class_type": "LoadImage"
            },
            "2": {
              "inputs": {},
              "class_type": "BRIA_RMBG_ModelLoader_Zho"
            },
            "3": {
              "inputs": {
                "image": [
                  "1",
                  0
                ],
                "rmbgmodel": [
                  "2",
                  0
                ]
              },
              "class_type": "BRIA_RMBG_Zho"
            },
            "4": {
              "inputs": {
                "images": [
                  "3",
                  0
                ],
                "filename_prefix": "ComfyUI"
              },
              "class_type": "SaveImage"
            }
          },
          files: files,
        })
      });
      const resJson = await removeResponse.json()
      toast.dismiss(_toast)
      runWorkflow.current = resJson.id
      const workflowResult = await startPollRunStatus()
      console.log(workflowResult)
      if (workflowResult.status === 'COMPLETED') {
        const output = workflowResult.output
        await LocalDB.remove.set(id, output[0])
        loadRemoveUrl(output[0].url)
        toast.success('workflow is work success')
        setFetching(false)
      } else {
        toast.error('workflow is work fail')
        setFetching(false)
      }
    } catch (e) {
      toast.dismiss(_toast)
      toast.error('workflow is work fail')
      setFetching(false)
    }

  }

  const startPollRunStatus = async () => {
    const _toast = toast.loading('workflow is start, please wait')
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        const statusRes = await fetch(`/api/comfy?${new URLSearchParams({
          workflow_id: WORKFLOW_ID,
          run_id: runWorkflow.current
        }).toString()}`)
        const statusJson = await statusRes.json()
        toast(`workflow is running => ${statusJson.status}`)
        if (statusJson.status === "COMPLETED" || statusJson.status === "ERROR") {
          toast.dismiss(_toast)
          return statusJson
        }
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (e) {
        console.error(e)
      }
    }
  }

  const downloadFile = () => {
    var link = document.createElement('a');
    link.href = removeUrl;
    link.download = getFilenameFromUrl(removeUrl) as string;
    link.target = '_blank';
    link.click();
  }

  const handleUploadFail = () => {
    setFetching(false)
  }

  return (
    <>
      <Navbar/>
      <div className='flex'>
        <div className="w-[352px] min-w-[352px] px-4 bg-[#1F1E30] h-screen overflow-y-auto relative">
          <div className={'w-full h-16'}></div>
          <div className={'w-full h-4'}></div>
          <Link href={'/home'}>
            <div
              className={'h-10 leading-10 px-2 flex items-center rounded-lg border text-sm text-white bg-[#333249] border-[#1F1E30] hover:text-[#D2FF04] hover:border-black cursor-pointer'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-6 h-6 mr-2 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
              </svg>

              <div className="w-6 h-6 mr-2 inline-block">
                <Image src={'/icon/removebg_big.png'} alt={''} width={24} height={24}/>
              </div>
              Background Remover
            </div>
          </Link>
          <div className={'w-full h-8'}></div>
          <div className={'text-white text-sm'}>Upload Image</div>
          <Uploader
            submitText={'Remove Background'}
            fetching={fetching}
            onFail={handleUploadFail}
            preSubmit={()=> { setFetching(true); return true }}
            onSuccess={handleUploadSuccess}
            onChange={() => {
              setSourceUrl('')
              setRemoveUrl('')
              setRemoveUrlLoaded(false)
            }}
          />
        </div>
        <PageWarp>
          <div className={'w-full h-full flex items-center justify-center'}>

            {
              sourceUrl ?
                <div>
                  <div className={'w-full h-16'}></div>
                  <div className={'w-[648px] h-[376px] relative z-0 overflow-hidden box-bg'}>
                    {
                      sourceUrl ?
                        <div
                          className={classNames(
                            removeUrlLoaded ? 'w-0' : 'w-full',
                            'absolute top-0 left-0 right-0 bottom-0 h-full transform transition-all duration-1000 origin-right z-20'
                          )}
                          style={{
                            backgroundImage: `url(${sourceUrl})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center auto',
                            backgroundSize: 'auto 100%'
                          }}
                        /> : null
                    }
                    {
                      removeUrl ? <div
                        className={'absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10'}
                        style={{
                          backgroundImage: `url(${removeUrl})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center auto',
                          backgroundSize: 'auto 100%'
                        }}
                      /> : null
                    }
                  </div>
                  {
                    removeUrlLoaded ?
                      <div className={'text-center p-4'}>
                        <div
                          className={'inline-block mx-2 w-40 p-2 rounded-full cursor-pointer border border-solid border-[#D2FF04] bg-[#D2FF04] hover:bg-[#333249] hover:text-[#D2FF04]'}
                          onClick={downloadFile}>download
                        </div>
                      </div> : null
                  }
                </div> :
                <NoContent isFullScreen={true} />
            }

          </div>
        </PageWarp>
      </div>
    </>
  )
}