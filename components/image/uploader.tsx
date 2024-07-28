'use client'

import {ChangeEvent, useCallback, useMemo, useRef, useState} from 'react'
import toast from 'react-hot-toast'
import LoadingDots from './loading-dots'
import {PutBlobResult} from '@vercel/blob'
import md5 from 'crypto-js/md5'
import encHex from 'crypto-js/enc-hex';
import LocalDB from "@/utils/localDB";

export default function Uploader({onSuccess, onChange}: { onSuccess: ({id, url}:{id:string, url: string}) => void, onChange: () => void }) {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const [saving, setSaving] = useState(false)

  const fileMd5 = useRef<string>('')

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error('File size too big (max 50MB)')
        } else {
          onChange && onChange();
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            fileMd5.current = md5(e.target?.result as string).toString(encHex)
            setData((prev) => ({...prev, image: e.target?.result as string}))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let localUploadedFile = await LocalDB.upload.get(`${fileMd5.current}`)
    if (localUploadedFile) {
      console.log('use cache upload file', localUploadedFile)
      onSuccess && onSuccess({
        id: fileMd5.current,
        url: localUploadedFile
      })
      return
    }
    setSaving(true)
    fetch('/api/upload', {
      method: 'POST',
      headers: {'content-type': file?.type || 'application/octet-stream'},
      body: file,
    }).then(async (res) => {
      console.log('res', res)
      if (res.status === 200) {
        const {url} = (await res.json()) as PutBlobResult;
        console.log('uploaded =>', url);
        await LocalDB.upload.set(`${fileMd5.current}`, url)
        toast.success('Upload success')
        onSuccess && onSuccess({
          id: fileMd5.current,
          url: url
        })
      } else {
        const error = await res.text()
        toast.error(error)
      }
      setSaving(false)
    })
  }

  const onDragTrue = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const onDragFalse = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="image-upload"
            className="group relative mt-2 flex h-52 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 shadow-sm transition-all bg-[#333249]"
          >
            <div
              className="absolute z-[5] h-full w-full rounded-md"
              onDragOver={onDragTrue}
              onDragEnter={onDragTrue}
              onDragLeave={onDragFalse}
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
                  ? 'bg-[#333249] opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                  : 'bg-[#333249] opacity-100 hover:bg-gray-50'
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
              <p className="mt-2 text-center text-xs text-gray-500">
                <span className={'text-white'}>Click to upload image</span> or drag to upload image
              </p>
              <p className="mt-2 text-center text-sm text-gray-500">
                Max Image file size: 4.5MB
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

        <div className={'absolute inset-x-0 bottom-0 p-4'}>
          <button
            disabled={saveDisabled}
            className={`${
              saveDisabled
                ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                : 'border-[#D2FF04] bg-[#D2FF04] text-black hover:text-gray-600'
            } flex h-10 w-full items-center justify-center rounded-full border text-sm transition-all focus:outline-none`}
          >
            {saving ? (
              <LoadingDots color="#808080"/>
            ) : (
              <p className="text-sm">Remove Background</p>
            )}
          </button>
        </div>

      </form>
    </>
  )
}
