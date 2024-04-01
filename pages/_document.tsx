import Document, { Head, Html, Main, NextScript } from "next/document";
import siteData from "../data/siteData";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={siteData.description} />
          <meta property="og:site_name" content="darian.photos" />
          <meta
            property="og:description"
            content="Photos from Darian's recent adventures."
          />
          <meta property="og:title" content="Darian's Photos" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Darian's Photos" />
          <meta
            name="twitter:description"
            content="Photos from Darian's recent adventures."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
