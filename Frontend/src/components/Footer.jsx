function Footer() {
  return (
    <div className=" p-4 hd-20 md:h-14  border-t-[1px] mt-6 md:mt-3 text-gray-400 border-white flex justify-between items-center">
      <p className="text-xs md:text-lg">
        Designed by
        <a className="underline m-2 text-white" href="">
          Suraj Gitte
        </a>
      </p>

      <a
        href="mailto:suraj.gitte23@vit.edu?subject=Book%20a%20Call&body=Hello,%20I%20would%20like%20to%20book%20a%20call"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex justify-center text-xs hover:scale-105 hover:text-purple-500 md:text-xl items-center md:gap-3 text-white">
          <h2 className="text-xs md:text-xl">BOOK A CALL</h2>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </a>

      <p className="text-xs md:text-sm">@copyright Suraj gitte</p>
    </div>
  );
}

export default Footer;
