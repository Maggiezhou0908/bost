import {PageWarp} from "@/components/PageWarp";
import Uploader from '@/components/image/uploader'

export default function BackgroundRemover() {
  return (
    <PageWarp>
      <div className={'flex h-full items-center justify-center'}>
        <Uploader />
      </div>
    </PageWarp>
  )
}