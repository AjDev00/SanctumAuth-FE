import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Profile() {
  const { user } = useContext(AppContext);
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-4">
      <div className="mb-2 font-serif font-bold">Profile</div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="font-bold text-[14px]">Name:</div>
        <input
          type="text"
          value={user && user.name}
          className="border border-slate-300 p-1.5 rounded-md w-64"
          disabled
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="font-bold text-[14px]">Email:</div>
        <input
          type="text"
          value={user && user.email}
          className="border border-slate-300 p-1.5 rounded-md w-64"
          disabled
        />
      </div>
    </div>
  );
}
