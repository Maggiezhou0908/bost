export function Canvaseditor() {

    return (
        <div className='flex-grow h-screen'>
            <div className="w-full border bg-zinc-50 border-zinc-200 h-full flex justify-center items-center">
                <div className="rounded-t-xl" >
                <div className="w-full text-xs font-medium text-center py-4 bg-zinc-50 text-zinc-500 pb-2">画布区域即为最终的效果应用区域</div>
                    <img src="./img/image.png" className="w-full h-full" />
                </div>
            </div>
        </div>

    );
}