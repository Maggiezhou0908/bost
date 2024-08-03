import {Navbar} from "@/components/Navbar";
import {PageWarp} from "@/components/PageWarp";

export default function About() {

  return (
    <>
      <Navbar/>
      <div className='flex'>
        <PageWarp>
          <div>About Us</div>
          <div>Boost is a technology company dedicated to providing innovative solutions for e-commerce. Leveraging cutting-edge artificial intelligence, specifically image-to-image translation and text-to-text generation technologies, we help merchants quickly create high-quality product images and copy. Our goal is to enhance the visual appeal and informational efficiency of product displays, helping small and micro businesses improve their operational efficiency, reduce manpower and financial investments, and stand out in a competitive market.</div>
        </PageWarp>
      </div>
    </>
  )
}
