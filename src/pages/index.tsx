import MoviesList from "@/components/home/MovieList";
import PublicLayout from "@/layouts/public";

const Home = () => {
  return (
    <PublicLayout>
      <section className="min-h-[70vh]">
        <MoviesList />
      </section>
    </PublicLayout>
  );
};

export default Home;
