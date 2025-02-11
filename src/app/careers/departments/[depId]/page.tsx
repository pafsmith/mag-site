import Image from "next/image";
import Link from "next/link";
import { QUERIES } from "~/server/db/queries";

import Footer from "~/components/global/Footer";
import Navbar from "~/components/global/Navbar";
import { motion } from "framer-motion";
import DepartmentShowcase from "../DepartmentShowcase";

export default async function Page({
  params,
}: {
  params: Promise<{ depId: string }>;
}) {
  const { depId } = await params;

  // Await the asynchronous data fetching
  const department = await QUERIES.getDepartmentById(Number(depId));
  const jobs = await QUERIES.getActiveJobByDepartment(Number(depId));

  // Ensure department[0] exists
  if (!department[0]) {
    return (
      <>
        <Navbar transparent={false} />
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Department Not Found</h1>
          <p className="mt-4">
            The department you are looking for does not exist.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar transparent={false} />
      <DepartmentShowcase department={department[0]} jobs={jobs} />

      <Footer />
    </>
  );
}
