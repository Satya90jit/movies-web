import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  navClass?: string | undefined;
  insideNavClass?: string | undefined;
  innerBarClass?: string | undefined;
  ogImage?: string;
};

const PublicLayout = ({
  children = <></>,
  title = "",
  description,
  ogImage = "./no-image.jpg",
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content="https://movie-browse-web.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content={
            description
              ? description
              : "Discover and explore a wide variety of movies. Stay updated with the latest releases, top-rated films, and trending favorites."
          }
        />
        <meta
          property="og:image"
          content={ogImage ? ogImage : "./no-image.jpg"}
        />
      </Head>

      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default PublicLayout;
