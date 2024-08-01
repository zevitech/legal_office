<?php 


?>
  <style>
    @media only screen and (max-width: 768px) {
      .col-md-12.text-center h1,
      .row.align-items-center.flex-column.text-center h1 {
        font-size: 30px !important;
        margin: 0px 0px;
      }
    }
	  .packge-box ul {
			max-height: 466px;
			overflow: scroll;
			overflow-x: hidden;
		}
  </style>
  <div class="header-2">
    <section class="py-5 steps-section">
      <div class="container">
        <div class="row align-items-center flex-column text-center">
          <h1 class="h1 fw-700 pb-2">
            Registering Your Trademark in the United States
          </h1>
          <p>
            Complete your application in <span class="orange">3 minutes.</span>
          </p>
        </div>

        <div class="row my-5 justify-content-center">
          <ul class="steps-progress">
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span class=""></span></li>
          </ul>
        </div>

        <div class="form_wrap" style="position: relative">
          <div class="bg-gradient"></div>
          <form
            action="<?php echo esc_url($link);?>"
            method="post"
            class="step5_validate"
            style="position: relative"
          >
            <div class="bgform pboxcolor">
              <div class="row pkg-box">
                <div class="col-md-12">
                  <h3 class="mb-0">
                    Choose a package
                    <span> Step-5 </span>
                  </h3>
                  <p class="mt-md-2">
                    All packages include lifetime customer support
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4">
                  <div class="packge-box">
                    <h3 class="form-heading mb-0">
                      Basic Branding Application Package
                    </h3>
                    <div class="form-price">
                      <span>For Just</span>
                      <b>$35</b>
                    </div>
                    <div class="form-title">
                      <i> + USPTO Fee $350/Class*</i>
                      <a
                        href="<?php echo esc_url($link);?>?title=Basic Branding Application Package&price=$35&trademark_id=<?php echo $_POST['trademark_id'];?>"
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Basic Branding Application Package"
                        data-term="1"
                        data-price="35"
                        va=""
                        >Choose Package
                      </a>
                    </div>

                    <ul style="overflow:hidden;">
                      <li class="first">
                        <strong>Basic Website Design.</strong>
                      </li>
                      <li>
                        <strong>Direct-Hit Search of the Federal USPTO</strong>
                        database which will include misspellings for live and
                        pending applications.
                      </li>
                      <li>
                        <strong>Professional Preparation</strong> of your
                        federal trademark application.
                      </li>
                      <li>
                        <strong>Digitalization and Formatting</strong> of your
                        trademark specimens and designs.
                      </li>
                      <li>
                        <strong>Electronic Delivery</strong> of your trademark
                        application with no need to wait for mail or dealing
                        with paper files. This will qualify you the reduced
                        government filing fee.
                      </li>
                      <li class="last">
                        <strong>Secure Online Account</strong> with calendar of
                        important dates. Your status, documents, and important
                        deadlines will be available to you 24/7 through your
                        online account.
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="packge-box packge-box-middle pkg-sealed-icn">
                    <h3 class="form-heading mb-0">
                      Standard Branding Application Package
                    </h3>
                    <div class="form-price">
                      <span>For Just</span>
                      <!--<b>$149</b>-->
                      <b>$135</b>
                    </div>
                    <div class="form-title">
                      <i> + USPTO Fee $350/Class*</i>
                      <a
                        href="<?php echo esc_url($link);?>?title=Standard Branding Application Package&price=$135&trademark_id=<?php echo $_POST['trademark_id'];?>"
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Standard Branding Application Package"
                        data-term="1"
                        data-price="135"
                        >Choose Package</a
                      >
                    </div>

                    <ul>
                      <li><strong>Standard Website Design.</strong></li>
                      <li><strong>Stationery Items.</strong></li>
                      <li>
                        <strong>Direct-Hit Search of the Federal USPTO</strong>
                        database which will include misspellings for live and
                        pending applications.
                      </li>
                      <li>
                        <strong>Professional Preparation</strong> of your
                        federal trademark application.
                      </li>
                      <li>
                        <strong>Digitalization and Formatting</strong> of your
                        trademark specimens and designs.
                      </li>
                      <li>
                        <strong>Electronic Delivery</strong> of your trademark
                        application with no need to wait for mail or dealing
                        with paper files. This will qualify you the reduced
                        government filing fee.
                      </li>
                      <li>
                        <strong>Secure Online Account</strong> with calendar of
                        important dates. Your status, documents, and important
                        deadlines will be available to you 24/7 through your
                        online account.
                      </li>
                      <li>
                        <strong>Assessment of Application</strong> by a team of
                        Attorneys to avoid any loopholes that might cause
                        rejection at the government's office.
                      </li>
                      <li>
                        <strong>Cease and Desist Letter</strong> A customized
                        form that can be used if someone infringing on your
                        mark.
                      </li>
                      <li>
                        <strong>Transfer and Assignment Letter</strong> If you
                        need to sell or otherwise convey your mark, you have
                        access to your template that you can further customize
                        to your needs.
                      </li>
                      <li class="last">
                        <strong>6 Months of Trademark Monitoring</strong>
                        service to notify you of possible infringers of your
                        trademark ($88 value).
                      </li>
                    </ul>
                    <span class="badge"
                      ><img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/recommendIcon.png"
                    /></span>
                  </div>
                </div>
                <!--<li class="pkg-sealed-icn">-->
                <div class="col-lg-4">
                  <div class="packge-box pkg-sealed-icn">
                    <h3 class="form-heading mb-0">
                      Premium Branding Application Package
                    </h3>
                    <div class="form-price">
                      <span>For Just</span>
                      <!--<b>$199</b>-->
                      <b>$235</b>
                    </div>
                    <div class="form-title">
                      <i> + USPTO Fee $350/Class*</i>
                      <a
                        href="<?php echo esc_url($link);?>?title=Premium Branding Application Package&price=$235&trademark_id=<?php echo $_POST['trademark_id'];?>"
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Premium Branding Application Package"
                        data-price="235"
                        data-term="0"
                        >Choose Package</a
                      >
                    </div>

                    <ul>
                      <li class="first">
                        <strong>Premium Website Design.</strong>
                      </li>
                      <li><strong>Stationery Items.</strong></li>
                      <li><strong>Logo Design.</strong></li>
                      <li>
                        <strong>Direct-Hit Search of the Federal USPTO</strong>
                        database which will include misspellings for live and
                        pending applications.
                      </li>
                      <li>
                        <strong>Professional Preparation</strong> of your
                        federal trademark application.
                      </li>
                      <li>
                        <strong>Digitalization and Formatting</strong> of your
                        trademark specimens and designs.
                      </li>
                      <li>
                        <strong>Electronic Delivery</strong> of your trademark
                        application with no need to wait for mail or dealing
                        with paper files. This will qualify you the reduced
                        government filing fee.
                      </li>
                      <li>
                        <strong>Secure Online Account</strong> with calendar of
                        important dates. Your status, documents, and important
                        deadlines will be available to you 24/7 through your
                        online account.
                      </li>
                      <li>
                        <strong>Assessment of Application</strong> by a team of
                        Attorneys to avoid any loopholes that might cause
                        rejection at the government's office.
                      </li>
                      <li>
                        <strong>Cease and Desist Letter</strong> A customized
                        form that can be used if someone infringing on your
                        mark.
                      </li>
                      <li>
                        <strong>Transfer and Assignment Letter</strong> If you
                        need to sell or otherwise convey your mark, you have
                        access to your template that you can further customize
                        to your needs.
                      </li>
                      <li>
                        <strong>6 Months of Trademark Monitoring</strong>
                        service to notify you of possible infringers of your
                        trademark ($88 value).
                      </li>
                      <li>
                        <strong>1 Year of Trademark Monitoring </strong>service
                        to notify you of possible infringers. The normal price
                        for our monitoring service is $175. You receive a full
                        year for free when choosing our Deluxe package.
                      </li>
                      <li>
                        <strong>24-hour Expedited Processing</strong> of the
                        preparation of your trademark application. Normal
                        processing time is 5 business days in our Basic and
                        Standard packages.
                      </li>
                      <li class="last">
                        <strong>100% Money Back Guarantee</strong> Our customer
                        service team is made up of dedicated trademark
                        representatives with one goal - to meet each client's
                        needs in a friendly, caring, and efficient manner. If
                        you do not think we have met this goal, let us know and
                        we will be happy to make every effort to resolve the
                        issue(s).
                      </li>
                    </ul>
                    <!-- <span class="badge"
                      ><img src="../assets/images/download.jpg"
                    /></span> -->
                  </div>
                </div>
              </div>

              <div class="row pkg-box desktop-only"></div>
              <div class="submits-wrapper">
                <div class="form_footer">
                  <div
                    class="d-md-flex justify-content-between align-items-center my-3"
                  >
                    <p>
                      <img
                        src="<?php  echo plugins_url('', __FILE__);?>/assets/images/padlock.png"
                        class="padlockIcon"
                        alt="secure
                          icon"
                      />
                      Click on "Continue" to save your application.
                    </p>
                    <!-- <input
                      type="hidden"
                      name="data_pkg_title"
                      class="data_pkg_title"
                      value="Basic Branding Application Package"
                    />
                    <input
                      type="hidden"
                      name="data_pkg_price"
                      class="data_pkg_price"
                      value="35"
                    />
                    <input
                      type="hidden"
                      name="hrs_24_amount"
                      class="hrs_24_amount"
                      value=""
                    />
                    <input
                      type="hidden"
                      name="data_term"
                      class="data_term"
                      value="0"
                    /> -->
                    <!-- <button type="submit" class="theme-btn">Continue</button> -->
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    
    <script src="<?php  echo plugins_url('assets/js/custom.js', __FILE__);?>"></script>
    <script src="<?php  echo plugins_url('assets/js/dev.js', __FILE__);?>"></script>
    <script>
      new WOW().init();
    </script>

    <script>
      jQuery(document).on("click", ".btn-normal.data-pkg", function () {
        var price = $(this).attr("data-price");
        var pkg = $(this).attr("data-pkg");
        console.log(price);
        console.log(pkg);
        $('input[name="data_pkg_title"]').val(pkg);
        $('input[name="data_pkg_price"]').val(price);
        $("form").find('[type="submit"]').trigger("click");
      });
    </script>
  </div>

