import Image from "next/image";

export function TechStack() {
  return (
    <section className="w-full">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500">
              Our Tech Stack
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We use a wide range of technologies to build our products.
              Here&#39;s a glimpse of our tech stack.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 mt-12">
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              viewBox="0 0 128 128"
              width={100}
              height={100}
              className="fill-current"
            >
              <path d="M64 0A64 64 0 0 0 0 64a64 64 0 0 0 64 64 64 64 0 0 0 35.508-10.838L47.014 49.34v40.238H38.4V38.4h10.768l57.125 73.584A64 64 0 0 0 128 64 64 64 0 0 0 64 0Zm17.777 38.4h8.534v48.776L81.777 75.97Zm24.18 73.92-.111.096a64 64 0 0 0 .111-.096z"></path>
            </svg>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Next.js
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              viewBox="0 0 128 128"
              width={100}
              height={100}
              className="fill-current"
            >
              <path
                d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
                fill="#38bdf8"
              ></path>
            </svg>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tailwind
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              viewBox="0 0 128 128"
              width={100}
              height={100}
              className="fill-current"
            >
              <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"></path>
              <path
                data-name="original"
                fill="#007acc"
                d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
              ></path>
            </svg>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              TypeScript
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              width={100}
              height={100}
              src="/shadcn-logo.png"
              alt="shadcn"
            />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Shadcn UI
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              viewBox="0 0 128 128"
              width={100}
              height={100}
              className="fill-current"
            >
              <path
                fill="#2d3748"
                d="M66.457.014a6.308 6.308 0 0 0-5.812 3.028l-47.87 78.072a6.379 6.379 0 0 0 .048 6.748l23.568 37.186a6.387 6.387 0 0 0 7.22 2.683l68.012-20.407a6.37 6.37 0 0 0 3.96-8.765l-43.72-94.85A6.298 6.298 0 0 0 66.46.014Zm1.795 23.95a2.348 2.348 0 0 1 2.448 1.433l30.16 69.784a2.39 2.39 0 0 1-1.512 3.241l-46.996 14.024a2.39 2.39 0 0 1-3.024-2.76l16.83-83.812a2.353 2.353 0 0 1 2.099-1.91z"
              ></path>
            </svg>

            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Prisma
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image width={100} height={100} src="/auth-js.png" alt="auth-js" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Auth.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
