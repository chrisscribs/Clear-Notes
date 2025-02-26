const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className=" absolute bottom-0 w-full bg-green-500">
      <div className="width-full flex justify-center bg-green-400">
        <small className="text-white text-base p-2">
          &copy; {year} Clear Notes. All Rights Reserved.
        </small>
      </div>
    </div>
  );
};

export default Footer;
