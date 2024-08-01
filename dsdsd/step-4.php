  <div class="header-2">
    <section class="py-5 steps-section">
      <div class="container">
        <div class="row align-items-center flex-column">
          <div class="col-md-12 text-center">
            <h1 class="h1 fw-700 pb-2">
              Registering Your Trademark in the United States
            </h1>
            <p>
              Complete your application in
              <span class="orange">3 minutes.</span>
            </p>
          </div>
        </div>

        <div class="row my-5 justify-content-center">
          <ul class="steps-progress">
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
          </ul>
        </div>
        <div class="row">
          <div class="col-md-12" style="position: relative">
            <div class="bg-gradient"></div>
            <div class="form_wrap" style="position: relative">
              <form
                action="<?php echo esc_url($link);?>"
                method="post"
                novalidate
              >
                <div class="bgform">
                  <h3>
                    What type of trademark search would you like us to conduct?
                    Select one.
                    <span> Step-4 </span>
                  </h3>
                  <p>
                    The search you choose will be conducted on the words or text
                    within your trademark.
                  </p>

                  <div class="form-check step4check">
                    <ul class="trademarksearch-option">
                      <li class="first">
                        <input
                          type="radio"
                          name="trademark_type_search"
                          checked=""
                          value="Basic Federal Direct-Hit Search (Included - Free)"
                          class="basic_check uspto_data"
                          data-uspto="0"
                          id="basic_check"
                        />
                        <label for="basic_check"
                          >Basic Federal Direct-Hit Search
                          <span
                            >Includes a basic search of USPTO database
                            only</span
                          ></label
                        >
                      </li>

                      <li>
                        <input
                          type="radio"
                          name="trademark_type_search"
                          value="Federal &amp; State Search  Most Popular"
                          class="federal_check uspto_data"
                          data-uspto="99"
                          id="federal_check"
                        />
                        <label for="federal_check"
                          >Federal &amp; State Search
                          <em
                            style="
                              color: rgb(51, 147, 214);
                              margin-left: 3px;
                              font-size: 14px;
                              font-weight: 700;
                            "
                            >Most Popular</em
                          >
                          <span
                            >Provides any similar names, logos, or slogans that
                            are registered or pending with the USPTO or in any
                            of the 50 states</span
                          ></label
                        >
                      </li>

                      <li>
                        <input
                          type="radio"
                          name="trademark_type_search"
                          value="Federal, State &amp; Common Law Search Recommended"
                          class="commonlaw_check uspto_data"
                          data-uspto="199"
                          id="commonlaw_check"
                        />
                        <label for="commonlaw_check"
                          >Federal, State &amp; Common Law Search 
                          <em
                            style="
                              color: rgb(51, 153, 0);
                              margin-left: 3px;
                              font-size: 14px;
                              font-weight: 700;
                            "
                            >Recommended</em
                          >
                          <span
                            >Same as above, but also includes a proprietary
                            search of corporate directories, common law and
                            domain names</span
                          ></label
                        >
                      </li>

                      <li class="last">
                        <input
                          type="radio"
                          name="trademark_type_search"
                          value="Global Comprehensive U.S. and International Search"
                          class="global_check uspto_data"
                          data-uspto="349"
                          id="global_check"
                        />
                        <label for="global_check"
                          >Global Comprehensive U.S. and International Search
                          <span
                            >Same as above, but also includes searches for
                            pending and registered marks in these multi-national
                            jurisdictions: (i) The European community; and (ii)
                            the World Intellectual Property Organization
                            (WIPO)</span
                          ></label
                        >
                      </li>
                    </ul>
                  </div>

                  <div class="submits-wrapper">
                    <div class="form_footer">
                      <div
                        class="d-md-flex align-items-center justify-content-between"
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
                        <!--<a href="" class="theme-btn">Continue <i class="far fa-chevron-right"></i> </a>-->
                        <!--<p class="continue">Click on "<a href="javascript:">Continue</a>" to save your application.</p>-->
                        <!-- <input
                          type="hidden"
                          name="save_form_manually"
                          value="0"
                        /> -->
                        <!--<div class="form-btns"> <a href="javascript:;" onClick="window.history.back();" class="btn-prev btn btn-transparent">Previous</a>-->
                        <div class="form-btn-inner">
                        <input type='hidden' name='trademark_id' value='<?php echo $_POST['trademark_id']; ?>'>
                          <button type="submit" class="theme-btn">
                            Continue
                          </button>
                          <!--<a href="javascript:;" class="save_form_manually btn btn-transparent">Save For Later</a> </div>-->
                        </div>
                        <!-- <input type="hidden" name="send" value="1" /> -->
                        <!-- <input
                          type="hidden"
                          name="uspto_fee"
                          class="uspto_fee"
                          value="0"
                        /> -->
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <p class="m-t-20" style="position: relative; padding-top: 30px">
              <small class="fonts-inter">
                Later in this process, Secure Your Mark collects and pays the
                government-discounted TEAS Standard electronic filing fee of
                $350. In some circumstances, your application may qualify for
                the less-available TEAS PLUS system which means we will pay $250
                to the USPTO which streamlines the process. If your application
                qualifies for TEAS PLUS, we will use it and retain the
                difference between the TEAS Standard filing fee and the TEAS
                Plus filing fee as a result of the additional processing by the
                Secure Your Mark.
              </small>
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <script src="<?php  echo plugins_url('assets/js/custom.js', __FILE__);?>"></script>
    <script src="<?php  echo plugins_url('assets/js/dev.js', __FILE__);?>"></script>
    <script>
      new WOW().init();
    </script>
  </div>

