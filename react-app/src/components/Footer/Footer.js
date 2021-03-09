import React from 'react';
import './Footer.css';


function Footer() {
    return (
        <div id='footer-container'>
            <div id='footer'>
                <div className='footer-button-wrapper'>
                    <a href='https://github.com/jpremo' target="_blank" className='footer-link'>
                        <div className='footer-link-image-wrapper'>
                            <i className="fab fa-github fa-2x"></i>
                        </div>
                    </a>
                    <a href='https://www.linkedin.com/in/jacob-premo/' target="_blank" className='footer-link'>
                        <div className='footer-link-image-wrapper'>
                            <i className="fab fa-linkedin fa-2x"></i>
                        </div>
                    </a>
                    <a href='https://angel.co/u/jacob-premo' target="_blank" className='footer-link'>
                        <div className='footer-link-image-wrapper'>
                            <i className="fab fa-angellist fa-2x"></i>
                        </div>
                    </a>
                    <a href='https://www.jacobpremo.com/' target="_blank" className='footer-link'>
                        <div className='footer-link-image-wrapper'>
                            <i className="fas fa-briefcase fa-2x"></i>
                        </div>
                    </a>
                </div>
                <div className='footer-copyright'>
                    &copy; Jacob Premo {new Date().getFullYear()}
                </div>
            </div>
        </div>
    );
}

export default Footer;
