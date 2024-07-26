"use client"

import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {EllipsisHorizontalIcon, FolderPlusIcon} from '@heroicons/react/20/solid'
import {useState} from 'react';
import Popup from './base/Popup';
import Preview from './base/Preview';

const folder = [
  {name: '文件夹名', imgUrl: 'img/svg-gobbler.svg', href: '#', files: 16},
  {name: '文件夹名', imgUrl: 'img/svg-gobbler.svg', href: '#', files: 12},
  {name: '文件夹名', imgUrl: 'img/svg-gobbler.svg', href: '#', files: 16},
]

const content = [
  {type: 'image', name: '文件名', imgUrl: 'img/testpp.webp', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/testpp.webp', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/trstppp.png', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/trstppp.png', href: '#',},
  {type: 'text', name: '文件名', genre: '产品 Q&A', content: '这是一段描述文字1', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/1231243.webp', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/12312312.webp', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/zczcz.webp', href: '#',},
  {type: 'image', name: '文件名', imgUrl: 'img/bbbbs.png', href: '#',},
  {type: 'text', name: '文件名', genre: '产品标题生成', content: '这是一段描述文字1', href: '#',},
  {
    type: 'text',
    name: '文件名',
    genre: '卖点生成',
    content: '这是一段描述文字2这是一段描述文字2这是一段描述文字2这是一段描述文字2这是一段描述文字2这是一段描述文字2描述文字2这是一段描述文字2描述文字2这是一段描述文字2描述文字2这是一段描述文字2描述文字2这是一段描述文字2',
    href: '#',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function ContentList() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  const [PreviewOpen, isPreviewOpen] = useState(false);

  const handlexButtonClick = () => {
    isPreviewOpen(true);
  };

  const handleClosePreview = () => {
    isPreviewOpen(false);
  };

  return (
    <div className='flex w-full pt-20 h-screen overflow-y-auto bg-[#333249]'>
      <div className='w-full px-8 pt-1 pb-4'>
        <div className='flex'>
          <h2 className="text-lg font-medium flex-1 text-black">我的空间</h2>
          <button onClick={handleButtonClick} type="button"
                  className="flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700">
            <FolderPlusIcon className="h-5 w-5" aria-hidden="true"/>添加文件夹
          </button>
          <Popup isOpen={isPopupOpen} onClose={handleClosePopup}/>
        </div>
        <ul role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {folder.map((folder) => (
            <li key={folder.name} className="col-span-1 ">
              <div
                className="items-center justify-between truncate rounded-xl bg-white hover:bg-slate-100">
                <div className="truncate px-6 pt-2">
                  <a href={folder.href} className="text-gray-900">
                    <img
                      className="w-24 m-auto"
                      src={folder.imgUrl}
                      alt=""
                    />
                  </a>
                </div>
                <div className="text-xs flex items-center justify-between">
                  <p className="text-gray-500 py-1 pl-3 float-left">{folder.files} 个文件</p>
                  {/* space dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="float-right mb-1 mr-1 rounded-full bg-transparent bg-white text-gray-400 hover:text-black">
                        <EllipsisHorizontalIcon
                          className="h-5 w-5 mx-1 my-1 items-center justify-center"
                          aria-hidden="true"/>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-2 bottom-9 z-0 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              重命名
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-red-500'
                              )}
                            >
                              删除文件夹
                            </a>
                          )}
                        </Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>

                </div>
              </div>
              <div className='mt-2 text-sm text-center'>
                <a href={folder.href} className=" text-gray-900 hover:text-gray-600">
                  <p>{folder.name}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-medium flex-1 text-black mt-6">内容</h2>
        <ul role="list"
            className="relative mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {content.map((item, index) => (
            item.type === 'image' ? (
              // 对于图片项
              <li key={index} className="col-span-1">
                <div className="group rounded-xl bg-white hover:bg-slate-100 py-4">
                  <div
                    className="aspect-h-1 px-4 py-2 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:bg-slate-100 lg:h-40">
                    <a
                      onClick={handlexButtonClick}
                      href={item.href}>
                      <img
                        className="w-full h-full object-contain object-center"
                        src={item.imgUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  {/* space dropdown */}
                  <div className="text-xs flex items-center justify-end">
                    <Menu as="div" className="absolute ">
                      <div>
                        <Menu.Button
                          className="float-right right-0 mr-1 mb-1 rounded-full bg-white/70 text-gray-400 hover:bg-white hover:text-black">
                          <EllipsisHorizontalIcon
                            className="h-5 w-5 mx-1 my-1 items-center justify-center"
                            aria-hidden="true"/>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className="absolute right-2 bottom-9 z-0 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                重命名
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                移动到
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-red-500'
                                )}
                              >
                                删除
                              </a>
                            )}
                          </Menu.Item>

                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='mt-2 text-sm text-center'>
                  <a href={item.href} className=" text-gray-900 hover:text-gray-600">
                    <p>{item.name}</p>
                  </a>
                </div>
              </li>
            ) : (
              // 对于文字项
              <li key={index} className="col-span-1">
                <div className="group rounded-xl bg-white hover:bg-slate-100 py-4">
                  <div
                    className="aspect-h-1 px-5 py-2 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:bg-slate-100 lg:h-40">
                    <a href={item.href}>
                      <p className='text-sm text-gray-900 font-medium pb-1'>{item.genre}</p>
                      <p className='text-sm text-gray-500 overflow-hidden line-clamp-4'>{item.content}</p>

                    </a>
                  </div>
                  {/* space dropdown */}
                  <div className="text-xs flex items-center justify-end">
                    <Menu as="div" className="absolute ">
                      <div>
                        <Menu.Button
                          className="float-right right-0 mr-1 mb-1 rounded-full bg-white/70 text-gray-400 hover:bg-white hover:text-black">
                          <EllipsisHorizontalIcon
                            className="h-5 w-5 mx-1 my-1 items-center justify-center"
                            aria-hidden="true"/>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className="absolute right-2 bottom-9 z-0 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                重命名
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                移动到
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-red-500'
                                )}
                              >
                                删除
                              </a>
                            )}
                          </Menu.Item>

                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='mt-2 text-sm text-center'>
                  <a href={item.href} className=" text-gray-900 hover:text-gray-600">
                    <p>{item.name}</p>
                  </a>
                </div>
              </li>
            )
          ))}
        </ul>
      </div>
      <Preview isOpen={PreviewOpen} onClose={handleClosePreview}/>
    </div>
  );
}