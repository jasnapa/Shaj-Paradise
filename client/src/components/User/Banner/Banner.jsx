import React from "react";
import SearchBar from "../SearchBar/SearchBar";

function Banner() {
  return (
    <>
      <section className=" h-screen bg-[url(https://res.cloudinary.com/dw7a4xwqo/image/upload/v1690270124/Shaj%20Paradise/Untitled_1_anppea.png)] bg-cover bg-center bg-no-repeat">
        <div className=" inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l">
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl mb-8 text-white font-extrabold sm:text-5xl">
                Let us find your
                <strong className="block font-extrabold text-green-600">
                  Forever Home.
                </strong>
              </h1>
                <SearchBar />
              <div className="mt-28 flex flex-wrap gap-4 text-center"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
