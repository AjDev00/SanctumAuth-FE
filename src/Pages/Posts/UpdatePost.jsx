import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();
  const { token, user } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
  });

  async function getPostContent() {
    const res = await fetch(`/api/posts/${id}`);

    const data = await res.json();
    if (res.ok) {
      if (data.data.user_id !== user.id) {
        navigate("/");
      }

      setFormData({
        title: data.data.title,
        author: data.data.author,
        body: data.data.body,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getPostContent();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center py-4"
      >
        <div>
          <input
            className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
            type="text"
            value={formData.title}
            placeholder="Enter title here"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors && errors.title && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <input
            className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
            type="text"
            value={formData.author}
            placeholder="Name of author"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          {errors && errors.author && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.author[0]}
            </p>
          )}
        </div>

        <div>
          <textarea
            className="border border-slate-300 p-1.5 rounded-md w-96 focus:outline-blue-950"
            cols="16"
            rows="6"
            value={formData.body}
            placeholder="Write your post here"
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors && errors.body && (
            <p className="text-red-500 text-[14px] font-bold">
              {errors.body[0]}
            </p>
          )}
        </div>

        <button className="border border-blue-950 text-white bg-blue-950 rounded-md p-1.5 w-96 hover:opacity-75 duration-300">
          Update
        </button>
      </form>
    </div>
  );
}
