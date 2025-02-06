export type NewJob = {
  title: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  location: string;
  isActive: boolean;
  seasonal: boolean;
  department?: number;
};
