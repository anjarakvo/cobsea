import React from "react";
import Navbar from "components/Navigation Bar/Navbar";
import Footer from 'components/Layout/Footer';
import useWindowDimensions from "../utils/useWindowDimensions";

export default function Layout({ children }) {
  let height = useWindowDimensions()[1]
  return (
    <>
      <Navbar />
      <div>
        <div style={{ minHeight: height - 230 }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}