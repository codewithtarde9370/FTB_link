import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import LinkCard from "../../components/LinkCard/linkcard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";

function Home() {
  const [user, setUser] = useState({});
  const [linkData, setLinkData] = useState({
    title: "",
    target: "",
    slug: "",
  });
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log('Current User:', currentUser);
  
    if (currentUser) {
      setUser(currentUser);
    }
  
    if (!currentUser) {
      console.log('No current user, redirecting to login...');
      window.location.href = "/login";
    }
  }, []);
  


  const shortenUrl = async () => {
    const { title, target, slug } = linkData;

    if (!title || !target || !slug) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`,
        {
          title: title,
          slug: slug,
          target: target,
          user: user?._id
        }
      );

      if (response.data.success) {
        toast.success("Link Shortcut created successfully!");
        setLinkData({
          title: "",
          target: "",
          slug: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("Failed to create link. Please try again.");
    }
    loadLinks();
  };
  const loadLinks = async () => {
    if (!user._id) {
      return;
    }
    toast.loading("Loading Links...");

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/links?userId=${user._id}`
    );

    toast.dismiss();

    console.log(response.data.data);
    setAllLinks(response.data.data);
    toast.success("All the links fetched successfully!!");
  };

  useEffect(() => {
    loadLinks();
  }, [user]);
  return (
    <>
       <Navbar/>
      <h1 className="heading">Hello {user.fullName} 👋</h1>
      <p className="heading">
        Tired of writing long URLs?😥 Create a Shortcut 🤩
      </p>
      <div className="main-container">
        <form className="link-form">
          <input
            type="text"
            placeholder="Title of Website"
            value={linkData.title}
            onChange={(e) =>
              setLinkData({
                ...linkData,
                title: e.target.value,
              })
            }
            className="link-input"
          />
          <input
            type="text"
            placeholder="Target URL"
            value={linkData.target}
            onChange={(e) =>
              setLinkData({
                ...linkData,
                target: e.target.value,
              })
            }
            className="link-input"
          />
          <input
            type="text"
            placeholder="Slug"
            value={linkData.slug}
            onChange={(e) =>
              setLinkData({
                ...linkData,
                slug: e.target.value,
              })
            }
            className="link-input"
          />
          <button type="button" className="link-btn" onClick={shortenUrl}>
            Create ShortUrl
          </button>
        </form>
        

        <div className="render-links">
          <h2 className="sub-heading">My Links</h2>
          {allLinks.length > 0 ? (
            allLinks.map((link) => {
              const { _id, target, title, slug, views, createdAt } = link;
              return (
                <LinkCard
                  key={_id}
                  _id={_id}
                  target={target}
                  title={title}
                  slug={slug}
                  views={views}
                  createdAt={createdAt}
                  loadLinks={loadLinks}
                />
              );
            })
          ) : (
            <p>No links available. Create one to get started!</p>
          )}
        </div>
      </div>
      <Footer/>

      <Toaster />

    </>
  );
}

export default Home;
