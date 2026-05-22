import { Link } from 'react-router'
import './CustomerFooter.css'

export default function CustomerFooter() {
    return (
        <>
            <div className="footer-accent-bar" />
            <footer className="customer-footer">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-brand-name">
                            Demo <span>Store</span>
                        </div>
                        <p>
                            Your one-stop shop for quality products.
                        </p>
                        <div className="footer-contact-item">
                            <span>Phone</span>
                            <a href="tel:+11231231234">(123) 123-1234</a>
                        </div>
                        <div className="footer-contact-item">
                            <span>Email</span>
                            <a href="mailto:temp@example.com">
                                temp@example.com
                            </a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <div className="footer-col-title">Navigate</div>
                        <ul>
                            <li>
                                <Link to="/Customer">Home</Link>
                            </li>
                            <li>
                                <Link to="/Customer/Products">Products</Link>
                            </li>
                            <li>
                                <Link to="/Customer/Contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <div className="footer-col-title">Products</div>
                        <ul>
                            <li>
                                <Link to="/Customer/Products">All Listings</Link>
                            </li>
                            <li>
                                <Link to="/Customer/Products">Featured</Link>
                            </li>
                            <li>
                                <Link to="/Customer/Products">New Arrivals</Link>
                            </li>
                            <li>
                                <Link to="/Customer/Products">Search</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <div className="footer-col-title">Visit Us</div>
                        <div className="footer-contact-item">
                            <span>Address</span>
                            <p>
                                123 street St
                                <br />
                                Anytown, USA 12345
                            </p>
                        </div>
                        <div className="footer-contact-item">
                            <span>Hours</span>
                            <p>
                                Mon-Fri 9am-5pm
                                <br />
                                Sat by appointment
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-copy">
                        &copy; {new Date().getFullYear()}{' '}
                        <span>Demo Store</span>. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}