import { ScrollUp } from "@/components/core";
import MoviesList from "@/components/home/MovieList";
import PublicLayout from "@/layouts/public";

const Home = () => {
  return (
    <PublicLayout>
      <section className="min-h-[80vh] bg-black">
        <MoviesList />
        <ScrollUp />
      </section>
    </PublicLayout>
  );
};

export default Home;
