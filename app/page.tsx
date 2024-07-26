import {Navbar} from "@/components/Navbar";
import {Sidebar} from "@/components/Sidebar";
import {ContentList} from "@/components/ContentList";


export default function Home() {
  return (
    <>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <ContentList/>
      </div>
    </>
  )
}
