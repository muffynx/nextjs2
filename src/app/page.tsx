import Image from "next/image";

export default function Home() {
  return (
    <div className="container ">
      <div className="max-w-5xl mx-auto">
        <h1 className="mt-10 mb-2 text-3xl font-bold text-center">
          Welcome To My First Next.js!
        </h1>
      
        <div className="px-6 py-2  rounded-lg ">
          <div className="p-6 bg-gray-100 rounded-lg  text-center ">
            <h2 className="text-2xl font-semibold mb-2 text-black ">About Next.js</h2>
            <p className="text-gray-700 text-center ">
              Next.js is a powerful React framework that enables you to build fast, SEO-friendly web applications with ease. It provides features like server-side rendering, static site generation, and dynamic routing out of the box.
            </p>
          </div>
  
        </div>
        <div className="mt-10 text-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
