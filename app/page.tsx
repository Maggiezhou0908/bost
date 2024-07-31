import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Index(){
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/index/Logo.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-1.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-2.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-3.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-4.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-5.jpeg"/>
        <link rel="preload" as="image" href="/index/Logo-6.jpeg"/>
      </Head>
      <div className={'bg-white w-full fixed z-10'}>
        <div className="w-auto">
          <div className="flex h-16 justify-between px-8 box-border">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center  ">
                <Image
                  className="h-7 w-auto"
                  src="/logo.svg"
                  alt="BOST"
                  width={120}
                  height={20}
                  priority
                />
              </div>

            </div>
            <div className="flex items-center">

              <div className="flex-shrink-0 ml-3">
                <Link href='/#YourGains'
                      className="relative inline-flex items-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-black">
                  Your gains
                </Link>
                <Link href='/#ImageEditor'
                      className="relative inline-flex items-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-black">
                  Image Editor
                </Link>
                <Link href='/#TextEditor'
                      className="relative inline-flex items-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-black">
                  Text Editor
                </Link>
                <Link href='/#CaseStudy'
                      className="relative inline-flex items-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-black">
                  Case Study
                </Link>
                <Link href={"/home"} className={'relative inline-flex items-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-semibold text-black border border-solid border-black'}>
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto h-screen slideshow">
        index
      </div>
      <div className="w-auto h-screen bg-black" id={'YourGains'}>
        Your gains
      </div>
      <div className="w-auto h-screen bg-[#00BEFC]" id={'ImageEditor'}>
        333
      </div>
      <div className="w-auto h-screen bg-[#D2FF04]">
        444
      </div>
      <div className="w-auto h-screen bg-[#9648FF]" id={'TextEditor'}>
        TEXT Editor
      </div>
      <div className="w-auto h-screen bg-black" id={'CaseStudy'}>
        case study
      </div>
      <div className="w-auto h-screen bg-[#00BEFC]">
        Applicable to all
        e-commerce platforms
      </div>
      <div className="w-auto h-screen bg-[#FF7BCA]">
        GROW your BUsiness with AI
      </div>
      <div className="w-full h-28 bg-black flex items-center justify-center text-white text-sm">
        © 2024 BOOST, Inc. all rights reserved
      </div>
    </>
  )
}