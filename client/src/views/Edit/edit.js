import axios from "axios";
import "./edit.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";

function Edit() {
  const { id } = useParams();
  const [linkData, setLinkData] = useState({
    title: "",
    target: "",
    slug: "",
  });

  const updateDetails = async () => {
    const { title, target, slug } = linkData;

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/updatelink/${id}`,
      {
        title: title,
        slug: slug,
        target: target,
      }
    );
    toast.success(response.data.message);
    setLinkData({
      title: "",
      target: "",
      slug: "",
    });
   
  };

  const loadLinks = async (id) => {
    console.log(id);
    if (!id) {
      return;
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/linksById/${id}`);
    const { title, target, slug } = response.data.data;
    console.log(response.data.data)
    setLinkData({
      title,
      slug,
      target,
    });
  };

  useEffect(() => {
    console.log(id);
    loadLinks(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <h1>Update : {id}</h1>
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
          <button type="button" onClick={updateDetails} className="link-btn">
            update Details
          </button>
        </form>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default Edit;
