JobPilot
A job portal frontend for employers post jobs, manage listings, track applications. Built as a college/portfolio project using React + TypeScript.

What it does
Employers can sign up, fill out their company profile, and start posting jobs. There's a dashboard where you can see all your listings, edit them, or remove them. Everything runs in the browser — no backend, no database, just localStorage.

Pages
/login and /signup — basic auth with form validation
/account-setup — company info form you fill out after signing up
/dashboard — overview page with sidebar navigation
/dashboard/post-job — big form to create a job listing
/dashboard/my-jobs — table of all your posted jobs
/dashboard/jobs/:id — view a single job
/dashboard/jobs/:id/edit — edit an existing job
The root / just redirects to login.

How it works
When you sign up, your info gets saved to sessionStorage temporarily, then after you complete the account setup it all goes into localStorage under jobpilot_users. Login checks credentials against that same localStorage array. Yeah, passwords are in plain text — it's a demo, not production.

Jobs are managed through a React Context (JobsContext.tsx). There are 4 sample jobs hardcoded in there so the dashboard isn't empty when you first open it. But heads up — job data lives in React state only, so it resets if you refresh the page. User accounts stick around though since those are in localStorage.

The social login buttons (Google, Facebook) don't actually do anything — they just skip you to the dashboard.

Stack
React 18, TypeScript, Vite
Tailwind CSS + shadcn/ui for the UI components
React Router v6 for routing
No backend whatsoever
Project layout
src/
pages/ — all the page components (Login, SignUp, Dashboard, PostJob, etc.)
components/ — AuthLayout, DashboardLayout, JobPilotLogo, and all the shadcn stuff in ui/
context/ — JobsContext for managing job state
data/ — mockJobs (seed data)
assets/ — SVGs (logo, auth background image, upload icon)
hooks/ — use-mobile, use-toast
The auth pages use a split-screen layout — form on the left, illustration on the right (hidden on mobile). Dashboard pages have a collapsible sidebar with nav links.

Running it
npm install
npm run dev
That's it. Opens on localhost.

Known issues / shortcuts taken
No real auth — anyone can type in any email and it'll "work" if they signed up before
Passwords stored as plain text in localStorage (obviously don't do this in a real app)
Job data doesn't persist across refreshes
Logo upload on the account setup page is just a visual placeholder, you can't actually upload anything
Social login is fake
No search, no filtering, no candidate-side views — this is employer-only
What I'd add next
Hook it up to a real backend (Supabase or similar) for proper auth and data persistence
Add candidate-facing pages (browse jobs, apply, etc.)
File upload for company logos and resumes
Search and filter on the jobs list
Email notifications
