# Magna Site

### Tech Stack

- Next.js
- Tailwind
- TypeScript
- Drizzle ORM
- Shadcn Components
- React Hook Form for form handling
- Zod for form validation on client and server

### Requirements

- Node.js
- PostgreSQL (or any other database)

### Installation

1. Clone the repository
2. Install dependencies using `npm install` or `pnpm install`
3. Create a `.env` file in the root directory and add the variables from .env.template
4. Create a database and configure the connection string in the .env file
5. Run database setup script using `npm run db:push` or `pnpm run db:push`
6. Start the development server using `npm run dev` or `pnpm run dev`

### Features

- Authentication with BetterAuth
- Database management with Drizzle ORM
- Create, update and delete Job Posts
- Apply for jobs
- View job posts
- View job applications

### Todo

- [ ] Finalize the contents of job application form
- [ ] Add ability for admins to create interview slots
- [ ] Add ability for admins to cancel interview slots
- [ ] When interview is booked, generate a google calendar event
- [ ] When interview is booked, send an email to the candidate
- [ ] Add ability for candidates to view interview slots
- [x] Create contact form for candidates
- [ ] Create functionality for contact form
- [ ] Add a restriction for re-applying for the same job within a certain timeframe
- [x] Add admin route validation using middleware
