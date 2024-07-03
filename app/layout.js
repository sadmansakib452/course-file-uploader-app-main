
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          reverseOrder={false}
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

// import { Toaster } from "react-hot-toast";
// import "./globals.css";
// import { Inter } from "next/font/google";
// import Head from "next/head";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function Layout({ children }) {
//   return (
//     <>
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </Head>
//       <Toaster
//         reverseOrder={false}
//         position="top-center"
//         toastOptions={{
//           style: {
//             borderRadius: "8px",
//             background: "#333",
//             color: "#fff"
//           }
//         }}
//       />
//       <div className={inter.className}>{children}</div>
//     </>
//   );
// }

