import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const FetchRQ = () => {
  const navigate = useNavigate()
  const queryFun = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],//usestate (query key)
    queryFn: queryFun,//useeffect

    gcTime: 10000,//10 seconds
    refetchInterval: 10000,//1 second
  });
  //did the follwoging things
  //1. fetched the data
  //2. garbage cache Time
  //3. Stale time (rotten time)
  //4. Polling refetch  Interval(refetch interval in background even when component is not mounted)
  //5. if the data is cached, it will use the cached data
  //6. if the data is stale, it will refetch the data
  //7. if the data is not stale, it will use the cached data
  //8. if the data is not stale, it will use the cached data
  //9. if the data is not stale, it will use the cached data

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-2xl font-semibold animate-pulse text-indigo-600">
          Loading posts...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Posts
        </h1>

        <div  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((post: any) => (
            <div
              onClick={() => navigate(`/fetch-rq/${post.id}`)}
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 capitalize mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {post.body}
              </p>

              <div className="mt-4 text-xs text-indigo-500 font-medium">
                Post ID: {post.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FetchRQ;