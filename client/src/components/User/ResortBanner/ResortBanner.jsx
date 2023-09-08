

function ResortBanner({place}){
    return(
        <section
        className="z-40 bg-[url(https://res.cloudinary.com/dw7a4xwqo/image/upload/v1692249192/river-219972_1920_kroeps.jpg)] bg-cover bg-center bg-no-repeat"
      >
        <div
          className=" inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
        ></div>
      
        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-48 lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl mt-10 font-extrabold sm:text-5xl">
      
              <strong className="block font-extrabold text-white">
                {place}
              </strong>
            </h1>
      
          
      
           
          </div>
        </div>
      </section>
    )
}
export default ResortBanner
