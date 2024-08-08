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
      <div className="w-auto h-screen slideshow relative box-border">
        <div className={'absolute top-2/3 left-0 right-0 flex items-center justify-center'}>
          <div className={'px-4 w-[880px] h-[37px]'}>
            <div className={'f-bodoni text-6xl text-center'}>your productivity, efficiency, quality</div>
            <div className={'text-2xl my-4 text-black text-center uppercase'}>With AI e-commerce Marketing tool</div>
            <Link href={'/home'} >
              <div className={'w-40 h-12 leading-none text-center mx-auto shrink-0 bg-black rounded-full text-white flex items-center justify-center'}>Try It Now</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-auto bg-black" id={'YourGains'}>
        <div className={'text-6xl text-white text-center uppercase pt-24 pb-6 font-bold'}>Your Gains</div>
        <div className={'text-2xl text-white text-center uppercase pb-12'}>Save time and money by using aI to generate images and text.</div>
        <div className={'flex items-center justify-center pb-24'}>
          <div className={'relative'}>
            <div className={'absolute uppercase left-6 top-6 font-bold'}>
              <div className={'text-4xl'}>Reduce</div>
              <div className={'text-2xl'}>photography</div>
              <div className={'text-2xl'}>costs</div>
            </div>
            <Image src={'/image/Your Gains1.png'} width={352} height={504} alt={''} unoptimized={true}/>
          </div>
          <div className={'relative mx-4'}>
            <div className={'absolute uppercase left-6 top-6 font-bold'}>
              <div className={'text-4xl'}>Reduce</div>
              <div className={'text-2xl'}>design</div>
              <div className={'text-2xl'}>time</div>
            </div>
            <Image src={'/image/Your Gains2.png'} width={352} height={504} alt={''} unoptimized={true}/>
          </div>
          <div className={'relative'}>
            <div className={'absolute uppercase left-6 top-6 font-bold'}>
              <div className={'text-4xl'}>Reduce</div>
              <div className={'text-2xl'}>writing</div>
              <div className={'text-2xl'}>time</div>
            </div>
            <Image src={'/image/Your Gains3.png'} width={352} height={504} alt={''} unoptimized={true}/>
          </div>
        </div>
      </div>
      <div className="w-auto bg-[#00BEFC]" id={'ImageEditor'}>
        <div className={'text-6xl text-black text-center uppercase pt-24 pb-16 font-bold'}>Image Editor</div>
        <div className={'flex w-[1000px] mx-auto pb-16'}>
          <div className={'flex-1'}>
            <div className={'text-6xl'}>REMOVE</div>
            <div className={'text-6xl'}>BACKGROUNDS</div>
            <div className={'text-6xl'}>IN</div>
            <div className={'text-[#D2FF04] text-9xl f-bodoni'}>30</div>
            <div className={'text-6xl'}>SECONDS</div>
          </div>
          <div className={'flex-1'}>
            <Image src={'/image/imageeditor1.png'} alt={''} width={472} height={366} />
          </div>
        </div>
        <div className={'text-6xl text-black text-center uppercase font-bold'}>Generate</div>
        <div className={'text-6xl text-black text-center uppercase font-bold py-6'}>IMPRESSIVE IMAGES WITH AI</div>
        <div className={'w-[1088px] mx-auto text-center'}>
          <Image src={'/image/imageditor2.png'} alt={''} width={1088} height={608} unoptimized={true} />
        </div>
        <div className={'flex justify-center items-center w-[1088px] mx-auto pt-6 pb-12'}>
          <div className={'mr-4'}>
            <div className={'text-[#D2FF04] text-8xl text-center f-bodoni'}>01</div>
            <div className={'text-black text-2xl uppercase text-center'}>UPLOAD</div>
            <div className={'text-black text-2xl uppercase text-center'}>an image</div>
            <div className={'text-black text-base text-center'}>Choose the image from your device and drag it into Boost.</div>
          </div>
          <div className={'mx-4'}>
            <div className={'text-[#D2FF04] text-8xl text-center f-bodoni'}>02</div>
            <div className={'text-black text-2xl uppercase text-center'}>Remove</div>
            <div className={'text-black text-2xl uppercase text-center'}>Background</div>
            <div className={'text-black text-base text-center'}>Boost will eliminate the background in just a few seconds.</div>
          </div>
          <div className={'ml-4'}>
            <div className={'text-[#D2FF04] text-8xl text-center f-bodoni'}>03</div>
            <div className={'text-black text-2xl uppercase text-center'}>Create</div>
            <div className={'text-black text-2xl uppercase text-center'}>Image with AI</div>
            <div className={'text-black text-base text-center'}>Boost creates backgrounds with ideal lighting, reflections, and shadows.</div>
          </div>
        </div>
        <div className={'pb-24'}>
          <Link href={'/backgroundRemover'}>
            <div
              className={'w-40 h-12 leading-none text-center mx-auto shrink-0 bg-black rounded-full text-white flex items-center justify-center'}>Try
              It Now
            </div>
          </Link>
        </div>
      </div>
      <div className="w-auto bg-[#D2FF04]">
        <div className={'text-6xl text-black text-center uppercase pt-24 font-bold'}>More vivid products,</div>
        <div className={'text-6xl text-black text-center uppercase font-bold'}>more attractive</div>
        <div className={'text-6xl text-black text-center uppercase pb-16 font-bold'}>scenes everyone likes</div>
        <div className={'w-[1087px] mx-auto pb-16'}>
          <Image src={'/image/imageeditor3.png'} alt={''} width={1087} height={1080} unoptimized={true}/>
        </div>
        <div className={'pb-24'}>
          <Link href={'/imageGeneration'}>
            <div
              className={'w-40 h-12 leading-none text-center mx-auto shrink-0 bg-black rounded-full text-white flex items-center justify-center'}>Try
              It Now
            </div>
          </Link>
        </div>
      </div>
      <div className="w-auto bg-[#9648FF]" id={'TextEditor'}>
        <div className={'text-6xl text-white text-center uppercase font-bold pt-24'}>TEXT Editor</div>
        <div className={'text-2xl text-white text-center uppercase font-bold py-6'}>Make Powerful content with AI writer
          in SECONDS
        </div>
        <div className={'flex justify-center'}>
          <div className={'flex items-center ml-[-100px]'}>
            <div className={'text-6xl f-bodoni mr-2'}>01</div>
            <div>
              <div className={'uppercase'}>Titile</div>
              <div className={'uppercase'}>Generation</div>
            </div>
          </div>
          <div className={'flex items-center pl-20'}>
            <div className={'text-6xl f-bodoni mr-2'}>02</div>
            <div>
              <div className={'uppercase'}>Titile</div>
              <div className={'uppercase'}>OPTIMIZATION</div>
            </div>
          </div>
        </div>
        <div className={'flex justify-center my-10 ml-[100px]'}>
          <div className={'flex items-center'}>
            <div className={'text-6xl f-bodoni mr-2'}>03</div>
            <div>
              <div className={'uppercase'}>Description</div>
              <div className={'uppercase'}>Generation</div>
            </div>
          </div>
          <div className={'flex items-center pl-20'}>
            <div className={'text-6xl f-bodoni mr-2'}>04</div>
            <div>
              <div className={'uppercase'}>IMAGE</div>
              <div className={'uppercase'}>Copywriting</div>
            </div>
          </div>
        </div>
        <div className={'w-[1086px] mx-auto pb-16'}>
          <Image src={'/image/texteditor.png'} alt={''} width={1086} height={677} unoptimized={true}/>
        </div>
        <div className={'pb-24'}>
          <Link href={'/titleGeneration'}>
            <div
              className={'w-40 h-12 leading-none text-center mx-auto shrink-0 bg-black rounded-full text-white flex items-center justify-center'}>Try
              It Now
            </div>
          </Link>
        </div>
      </div>
      <div className="w-auto bg-black" id={'CaseStudy'}>
        <div className={'text-6xl text-white text-center uppercase font-bold pt-24'}>case study</div>
        <div className={'text-6xl text-white text-center uppercase'}>Create Product Images and</div>
        <div className={'text-6xl text-white text-center uppercase'}>TEXT Content with AI</div>
        <div className={'text-6xl text-white text-center uppercase'}>in seconds.</div>
        <div className={'w-[1088px] mx-auto py-24'}>
          <Image src={'/image/casestudy.png'} alt={''} width={1088} height={599} unoptimized={true} />
        </div>
      </div>
      <div className="w-auto bg-[#00BEFC]">
        <div className={'text-6xl text-white text-center uppercase font-bold pt-24'}>compatible with</div>
        <div className={'text-6xl text-white text-center uppercase'}>all e-commerce platforms</div>
        <div className={'w-[1088px] mx-auto grid grid-cols-7 gpr-4 py-24'}>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_am.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_sp.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_ab.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_tm.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_xp.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_ae.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
          <div className={'text-center'}>
            <Image className={'rounded-full inline-block'} src={'/text/logo_laz.png'} alt={''} width={100} height={100} unoptimized={true}/>
          </div>
        </div>
      </div>
      <div className="w-auto bg-[#FF7BCA]">
        <div className={'text-6xl text-black text-center uppercase font-bold pt-24'}>GROW your BUsiness with AI</div>
        <div className={'text-8xl text-black text-center uppercase py-8'}>2,354,620</div>
        <div className={'text-2xl text-black text-center uppercase pb-16'}>AI Photos Generated in the past 3 months.</div>
        <div className={'w-[1088px] h-[529px] bb-wrap mx-auto flex items-center'}>
          <div className={'uppercase w-80'}>
            <div className={'text-2xl text-black pl-20'}>With BOOOST,</div>
            <div className={'text-2xl text-black pl-20'}>Save yourself a</div>
            <div className={'text-2xl text-black pl-20'}>lot of Time for</div>
            <div className={'text-2xl text-black pl-20'}>more fun!</div>
            <div className={'py-6'}>
              <Link href={'/home'}>
                <div
                  className={'w-40 h-12 leading-none text-center mx-auto shrink-0 bg-black rounded-full text-white flex items-center justify-center'}>Try
                  It Now
                </div>
              </Link>
            </div>
          </div>
          <div className={'flex-1 flex items-center justify-center'}>
            <Image src={'/image/image 206.png'} alt={''} width={718} height={449} unoptimized={true}/>
          </div>
        </div>
        <div className={'w-full h-16'}></div>
      </div>
      <div className="w-full h-28 bg-black flex items-center justify-center text-white text-sm">
        © 2024 BOOST, Inc. all rights reserved
      </div>
    </>
  )
}