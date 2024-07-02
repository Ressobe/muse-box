import { UserRound } from "lucide-react";

export default function AboutPage() {
  const team = [{ name: "Bartosz Sobina", role: "Fullstack Developer" }];

  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Meet the Team
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            The talented individuals behind our innovative solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((item) => {
            return (
              <div
                key={item.name}
                className="bg-secondary rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex items-center p-4 space-x-4">
                  <UserRound className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
