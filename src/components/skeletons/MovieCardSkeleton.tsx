import { Skeleton } from "@mui/material";

const MovieCardSkeleton = () => {
  return (
    <section className="relative h-[23rem] border border-gray-800 shadow-md shadow-slate-900 rounded-lg overflow-hidden flex animate-pulse-skeleton">
      <div className="relative w-full">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          className="bg-opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            className="absolute bottom-5 right-5 bg-opacity-10 bg-gray-100"
          />
          <div className="mt-auto">
            <Skeleton
              width="80%"
              height={30}
              className="mb-2 bg-opacity-10 bg-gray-100"
            />
            <div className="space-y-1">
              <Skeleton width="30%" className="bg-opacity-10 bg-gray-300" />
              <Skeleton width="50%" className="bg-opacity-10 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MovieCardSkeleton;
