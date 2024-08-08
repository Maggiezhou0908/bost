import Image from 'next/image'
import {Navbar} from "@/components/Navbar";
import {PageWarp} from "@/components/PageWarp";

export default function About() {

  return (
    <>
      <Navbar/>
      <div className='flex'>
        <PageWarp>
          <div className={'w-full h-16'}></div>
          <div className={'w-full h-10'}></div>
          <div className={'text-white text-center text-4xl pb-6'}>About Us</div>
          <div className={'w-[960px] mx-auto text-white'}>Boost is a technology company dedicated to providing innovative solutions for e-commerce. Leveraging
            cutting-edge artificial intelligence, specifically image-to-image translation and text-to-text generation
            technologies, we help merchants quickly create high-quality product images and copy. Our goal is to enhance
            the visual appeal and informational efficiency of product displays, helping small and micro businesses
            improve their operational efficiency, reduce manpower and financial investments, and stand out in a
            competitive market.
          </div>
          <div className={'w-[960px] mx-auto my-6 flex items-center justify-center'}>
            <Image src={'/about.jpg'} width={960} height={646} alt={''} />
          </div>
        </PageWarp>
      </div>
    </>
  )
}
