import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { QUERIES } from "~/server/db/queries";
import Container from "~/components/global/Container";
import { format } from "date-fns";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";

export default async function BusTimetablePage() {
  const busStops = await QUERIES.getBusStops();

  return (
    <>
      <Navbar transparent={false} />
      <Container className="py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Bus Timetable</h1>
            <p className="mt-2 text-lg text-gray-600">
              Morning Pick-up Service
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-white shadow-md">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-sm font-semibold uppercase text-gray-500">
                Pick-up Schedule
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-16 py-4 text-gray-600">
                      Stop #
                    </TableHead>
                    <TableHead className="py-4 text-gray-600">
                      Location
                    </TableHead>
                    <TableHead className="py-4 text-gray-600">
                      Description
                    </TableHead>
                    <TableHead className="w-24 py-4 text-right text-gray-600">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {busStops.map((stop, index) => (
                    <TableRow
                      key={stop.id}
                      className={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${stop.name === "Magna" ? "bg-orange-50 font-medium" : ""} transition-colors hover:bg-gray-100`}
                    >
                      <TableCell className="py-4 text-gray-900">
                        {stop.pickupNumber}
                      </TableCell>
                      <TableCell className="py-4 font-medium text-gray-900">
                        {stop.name}
                      </TableCell>
                      <TableCell className="py-4 text-gray-600">
                        {stop.description}
                      </TableCell>
                      <TableCell className="py-4 text-right font-medium text-gray-900">
                        {format(new Date(`1970-01-01T${stop.time}`), "HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-blue-50 p-4 text-blue-800">
            <div className="flex items-center">
              <svg
                className="mr-3 h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium">
                Return journey departs from Magna at 7:45
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
