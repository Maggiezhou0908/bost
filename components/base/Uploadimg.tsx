"use client"

import {PhotoIcon} from '@heroicons/react/20/solid'

export function Uploadimg() {

  return (
    <div className="border-b border-gray-900/10 pb-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900">上传产品照片</h2>
      <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
          <div className="text-center">
            <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true"/>
            <div className="flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
              >
                <span>Upload a image</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div className='pt-2'>
        <span className=' text-sm flex pb-2'>选择已抠图片</span>
        <ul className='grid grid-cols-5 gap-2'>
          <li className='border rounded-md'><a href="#"><img className="object-contain w-20 h-20 px-2 py-2"
                                                             src="img/testpp.webp" alt=""/></a></li>
          <li className='border rounded-md'><a href="#"><img className="object-contain w-20 h-20 px-2 py-2"
                                                             src="img/testpp.webp" alt=""/></a></li>
          <li className='border rounded-md'><a href="#"><img className="object-contain w-20 h-20 px-2 py-2"
                                                             src="img/testpp.webp" alt=""/></a></li>
          <li className='border rounded-md'><a href="#"><img className="object-contain w-20 h-20 px-2 py-2"
                                                             src="img/testpp.webp" alt=""/></a></li>
          <li className='border rounded-md flex items-center text-xs justify-center'><a href="#"><span
            className="flex w-16 h-16 items-center text-xs justify-center ">更多</span></a></li>
        </ul>
      </div>
    </div>
  );
}