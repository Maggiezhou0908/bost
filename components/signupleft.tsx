export function Signupleft() {
    return (
        <div className="relative bg-cover bg-center w-7/12 h-full">
        <video className="absolute inset-0 w-full h-full object-cover" loop autoPlay muted>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-a-young-woman-wearing-futuristic-vr-glasses-focuses-on-an-51192-large.mp4" type="video/mp4"></source>
        </video>
        <div className="absolute justify-center items-center top-0 left-0 w-full h-full px-5 bg-black/60  ">
            <div className='pl-8 pt-16'>
                <h1 className='text-white text-5xl'>iSelling</h1>
                <p className=' text-white pt-5'>Ecommerce growth with AI</p>
            </div>
        </div>
        </div>
    );
}