"use client"
import {useState} from 'react';
import {XMarkIcon} from '@heroicons/react/20/solid'

// @ts-ignore
const Popup = ({isOpen, onClose}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 处理输入文字的逻辑，可以在这里调用父组件传递的回调函数，并将输入的文字作为参数传递
    onClose(inputText);
  };

  const handleClose = () => {
    onClose(''); // 清空输入的文本
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={handleClose} // 添加点击除开弹窗的区域关闭弹窗的逻辑
      ></div>
      <div className="bg-white p-6 rounded shadow z-50">
        <div className='flex justify-between'>
          <span className='text-md font-medium'>添加文件夹</span>
          <button
            className="  text-gray-500 hover:text-gray-700"
            onClick={handleClose} // 添加关闭按钮点击的逻辑
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
        </div>
        <div className='flex'>
          <form onSubmit={handleSubmit}>
            <label className='text-sm flex justify-center items-center py-9'>
              <span className='pr-3'>文件夹名称:</span>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="border border-zinc-300 px-2 py-1 rounded"
              />
            </label>
            <div className='flex justify-center'>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-1.5 rounded text-sm"
              >
                确定
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;