import NextDocument, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
