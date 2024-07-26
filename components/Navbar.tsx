"use client"

import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#1F1E30] border-b border-white w-full fixed z-50">
      {({}) => (
        <>
          <div className="w-auto">
            <div className="flex h-14 justify-between px-4">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center  ">
                  <Image
                    className="h-7 w-auto"
                    src="/logo.png"
                    alt="BOST"
                    width={120}
                    height={20}
                    priority
                  />
                </div>

              </div>
              <div className="flex items-center">

                <div className="flex-shrink-0 ml-3">
                  <Link href='./plan' className="relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-amber-900 text-white">
                    Your gains
                  </Link>
                  <Link href='./plan' className="relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-amber-900 text-white">
                    Image Editor
                  </Link>
                  <Link href='./plan' className="relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-amber-900 text-white">
                    Text Editor
                  </Link>
                  <Link href='./plan' className="relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-amber-900 text-white">
                    Case Study
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-7 w-7 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
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
                        className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="./Order"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              我的订单
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="./login"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              退出登录
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}