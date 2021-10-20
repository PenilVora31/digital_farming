import { Link } from "react-router-dom";
import { cards, steps } from "../data";
export default function Home() {
  return (
    <div className="relative bg-white-base container  w-full md:max-w-144 max-w-2xl md:pl-6 pl-0  mx-auto my-0 overflow-x-hidden">
      <section className="h-screen m-auto md:max-w-120 max-w-xl">
        <div className="flex">
          <div className="mt-40 md:max-w-50 max-w-xl w-full z-10">
            <h1 className="md:h1 md:w-4/5 mb-8 w-1/2 h3 md:pl-0 pl-4">
              A Simple Way to scheduling Agriculture's tasks
            </h1>
            <p className="text-2xl md:block mx-14 my-2 hidden">
              Digital Farming provides all information about crops , crop types
              , diffrent fertilizers for crops and diseases as well as estimatye
              for a particular crop to the farmers.
            </p>
            <Link to="/signup">
              <button
                type="button"
                className="px-5 py-3 rounded border bg-green-base border-green-base text-white-base text-2xl shadow-greenBase inline-block transition-all duration-300 relative overflow-hidden z-10 cursor-pointer transform scale-100 hover:scale-105 mx-14 mt-8"
              >
                Sign Up
              </button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 z-0 md:w-full w-1/2  h-full flex justify-end">
            <img src="/images/hero.png" alt="hero" className="max-h-screen" />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute md:-left-6 -top-64 -left-16">
          <img
            src="/images/leaf.png"
            alt="leaf"
            className="max-h-55 md:max-w-16"
          />
        </div>
        <div className="m-auto flex flex-col pb-20 mb-16 border-b-2 border-white-light max-w-105">
          <div className="text-center mt-0 mb-40 mx-auto md:max-w-6xl max-w-lg">
            <h2 className="md:text-5xl text-3xl">New Opportunities</h2>
            <p className="md:text-3xl text-xl md:w-full  mt-10 font-normal">
              We are the first and the only crowdfunding platform enabling you
              to help finance our farmers.
            </p>
          </div>
          <div className="flex md:flex-row flex-col md:items-start items-center flex-wrap gap-4 justify-center z-10 self-auto md:max-w-105 max-w-xl md:mx-0 mx-4">
            {cards.map((item, index) => {
              return (
                <div
                  key={index}
                  className="md:w-1/4  w-full bg-green-base rounded-lg md:pt-20 pt-10 pb-10 md:px-10 px-4 transition-all duration-300 ease-out"
                >
                  <img src={item.imgSrc} alt="Icon" className="max-h-20" />
                  <h4 className="md:text-3xl text-2xl md:my-10 my-5">
                    {item.h1}
                  </h4>
                  <p className="md:text-3xl text-xl font-normal">{item.p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="m-auto rounded-lg bg-green-base md:max-w-120 max-w-xl md:mr-6 md:mx-0 mx-4">
        <div className="md:max-w-6xl max-w-xl m-auto text-white-base py-6">
          <div className="overflow-hidden flex flex-wrap gap-4 md:mt-16 mt-2">
            <div className="text-center">
              <h2 className="md:text-6xl text-4xl">How it works</h2>
              <p className="md:mt-10 mt-4 md:text-3xl text-xl font-normal mb-4">
                here show the process of this website working in a step by step
                manner.
              </p>
            </div>
            {steps.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-gray-base border rounded w-64 h-64 p-4 md:ml-0 md:mb-0 mb-2 mx-auto  relative flex  items-center justify-center"
                >
                  <h1 className="absolute top-0 left-0 border-b border-r border-white-base rounded-br-lg p py-1 px-3">
                    {item.h1}
                  </h1>
                  <h3 className="md:h2 md:my-10 h3 my-5">{item.p}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="relative overflow-x-hidden">
        <div className="my-16 md:mx-auto  flex items-center md:justify-evenly justify-between md:max-w-105 max-w-xl mx-2">
          <img
            src="/images/logos/Logo_5.png"
            alt="logo"
            className="w-16 h-16 mt-2 border-b border-gray-300"
          />
          <p className="text-gray-400 text-lg text-center">
            © Copyright 2021. Digital Farming
          </p>
        </div>
        <img
          src="/images/mountain.png"
          alt="Mountain"
          className="absolute bottom-0 -right-6 md:max-w-50 max-w-lg"
        />
      </div>
    </div>
  );
}
