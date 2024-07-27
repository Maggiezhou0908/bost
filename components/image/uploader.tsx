'use client'

import {useState, useCallback, useMemo, ChangeEvent, useRef} from 'react'
import toast from 'react-hot-toast'
import LoadingDots from './loading-dots'
import { PutBlobResult } from '@vercel/blob'
import Image from 'next/image'

const WORKFLOW_ID = 'kqO68KnfWiR0-qHl1JPi4';

export default function Uploader() {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const [rmbgUrl, setRmbgUrl] = useState('' as string)

  const runWorkflow = useRef('');

  const getFilenameFromUrl = (url:string) => {
    let match = url.match(/^.*\/([^?#]*)\??.*$/);
    return match ? match[1] : null;
  }

  const startPollRunStatus = async () => {
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        const statusRes = await fetch(`/api/comfy?${new URLSearchParams({
          workflow_id: WORKFLOW_ID,
          run_id: runWorkflow.current
        }).toString()}`)
        const statusJson = await statusRes.json()
        console.log('statusJson', statusJson)
        toast.loading(`workflow is work doing => ${statusJson.status}`, {
          duration: 10000
        })
        if (statusJson.status === "COMPLETED") {
          // toast.success('workflow is work success')
          // return status;
          const output = statusJson.output;
            setRmbgUrl(output[0].url) // set rmbg url
          return output
        }else if(statusJson.status === "ERROR") {
          toast.error('workflow is work fail')
        }
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (e) {
        console.error(e)
      }
    }
  }

  const removeBg = async (url:string) => {
    toast('ai is working , please wait', {
      duration: 10000
    })
    const fileName = getFilenameFromUrl(url)
    const files = {}
    // @ts-ignore
    files[`/input/${fileName}`] = url
    try{
      const removeResponse = await fetch('/api/comfy', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
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
      runWorkflow.current = resJson.id
      await startPollRunStatus()
      // setRmbgUrl(output[0].url)
      toast.success('workflow is work start')
    }catch(e){
      toast.error('workflow is work fail')
      console.error(e)
    }

  }

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error('File size too big (max 50MB)')
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )

  const [saving, setSaving] = useState(false)

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  return (
      <>
        {
          rmbgUrl ? <Image src={rmbgUrl} width={200} height={200} alt={'test'} /> : null
        }
    <form
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault()
        // toast.loading(`start upload`)
        setSaving(true)
        fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': file?.type || 'application/octet-stream' },
          body: file,
        }).then(async (res) => {
          console.log('res', res)
          if (res.status === 200) {
            const {url} = (await res.json()) as PutBlobResult;
            console.log('url', url)
            // return uploadRes
            toast(
              (t: { id: string }
                ) => (
                <div className="relative">
                  <div className="p-2">
                    <p className="font-semibold text-gray-900">
                      File uploaded!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your file has been uploaded to{' '}
                      <a
                        className="font-medium text-gray-900 underline"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={()=>{
                      toast.dismiss(t.id);
                      removeBg(url)
                    }}
                    className="absolute top-0 -right-2 inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-full p-1.5 hover:bg-gray-100 transition ease-in-out duration-150"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 5.293a1 1 0 011.414 0L10
                          8.586l3.293-3.293a1 1 0 111.414 1.414L11.414
                          10l3.293 3.293a1 1 0 01-1.414 1.414L10
                          11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586
                          10 5.293 6.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ),
              { duration: 300000 }
            )
          } else {
            const error = await res.text()
            toast.error(error)
          }
          setSaving(false)
        })
      }}
    >
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Upload a file</h2>
          <p className="text-sm text-gray-500">
            Accepted formats: .png, .jpg, .gif, .mp4
          </p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
              if (file) {
                if (file.size / 1024 / 1024 > 50) {
                  toast.error('File size too big (max 50MB)')
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-white opacity-100 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size: 50MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      <button
        disabled={saveDisabled}
        className={`${
          saveDisabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="text-sm">Confirm upload</p>
        )}
      </button>

    </form>
      </>
  )
}
