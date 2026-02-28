import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, Link } from "react-router-dom";

const FetchRQById = () => {
  const { id } = useParams();

  const queryFun = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: queryFun,
    enabled: !!id, 
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-2xl font-semibold animate-pulse text-indigo-600">
          Loading post...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {(error as Error).message}
          </p>
          <Link
            to="/rq"
            className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-6">
            <span className="text-sm text-indigo-500 font-medium">
              Post ID: {data.id}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
            {data.title}
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg">
            {data.body}
          </p>

          <div className="mt-8">
            <Link
              to="/fetch-rq"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
            >
              ← Back to Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchRQById;