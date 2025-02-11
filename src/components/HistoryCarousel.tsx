"use client";

import ContainerAlways from "~/components/global/ContainerAlways";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "~/components/ui/carousel";
import React from "react";

import { cn } from "~/lib/utils";
import Image from "next/image";

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
    <div className="grid h-full gap-4 p-4 md:grid-cols-2 md:gap-8 md:p-6">
      <div className="order-2 flex flex-col space-y-3 md:order-1 md:space-y-4">
        <div className="inline-block w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-primary-foreground md:text-sm">
          {year}
        </div>
        <h3 className="line-clamp-2 text-xl font-bold tracking-tight md:text-2xl">
          {title}
        </h3>
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <div className="relative order-1 aspect-[4/3] md:order-2 md:aspect-[3/2]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full rounded-lg object-cover shadow-md"
            width={1000}
            height={1000}
          />
        ) : Icon ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted/50 shadow-sm">
            <Icon className="h-24 w-24 text-primary/40 md:h-32 md:w-32" />
          </div>
        ) : (
          <div className="h-full w-full rounded-lg bg-muted/50 shadow-sm" />
        )}
      </div>
    </div>
  );
}

function HistoryCarousel({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
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

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const historyEvents = [
    {
      year: "1972",
      title: "Magna Founded",
      description:
        "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.",
      imageUrl: "/about/founded.jpg",
    },
    {
      year: "1981",
      title: "First Easter Egg Produced",
      description:
        "Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.",
      imageUrl: "/about/first-egg.jpg",
    },
    // Add more events...
  ];

  return (
    <section className="py-8 md:py-12">
      <ContainerAlways className="relative px-2 md:px-16">
        <Carousel
          className="mx-auto w-full max-w-7xl"
          setApi={setApi}
          orientation="horizontal"
        >
          <CarouselContent className="h-full">
            {historyEvents.map((event, index) => (
              <CarouselItem key={index} className="h-full">
                {orientation === "vertical" ? (
                  <VerticalHistoryItem {...event} />
                ) : (
                  <HistoryItem {...event} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Navigation */}
          <div className="mt-8 hidden items-center justify-between md:flex">
            <CarouselPrevious className="relative transition-colors hover:bg-primary hover:text-primary-foreground" />
            <div className="flex gap-1.5">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    current === index
                      ? "w-4 bg-orange-500"
                      : "w-1.5 bg-orange-500/20",
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <CarouselNext className="static transition-colors hover:bg-primary hover:text-primary-foreground" />
          </div>

          {/* Mobile Navigation */}
          <div className="py-4 md:hidden">
            <div className="flex items-center justify-center gap-3">
              <CarouselPrevious
                variant="outline"
                className="relative left-0 right-0 h-8 w-8 translate-y-0 rounded-full border-primary/20 hover:bg-primary/10"
              />
              <div className="flex gap-1.5">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      current === index
                        ? "w-4 bg-orange-500"
                        : "w-1.5 bg-orange-500/20",
                    )}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
              <CarouselNext
                variant="outline"
                className="relative left-0 right-0 h-8 w-8 translate-y-0 rounded-full border-primary/20 hover:bg-primary/10"
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
    <div className="grid gap-6 p-4 md:grid-cols-[1fr,2px,1fr] md:gap-12 md:p-6">
      {/* Left side - Image */}
      <div className="relative aspect-square md:aspect-auto">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full rounded-lg object-cover shadow-md"
            width={1000}
            height={1000}
          />
        ) : Icon ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted/50 shadow-sm">
            <Icon className="h-24 w-24 text-primary/40 md:h-32 md:w-32" />
          </div>
        ) : (
          <div className="h-full w-full rounded-lg bg-muted/50 shadow-sm" />
        )}
      </div>

      {/* Center line with year bubble */}
      <div className="relative hidden justify-center md:flex">
        <div className="h-full w-0.5 bg-orange-500/20"></div>
        <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-primary-foreground md:text-sm">
          {year}
        </div>
      </div>

      {/* Mobile year badge */}
      <div className="md:hidden">
        <div className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-primary-foreground md:text-sm">
          {year}
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex flex-col justify-center space-y-3 md:space-y-4">
        <h3 className="line-clamp-2 text-xl font-bold tracking-tight md:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export { HistoryCarousel };
