import Image from "next/image";
import classNames from "classnames";

const NoContent = ({isFullScreen = false}:{isFullScreen?: boolean}) => {

  const cls = classNames(
    isFullScreen ? 'h-full': '',
    'flex items-center justify-center'
  )

  return (
    <div className={cls}>
      <div>
        <div className={'flex justify-center'}>
          <div className={'w-12 h-12'}>
            <Image src={'/icon/history_big.png'} alt={''} width={48} height={48} />
          </div>
        </div>
        <div className={'text-sm text-white'}>No content yet, go generate it</div>
      </div>
    </div>
  )
}
export default NoContent