import { useNavigate } from 'react-router-dom';
import './footer.scss';

export default function Footer() {
    const navigate = useNavigate()
    return (
        <footer>
            <div className='footer-top'>
                <div className="footer-left">
                    <p>shop</p>
                    <span>Subscribe</span>
                    <span>Coffee</span>
                    <span>Cold Brew</span>
                    <span>Gear</span>
                </div>
                <div className="footer-middle">
                    <div className='footer-box'>
                        <p>ABOUT</p>
                        <span>Our Story</span>
                        <span>Locations</span>
                        <span>Contact</span>
                    </div>
                    <div className='footer-box'>
                        <p>LEARN</p>
                        <span>Brew Guides</span>
                        <span>Blogs</span>
                        <span>Impact</span>
                    </div>
                    <div className='footer-box'>
                        <p>WHOLESALE</p>
                        <span>Serve Stumptown</span>
                        <span>Ordering</span>
                    </div>
                </div>
                <div className="footer-right">
                    <p>GET SECRET NOTES</p>
                    <input type="text" placeholder='Enter your email' />
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    ©2023 Stumptown Coffee Roasters Terms & Conditions Privacy Policy Your Privacy Choices
                </p>
                <div className='social-media-icon'>
                    <a href='https://www.facebook.com/stumptowncoffee/'><i className="fa-brands fa-facebook"></i></a>
                    <a href='https://www.instagram.com/stumptowncoffee/?hl=en'><i className="fa-brands fa-instagram"></i></a>
                    <a href='https://twitter.com/stumptowncoffee'><i className="fa-brands fa-twitter"></i></a>
                    <a href='https://www.tiktok.com/@stumptowncoffee'><i className="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </footer >
    )
}
