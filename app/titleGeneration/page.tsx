'use client'

import {PageWarp} from "@/components/PageWarp";
import {Navbar} from "@/components/Navbar";
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { RadioGroup } from '@headlessui/react'
import CascadDropdown from "@/components/text/CascadDropdown";
import { ChevronLeftIcon, SparklesIcon } from '@heroicons/react/20/solid'
import classNames from "classnames";
import Image from "next/image";


const platform = [
  { name: 'Amazon', selectedColor: 'ring-green-500', imgUrl: '/text/logo_am.png' },
  { name: 'Shopify', selectedColor: 'ring-green-500', imgUrl: '/text/logo_sp.png' },
  { name: 'Alibaba', selectedColor: 'ring-green-500', imgUrl: '/text/logo_ab.png' },
  { name: 'Temu', selectedColor: 'ring-green-500', imgUrl: '/text/logo_tm.png' },
  { name: 'Shopee', selectedColor: 'ring-green-500', imgUrl: '/text/logo_xp.png' },
  { name: 'AliExpress', selectedColor: 'ring-green-500', imgUrl: '/text/logo_ae.png' },
  { name: 'Lazada', selectedColor: 'ring-green-500', imgUrl: '/text/logo_laz.png' },

]

export default function TitleGeneration() {

  const pageLoaded = useRef(false)

  const [text, setText] = useState('')

  const [selectedColor, setSelectedColor] = useState(platform[0])
  const productTypeRef = useRef('')

  const pageInit = async () => {

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(!selectedColor.name) return toast.error('please choose platform');
    if(!productTypeRef.current) return toast.error('please choose category');
    if(! e.target.product_name.value) return toast.error('please input product name');
    if(! e.target.advantages.value) return toast.error('please input advantages');
    if(! e.target.keywords.value) return toast.error('please input keywords');
    if(! e.target.tone.value) return toast.error('please choose tone');
    if(! e.target.languagewrit.value) return toast.error('please choose language');

    let reqData = {
      platform: selectedColor.name || '',
      product_type: productTypeRef.current,
      product_name: e.target.product_name.value,
      advantage:  e.target.advantages.value,
      keywords: e.target.keywords.value,
      tone: e.target.tone.value,
      language: e.target.languagewrit.value
    }
    // console.log(e.target.product_name.value)
    const _toast = toast.loading('AI is start, please wait')
    try {
      const statusRes = await fetch(`/api/moonshot`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(reqData)
      })
      const statusJson = await statusRes.json()
      toast.dismiss(_toast)
      setText(statusJson.choices[0].message.content)
      console.log('statusJson =>', statusJson)
    } catch (e) {
      toast.dismiss(_toast)
      console.error(e)
    }
  }

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

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="w-6 h-6 mr-2 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
              </svg>
              Image Generation
            </div>
          </Link>
          <div className={'w-full h-8'}></div>
          <div className={'text-white text-sm'}>Text Generation</div>
          <form onSubmit={handleSubmit}>
            <div className="pt-4">
              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-white">choose the e commence platform<span
                  className="text-red-500">*</span></h2>

                <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                  <div className="mt-4 flex items-center space-x-2">
                    {platform.map((platform) => (
                      <RadioGroup.Option
                        key={platform.name}
                        value={platform}
                        className={({active, checked}) =>
                          classNames(
                            platform.selectedColor,
                            active && checked ? 'ring-2 ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {platform.name}
                        </RadioGroup.Label>
                        <Image className="w-auto m-auto" src={platform.imgUrl} alt="Choose your platform" width={100} height={100}/>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

              </div>
              <div className="border-b border-gray-900/10 pb-12 mt-3">
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="skuname" className="block text-sm font-medium leading-6 text-white">product category<span
                      className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <CascadDropdown onChange={(option)=>{
                        console.log(option); productTypeRef.current = option }}/>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="productname"
                           className="block text-sm font-medium leading-6 text-white">product name<span
                      className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <div
                        className="flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 max-w">
                        <input
                          type="text"
                          name="product_name"
                          id="product_name"
                          autoComplete="productname"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="exp: Hair dryer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="advantages" className="block text-sm font-medium leading-6 text-white">
                      the advantage of product<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <div
                        className="text-gray-400  rounded-md py-1.5 px-3  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-60">
                      <textarea
                        id="advantages"
                        name="advantages"
                        rows={3}
                        className="block w-full border-00 sm:text-sm sm:leading-6 bg-transparent"
                        defaultValue={'Please enter the advantages of your product, such as cost-effectiveness and good quality.'}
                      />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="keywords" className="block text-sm font-medium leading-6 text-white">keywords<span
                      className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <div
                        className="flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 max-w">
                        <input
                          type="text"
                          name="keywords"
                          id="keywords"
                          autoComplete="keywords"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter the keywords you want to rank for. Use commas to separate them."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="tone" className="block text-sm font-medium leading-6 text-white">
                      Tone
                    </label>
                    <div className="mt-2">
                      <select
                        id="tone"
                        name="tone"
                        autoComplete="tone-name"
                        className="block w-full rounded-md border-0 py-1.5 pl-1  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 max-w sm:text-sm sm:leading-6"
                      >
                        <option>specialty</option>
                        <option>humor</option>
                        <option>enthusiasm</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="languagewrit" className="block text-sm font-medium leading-6 text-white">
                      choose language
                    </label>
                    <div className="mt-2">
                      <select
                        id="languagewrit"
                        name="languagewrit"
                        autoComplete="languagewrit-name"
                        className="block w-full rounded-md border-0 py-1.5 pl-1  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 max-w sm:text-sm sm:leading-6"
                      >
                        <option>english</option>
                        <option>chinese</option>
                        <option>french</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div>
              <button
                type={"submit"}
                className={`flex h-10 w-full items-center justify-center rounded-full border text-sm transition-all focus:outline-none`}
              >
                <p className="text-sm">submit</p>
              </button>
            </div>
          </form>
        </div>
        <PageWarp>
          <div className={'w-full h-16'}></div>
          <div className={'w-full h-4'}></div>
          <div className={'text-generation-wrap text-lg text-white'}>
            {text}
          </div>
        </PageWarp>
      </div>
    </>
  )
}