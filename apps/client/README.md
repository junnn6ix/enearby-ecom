# eNearby

An Ecommerce App

### Project Overview

Tech Stack:

- Next.JS 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn UI
- Prisma ORM
- PostgreSQL (NeonDB)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Pre-requisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
Also, ensure you have [pnpm](https://pnpm.io/) installed globally. You can install it using npm:

```bash
npm install -g pnpm
```

### Installation

1. Clone this repository:

```bash
git clone https://github.com/junnn6ix/enearby.git
cd enearby
```

2. Install the dependencies:

```bash
pnpm install
```

3. Create a new branch for your work:

```bash
git checkout -b your-branch-name
```

4. Happy coding!

Run the development server:

```bash
pnpm dev
```

### DB Setup

```bash
pnpm prisma generate
```

```bash
pnpm prisma db seed
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
