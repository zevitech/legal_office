<?php



$price = get_post_meta($_POST['trademark_id'],'Price',true);



?>
    <style>
      section {
        padding: 0 !important;
      }

      .about {
        margin: 70px auto 40px;
        padding: 8px;
        width: 260px;
        font: 10px/18px "Lucida Grande", Arial, sans-serif;
        color: #bbb;
        text-align: center;
        text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
        background: #383838;
        background: rgba(34, 34, 34, 0.8);
        border-radius: 4px;
        background-image: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.3)
        );
        background-image: -moz-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.3)
        );
        background-image: -o-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.3)
        );
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.3)
        );
        -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
          0 0 6px rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
          0 0 6px rgba(0, 0, 0, 0.4);
      }

      section.footer-bottom .container {
        text-align: center;
        padding: 20px 0;
        font-size: 12px;
        line-height: 19px;
        color: #616161;
      }

      p.copyright {
        margin-top: 0;
        font-size: 16px;
      }

      p.tos-links {
        font-size: 11px;
        color: #9e9e9e;
        font-weight: 300;
      }

      p.tos-links a {
        color: #9e9e9e;
        text-decoration: underline;
      }

      section.footer-bottom .container img {
        max-width: 100%;
        height: auto;
        margin-bottom: 16px;
      }

      .about a {
        color: #eee;
        text-decoration: none;
        border-radius: 2px;
        -webkit-transition: background 0.1s;
        -moz-transition: background 0.1s;
        -o-transition: background 0.1s;
        transition: background 0.1s;
      }

      .about a:hover {
        text-decoration: none;
        background: #555;
        background: rgba(255, 255, 255, 0.15);
      }

      .about-links {
        height: 30px;
      }

      .about-links > a {
        float: left;
        width: 50%;
        line-height: 30px;
        font-size: 12px;
      }

      .about-author {
        margin-top: 5px;
      }

      .about-author > a {
        padding: 1px 3px;
        margin: 0 -1px;
      }

      body {
        font: 15px/20px;
        font-family: sans-serif;
        color: #000;
      }

      .order-details-box li strong {
        font-weight: 600;
      }

      section.footer-bottom {
        margin: 10px 0 0 0;
      }

      .checkout {
        margin: 0 auto 30px;
        padding: 15px;
        background: #f3f6fa;
        border: 1px solid;
        border-color: #c2cadb #bbc5d6 #b7c0cd;
        border-radius: 7px;
        -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      }

      .checkout > p {
        zoom: 1;
      }

      .checkout > p:before,
      .checkout > p:after {
        content: "";
        display: table;
      }

      .checkout > p:after {
        clear: both;
      }

      .checkout > p + p {
        margin-top: 7px;
      }

      .checkout-header {
        position: relative;
        margin: -15px -15px 15px;
      }

      .checkout-title {
        padding: 0 15px;
        line-height: 48px;
        font-size: 18px;
        font-weight: 400;
        text-shadow: 0 1px rgba(255, 255, 255, 0.7);
        background: #eceff5;
        border-bottom: 1px solid #c5ccdb;
        border-radius: 7px 7px 0 0;
        background-image: -webkit-linear-gradient(top, #f5f8fb, #e9edf3);
        background-image: -moz-linear-gradient(top, #f5f8fb, #e9edf3);
        background-image: -o-linear-gradient(top, #f5f8fb, #e9edf3);
        background-image: linear-gradient(to bottom, #f5f8fb, #e9edf3);
        -webkit-box-shadow: inset 0 1px #fff;
        box-shadow: inset 0 1px #fff;
        margin: 0;
      }

      .checkout-title:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      }

      .checkout-price {
        position: absolute;
        top: -14px;
        right: -14px;
        width: 40px;
        font: 14px/40px Helvetica, Arial, sans-serif;
        color: #fff;
        text-align: center;
        text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
        text-indent: -1px;
        letter-spacing: -1px;
        background: #e54930;
        border: 1px solid;
        border-color: #b33323 #ab3123 #982b1f;
        border-radius: 21px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: -webkit-linear-gradient(top, #f75a3b, #d63b29);
        background-image: -moz-linear-gradient(top, #f75a3b, #d63b29);
        background-image: -o-linear-gradient(top, #f75a3b, #d63b29);
        background-image: linear-gradient(to bottom, #f75a3b, #d63b29);
        -webkit-box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
          0 1px 2px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
          0 1px 2px rgba(0, 0, 0, 0.2);
      }

      .checkout-price:before {
        content: "";
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 3px;
        right: 3px;
        border: 2px solid #f5f8fb;
        border-radius: 18px;
        -webkit-box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
          inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 -1px 1px rgba(0, 0, 0, 0.25);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
          inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 -1px 1px rgba(0, 0, 0, 0.25);
      }

      input {
        margin: 0;
        line-height: normal;
        font-family: inherit;
        font-size: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }

      .disclaimer p {
        color: #8c8c8c;
        font-size: 11px;
        margin: 0;
      }

      .disclaimer {
        padding: 15px 0;
      }

      .checkout-input {
        font-family: "Poppins" !important;
        float: left;
        padding: 0 10px;
        height: 40px;
        color: #525864;
        background: #fff;
        border: 1px solid;
        border-color: #b3c0e2 #bcc5e2 #c0ccea;
        border-radius: 4px;
        background-image: -webkit-linear-gradient(top, #f6f8fa, white);
        background-image: -moz-linear-gradient(top, #f6f8fa, white);
        background-image: -o-linear-gradient(top, #f6f8fa, white);
        background-image: linear-gradient(to bottom, #f6f8fa, white);
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5);
      }

      .checkout-input:focus {
        border-color: #46aefe;
        outline: none;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 5px #46aefe;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 5px #46aefe;
      }

      .lt-ie9 .checkout-input {
        line-height: 30px;
      }

      .checkout-name {
        width: 100%;
      }

      .checkout-cvc {
        margin: 0 0 0 7px !important;
        width: 31%;
        margin-top: 9px !important;
      }

      .checkout-card {
        width: 100%;
        margin-top: 9px;
      }

      .checkout-exp,
      .checkout-exp2,
      .checkout-cvc {
        margin: 0 2px 0 0;
        width: 31%;
        margin-top: 9px;
      }

      .checkout-btn {
        font-family: "Poppins" !important;
        width: 100%;
        box-sizing: border-box;
        height: 44px;
        padding: 0;
        font-weight: 700;
        color: #fff;
        text-align: center;
        text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
        border: 1px solid;
        border-color: #1486f9 #0f7de9 #0d6acf;
        background: #1993fb;
        border-radius: 4px;
        background-image: -webkit-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        );
        background-image: -moz-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        );
        background-image: -o-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        );
        background-image: linear-gradient(
          to bottom,
          #4cb1fe,
          #229afc 40%,
          #138df6
        );
        -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 1px rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }

      .checkout-btn:active {
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        border-color: #075bba #0c69d2 #0f7de9;
        background-image: -webkit-linear-gradient(top, #1281dc, #1593fc);
        background-image: -moz-linear-gradient(top, #1281dc, #1593fc);
        background-image: -o-linear-gradient(top, #1281dc, #1593fc);
        background-image: linear-gradient(to bottom, #1281dc, #1593fc);
        -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5);
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5);
      }

      :-moz-placeholder {
        color: #acb6c8 !important;
      }

      ::-moz-placeholder {
        color: #acb6c8 !important;
        opacity: 1;
      }

      ::-webkit-input-placeholder {
        color: #acb6c8;
      }

      :-ms-input-placeholder {
        color: #acb6c8;
      }

      ::-moz-focus-inner {
        padding: 0 !important;
        border: 0 !important;
      }

      .paywith {
        font-size: 14px;
        padding-bottom: 10px;
        text-align: center;
      }

      .paywith img {
        vertical-align: middle;
        margin: 0 10px;
      }

      .gray-scr h3 {
        color: #fff;
        font-weight: 700;
        font-size: 22px;
        padding: 34px 0 23px;
        background: #3f4157;
        position: relative;
      }

      .gray-scr {
        text-align: center;
        background: #3f4157;
        margin-top: 0;
        padding: 0 0 10px;
      }

      .header-wrap .container {
        margin-bottom: 2rem;
      }

      header .col-sm-6 + .col-sm-6 {
        text-align: right;
        padding-top: 8px;
      }

      .bottom-form {
        background: #3f4157;
        padding: 0 0 36px;
        text-align: center;
        margin: 0 auto;
      }

      .bottom-form ul li {
        display: inline-block;
        margin: 0 20px;
      }

      h2.scr-h2 {
        text-align: center;
        position: relative;
        color: #fff;
        font-weight: 600;
        font-size: 27px;
        letter-spacing: 0;
        margin-bottom: -10px;
        margin-top: 20px;
      }

      section.thankyouboxa .container {
        padding: 0;
        overflow: hidden;
      }

      .gray-scr h3:before {
        background: #3f4157;
        width: 50px;
        height: 4px;
        position: absolute;
        left: 50%;
        margin-left: -25px;
        bottom: 0;
        content: "";
        border-radius: 70px;
      }

      h2.scr-h2 span {
        position: relative;
      }

      .pd-left-0 {
        padding-left: 0 !important;
      }

      .header-wrap {
        max-width: 1200px;
        margin: auto;
        text-align: center;
      }

      .checkout-input {
        float: left;
        padding: 0 10px;
        height: 40px;
        color: #525864 !important;
        background: #fff !important;
        border: 1px solid !important;
        border-color: #b3c0e2 #bcc5e2 #c0ccea !important;
        border-radius: 4px !important;
        background-image: -webkit-linear-gradient(
          top,
          #f6f8fa,
          white
        ) !important;
        background-image: -moz-linear-gradient(top, #f6f8fa, white) !important;
        background-image: -o-linear-gradient(top, #f6f8fa, white) !important;
        background-image: linear-gradient(to bottom, #f6f8fa, white) !important;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5) !important;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5) !important;
      }

      .checkout-input:focus {
        border-color: #46aefe !important;
        outline: none !important;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 5px #46aefe !important;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 5px #46aefe !important;
      }

      .checkout-btn {
        width: 100% !important;
        box-sizing: border-box !important;
        height: 44px !important;
        padding: 0 !important;
        font-weight: 700 !important;
        color: #fff !important;
        text-align: center !important;
        text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2) !important;
        border: 1px solid !important;
        border-color: #1486f9 #0f7de9 #0d6acf !important;
        background: #1993fb !important;
        border-radius: 4px !important;
        background-image: -webkit-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        ) !important;
        background-image: -moz-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        ) !important;
        background-image: -o-linear-gradient(
          top,
          #4cb1fe,
          #229afc 40%,
          #138df6
        ) !important;
        background-image: linear-gradient(
          to bottom,
          #4cb1fe,
          #229afc 40%,
          #138df6
        ) !important;
        -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.2) !important;
        box-shadow: inset 0 1px rgba(255, 255, 255, 0.2),
          0 1px 2px rgba(0, 0, 0, 0.2) !important;
        cursor: pointer;
      }

      .checkout-btn:active {
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2) !important;
        border-color: #075bba #0c69d2 #0f7de9 !important;
        background-image: -webkit-linear-gradient(
          top,
          #1281dc,
          #1593fc
        ) !important;
        background-image: -moz-linear-gradient(
          top,
          #1281dc,
          #1593fc
        ) !important;
        background-image: -o-linear-gradient(top, #1281dc, #1593fc) !important;
        background-image: linear-gradient(
          to bottom,
          #1281dc,
          #1593fc
        ) !important;
        -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1),
          0 1px rgba(255, 255, 255, 0.5) !important;
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1), 0 1px rgba !important;
      }

      .order-details-box {
        background: #f3f6fa5e;
        border-radius: 6px;
        border: 1px solid #bbc5d657;
        overflow: hidden;
        width: 100%;
        padding-top: 20px;
      }

      .order-details-box h5 {
        font-size: 20px;
        text-align: center;
        padding: 14px;
        margin-bottom: 11px;
        background: #ecf0f5;
        border-bottom: 1px solid #bbc5d6;
      }

      .order-details-box ul li {
        list-style: none;
        margin-left: 18px;
        margin-top: 8px;
        color: #6c6c6c;
        font-size: 14px;
      }

      .order-details-box ul {
        min-height: 151px;
        margin: 20px;
      }

      .totalbox {
        font-size: 25px;
        text-align: center;
        padding: 14px;
        background: #ecf0f5;
        border-top: 1px solid #bbc5d6;
        font-weight: bold;
      }

      .order-details-box h6 {
        margin: 23px 23px 0;
      }

      .text-white {
        color: #fff !important;
        font-size: 24px;
      }

      .fs-18 {
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 12px;
      }

      .fs-16 {
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
        padding-bottom: 12px;
      }
      .risk-free ul li {
        line-height: 20px;
        list-style: none;
        margin-left: 0;
        margin-top: 10px;
        color: #6c6c6c;
        font-size: 14px;
      }

      .risk-free ul {
        padding: 0;
        margin: 0 0 27px 0;
        min-height: auto;
      }

      .risk-free ul li i {
        color: red;
        margin-right: 12px;
      }
      .risk-free {
        margin: 0px 0px 0px 38px;
      }

      @media (max-width: 991px) {
        .order-details-box {
          margin: 0 auto;
          margin-bottom: 2rem;
        }
        .risk-free {
          margin: 0px 0px 0px 0px;
        }
      }

      @media (max-width: 825px) {
        .order-details-box {
          margin: 0 auto;
          margin-bottom: 2rem;
        }
        .risk-free {
          margin: 0px 0px 0px 0px;
        }
      }

      @media screen and (max-width: 500px) {
        .pd-left-0 {
          padding-left: 15px !important;
        }
        .risk-free {
          margin: 0px 0px 0px 22px;
        }
      }

      /*New Style*/
      .popup_form {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #00000090;
        top: 0;
      }
      .popup_form_cont {
        width: 55%;
        height: 75%;
        display: block;
        margin: auto;
        margin-top: 10%;
      }
      .popup_form_cont iframe {
        height: inherit;
        border-radius: 20px;
      }
      @media (min-width: 100px) and (max-width: 767px) {
        .popup_form {
          z-index: 999;
        }
        .popup_form_cont {
          width: 95%;
        }
        .popup_form_cont iframe {
          height: 100%;
          border-radius: 20px;
        }
      }

      .popup-closed span {
        font-size: 25px;
        position: absolute;
        color: #f00;
        font-weight: 800;
        right: 17px;
        top: 14px;
        transition: all 0.4s ease-in-out;
        background-color: #fff;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        line-height: 1px;
        padding-bottom: 2px;
        cursor: pointer;
        z-index: 99;
      }
      img.r-arrow {
          width: 27px;
      }

      img.restrictIcon {
          width: 12px;
          margin-right: 7px;
      }
      .popup-closed span:hover {
        color: #000;
      }
      .popup_form_cont {
        position: relative;
      }
      .mycustom-cont {
        background: #f3f6fa5e;
        border-radius: 6px;
        border: 1px solid #bbc5d663;
        padding: 30px 20px;
        text-align: center;
        height: 100%;
        flex-direction: column;
        transition: all 0.4s ease-in-out;
      }

      .mycustom-cont:hover {
        /* background: #ecf0f52e; */
      }

      .mycustom-cont h6 {
        font-size: 32px;
        padding-bottom: 10px;
        line-height: 1.4;
        font-weight: 700;
      }

      .mycustom-cont p {
        font-size: 18px;
        padding: 0 20px;
        line-height: 1.4;
        font-weight: 400;
        padding-bottom: 18px;
      }

      .mycustom-cont a {
        background: #ea6b22;
        white-space: nowrap;
        transition-property: background-color, opacity;
        padding: 15px 40px;
        border-radius: 100px;
        color: #fff;
        letter-spacing: 0.5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.4s ease-in-out;
      }

      .mycustom-cont a:hover {
        background: #5279cf;
        gap: 5px;
      }
      .mycustom-cont li {
        line-height: 24px;
      }
      section.thankyouboxa.form_wrap {
        margin-top: 50px;
        margin-bottom: 50px;
      }

      section.thankyouboxa {
        width: 70%;
        margin: 50px auto;
      }

      .mycustom-cont ul {
        list-style: none;
      }
    </style>
  <div class="header-2">
    <section class="thankyouboxa form_wrap" style="position: relative">
      <div class="bg-gradient"></div>
      <div class="container" style="position: relative">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="mycustom-cont">
                <div>
                  <h6>Your Package Includes:</h6>
                  <ul>
                    <li>
                      Federal, State & Common Law Search Recommended
                      <strong><?php echo $price;?></strong>
                    </li>
                    <li><strong></strong></li>
                  </ul>
                </div>

                <p></p>
				  <?php 

						$url='';
				  		if($price=='$35'){
							$url='https://buy.stripe.com/cN201OcIH9N274c4hi';
						}
				  elseif($price=='$135'){
							$url='https://buy.stripe.com/5kA8yk3874sIdsAbJL';
						}
				  else{
							$url='https://buy.stripe.com/dR615S0ZZcZe74c3dg';
						}
				  
?>
                <a href="<?php echo '?safe_redirect=true&trademark_id='.$_POST['trademark_id'].'&pay_url='.htmlspecialchars($url) ?> " class="open_payment"
                  >Pay <?php echo $price;?> <img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/right-arrow.png" class="r-arrow"></a>
              </div>
            </div>
            <div class="col-lg-6" style="display: none">
              <div class="order-details-box">
                <h5>"Package Details"</h5>
                <h6>Your Package includes:</h6>
                <ul>
                  <li>
                    Federal, State & Common Law Search Recommended
                    <strong><?php echo $price;?></strong>
                  </li>
<!--                   <li><strong>$</strong></li> -->
                </ul>
                <div class="totalbox"><?php echo $price;?></div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-12 mt-3">
          <div class="row">
            <div class="col-lg-12">
              <div class="order-details-box">
                <div class="risk-free">
                  <h2 class="" style="margin-top: 10px">
                    Secure Your Mark is Risk Free
                  </h2>
                  <h3 class="fs-18">10-Day Money Back Guarantee</h3>
                  <p class="fs-16">
                    If for any reason Secure Your Mark is unable to perform the
                    requested search, a refund for the search fee will be
                    promptly issued to you
                  </p>
                  <ul>
                    <li><img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/restrict.png" class="restrictIcon"/></img>No forms to fill out.</li>
                    <li><img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/restrict.png" class="restrictIcon"/></img>No questions to answer.</li>
                    <li><img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/restrict.png" class="restrictIcon"/></img>No hoops to jump through.</li>
                  </ul>
                  <h3 class="fs-18">
                    Cancel Anytime Via (Email, Livechat, or Phone)
                  </h3>
                  <p class="fs-16">
                    We make canceling easy. No contracts. No questions. No fine
                    print. No forms to fill out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="footer-bottom">
      <div class="container">
        <p class="copyright">&copy; 2024 - All Rights Reserved</p>
      </div>
    </section> -->

    
    <script src="<?php  echo plugins_url('assets/js/custom.js', __FILE__);?>"></script>
    <script src="<?php  echo plugins_url('assets/js/dev.js', __FILE__);?>"></script>
    <script>
      new WOW().init();
    </script>
    <!--
    <script>

      jQuery(document).on("click", ".open_payment", function (e) {
        e.preventDefault();
        $(".popup_form").removeClass("d-none");
      });
      jQuery(document).on("click", ".popup-closed", function (e) {
        e.preventDefault();
        $(".popup_form").addClass("d-none");
      });
    </script>
    -->
  </div>

