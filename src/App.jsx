import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import CreatePosts from "./Pages/Posts/CreatePosts";
import ViewPost from "./Pages/Posts/ViewPost";
import UpdatePost from "./Pages/Posts/UpdatePost";

function App() {
  const { user } = useContext(AppContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />

            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-posts" element={<CreatePosts />} />
            <Route path="/view-post/:id" element={<ViewPost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
