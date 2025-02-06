'use client';

import ContainerAlways from '@/components/global/ContainerAlways';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import React from 'react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HistoryItemProps {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
function HistoryItem({
  year,
  title,
  description,
  imageUrl,
  Icon,
}: HistoryItemProps) {
  return (
    <div className='h-full grid md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-6'>
      <div className='flex flex-col space-y-3 md:space-y-4 order-2 md:order-1'>
        <div className='inline-block text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit bg-orange-500'>
          {year}
        </div>
        <h3 className='text-xl md:text-2xl font-bold tracking-tight line-clamp-2'>
          {title}
        </h3>
        <p className='text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-4'>
          {description}
        </p>
      </div>
      <div className='aspect-[4/3] md:aspect-[3/2] relative order-1 md:order-2'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className='object-cover w-full h-full rounded-lg shadow-md'
            width={1000}
            height={1000}
          />
        ) : Icon ? (
          <div className='w-full h-full bg-muted/50 rounded-lg flex items-center justify-center shadow-sm'>
            <Icon className='w-24 h-24 md:w-32 md:h-32 text-primary/40' />
          </div>
        ) : (
          <div className='w-full h-full bg-muted/50 rounded-lg shadow-sm' />
        )}
      </div>
    </div>
  );
}

function HistoryCarousel({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical';
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const historyEvents = [
    {
      year: '1972',
      title: 'Magna Founded',
      description:
        'Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.',
      imageUrl: '/outside.png',
    },
    {
      year: '1981',
      title: 'First Easter Egg Produced',
      description:
        'Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.',
      imageUrl: '/eggconveyor43.png',
    },
    // Add more events...
  ];

  return (
    <section className='py-8 md:py-12'>
      <ContainerAlways className='relative px-2 md:px-16'>
        <Carousel
          className='w-full max-w-7xl mx-auto'
          setApi={setApi}
          orientation='horizontal'
        >
          <CarouselContent className='h-full'>
            {historyEvents.map((event, index) => (
              <CarouselItem key={index} className='h-full'>
                {orientation === 'vertical' ? (
                  <VerticalHistoryItem {...event} />
                ) : (
                  <HistoryItem {...event} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Navigation */}
          <div className='hidden md:flex justify-between items-center mt-8'>
            <CarouselPrevious className='relative  hover:bg-primary hover:text-primary-foreground transition-colors' />
            <div className='flex gap-1.5'>
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 ',
                    current === index
                      ? 'bg-orange-500 w-4'
                      : 'bg-orange-500/20 w-1.5'
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <CarouselNext className=' static hover:bg-primary hover:text-primary-foreground transition-colors' />
          </div>

          {/* Mobile Navigation */}
          <div className='py-4 md:hidden'>
            <div className='flex items-center justify-center gap-3'>
              <CarouselPrevious
                variant='outline'
                className='relative h-8 w-8 rounded-full left-0 right-0 translate-y-0 border-primary/20 hover:bg-primary/10'
              />
              <div className='flex gap-1.5'>
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      current === index
                        ? 'bg-orange-500 w-4'
                        : 'bg-orange-500/20 w-1.5'
                    )}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
              <CarouselNext
                variant='outline'
                className='relative h-8 w-8 rounded-full left-0 right-0 translate-y-0 border-primary/20 hover:bg-primary/10'
              />
            </div>
          </div>
        </Carousel>
      </ContainerAlways>
    </section>
  );
}

function VerticalHistoryItem({
  year,
  title,
  description,
  imageUrl,
  Icon,
}: HistoryItemProps) {
  return (
    <div className='grid md:grid-cols-[1fr,2px,1fr] gap-6 md:gap-12 p-4 md:p-6'>
      {/* Left side - Image */}
      <div className='aspect-square md:aspect-auto relative'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className='object-cover w-full h-full rounded-lg shadow-md'
            width={1000}
            height={1000}
          />
        ) : Icon ? (
          <div className='w-full h-full bg-muted/50 rounded-lg flex items-center justify-center shadow-sm'>
            <Icon className='w-24 h-24 md:w-32 md:h-32 text-primary/40' />
          </div>
        ) : (
          <div className='w-full h-full bg-muted/50 rounded-lg shadow-sm' />
        )}
      </div>

      {/* Center line with year bubble */}
      <div className='relative hidden md:flex justify-center'>
        <div className='w-0.5 h-full bg-orange-500/20'></div>
        <div className='absolute top-1/2 -translate-y-1/2 bg-orange-500 text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold'>
          {year}
        </div>
      </div>

      {/* Mobile year badge */}
      <div className='md:hidden'>
        <div className='inline-block bg-orange-500 text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold'>
          {year}
        </div>
      </div>

      {/* Right side - Content */}
      <div className='flex flex-col space-y-3 md:space-y-4 justify-center'>
        <h3 className='text-xl md:text-2xl font-bold tracking-tight line-clamp-2'>
          {title}
        </h3>
        <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
}

export { HistoryCarousel };
