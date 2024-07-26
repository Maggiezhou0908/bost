import { useState } from 'react';
import Preview from './base/Preview';

const content = [
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
    { name: 'ContentName', imgUrl: 'img/65ec85a8534352235TJrkBEzci6172.webp', href: '#', },
]

export function ImgenPanel() {


    const [PreviewOpen, isPreviewOpen] = useState(false);

    const handlexButtonClick = () => {
        isPreviewOpen(true);
    };

    const handleClosePreview = () => {
        isPreviewOpen(false);
    };

    return (
        <div className='w-[400px] h-screen overflow-y-auto bg-white'>
            <div className="w-full px-3">
                <ul role="list" className="grid grid-cols-2 mt-16 gap-3 pt-1 pb-3">
                    {content.map((content) => (
                        <li key={content.name} className="col-span-1 bg-slate-100">
                            <div className="group rounded-xl hover:bg-slate-100">
                                <a
                                className='flex hover:border-2 border-emerald-600 hover:rounded-lg hover:p-0.5'
                                    onClick={handlexButtonClick}
                                    href={content.href}>

                                    <img
                                        className="w-full h-full object-contain object-center rounded-md"
                                        src={content.imgUrl}
                                        alt=""
                                    />
                                </a>

                            </div>


                        </li>
                    ))}
                </ul>
            </div>
            <Preview isOpen={PreviewOpen} onClose={handleClosePreview} />
        </div>

    );
}