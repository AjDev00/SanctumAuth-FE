import { useEffect, useState } from "react";
import loadingImg from "../assets/loading.svg";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    const res = await fetch("/api/posts");

    const data = await res.json();
    setPosts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center text-2xl mt-4 font-serif font-bold">
        Latest Posts
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={loadingImg} alt="" className="w-20 animate-spin py-8" />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap px-12 py-8 gap-4">
          {posts && posts.length > 0
            ? posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-slate-200 p-4 w-96 rounded md flex flex-col gap-3 shadow-sm"
                >
                  <div>{post.title}</div>
                  <div className="font-bold">{post.body}</div>
                  <div className="flex flex-row justify-between font-light">
                    {/* <div>{new Date(post.created_at).toLocaleTimeString()}</div> */}
                    <div className="text-[14px]">{post.author}</div>
                    <Link
                      to={`/view-post/${post.id}`}
                      className="text-[14px] italic"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            : "There are no posts"}
        </div>
      )}
    </div>
  );
}
