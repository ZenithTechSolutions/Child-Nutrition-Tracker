import { Link } from "react-router-dom";
import '../styles/footer.css'
const Footer = () => {
    return (
        <>
            <footer className="footer-main">
                <p> Developed by <Link to='https://zenith-portfolio-orpin.vercel.app/' target='_blank'>Team Zenith</Link></p>
                <p>Copyright &copy; 2025 Micro, Small and Medium Enterprises. All rights reserved</p>
            </footer>
        </>
    );
};
export default Footer;