"use client";
import { links } from "~/utils/links";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

export default function Navbar({ transparent }: { transparent: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`z-50 w-full py-10 ${
        transparent && !mobileMenuOpen ? "absolute bg-transparent" : "bg-white"
      } ${transparent && mobileMenuOpen ? "block" : ""}`}
    >
      <nav aria-label="Global" className="">
        <Container className="flex items-center justify-between p-3">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Magna</span>
            <Image
              alt=""
              src="/logo.svg"
              className="h-10 w-auto"
              width={1000}
              height={1000}
            />
          </a>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div
            className={`hidden lg:flex lg:gap-x-12 ${
              transparent ? "text-white" : "text-slate-700"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-2 py-1 capitalize hover:bg-orange-600 hover:text-slate-900 ${
                  transparent ? "hover:text-white" : ""
                }`}
              >
                <p className="">{link.label}</p>
              </Link>
            ))}
          </div>
          <div
            className={`hidden lg:flex lg:gap-x-12 ${
              transparent ? "text-white" : ""
            }`}
          >
            <Link
              href="/contact"
              className={`group inline-flex items-center justify-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold hover:bg-orange-500 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:bg-orange-800 active:text-orange-100 ${
                transparent ? "text-white" : "text-white"
              }`}
            >
              Contact
            </Link>
          </div>
        </Container>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-100 px-3 py-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <Container>
            <div className="flex items-center justify-between p-3">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Magna</span>
                <Image
                  alt=""
                  src="/logo.svg"
                  className="h-10 w-auto"
                  width={1000}
                  height={1000}
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 px-3 py-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold capitalize text-gray-900 hover:bg-orange-500"
                    >
                      <p className="">{link.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
