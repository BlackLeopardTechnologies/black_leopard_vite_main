import React from "react";

const Footer = ({ onOpenCookieSettings }) => {
    return(
        <>
            

<section class="footer">

<div class="box-container">

   <div class="box">
        <h3>Our Locations</h3>
    <a href="#"> <i class="fas fa-map-marker-alt"></i> Eastern Region - Koforidua</a>
    <a href="#"> <i class="fas fa-map-marker-alt"></i> Greater Accra - Accra</a>
   </div>

<div class="box">
        <h3>Quick Links</h3>
    <a href="#"> <i class="fas fa-arrow-right"></i> home </a>
    <a href="#about"> <i class="fas fa-arrow-right"></i> about </a>
    <a href="#services"> <i class="fas fa-arrow-right"></i> services </a>  
</div>

   {/* <div class="box">
    <h3>Extra Links</h3>
<a href="#"> <i class="fas fa-arrow-right"></i> account info </a>
<a href="#"> <i class="fas fa-arrow-right"></i> privacy policy </a>
<a href="#"> <i class="fas fa-arrow-right"></i> payment method </a>
</div> */}


   <div class="box">
    <h3>Cookies</h3>
    <ul>
        <li>Necessary cookies keep the website secure and working properly</li>
        <li>Optional cookies stay off until you accept them</li>
        <li>You can update your choices at any time from this footer</li>
        <li>Rejecting optional cookies will not block access to the site</li>
    </ul>
    <button
        type="button"
        className="footer-cookie-button"
        onClick={onOpenCookieSettings}
    >
        Cookie settings
    </button>

</div>

   <div class="box">
    <h3>Contact</h3>
<a href="#"> <i class="fas fa-phone"></i> +233 509 957 073 </a>
<a href="#"> <i class="fas fa-envelope"></i> support@blackleopardtech.com 
 </a>
<img src="images/worldmap.jpg" class="map" alt="rti"/>
</div>

</div>

<div class="share">
{/* <a href="#" class="fab fa-facebook"></a> */}
{/* <a href="#" class="fab fa-twitter"></a> */}
<a href="https://www.instagram.com/blackleopardtech" class="fab fa-instagram" target="_blank" rel="noopener noreferrer"></a>
<a href="https://www.linkedin.com/company/blackleopard-technologies-limited" class="fab fa-linkedin" target="_blank" rel="noopener noreferrer"></a>
<a href="https://www.tiktok.com/@blackleopardtech" class="fab fa-tiktok" target="_blank" rel="noopener noreferrer"></a>

</div>


</section>

        </>
    )
}

export default Footer ;
