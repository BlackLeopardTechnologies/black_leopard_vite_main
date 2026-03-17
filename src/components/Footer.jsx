import React from "react";

const Footer = () => {
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
        <li>We may use cookies to improve your experience</li>
        <li>Cookies help us remember your preferences</li>
        <li>You can disable cookies in your browser settings</li>
        <li>Some features may not work properly without cookies</li>
    </ul>

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
<a href="https://www.instagram.com/blackleopardtech" class="fab fa-instagram"></a>
<a href="https://www.linkedin.com/company/blackleopard-technologies-limited" class="fab fa-linkedin"></a>
<a href="https://www.tiktok.com/@blackleopardtech" class="fab fa-tiktok"></a>

</div>


</section>

        </>
    )
}

export default Footer ;