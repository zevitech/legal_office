
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
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
          </ul>
        </div>
        <div class="row">
          <div class="col-md-12" style="position: relative">
            <div class="bg-gradient"></div>
            <div class="form_wrap bgform">
              <div class="w-100" style="position: relative">
                <h3>
                  Trademark Classification
                  <span> Step-3 </span>
                </h3>

                <form class="" action="<?php echo esc_url($link);?>" method="post" novalidate>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <p>
                          <span class=""
                            >Start describing the goods and services related to
                            your mark. Secure Your Mark compares the
                            description you provide and provides descriptions
                            from the USPTO ID Manual for your
                            consideration.</span
                          >
                          <span class="heading fw-600 my-3"
                            >PLEASE PROVIDE A DESCRIPTION OF YOUR GOODS OR
                            SERVICES ?</span
                          >
                        </p>
                        <textarea
                          type="text"
                          class="form-control my-3"
                          id="exampleInputEmail1"
                          rows="10"
                          name="trademark_classification"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="form_footer">
                    <div
                      class="d-md-flex justify-content-between align-items-center my-3"
                    >
                      <p class="">
                        <img
                          src="<?php  echo plugins_url('', __FILE__);?>/assets/images/padlock.png"
                          class="padlockIcon"
                          alt="secure
                          icon"
                        />
                        Click on "Continue" to save your application.
                      </p>
                      <div class="form-btn-inner">
                      <input type='hidden' name='trademark_id' value='<?php echo $_POST['trademark_id']; ?>'>
                        <button type="submit" class="theme-btn">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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

