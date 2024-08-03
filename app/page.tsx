import Image from "next/image";
import Link from "next/link";

export default function Index(){
  return (
    <>
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
      <div className="w-auto h-screen slideshow relative">
        <div className={'absolute top-3/4 left-0 right-0 flex items-center justify-center'}>
          <div className={'px-4 w-[540px] h-[37px]'}>
            <div><Image src={'/index/slogan.png'} alt={'slogan'} width={540} height={37} /></div>
            <div className={'text-2xl my-4 text-black text-center'}>With AI e-commerce Marketing tool</div>
            <Link href={'/home'} >
              <div className={'w-[150px] h-[36px] leading-[36px] text-center mx-auto shrink-0 bg-black rounded-full text-white'}>Try It Now</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-auto h-screen bg-black" id={'YourGains'}>
        <div className={'text-4xl text-white text-center'}>Your Gains</div>
        <div className={'text-sm text-white text-center'}>Save time and money by using aI to generate images and text.</div>
        <div>pic</div>
      </div>
      <div className="w-auto bg-[#00BEFC]" id={'ImageEditor'}>
        <div className={'text-4xl text-black text-center'}>Image Editor</div>
        <div>pic</div>
        <div className={'text-4xl text-black text-center'}>Generate</div>
        <div className={'text-4xl text-black text-center'}>IMPRESSIVE IMAGES WITH AI</div>
        <div className={'text-4xl text-black text-center'}></div>
      </div>
      <div className="w-auto h-screen bg-[#D2FF04]">
        <div className={'text-4xl text-black text-center'}>More vivid products,</div>
        <div className={'text-4xl text-black text-center'}>more attractive</div>
        <div className={'text-4xl text-black text-center'}>scenes everyone likes</div>
      </div>
      <div className="w-auto h-screen bg-[#9648FF]" id={'TextEditor'}>
        <div className={'text-4xl text-black text-center'}>TEXT Editor</div>
        <div className={'text-sm text-white text-center'}>Make Powerful content with AI writer in SECONDS</div>
        <div>pic</div>
      </div>
      <div className="w-auto h-screen bg-black" id={'CaseStudy'}>
        <div className={'text-4xl text-white text-center'}>case study</div>
        <div className={'text-4xl text-white text-center'}>Create  Product Images and</div>
        <div className={'text-4xl text-white text-center'}>TEXT Content with AI</div>
        <div className={'text-4xl text-white text-center'}>in seconds</div>

      </div>
      <div className="w-auto h-screen bg-[#00BEFC]">
        <div className={'text-4xl text-black text-center'}>compatible with</div>
        <div className={'text-4xl text-black text-center'}>all e-commerce platforms</div>
        <div >

        </div>
      </div>
      <div className="w-auto h-screen bg-[#FF7BCA]">
        <div className={'text-4xl text-black text-center'}>GROW your BUsiness with AI</div>
        <div className={'text-4xl text-black text-center'}>2,354,620</div>
        <div className={'text-sm text-black text-center'}>AI Photos Generated in the past 3 months.</div>
      </div>
      <div className="w-full h-28 bg-black flex items-center justify-center text-white text-sm">
      © 2024 BOOST, Inc. all rights reserved
      </div>
    </>
  )
}