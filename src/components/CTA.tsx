import React from 'react';

export default function CTA() {
  return (
    <div className='py-12 px-6 text-center text-gray-800'>
      <h2 className='text-3xl font-bold mb-4'>Ready to Sweeten Your Career?</h2>
      <p className='text-lg mb-6 text-gray-600'>
        Join our team and craft the future of chocolate with us!
      </p>
      <a
        href='/careers'
        className='inline-block px-6 py-3 text-lg font-semibold text-gray-800 bg-orange-400 rounded-full hover:bg-orange-300 transition'>
        Explore Opportunities
      </a>
    </div>
  );
}
