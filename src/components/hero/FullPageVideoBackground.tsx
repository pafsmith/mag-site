// import { ArrowDownCircle } from '@mynaui/icons-react';
import Container from '../global/Container';

export default function FullPageVideoBackground() {
  return (
    <section className='relative bg-gray-900 text-white'>
      <div className='absolute inset-0 bg-opacity-30'>
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
      <Container>
        <div className='relative z-10 flex flex-col items-center justify-center min-h-screen text-center '>
          <h1 className='text-3xl font-bold text-white mb-14'>
            Welcome to
            <strong className='font-PlayfairDisplay block font-extrabold text-orange-500 text-9xl italic'>
              Magna
            </strong>
          </h1>
          <h1 className='text-xl md:text-2xl font-bold font-Poppins'>
            Behind Every Iconic Chocolate, There’s Mastery at Work.
          </h1>
          <p className='mt-4 mb-20 text-lg md:text-xl font-Poppins'>
            We partner with the world’s leading brands to craft chocolate
            products with precision and care.
          </p>
          {/* <ArrowDownCircle
            size={48}
            className='text-orange-500 animate-bounce'
          /> */}
        </div>
      </Container>
    </section>
  );
}
