import Footer from "~/components/global/Footer";

import Navbar from "~/components/global/Navbar";
import { HistoryCarousel } from "~/components/HistoryCarousel";
import Image from "next/image";
import React from "react";
const values = [
  {
    name: "Crafting Sweet Success",
    description:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
  },
  {
    name: "Innovation with Every Bite",
    description:
      "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
  },
  {
    name: "Sustainability in Every Wrapper",
    description:
      "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
  },
  {
    name: "Partners in Chocolate, Partners in Growth",
    description:
      "Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.",
  },
];

export default function page() {
  return (
    <>
      <Navbar transparent={false} />
      <main className="isolate">
        <div className="relative isolate -z-10">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>

          <div className="overflow-hidden">
            <div className="sm:pt-34 mx-auto max-w-7xl px-6 pb-12 pt-24 lg:px-8 lg:pt-12">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                    We’re Redefining Chocolate Creation
                  </h1>
                  <p className="sm:text-xl/ mt-16 text-pretty text-lg font-normal text-gray-500 sm:max-w-md lg:max-w-none">
                    At Magna, we believe every bite of chocolate should tell a
                    story of passion, quality, and innovation. As a trusted
                    co-manufacturer in the confectionery world, we partner with
                    visionary brands to craft irresistible chocolate creations
                    that delight customers around the globe. From sourcing the
                    finest ingredients to perfecting every detail, we transform
                    ideas into unforgettable products—whether it’s a timeless
                    classic or bold, new flavors. Let’s make something
                    extraordinary together.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <Image
                        alt=""
                        src="/eggconveyor43.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        alt=""
                        src="/eggs54.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        alt=""
                        src="/eggs219.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        alt=""
                        src="/eggspoon11.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        alt=""
                        src="/avg169.png"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HistoryCarousel orientation="vertical" />

        <div className="bg-white">
          <section aria-labelledby="features-heading" className="relative">
            <Image
              alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
              src="/meeting.jpg"
              className="aspect-[3/2] w-full object-cover sm:aspect-[5/2] lg:absolute lg:aspect-auto lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16"
              width={1000}
              height={1000}
            />
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
              <div className="lg:col-start-2">
                <h2
                  id="features-heading"
                  className="font-medium text-gray-500"
                ></h2>
                <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                  Driven by Values, Powered by Purpose
                </p>
                <p className="mt-4 text-gray-500">
                  We live our values every day, creating impact through
                  integrity, innovation, and purpose.
                </p>

                <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-sm sm:grid-cols-2">
                  {values.map((value) => (
                    <div key={value.name}>
                      <dt className="font-medium text-gray-900">
                        {value.name}
                      </dt>
                      <dd className="mt-2 text-gray-500">
                        {value.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
