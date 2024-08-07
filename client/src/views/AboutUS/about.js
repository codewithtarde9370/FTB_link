import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";
import "./about.css";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="aboutus-container">
        <h1 className="aboutus-heading">About Us</h1>
        <p className="aboutus-paragraph">
          Welcome to our URL shortening service! We are passionate about helping you manage and share your links in a simple and efficient way. Our platform allows you to shorten long URLs, track their performance, and customize them to suit your needs.
        </p>
        <p className="aboutus-paragraph">
          Our mission is to provide a reliable and easy-to-use service that helps you declutter your digital life. Whether you're a business looking to brand your links or an individual who wants to keep things organized, we're here to help.
        </p>
        <p className="aboutus-paragraph">
          Thank you for choosing us. We're committed to delivering the best possible experience and look forward to serving you!
        </p>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
