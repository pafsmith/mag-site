"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

// Define the type based on the database query
type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  updatedAt: Date;
  isSeasonal: boolean;
};

interface JobListingsPageProps {
  openJobs: Job[];
}

export default function JobListingsPage({ openJobs }: JobListingsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Get unique departments from the jobs for the department filter
  const departments = Array.from(
    new Set(openJobs.map((job) => job.department)),
  ).sort();

  const filteredJobs = openJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "all" || job.department === selectedDepartment),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="container mx-auto flex-grow px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Join Our Team</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Discover exciting opportunities and be part of something great.
            We&apos;re always looking for talented individuals to join our
            growing team.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {job.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit bg-orange-100">
                    {job.department}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                      {job.location}
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <Briefcase className="mr-2 h-4 w-4 text-orange-500" />
                      {job.isSeasonal ? "Seasonal" : "Permanent"}
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {(() => {
                      const days = Math.floor(
                        (Date.now() - new Date(job.updatedAt).getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      if (days === 0) return "Updated today";
                      if (days === 1) return "Updated yesterday";
                      return `Updated ${days} days ago`;
                    })()}
                  </span>
                  <Link href={`/careers/jobs/${job.id}`}>
                    <Button
                      variant="outline"
                      className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                    >
                      View Job
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
