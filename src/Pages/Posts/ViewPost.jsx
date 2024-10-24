import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewPost() {
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);

    const data = await res.json();
    setPost(data.data);
    console.log(data);
  }

  useEffect(() => {
    getPost();
  }, []);

  async function handleDelete(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.json();
    navigate("/");
    toast("Deleted!");
  }

  return (
    <div className="px-12 mt-4">
      <div
        onClick={() => navigate("/")}
        className="mb-5 text-[13px] font-semibold cursor-pointer"
      >
        Go Back
      </div>
      {post && (
        <div className="border border-slate-200 p-4 w-full rounded md flex flex-col gap-3 shadow-sm">
          <div>{post.title}</div>
          <div className="font-bold">{post.body}</div>
          <div className="flex flex-row justify-between font-light text-[14px]">
            <div>{new Date(post.created_at).toLocaleTimeString()}</div>
            <div className="">{post.author}</div>
          </div>
          <div className="flex flex-row justify-between items-center font-light text-[14px] mt-4">
            <div className="font-bold">Created by {post.user.name}</div>
            {user && user.id === post.user_id && (
              <div className="flex flex-row gap-6">
                <Link
                  to={`/update-post/${post.id}`}
                  className="border border-transparent bg-green-500 p-2 rounded-md text-white px-4 font-bold cursor-pointer hover:opacity-70 duration-300"
                >
                  Update
                </Link>
                <div
                  onClick={handleDelete}
                  className="border border-transparent bg-red-500 p-2 rounded-md text-white px-4 font-bold cursor-pointer hover:opacity-70 duration-300"
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
