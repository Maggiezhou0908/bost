import {PageWarp} from "@/components/PageWarp";

export default function History() {
  return (
    <PageWarp>
      <div className={'flex h-full items-center justify-center'}>
        <div>
          <div className={'flex justify-center'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="size-12 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <div className={'text-sm text-white'}>No content yet, go generate it</div>
        </div>
      </div>
    </PageWarp>
  )
}