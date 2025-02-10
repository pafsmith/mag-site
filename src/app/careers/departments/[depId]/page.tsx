import Image from "next/image";
import Link from "next/link";

// This would typically come from a database or API
const departmentData = {
  id: "1",
  name: "Engineering",
  description:
    "Our engineering department is at the forefront of innovation, developing cutting-edge solutions to complex problems. We are a diverse team of passionate individuals committed to pushing the boundaries of technology.",
  featuredImage: "/placeholder.svg?height=400&width=1200",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  openPositions: [
    { id: 1, title: "Senior Software Engineer", location: "Remote" },
    { id: 2, title: "DevOps Specialist", location: "New York, NY" },
    { id: 3, title: "UX Designer", location: "San Francisco, CA" },
  ],
};
import Footer from "~/components/global/Footer";
import Navbar from "~/components/global/Navbar";

export default async function Page({
  params,
}: {
  params: Promise<{ depId: string }>;
}) {
  const { depId } = await params;

  return (
    <>
      <Navbar transparent={false} />
      <main>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">
              {departmentData.name} Department
            </h1>
            <div className="relative h-64 md:h-96">
              <Image
                src={departmentData.featuredImage ?? "/placeholder.svg"}
                alt={`${departmentData.name} Department`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </header>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">
              About Our Department
            </h2>
            <p className="text-lg text-gray-700">
              {departmentData.description}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Department Gallery</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {departmentData.gallery.map((image, index) => (
                <div key={index} className="relative h-48 md:h-64">
                  <Image
                    src={image ?? "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Open Positions</h2>
            <div className="grid gap-4">
              {departmentData.openPositions.map((position) => (
                <div
                  key={position.id}
                  className="rounded-lg bg-white p-4 shadow-md"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    {position.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{position.location}</p>
                  <Link
                    href={`/careers/${position.id}`}
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
