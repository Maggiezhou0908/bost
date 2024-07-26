import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'

const Season = [
    { id: 'spring', title: '春' },
    { id: 'summer', title: '夏' },
    { id: 'autumn', title: '秋' },
    { id: 'winter', title: '冬' },
]

const Proportion = [
    { id: '1', title: '1:1' },
    { id: '2', title: '1:2' },
    { id: '3', title: '4:3' },
    { id: '4', title: '3:4' },
    { id: '5', title: '2:1' },
    { id: '6', title: '16:9' },
    { id: '7', title: '9:16' },
]

const Quality = [
    { id: '1', title: '标准 512' },
    { id: '2', title: '高清 1024'},
]


const GenS = [
    { name: '简约风', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
    { name: '运动风', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
    { name: '甜美', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
    { name: '性感', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
    { name: '休闲', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
    { name: '奶油', selectedColor: 'ring-green-500', imgUrl: 'img/download.jpeg' },
]


const Scene = [
    { name: '纯色', selectedColor: 'ring-green-500', imgUrl: 'img/23.jpeg' },
    { name: '居家', selectedColor: 'ring-green-500', imgUrl: 'img/23.jpeg' },
    { name: '户外', selectedColor: 'ring-green-500', imgUrl: 'img/23.jpeg' },
    { name: '棚拍', selectedColor: 'ring-green-500', imgUrl: 'img/23.jpeg' },
    { name: '展台', selectedColor: 'ring-green-500', imgUrl: 'img/23.jpeg' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function ImageStyle() {
    const [selectedColor, setSelectedColor] = useState(GenS[0])
    return (
        <div className=" mt-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">风格模版 <span className="text-red-500">*</span></h2>
            <span className=' text-sm flex py-2'>季节</span>
            <fieldset className='mb-3'>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {Season.map((Season) => (
                        <div key={Season.id} className="flex items-center">
                            <input
                                id={Season.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={Season.id === 'email'}
                                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <label htmlFor={Season.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {Season.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <span className='text-sm flex'>流行风格</span>
            <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                <div className="my-4 items-center grid grid-cols-3 gap-2 ">
                    {GenS.map((GenS) => (
                        <RadioGroup.Option
                            key={GenS.name}
                            value={GenS}
                            className={({ active, checked }) =>
                                classNames(
                                    GenS.selectedColor,
                                    active && checked ? 'ring-2 ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative cursor-pointer items-center justify-center rounded-md border focus:outline-none'
                                )
                            }
                        >
                            <img className="w-auto m-auto" src={GenS.imgUrl} alt="Choose your style" />
                            <RadioGroup.Label as="span">
                                <span className='text-xs flex items-center justify-center py-1'>{GenS.name}</span>
                            </RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <span className='text-sm flex'>场景</span>
            <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                <div className="my-4 items-center grid grid-cols-3 gap-2 ">
                    {Scene.map((Scene) => (
                        <RadioGroup.Option
                            key={Scene.name}
                            value={Scene}
                            className={({ active, checked }) =>
                                classNames(
                                    Scene.selectedColor,
                                    active && checked ? 'ring-2 ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative cursor-pointer items-center justify-center rounded-md border focus:outline-none'
                                )
                            }
                        >
                            <img className="w-auto m-auto" src={Scene.imgUrl} alt="Choose your style" />
                            <RadioGroup.Label as="span">
                                <span className='text-xs flex items-center justify-center py-1'>{Scene.name}</span>
                            </RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <span className=' text-sm flex'>比例</span>
            <fieldset className='mb-3'>
                <div className="my-2 items-center grid grid-cols-3 gap-2 ">
                    {Proportion.map((Proportion) => (
                        <div key={Proportion.id} className="flex items-center">
                            <input
                                id={Proportion.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={Proportion.id === 'email'}
                                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <label htmlFor={Proportion.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {Proportion.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

            <span className=' text-sm flex'>画质</span>
            <fieldset className='mb-3'>
                <div className="my-2 items-center grid grid-cols-3 gap-2 ">
                    {Quality.map((Quality) => (
                        <div key={Quality.id} className="flex items-center">
                            <input
                                id={Quality.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={Quality.id === 'email'}
                                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <label htmlFor={Quality.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {Quality.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

        </div>
    );
}