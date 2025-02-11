"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

function DepartmentShowcase({
  department,
  jobs,
}: {
  department: {
    id: number;
    description: string | null;
    featuredImage: string | null;
    gallery: string[];
    name: string;
  };
  jobs: {
    id: number;
    title: string;
    location: string;
  }[];
}) {
  console.log(department);
  return (
    <div className="min-h-screen">
      <div className="relative mb-8 h-[40vh]">
        <Image
          src={department.featuredImage ?? "/placeholder.svg"}
          alt={`${department.name} Department`}
          fill
          className="object-cover"
        />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-orange-500 md:text-5xl">
            {department.name} Department
          </h1>
          <p className="mb-12 text-xl text-gray-700">
            {department.description ?? "No description available."}
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-3xl font-semibold text-orange-500">
            Department Gallery
          </h2>
          <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {department.gallery.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-6 text-3xl font-semibold text-orange-500">
            Open Positions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((position) => (
              <motion.div
                key={position.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-orange-600">
                    {position.title}
                  </h3>
                  <p className="mb-4 flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {position.location}
                  </p>
                  <Link
                    href={`/careers/jobs/${position.id}`}
                    className="inline-block rounded-full bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default DepartmentShowcase;
