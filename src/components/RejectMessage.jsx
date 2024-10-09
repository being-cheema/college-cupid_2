import React from 'react'

function RejectMessage() {
  return (
    <div className='block w-full max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
      <img
        className='rounded-[50%]'
        src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlM18zZF9pbGx1c3RyYXRpb25fb2Zfb3V0bGluZWRfc2FkX2Zyb3duaW5nX2ZhY2VfZV80YWY2NTNiOC1kZmZkLTQzMTMtYjEzMi0yZTc5ODdkNjBiYjEucG5n.png'
        alt='unhappy'
      />
      <div className="p-6 text-surface">
        <h5 className="mb-2 text-xl font-medium leading-tight text-center">Person1</h5>
        <p className="mb-4 text-base text-center">
          That's unfortnutate. You have to wait for 5 days to find your next potential mate.
        </p>
      </div>
    </div>
  )
}

export default RejectMessage