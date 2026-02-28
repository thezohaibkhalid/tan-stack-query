import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FetchRQ = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setIsLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((post: any) => (
            <div
              onClick={() => navigate(`/fetch-old/${post.id}`)}
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