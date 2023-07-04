# Project Catalog of Cars

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Technologies

NextJs, Prisma, PostgreSQL, Vercel, Tailwindcss

## Getting Started

### Create a local .env based on our repo's example:
cp .example.env .env

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Description of the project

 To implement this the project was used [https://myfakeapi.com/api/cars/](https://myfakeapi.com/api/cars/) as initial data.

A small backend was created using Prisma and deployed to Vercel.

The project was made according to the technical specifications:

1. The task is to develop the page that will contain table with cars list. Table should contain listed columns. Table should use pagination locally. Search on top of the table should work accross all entries, not only listed page.
  - Company
  - Model
  - VIN
  - Color
  - Year
  - Price
  - Availability
  - Actions columns

2. Actions column should contain dropdown with listed actions. Each option should open respected modal window.
  - Edit
  - Delete

3. Edit modal should contain all data for selected car, but only some fields should be editable
  - Disabled:
    - Company
    - Model
    - VIN
    - Year
  - Enabled:
    - Color
    - Price
    - Availability

4. Delete modal should contain question is user sure he wants to perform this action.

5. Page should contain "Add car" button that opens add modal. Add modal should be similar to Edit modal, but all fields enabled and empty by default

6. All user actions should affect the table. Data should be saved between page reloads
