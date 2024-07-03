'use client'
import Seo from "@/components/Seo";
import CustomLink from "@/components/CustomLink";
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <Seo />

      <main>
        <section className="bg-gray-100">
          <div className="flex flex-col items-center justify-center min-h-screen text-center layout">
            <h1>Upload Course File</h1>
            {/* <p className="mt-2 text-gray-600">
              Built using React Hook Form, Yup, Typescript, and Zustand
            </p> */}
            {/* <p className="mt-2 text-sm font-semibold text-gray-600">
              <Link href="https://github.com/theodorusclarence/rhf-stepform">
                See the repository
              </Link>
            </p> */}

            <Link className="mt-4" href="/form">
              Go to form →
            </Link>

            <footer className="absolute text-gray-500 bottom-2">
              {/* © {new Date().getFullYear()} By{" "}
              <Link href="https://theodorusclarence.com?ref=tsnextstarter">
                Theodorus Clarence
              </Link>{" "}
              &{" "}
              <Link href="https://github.com/rizqitsani">
                Muhammad Rizqi Tsani
              </Link> */}
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
