import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'

const textcontent = [
  { oritext: 'Professional Matte Lipstick - Long-lasting and Moisturizing, High-quality Formula with a Matte Finish', transtext: '专业哑光口红-持久保湿，高质量的配方，呈现哑光效果' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业2222口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Lipstick - Moisturizing and Long-lasting Wear, Kissable and Bold!', transtext: '专业口红-保湿和持久维持，浪漫和大胆！' },
  { oritext: 'Professional Matte Lipstick - Long-lasting and Moisturizing, High-quality Formula with a Matte Finish', transtext: '专业哑光口红-持久保湿，高质量的配方，呈现哑光效果' },
  { oritext: 'Professional Matte Lipstick - Long-lasting and Moisturizing, High-quality Formula with a Matte Finish', transtext: '专业哑光口红-持久保湿，高质量的配方，呈现哑光效果' },
  { oritext: 'Professional Matte Lipstick - Long-lasting and Moisturizing, High-quality Formula with a Matte Finish', transtext: '专业哑光口红-持久保湿，高质量的配方，呈现哑光效果' },
]

export function TextEditorList() {
    return (
        <div className='flex w-full pt-20 h-screen overflow-y-auto'>
        <div className='w-full px-8 pt-2 pb-4'>
          <div className="w-full border-b border-gray-900/10 pb-3">
          <h2 className="text-base font-semibold leading-7 text-gray-900">生成文案</h2>
          </div>
          <ul role="list" className="mt-2 text-sm">
            {textcontent.map((textcontent) => (
              <li key={textcontent.oritext} className="col-span-1 border-b border-gray-900/10 py-3">
                <div className="items-center justify-between leading-10">
                  <p >{textcontent.oritext}</p>
                    <p className="">{textcontent.transtext}</p>
                  </div>
                  <button
                    type="button"
                    className="flex ml-auto text-slate-400 hover:text-green-600"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5 " aria-hidden="true" />
                  </button>
                  
              </li>
            ))}
          </ul>
            
            </div>
            </div>
        );
    }