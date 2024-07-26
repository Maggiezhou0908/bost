"use client"

import {BuildingStorefrontIcon, SparklesIcon} from '@heroicons/react/20/solid'

const tabs = [
  {name: '产品', href: '#', icon: BuildingStorefrontIcon, current: true},
  {name: '营销', href: '#', icon: SparklesIcon, current: false},
]

const editor = [
  {name: '产品标题生成', href: './TextEditor', imgUrl: 'img/1706771116585.webp'},
  {name: '产品标题优化', href: '#', imgUrl: 'img/1706771128912.webp'},
  {name: '产品描述', href: '#', imgUrl: 'img/1706771153985.webp'},
  {name: '卖点生成', href: './TextLong', imgUrl: 'img/1706771139206.webp'},
  {name: '产品 Q&A', href: '#', imgUrl: 'img/1706771561928.webp'},
  {name: '评论回复', href: '#', imgUrl: 'img/1706771742978.webp'},
  {name: '主图文案', href: '#', imgUrl: 'img/1706771742978.webp'},
]

const editorp = [
  {name: '在线抠图', href: './RemovebgEditor', imgUrl: 'img/1706771166610.webp'},
  {name: '产品图生成', href: './ImageEditor', imgUrl: 'img/1706771276140.webp'},
]

const imgtotext = [
  {name: '产品图卖点生成', href: './Imgtotext', imgUrl: 'img/1706771293727.webp'},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SelectionPanel() {
  return (
    <div className="w-[380px] min-w-[380px] px-4 pt-16 bg-white h-screen overflow-y-auto">
      <div className="hidden sm:block pt-1">
        <div className=" bg-zinc-100 rounded-md mt-2 px-1 py-1">
          <nav className="flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? ' text-black bg-white rounded-md shadow-sm'
                    : ' text-gray-500 hover:text-gray-700',
                  'group inline-flex py-2 w-1/2 justify-center items-center text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? 'text-black' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-4 w-4'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className='pt-5 text-sm font-medium text-gray-500'>文案</div>
      <ul role="list" className="mt-3 grid grid-cols-2 gap-4">

        {editor.map((editor: any) => (
          <a href={editor.href} className="font-medium text-gray-900">
            <li key={editor.name} className="col-span-1 rounded-xl bg-zinc-50 py-3 hover:bg-zinc-100">
              <div
                className={classNames(
                  editor,
                  'items-center justify-center rounded-l-md text-white'
                )}
              >
                <img
                  className="w-24 m-auto"
                  src={editor.imgUrl}
                  alt=""
                />
              </div>
              <div className="items-center truncate rounded-r-md">
                <div className="truncate px-4 pt-2 text-sm text-center">

                  {editor.name}

                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>

      <div className='pt-3 text-sm font-medium text-gray-500'>产品图</div>
      <ul role="list" className="mt-3 grid grid-cols-2 gap-4">
        {editorp.map((editorp: any) => (
          <a href={editorp.href} className="font-medium text-gray-900">
            <li key={editorp.name} className="col-span-1 rounded-xl bg-zinc-50 py-3 hover:bg-zinc-100">
              <div
                className={classNames(editorp, 'items-center justify-center rounded-l-md text-white'
                )}
              >
                <img
                  className="w-24 m-auto"
                  src={editorp.imgUrl}
                  alt=""
                />
              </div>
              <div className="items-center truncate rounded-r-md">
                <div className="truncate px-4 pt-2 text-sm text-center">

                  {editorp.name}

                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>


      <div className='pt-3 text-sm font-medium text-gray-500'>图片生成文字</div>

      <ul role="list" className="mt-3 grid grid-cols-2 gap-4">
        {imgtotext.map((imgtotext: any) => (
          <a href={imgtotext.href} className="font-medium text-gray-900">
            <li key={imgtotext.name} className="col-span-1 rounded-xl bg-zinc-50 py-3 hover:bg-zinc-100">
              <div
                className={classNames(imgtotext, 'items-center justify-center rounded-l-md text-white'
                )}
              >
                <img
                  className="w-24 m-auto"
                  src={imgtotext.imgUrl}
                  alt=""
                />
              </div>
              <div className="items-center truncate rounded-r-md">
                <div className="truncate px-4 pt-2 text-sm text-center">

                  {imgtotext.name}

                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}
  
