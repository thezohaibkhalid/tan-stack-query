import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FetchRQ = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const queryFun = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${pageNumber}`
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: queryFun,
    gcTime: 10000,
    placeholderData:keepPreviousData,
  });

    //did the follwoging things
  //1. fetched the data
  //2. garbage cache Time
  //3. Stale time (rotten time)
  //4. Polling refetch  Interval(refetch interval in background even when component is not mounted)
  //5. Pagination (keepPreviousData) with tan stack query
  //6. Use Mutation hook in tan stack query (used for adding, updating, deleting data)
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
        <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">Posts</h1>
          {isFetching && (
            <span className="text-sm text-indigo-500 animate-pulse">
              Updating...
            </span>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((post: any) => (
            <div
              key={post.id}
              onClick={() => navigate(`/fetch-rq/${post.id}`)}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
            >
              <h2 className="text-lg font-semibold text-gray-800 capitalize mb-3 group-hover:text-indigo-600 transition">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {post.body}
              </p>

              <div className="mt-4 text-xs text-indigo-500 font-medium">
                Post ID: {post.id}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="px-5 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          <div className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md">
            Page {pageNumber}
          </div>

          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            className="px-5 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchRQ;