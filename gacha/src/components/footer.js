import React from 'react';
import '../styles/Footer.css';


function Footer() {

    return (
      <div className="footer-red">
        <footer>
        <div className="FooterContainer">
                <div className="row">
                <div className="column">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="https://event.rakuten.co.jp/beginner/?l-id=top_normal_guide02">Information</a></li>
                            <li><a href="https://www.rakuten.co.jp/ri/sitemap.html?l-id=top_normal_guide01">Guide</a></li>
                            <li><a href="https://event.rakuten.co.jp/guide/shipping/?l-id=top_normal_guide09">Delivery</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>Shopping</h3>
                        <ul>
                            <li><a href="https://product.rakuten.co.jp/">Navigation</a></li>
                            <li><a href="https://fril.jp/">Rakuma</a></li>
                            <li><a href="https://event.rakuten.co.jp/rmagazine/">Rmagazine</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>Social</h3>
                        <ul>
                            <li><a href="https://event.rakuten.co.jp/sns/">Official SNS</a></li>
                            <li><a href="https://affiliate.rakuten.co.jp/">Rakuten Affiliate</a></li>
                            <li><a href="https://plaza.rakuten.co.jp/">Rakten Blog</a></li>
                        </ul>
                    </div>
                </div>
                <p className="copyright">NattoPanda © 2021</p>
            </div>
        </footer>   
      </div>
    );
  }
  
  export default Footer;

 