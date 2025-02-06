'use client';
import { motion } from 'framer-motion';

import React from 'react';

export default function HeroBannerVideoBackground() {
  return (
    <section className='relative bg-gray-900 text-gray-100 h-[500px]'>
      <div className='absolute inset-0 h-full'>
        <video
          autoPlay
          loop
          muted
          className='w-full h-full object-cover opacity-50'
        >
          <source
            src='https://utfs.io/f/EbsGU6WGPzCg1lX2LdE2RaPKEd4A5xnybD0BVOULYJk9Ssh6'
            type='video/mp4'
          />
        </video>
      </div>

      <div className='relative z-10 flex items-center h-full max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between w-full'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className=''>
              <h1 className='text-3xl md:text-3xl font-bold text-gray-100 font-PlayfairDisplay italic mb-10'>
                Welcome to
                <strong className='block text-6xl font-extrabold text-orange-500 '>
                  Magna
                </strong>
              </h1>
              <h1 className='text-3xl font-bold'>
                Behind Every Iconic Chocolate, There&apos;s Mastery at Work.
              </h1>
              <p className='mt-2 text-lg'>
                We partner with the world&apos;s leading brands to craft premium
                chocolate products with precision and care.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
