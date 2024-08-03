'use client'
import {Field, Input, Label, Textarea} from '@headlessui/react'
import {PageWarp} from "@/components/PageWarp";
import {Navbar} from "@/components/Navbar";
import Link from "next/link";
import Uploader from "@/components/image/uploader";
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import LocalDB from "@/utils/localDB";
import Image from "next/image";
import classNames from "classnames";
import md5 from 'crypto-js/md5'
import encHex from 'crypto-js/enc-hex';
import { useSearchParams } from 'next/navigation'
import localDB from "@/utils/localDB";
import LoadingDots from "@/components/image/loading-dots";
import Preview from "@/components/base/Preview";
import NoContent from "@/components/base/NoContent";
import {Suspense} from 'react'

const WORKFLOW_ID = 'APicrcLui0J7auQukFm5k';

const ImageGeneration = () => {

  const router = useSearchParams()
  const imgKey = router.get('key');

  const runWorkflow = useRef('');

  const [fetching, setFetching] = useState(false);
  const whatToSelectPrompt = useRef<HTMLInputElement>(null)
  const backgroundPrompt = useRef<HTMLInputElement>(null)
  const [sourceUrl, setSourceUrl] = useState<string>('')
  const [generationArr, setGenerationArr] = useState<any>([])
  const [generationLoaded, setGenerationLoaded] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showIndex, setShowIndex] = useState(0)


  const getFilenameFromUrl = (url: string) => {
    let match = url.match(/^.*\/([^?#]*)\??.*$/);
    return match ? match[1] : null;
  }

  const loadGenerationUrl = (arr:any) => {
    // 创建一个新的 Image 对象
    setGenerationArr(arr)
    setGenerationLoaded(true)
    setShowDialog(true)
  }

  const handleUploadFail = () => {
    setFetching(false)
  }

  const handleUploadSuccess = async ({id, url}: { id: string, url: string }) => {
    setSourceUrl(url);
    const _toast = toast.loading('image generation is working , please wait')
    // @ts-ignore
    let textHash = md5((whatToSelectPrompt.current?.value + backgroundPrompt.current?.value) as string).toString(encHex)
    const localGenerationFile = await LocalDB.imageGeneration.get(id + '_' + textHash)
    if (localGenerationFile) {
      toast.dismiss(_toast)
      loadGenerationUrl(localGenerationFile)
      console.log('use cache generation file', localGenerationFile)
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
              "inputs": {"model_name": "GroundingDINO_SwinT_OGC (694MB)"},
              "class_type": "GroundingDinoModelLoader (segment anything)"
            },
            "2": {
              "inputs": {
                "image": ["72", 0],
                "prompt": ["98", 0],
                "sam_model": ["3", 0],
                "threshold": 0.3,
                "grounding_dino_model": ["1", 0]
              }, "class_type": "GroundingDinoSAMSegment (segment anything)"
            },
            "3": {"inputs": {"model_name": "sam_hq_vit_h (2.57GB)"}, "class_type": "SAMModelLoader (segment anything)"},
            "4": {
              "inputs": {
                "image": fileName,
                "upload": "image"
              },
              "class_type": "LoadImage"
            },
            "6": {"inputs": {"mask": ["2", 1]}, "class_type": "InvertMask (segment anything)"},
            "7": {"inputs": {"masks": ["6", 0]}, "class_type": "Convert Masks to Images"},
            "13": {"inputs": {"images": ["7", 0]}, "class_type": "PreviewImage"},
            "14": {"inputs": {"images": ["2", 0]}, "class_type": "PreviewImage"},
            "22": {
              "inputs": {
                "ckpt_name": "crystalClearXL_ccxl.safetensors",
                "scale_factor": 0.18215,
                "beta_schedule": "linear (HotshotXL/default)",
                "use_custom_scale_factor": false
              }, "class_type": "CheckpointLoaderSimpleWithNoiseSelect"
            },
            "24": {"inputs": {"clip": ["22", 1], "stop_at_clip_layer": -3}, "class_type": "CLIPSetLastLayer"},
            "33": {
              "inputs": {
                "cfg": 5.5,
                "model": ["22", 0],
                "steps": 21,
                "negative": ["50", 1],
                "positive": ["50", 0],
                "add_noise": "enable",
                "scheduler": "karras",
                "noise_seed": ["41", 0],
                "end_at_step": 9700,
                "latent_image": ["106", 0],
                "sampler_name": "dpmpp_3m_sde_gpu",
                "start_at_step": 0,
                "return_with_leftover_noise": "disable"
              }, "class_type": "KSamplerAdvanced"
            },
            "34": {"inputs": {"clip": ["24", 0], "text": ["85", 0]}, "class_type": "CLIPTextEncode"},
            "35": {
              "inputs": {
                "clip": ["24", 0],
                "text": "embedding:easynegative, embedding:ng_deepnegative_v1_75t, illustration, bokeh, low resolution, bad anatomy, painting, drawing, cartoon, bad quality, low quality"
              }, "class_type": "CLIPTextEncode"
            },
            "39": {"inputs": {"vae": ["22", 2], "samples": ["33", 0]}, "class_type": "VAEDecode"},
            "40": {"inputs": {"images": ["39", 0]}, "class_type": "PreviewImage"},
            "41": {"inputs": {"seed": -1}, "class_type": "Seed (rgthree)"},
            "50": {
              "inputs": {
                "image": ["66", 0],
                "negative": ["35", 0],
                "positive": ["34", 0],
                "strength": 0.85,
                "control_net": ["51", 0],
                "end_percent": 0.8,
                "start_percent": 0
              }, "class_type": "ControlNetApplyAdvanced"
            },
            "51": {
              "inputs": {"control_net_name": "control-lora-canny-rank256.safetensors"},
              "class_type": "ControlNetLoaderAdvanced"
            },
            "53": {"inputs": {"images": ["66", 0]}, "class_type": "PreviewImage"},
            "54": {
              "inputs": {"vae": ["22", 2], "mask": ["6", 0], "pixels": ["2", 0], "grow_mask_by": 6},
              "class_type": "VAEEncodeForInpaint"
            },
            "60": {
              "inputs": {
                "cfg": 6.5,
                "model": ["22", 0],
                "steps": 21,
                "negative": ["50", 1],
                "positive": ["50", 0],
                "add_noise": "enable",
                "scheduler": "karras",
                "noise_seed": ["41", 0],
                "end_at_step": 10000,
                "latent_image": ["63", 0],
                "sampler_name": "dpmpp_3m_sde_gpu",
                "start_at_step": 16,
                "return_with_leftover_noise": "disable"
              }, "class_type": "KSamplerAdvanced"
            },
            "61": {"inputs": {"vae": ["22", 2], "samples": ["60", 0]}, "class_type": "VAEDecode"},
            "63": {"inputs": {"vae": ["22", 2], "pixels": ["39", 0]}, "class_type": "VAEEncode"},
            "66": {
              "inputs": {
                "images": ["2", 0],
                "threshold_low": 0.1,
                "threshold_high": 0.3,
                "enable_threshold": "false"
              }, "class_type": "Image Canny Filter"
            },
            "72": {
              "inputs": {
                "crop": "center",
                "image": ["4", 0],
                "width": ["99", 0],
                "height": ["99", 1],
                "upscale_method": "nearest-exact"
              }, "class_type": "ImageScale"
            },
            "84": {"inputs": {"images": ["72", 0]}, "class_type": "PreviewImage"},
            "85": {
              "inputs": {
                "text_a": ["96", 0],
                "text_b": ["93", 0],
                "text_c": ["97", 0],
                "delimiter": "",
                "clean_whitespace": "true"
              }, "class_type": "Text Concatenate"
            },
            "93": {"inputs": {"prompt": backgroundPrompt.current?.value}, "class_type": "SeargePromptText"},
            "96": {"inputs": {"Text": ""}, "class_type": "DF_Text_Box"},
            "97": {"inputs": {"Text": ""}, "class_type": "DF_Text_Box"},
            "98": {"inputs": {"prompt": whatToSelectPrompt.current?.value}, "class_type": "SeargePromptText"},
            "99": {"inputs": {"image": ["4", 0]}, "class_type": "ImageGenResolutionFromImage"},
            "106": {"inputs": {"amount": 2, "samples": ["54", 0]}, "class_type": "RepeatLatentBatch"},
            "108": {"inputs": {"images": ["61", 0], "filename_prefix": "ComfyUI"}, "class_type": "SaveImage"}
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
        await LocalDB.imageGeneration.set(id + '_' + textHash, output)
        loadGenerationUrl(output)
        toast.success('workflow is work success')
        setFetching(false)
      } else {
        toast.error('workflow is work fail')
        setFetching(false)
      }
    } catch (e) {
      console.error('e ===>', e)
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

  const handlePreSubmit = () => {
    if (!whatToSelectPrompt.current?.value) {
      toast.error('Please input what to select')
      return false
    }
    if(!backgroundPrompt.current?.value){
      toast.error('Please input description')
      return false
    }
    setFetching(true)
    return true
  }

  const downloadFile = (url:string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = getFilenameFromUrl(url) as string;
    link.target = '_blank';
    link.click();
  }

  useEffect(() => {
    if(imgKey){
      (async()=>{
        let localImg = await localDB.remove.get(imgKey)
        console.log('localImg =>', localImg)
        if (localImg.url) {
          console.log('localImg url=>', localImg.url)
          setSourceUrl(localImg.url)
        }
      })()
    }
  }, [imgKey]);


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
                <Image src={'/icon/imagegeneration_big.png'} alt={''} width={24} height={24} />
              </div>
              Image Generation
            </div>
          </Link>
          <div className={'w-full h-8'}></div>
          {
            !imgKey ?
              <>
                <div className={'text-white text-sm'}>Upload Image</div>
                <Uploader
                  fetching={fetching}
                  submitText={'generation'}
                  preSubmit={handlePreSubmit}
                  onFail={handleUploadFail}
                  onSuccess={handleUploadSuccess}
                  onChange={() => {
                    setSourceUrl('')
                    setGenerationArr([])
                    setGenerationLoaded(false)
                  }}
                />
              </>
              : null
          }
          <div className="w-full max-w-md">
            <Field>
              <Label className="text-sm/6 font-medium text-white">What to select</Label>
              {/*<Description className="text-sm/6 text-white/50">Please use one word to describe the content of your main image.</Description>*/}
              <Input
                className={classNames(
                  'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
                placeholder={'exp: bag'}
                ref={whatToSelectPrompt}
              />
            </Field>
          </div>
          <div className="w-full max-w-md">
            <Field>
              <Label className="text-sm/6 font-medium text-white">Description</Label>
              {/*<Description className="text-sm/6 text-white/50">This will be shown under the product title.</Description>*/}
              <Textarea
                className={classNames(
                  'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
                placeholder={'exp: bag on the grass with lots of flowers next to it, sunny day'}
                rows={2}
                ref={backgroundPrompt}
              />
            </Field>
          </div>
          {
            !!imgKey ? <div className={'absolute inset-x-0 bottom-0 p-4'}>
              <button
                disabled={fetching}
                className={`${
                  fetching
                    ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    : 'border-[#D2FF04] bg-[#D2FF04] text-black hover:text-gray-600'
                } flex h-10 w-full items-center justify-center rounded-full border text-sm transition-all focus:outline-none`}
                onClick={async ()=>{
                  if(!handlePreSubmit()) return;
                  await handleUploadSuccess({id: imgKey, url: sourceUrl})
                }}
              >
                {fetching ? (
                  <LoadingDots color="#808080"/>
                ) : (
                  <p className="text-sm">{'generation'}</p>
                )}
              </button>
            </div> : null
          }
        </div>
        <PageWarp>
          <div className={'w-full h-full flex items-center justify-center'}>
            {
              sourceUrl ?
                <div>
                  <div className={'w-full h-16'}></div>
                  <div className={'w-[440px] h-[440px]'}>
                    {
                      sourceUrl ? <Image src={sourceUrl} alt={''} width={440} height={440}/> : null
                    }
                  </div>
                </div> :
                <NoContent isFullScreen={true} />
            }

          </div>
        </PageWarp>
        {
          generationLoaded ?
            <div className="w-[288px] min-w-[288px] px-4 bg-[#1F1E30] h-screen overflow-y-auto relative">
              <div className={'w-full h-16'}></div>
              <div className={'w-full h-4'}></div>
              <div className="grid grid-cols-1 gap-1">
                {
                  generationArr.map((item:any, index:number)=>{
                    return (
                      <div key={item.url} className={'bg-[#41405C] rounded p-1 text-center cursor-pointer'} onClick={()=>{
                        downloadFile(item.url);
                      }}>
                        <Image src={item.url} alt={''} width={256} height={256} className={'rounded'} />
                      </div>
                    )
                  })
                }
              </div>
            </div> : null
        }
      </div>
      <Preview imgList={generationArr} isOpen={showDialog} onClose={()=>{setShowDialog(false)}} />
    </>
  )
}

const _ImageGeneration = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <ImageGeneration />
    </Suspense>
  )
}

export default _ImageGeneration