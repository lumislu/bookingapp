import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Feature from "../components/Feature";
import Footer from "../components/Footer"
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <Announcement />
      <Feature />
      <Footer />
    </div>
  );
};

export default Home;
