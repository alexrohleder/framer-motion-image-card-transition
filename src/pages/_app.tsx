import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative max-w-[500px] h-screen m-auto">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
