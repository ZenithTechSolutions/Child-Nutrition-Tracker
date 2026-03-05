import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex w-full  flex-col items-center py-2 bg-linear-to-r from-[#ffbd45] to-[#ff4e6d] text-white">
      <p className="text-sm">
        Developed by{" "}
        <Link
          to="https://zenith-portfolio-orpin.vercel.app/"
          target="_blank"
          className="text-lg hover:underline"
        >
          Team Zenith
        </Link>
      </p>
      <p className="text-xs">© 2025 Micro, Small and Medium Enterprises</p>
    </footer>
  );
};

export default Footer;
