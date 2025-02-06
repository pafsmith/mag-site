import Image from 'next/image';
import React from 'react';

interface TestemonialProps {
  body: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export default function Testemonial({ body, author }: TestemonialProps) {
  return (
    <div className='overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 w-full flex flex-col justify-between'>
      <div className='px-4 py-5 sm:p-6 italic text-gray-600'>
        &quot;{body}&quot;
      </div>
      <div className='bg-gray-50 px-4 py-4 sm:px-6 flex gap-4'>
        <Image
          alt=''
          src={author.imageUrl}
          className='size-10 rounded-full bg-gray-50'
          width={1000}
          height={1000}
        />
        <div className=''>
          <div className='font-semibold'>{author.name}</div>
          <div className='text-gray-600 text-xs h-full'>{author.role}</div>
        </div>
      </div>
    </div>
  );
}
