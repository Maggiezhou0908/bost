import {ReactNode} from "react";

type PageWarpProps = {
  children: ReactNode
}
export const PageWarp = ({children}:PageWarpProps) => {
  return (
    <div className={'w-full px-16 h-screen overflow-y-auto bg-[#333249]'}>
      {children}
    </div>
  )
}