const FEATURES: {
  title: string;
  description: string;
}[] = [
  {
    title: "🎤  Rate Your Favorite Artists",
    description:
      "Express your opinions and give ratings to your favorite music artists.",
  },
  {
    title: "🌐 Connect with Friends",
    description:
      "Create your profile, follow friends, and see what they’re listening to.",
  },
  {
    title: "🔍 Discover New Music",
    description: "Get personalized recommendations based on your tastes.",
  },
  {
    title: "📊 Track Your Impact",
    description: "See how your ratings and shares influence the community.",
  },
];

export function Features() {
  return (
    <section className="w-full py-52">
      <h2 className="w-full text-center text-5xl font-bold">Features</h2>
      <ul className="grid max-w-5xl items-start gap-6 py-12 grid-cols-2 lg:gap-12">
        {FEATURES.map((item) => {
          return (
            <li
              className="flex flex-col items-start gap-4 text-primary p-4"
              key={item.title}
            >
              <h3 className="w-full text-center text-2xl">{item.title}</h3>
              <span className="text-center">{item.description}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
