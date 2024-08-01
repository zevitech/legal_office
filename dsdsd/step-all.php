<?php

$request_json = json_encode($_REQUEST);

// Output as a JavaScript variable
echo "<script>";
echo "var requestData = " . $request_json . ";";
echo "</script>";


$post_id=save_the_first_step();

?>

<?php
if(!$post_id)	  {
	die('We Will Wake Up Soon !!!');  
?>




<?php 
}
?>
<section id="step_1_" >
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
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
          </ul>
        </div>
        <div class="row">
          <div class="col-md-12" style="position: relative">
            <div class="bg-gradient"></div>
            <div class="form_wrap" style="position: relative">
              <form
                action="?submit=true"
                onsubmit="return false"
                method="POST"
                class="step1_valdate"
                enctype="multipart/form-data"
				        id='main_form'
              >
				  <input type='hidden' value='<?php echo $post_id;?>' name='trademark_id'>
                <div class="bgform">
                  <div>
                    <input type="hidden" name="" value="" />
                    <h3>
                      Trademark Application
                      <span> Step-1 </span>
                    </h3>
                    <label class="label-big"
                      >Select what you want to protect.</label
                    >
                    <div class="form-check form-check-type input_group">
                      <input
                        type="radio"
                        name="what_need_to_protect"
                        value="tdname"
                        class="tdname_check"
                        checked=""
                        id="namecheck"
                      />
                      <label for="namecheck">Name</label>

                      <input
                        type="radio"
                        name="what_need_to_protect"
                        value="tdslogan"
                        class="tdslogan_check"
                        id="slogancheck"
                      />
                      <label for="slogancheck">Slogan</label>

                      <input
                        type="radio"
                        name="what_need_to_protect"
                        value="tdlogo"
                        class="tdlogo_check"
                        id="logocheck"
                      />
                      <label for="logocheck">Logo</label>
                    </div>

                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group tdname_fld">
                          <label class="label-big"
                            >Enter the name you wish to protect</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            name="trademark_name"
                          />
                        </div>

                        <div
                          class="form-group tdslogan_fld"
                          style="display: none"
                        >
                          <label class="label-big"
                            >Enter the slogan you wish to protect</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            name="trademark_slogan"
                          />
                        </div>

                        <div
                          class="form-group tdlogo_fld"
                          style="display: none"
                        >
                          <label
                            >Please note, you will be asked to upload your logo
                          </label>
                          <input type="file" name="trademark_project_logo" accept=".jpg, .png, .jpeg, .gif, .img, .tif, .tiff|image/*"/>
                          <br />
                          <label class="label-big"
                            >Please provide a complete and accurate description
                            of your logo, including any words that may appear in
                            the logo. An example of a description is: ‘a red cat
                            wrapped around a blue outline of a globe'. Leave out
                            the colors if you want to protect your logo in all
                            colors</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            name="trademark_logo"
                              
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div
                          class="form-group variety_field_label has_para input_group form_group"
                          style="display: none"
                        >
                          <p class="label-big">
                            Do you want to be able to protect your logo in a
                            variety of colors?
                          </p>
                          <input
                            type="radio"
                            name="want_to_able_to_protect_logo_colors_answer"
                            value="yes"
                            class="v_color_yes"
                            checked=""
                            id="vcoloryes"
                          />
                          <label for="vcoloryes">Yes</label>

                          <input
                            type="radio"
                            name="want_to_able_to_protect_logo_colors_answer"
                            value="no"
                            class="v_color_no"
                            id="vcolorno"
                          />
                          <label for="vcolorno">No</label>
                        </div>

                        <div
                          class="form-group variety_field"
                          style="display: none"
                        >
                          <label class="label-big"
                            >Please provide a list of the colors that appear in
                            your logo.</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            name="list_of_colors_that_appear_to_logo"
                              
                          />
                        </div>

                        <div class="form-group logo_name" style="display: none">
                          <label class="label-big"
                            >Enter any word(s), letter(s), and/or number(s) that
                            appear in your logo.</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            name="any_word_or_later_or_number_that_appear_in_logo"
                              
                          />
                        </div>

                        <div
                          class="form-group mark_fld has_para input_group form_group"
                        >
                          <p class="label-big">
                            Does your mark include a living person's name—even
                            if a stage name or pseudonym or could it be
                            perceived to include a person's name?
                          </p>

                          <p>
                            <input
                              type="radio"
                              name="trademark_include_person_name"
                              value="yes"
                              class="markyes"
                              id="markyes"
                            />
                            <label for="markyes">Yes</label>

                            <input
                              type="radio"
                              name="trademark_include_person_name"
                              value="no"
                              class="markno"
                              checked=""
                              id="markno"
                            />
                            <label for="markno">No</label>
                          </p>
                        </div>

                        <div
                          class="form-group markchecked_fld2 has_para input_group form_group"
                          style="display: none"
                        >
                          <p>
                            Does your mark include the name (including a
                            pseudonym, nickname or stage name) of a living
                            person other than yourself?
                          </p>

                          <input
                            type="radio"
                            name="trademark_include_person_name_yourself"
                            value="yes"
                            class="markyes3"
                            checked=""
                            id="markyes3"
                          />
                          <label for="markyes3">Yes</label>

                          <input
                            type="radio"
                            name="trademark_include_person_name_yourself"
                            value="no"
                            class="markno3"
                            checked=""
                            id="markno3"
                          />
                          <label for="markno3">No</label>
                        </div>
                      </div>
                    </div>

                    <div
                      class="form-group markchecked_fld2_name_mark"
                      style="display: none"
                    >
                      <label
                        >What is the name of the living person in your
                        mark?</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        name="name_of_the_living_person_in_mark"
                          
                      />
                      <p class="phide">
                        Please note that you will need the living person's
                        written consent to the use and registration of the name
                        before we can file it.
                      </p>
                    </div>
                    <div
                      class="form-group name_mark input_group form_group"
                      style="display: none"
                    >
                      <div>
                        <strong
                          >Does your mark include a name (including a pseudonym,
                          nickname or stage name) that is yours?</strong
                        >
                      </div>

                      <input
                        type="radio"
                        name="trademark_include_a_name_that_your_answer"
                        value="yes"
                        class="markyes2"
                        id="markyes2"
                      />
                      <label for="markyes2">Yes</label>

                      <input
                        type="radio"
                        name="trademark_include_a_name_that_your_answer"
                        value="no"
                        class="markno2"
                        checked=""
                        id="markno2"
                      />
                      <label for="markno2">No</label>
                    </div>
                    <div
                      class="form-group markchecked_fld"
                      style="display: none"
                    >
                      <label
                        >Please type your name as it appears in the mark:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        name="name_as_it_appears_in_the_mark"
                          
                      />
                    </div>
                  </div>

                  <div class="bgform">
                    <div
                      class="form-group markchecked_fld3 input_group form_group"
                    >
                      <div>
                        <strong
                          >Does your mark include any words other than English
                          or non-Latin characters?</strong
                        >
                      </div>

                      <input
                        type="radio"
                        name="trademark_include_any_word_other_than_english_or_not_latin_answer"
                        value="yes"
                        class="markyes4"
                        id="markyes4"
                      />
                      <label for="markyes4">Yes</label>

                      <input
                        type="radio"
                        name="trademark_include_any_word_other_than_english_or_not_latin_answer"
                        value="no"
                        class="markno4"
                        checked=""
                        id="markno4"
                      />
                      <label for="markno4">No</label>
                    </div>

                    <div
                      class="form-group eng-translation form_group"
                      style="display: none"
                    >
                      <p>
                        Please provide the English translation or
                        transliteration of any non-Latin characters or
                        non-English words:
                      </p>
                      <input
                        type="text"
                        class="form-control"
                        name="non_english_character_translation"
                          
                      />
                    </div>

                    <div class="form-group use_tdmark form_group input_group">
                      <div>
                        <strong
                          >Are you currently using this trademark in your
                          business?</strong
                        >
                        <span class="form-tooltip">
                          <span>?</span> Get Help
                          <div class="form-tooltip-body">
                            <p>
                              By selecting “yes” you are representing that you
                              are using the mark in commerce which means that
                              you have actually sold goods or services with the
                              mark. During this process, you will have to show
                              proof that you are actually using the mark which
                              will be explained later. <br /><br />
                              If you are not using the mark yet, but plan to,
                              please mark “No.” By filing the Intent To Use, you
                              will mark your place in line, but you will need to
                              file a statement of use and pay additional fees
                              with the USPTO once you actually start selling
                              goods or services with the mark.
                            </p>
                          </div>
                        </span>
                      </div>

                      <input
                        type="radio"
                        name="currently_using_trademark_answer"
                        value="yes"
                        class="markyes5"
                        id="markyes5"
                      />
                      <label for="markyes5">Yes</label>

                      <input
                        type="radio"
                        name="currently_using_trademark_answer"
                        value="no"
                        class="markno5"
                        checked=""
                        id="markno5"
                      />
                      <label for="markno5">No</label>
                    </div>

                    <div class="form-group first_use_any" style="display: none">
                      <label>1. First use anywhere:</label>
                    </div>
                    <div
                      id="first_use_anywhere"
                      class="row"
                      style="display: none"
                    >
                      <div class="col-sm-4">
                        <select
                          class="input month form-control"
                          name="first_use_anywhere_month_name"
                        >
                          <option value="1" selected="">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                      <div class="col-sm-4">
                        <select
                          class="input day form-control"
                          name="first_use_anywhere_date"
                        >
                          <option value="1" selected="">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                        </select>
                      </div>
                      <div class="col-sm-4">
                        <select
                          class="input year form-control"
                          name="first_use_anywhere_year"
                        >
                          <option value="2024" selected="2024">2024</option>
							<option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group first_use_com" style="display: none">
                      <label>1. First use commerce:</label>
                    </div>
                    <div
                      id="first_use_anywhere2"
                      class="row"
                      style="display: none"
                    >
                      <div class="col-sm-4">
                        <select
                          class="input month form-control"
                          name="trademark_first_use_commerce_month"
                        >
                          <option value="1" selected="">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                      <div class="col-sm-4">
                        <select
                          class="input day form-control"
                          name="trademark_first_use_commerce_date"
                        >
                          <option value="1" selected="">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                        </select>
                      </div>
                      <div class="col-sm-4">
                        <select
                          class="input year form-control"
                          name="trademark_first_use_commerce_year"
                        >
                          <option value="2024" selected="2024">2024</option>
							<option value="2023">2023</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                        </select>
                      </div>
                    </div>
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
                        <!-- <input type="hidden" name="sourcePage" value="" /> -->
                        <!-- <input
                          type="hidden"
                          name="save_form_manually"
                          value="0"
                        /> -->
                        <div class="form-btn-inner">
                    
                          <button  class="theme-btn" id="go_step_2">
                            Continue
                          </button>
                        </div>
                      </div>
                      <!-- <input type="hidden" name="send" value="1" /> -->
                    </div>
                  </div>
                </div>
              <!-- </form> -->
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



    
  </div>

</section>
<section id="step_2_" style="display:none;"> <div class="header-2">
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
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
            <li><span class=""></span></li>
          </ul>
        </div>
        <div class="row">
          <div class="col-md-12" style="position: relative">
            <div class="bg-gradient"></div>
            <div class="form_wrap" style="position: relative">
              <div class="bgform">
                <div class="w-100">
                  <h3>
                    Trademark Application Process
                    <span> Step-2 </span>
                  </h3>
                  <span class="heading fw-600"
                    >Please provide the ownership details affiliated with your
                    trademark application.<span></span
                  ></span>
                  <!-- <form
                    class="pt-md-4"
                    action="#"
                    onsubmit="return false"
                    method="post"
                    class="step2_valdate"
                  > -->
                    <div class="form-check pt-md-4 form-chk-ind-org">
                      <label>
                        <input
                          type="radio"
                          name="ownership_details_affiliated_with_your_trademark_application_answer"
                          checked=""
                          value="individual"
                          class="individual"
                        />
                        Individual
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="ownership_details_affiliated_with_your_trademark_application_answer"
                          value="organization"
                          class="organization"
                        />
                        Organization
                      </label>
                    </div>

                    <!-- INDIVIDUAL OWNER -->
                    <!-- <div class="form-group ind_own_fld">
                      <a href="javascript:;" class="add_owner"> Add Owner</a>
                    </div> -->

                    <div class="form-group ind_own_fld">
                      <label>First Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_individual_first_name"
                        placeholder="First Name"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_individual_last_name"
                        placeholder="Last Name"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Country of Citizenship:</label>
                      <select
                        name="trademark_individual_country_name"
                        class="form-control"
                        
                      >
                        <option value="">Choose Country of Citizenship</option>
                        <option value="United States of America">
                          United States
                        </option>
                        <option value="AFX">Afghanistan</option>
                        <option value="ALX">Albania</option>
                        <option value="DZX">Algeria</option>
                        <option value="ASX">American Samoa</option>
                        <option value="ADX">Andorra</option>
                        <option value="AOX">Angola</option>
                        <option value="AIX">Anguilla</option>
                        <option value="AGX">Antigua and Barbuda</option>
                        <option value="ARX">Argentina</option>
                        <option value="AMX">Armenia</option>
                        <option value="AWX">Aruba</option>
                        <option value="AUX">Australia</option>
                        <option value="ATX">Austria</option>
                        <option value="AZX">Azerbaijan</option>
                        <option value="BSX">Bahamas</option>
                        <option value="BHX">Bahrain</option>
                        <option value="BDX">Bangladesh</option>
                        <option value="BBX">Barbados</option>
                        <option value="BYX">Belarus</option>
                        <option value="BEX">Belgium</option>
                        <option value="BZX">Belize</option>
                        <option value="BJX">Benin</option>
                        <option value="BMX">Bermuda</option>
                        <option value="BQX">BES Islands</option>
                        <option value="BTX">Bhutan</option>
                        <option value="BOX">Bolivia</option>
                        <option value="BAX">Bosnia and Herzegovina</option>
                        <option value="BWX">Botswana</option>
                        <option value="BVX">Bouvet Island</option>
                        <option value="BRX">Brazil</option>
                        <option value="IOX">
                          British Indian Ocean Territory
                        </option>
                        <option value="VGX">British Virgin Islands</option>
                        <option value="BNX">Brunei Darussalam</option>
                        <option value="BGX">Bulgaria</option>
                        <option value="BFX">Burkina Faso</option>
                        <option value="BIX">Burundi</option>
                        <option value="CIX">Côte d'Ivoire</option>
                        <option value="KHX">Cambodia</option>
                        <option value="CMX">Cameroon</option>
                        <option value="CAX">Canada</option>
                        <option value="CVX">Cabo Verde</option>
                        <option value="KYX">Cayman Islands</option>
                        <option value="CFX">Centralican Republic</option>
                        <option value="TDX">Chad</option>
                        <option value="CLX">Chile</option>
                        <option value="CNX">China</option>
                        <option value="CXX">Christmas Island</option>
                        <option value="CCX">Cocos Islands</option>
                        <option value="COX">Colombia</option>
                        <option value="KMX">Comoros</option>
                        <option value="CGX">Congo</option>
                        <option value="CKX">Cook Islands</option>
                        <option value="CRX">Costa Rica</option>
                        <option value="HRX">Croatia</option>
                        <option value="CUX">Cuba</option>
                        <option value="CWX">Curacao</option>
                        <option value="CYX">Cyprus</option>
                        <option value="CZX">Czech Republic</option>
                        <option value="DKX">Denmark</option>
                        <option value="DJX">Djibouti</option>
                        <option value="DMX">Dominica</option>
                        <option value="DOX">Dominican Republic</option>
                        <option value="ECX">Ecuador</option>
                        <option value="EGX">Egypt</option>
                        <option value="SVX">El Salvador</option>
                        <option value="GB2">England</option>
                        <option value="GQX">Equatorial Guinea</option>
                        <option value="ERX">Eritrea</option>
                        <option value="EEX">Estonia</option>
                        <option value="ETX">Ethiopia</option>
                        <option value="FKX">Falkland Islands</option>
                        <option value="FOX">Faroe Islands</option>
                        <option value="FJX">Fiji</option>
                        <option value="FIX">Finland</option>
                        <option value="FRX">France</option>
                        <option value="GFX">French Guiana</option>
                        <option value="PFX">French Polynesia</option>
                        <option value="GAX">Gabon</option>
                        <option value="GMX">Gambia</option>
                        <option value="GEX">Georgia</option>
                        <option value="DEX">Germany</option>
                        <option value="GHX">Ghana</option>
                        <option value="GIX">Gibraltar</option>
                        <option value="GB3">Great Britain</option>
                        <option value="GRX">Greece</option>
                        <option value="GLX">Greenland</option>
                        <option value="GDX">Grenada</option>
                        <option value="GPX">Guadeloupe</option>
                        <option value="GUX">Guam</option>
                        <option value="GTX">Guatemala</option>
                        <option value="GGX">Guernsey</option>
                        <option value="GNX">Guinea</option>
                        <option value="GWX">Guinea-Bissau</option>
                        <option value="GYX">Guyana</option>
                        <option value="HTX">Haiti</option>
                        <option value="HMX">
                          Heard Island and McDonald Islands
                        </option>
                        <option value="HNX">Honduras</option>
                        <option value="HKX">Hong Kong</option>
                        <option value="HUX">Hungary</option>
                        <option value="ISX">Iceland</option>
                        <option value="INX">India</option>
                        <option value="IDX">Indonesia</option>
                        <option value="IRX">Iran</option>
                        <option value="IQX">Iraq</option>
                        <option value="IEX">Ireland</option>
                        <option value="GB4">Isle of Man</option>
                        <option value="ILX">Israel</option>
                        <option value="ITX">Italy</option>
                        <option value="JMX">Jamaica</option>
                        <option value="JPX">Japan</option>
                        <option value="JEX">Jersey</option>
                        <option value="JTX">Johnston Atoll</option>
                        <option value="JOX">Jordan</option>
                        <option value="KZX">Kazakhstan</option>
                        <option value="KEX">Kenya</option>
                        <option value="KIX">Kiribati</option>
                        <option value="KPX">Korea, North</option>
                        <option value="KRX">Korea, South</option>
                        <option value="KWX">Kuwait</option>
                        <option value="KGX">Kyrgyzstan</option>
                        <option value="LAX">Laos</option>
                        <option value="LVX">Latvia</option>
                        <option value="LBX">Lebanon</option>
                        <option value="LSX">Lesotho</option>
                        <option value="LRX">Liberia</option>
                        <option value="LYX">Libya</option>
                        <option value="LIX">Liechtenstein</option>
                        <option value="LTX">Lithuania</option>
                        <option value="LUX">Luxembourg</option>
                        <option value="MOX">Macau</option>
                        <option value="MKX">Macedonia</option>
                        <option value="MGX">Madagascar</option>
                        <option value="MWX">Malawi</option>
                        <option value="MYX">Malaysia</option>
                        <option value="MVX">Maldives</option>
                        <option value="MLX">Mali</option>
                        <option value="MTX">Malta</option>
                        <option value="MHX">Marshall Islands</option>
                        <option value="MQX">Martinique</option>
                        <option value="MRX">Mauritania</option>
                        <option value="MUX">Mauritius</option>
                        <option value="YTX">Mayotte</option>
                        <option value="MXX">Mexico</option>
                        <option value="FMX">Micronesia</option>
                        <option value="MDX">Moldova</option>
                        <option value="MCX">Monaco</option>
                        <option value="MNX">Mongolia</option>
                        <option value="MSX">Montserrat</option>
                        <option value="MAX">Morocco</option>
                        <option value="MEX">Montenegro</option>
                        <option value="MZX">Mozambique</option>
                        <option value="MMX">Myanmar</option>
                        <option value="NAX">Namibia</option>
                        <option value="NRX">Nauru</option>
                        <option value="NVX">Navassa Island</option>
                        <option value="NPX">Nepal</option>
                        <option value="NLX">Netherlands</option>
                        <option value="NZX">New Zealand</option>
                        <option value="NIX">Nicaragua</option>
                        <option value="NEX">Niger</option>
                        <option value="NGX">Nigeria</option>
                        <option value="GB5">Northern Ireland</option>
                        <option value="MPX">Northern Mariana Islands</option>
                        <option value="NOX">Norway</option>
                        <option value="OMX">Oman</option>
                        <option value="PKX">Pakistan</option>
                        <option value="PWX">Palau</option>
                        <option value="PAX">Panama</option>
                        <option value="PGX">Papua New Guinea</option>
                        <option value="PYX">Paraguay</option>
                        <option value="PEX">Peru</option>
                        <option value="PHX">Philippines</option>
                        <option value="PLX">Poland</option>
                        <option value="PTX">Portugal</option>
                        <option value="PRX">Puerto Rico</option>
                        <option value="QAX">Qatar</option>
                        <option value="ROX">Romania</option>
                        <option value="RUX">Russia</option>
                        <option value="RWX">Rwanda</option>
                        <option value="KNX">Saint Kitts and Nevis</option>
                        <option value="LCX">Saint Lucia</option>
                        <option value="VCX">
                          Saint Vincent and Grenadines
                        </option>
                        <option value="OOX">Samoa</option>
                        <option value="SMX">San Marino</option>
                        <option value="STX">Sao Tome and Principe</option>
                        <option value="SAX">Saudi Arabia</option>
                        <option value="GB6">Scotland</option>
                        <option value="SNX">Senegal</option>
                        <option value="RSX">Serbia</option>
                        <option value="SCX">Seychelles</option>
                        <option value="SLX">Sierra Leone</option>
                        <option value="SGX">Singapore</option>
                        <option value="SKX">Slovakia</option>
                        <option value="SIX">Slovenia</option>
                        <option value="SBX">Solomon Islands</option>
                        <option value="SOX">Somalia</option>
                        <option value="ZAX">South Africa</option>
                        <option value="ESX">Spain</option>
                        <option value="LKX">Sri Lanka</option>
                        <option value="SXX">St. Maarten</option>
                        <option value="SDX">Sudan</option>
                        <option value="SRX">Suriname</option>
                        <option value="SZX">Swaziland</option>
                        <option value="SEX">Sweden</option>
                        <option value="CHX">Switzerland</option>
                        <option value="SYX">Syria</option>
                        <option value="TWX">Taiwan</option>
                        <option value="TJX">Tajikistan</option>
                        <option value="TZX">Tanzania</option>
                        <option value="THX">Thailand</option>
                        <option value="TLX">Timor-Leste</option>
                        <option value="TGX">Togo</option>
                        <option value="TOX">Tonga</option>
                        <option value="TTX">Trinidad and Tobago</option>
                        <option value="TNX">Tunisia</option>
                        <option value="TRX">Turkey</option>
                        <option value="TMX">Turkmenistan</option>
                        <option value="TCX">Turks/Caicos Islands</option>
                        <option value="TVX">Tuvalu</option>
                        <option value="UGX">Uganda</option>
                        <option value="UAX">Ukraine</option>
                        <option value="AEX">United Arab Emirates</option>
                        <option value="GBX">United Kingdom</option>
                        <option value="USA">United States</option>
                        <option value="UYX">Uruguay</option>
                        <option value="VIX">US Virgin Islands</option>
                        <option value="UZX">Uzbekistan</option>
                        <option value="VUX">Vanuatu</option>
                        <option value="VAX">Vatican City</option>
                        <option value="VEX">Venezuela</option>
                        <option value="VNX">Vietnam</option>
                        <option value="WKX">Wake Island</option>
                        <option value="GB7">Wales</option>
                        <option value="WFX">Wallis and Futuna</option>
                        <option value="PSX">West Bank/Gaza</option>
                        <option value="EHX">Western Sahara</option>
                        <option value="YEX">Yemen</option>
                        <option value="ZMX">Zambia</option>
                        <option value="ZWX">Zimbabwe</option>
                      </select>
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Address:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_individual_address"
                        placeholder="Address"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>City:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_individual__city"
                        placeholder="City"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>State/Province/Region:</label>
                      <select
                        name="trademark_individual__state"
                        class="form-control"
                        
                      >
                        <option value="">Select State/Province/Region</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Zip/Postal Code:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_individual_zip_code"
                        placeholder="12345"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Phone:</label>
                      <input
                        type="number"
                        class="form-control"
                        name="trademark_individual__phone"
                        placeholder="Phone"
                        
                      />
                    </div>

                    <div class="form-group ind_own_fld">
                      <label>Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        name="trademark_individual__email"
                        placeholder="me@example.com"
                        
                      />
                    </div>

                    <!-- ORGANIZATION OWNER -->

                    <div
                      class="form-check form-chk-ind-org org_own_fld"
                      style="display: none"
                    >
                      <h6>Formation</h6>
                      <label>
                        <input
                          type="radio"
                          name="ownership_formation"
                          checked=""
                          value="us based"
                          class="organizationz"
                        />
                        US Based
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="ownership_formation"
                          value="non us based"
                          class="organizationz"
                        />
                        Non US Based
                      </label>
                    </div>
                    <div class="form-group org_own_fld" style="display: none">
                      <label>Organization Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_name"
                        placeholder="Organization Name"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Organization Type:</label>
                      <select
                        name="trademark_organization_type"
                        class="form-control"
                          
                      >
                        <option value="">Choose Organization Type</option>
                        <option value="LLC">LLC</option>
                        <option value="C Corporation">C Corporation</option>
                        <option value="S Corporation">S Corporation</option>
                        <option value="Nonprofit">Nonprofit</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Sole Proprietorship">
                          Sole Proprietorship
                        </option>
                        <option value="Trust">Trust</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div
                      class="form-group org_own_fld ct_formation"
                      style="display: none"
                    >
                      <label>Country of Formation:</label>
                      <select
                        name="trademark_organization_country"
                        class="form-control"
                          
                      >
                        <option value="">Choose Country of Citizenship</option>
                        <option value="United States of America">
                          United States
                        </option>
                        <option value="AFX">Afghanistan</option>
                        <option value="ALX">Albania</option>
                        <option value="DZX">Algeria</option>
                        <option value="ASX">American Samoa</option>
                        <option value="ADX">Andorra</option>
                        <option value="AOX">Angola</option>
                        <option value="AIX">Anguilla</option>
                        <option value="AGX">Antigua and Barbuda</option>
                        <option value="ARX">Argentina</option>
                        <option value="AMX">Armenia</option>
                        <option value="AWX">Aruba</option>
                        <option value="AUX">Australia</option>
                        <option value="ATX">Austria</option>
                        <option value="AZX">Azerbaijan</option>
                        <option value="BSX">Bahamas</option>
                        <option value="BHX">Bahrain</option>
                        <option value="BDX">Bangladesh</option>
                        <option value="BBX">Barbados</option>
                        <option value="BYX">Belarus</option>
                        <option value="BEX">Belgium</option>
                        <option value="BZX">Belize</option>
                        <option value="BJX">Benin</option>
                        <option value="BMX">Bermuda</option>
                        <option value="BQX">BES Islands</option>
                        <option value="BTX">Bhutan</option>
                        <option value="BOX">Bolivia</option>
                        <option value="BAX">Bosnia and Herzegovina</option>
                        <option value="BWX">Botswana</option>
                        <option value="BVX">Bouvet Island</option>
                        <option value="BRX">Brazil</option>
                        <option value="IOX">
                          British Indian Ocean Territory
                        </option>
                        <option value="VGX">British Virgin Islands</option>
                        <option value="BNX">Brunei Darussalam</option>
                        <option value="BGX">Bulgaria</option>
                        <option value="BFX">Burkina Faso</option>
                        <option value="BIX">Burundi</option>
                        <option value="CIX">Côte d'Ivoire</option>
                        <option value="KHX">Cambodia</option>
                        <option value="CMX">Cameroon</option>
                        <option value="CAX">Canada</option>
                        <option value="CVX">Cabo Verde</option>
                        <option value="KYX">Cayman Islands</option>
                        <option value="CFX">Centralican Republic</option>
                        <option value="TDX">Chad</option>
                        <option value="CLX">Chile</option>
                        <option value="CNX">China</option>
                        <option value="CXX">Christmas Island</option>
                        <option value="CCX">Cocos Islands</option>
                        <option value="COX">Colombia</option>
                        <option value="KMX">Comoros</option>
                        <option value="CGX">Congo</option>
                        <option value="CKX">Cook Islands</option>
                        <option value="CRX">Costa Rica</option>
                        <option value="HRX">Croatia</option>
                        <option value="CUX">Cuba</option>
                        <option value="CWX">Curacao</option>
                        <option value="CYX">Cyprus</option>
                        <option value="CZX">Czech Republic</option>
                        <option value="DKX">Denmark</option>
                        <option value="DJX">Djibouti</option>
                        <option value="DMX">Dominica</option>
                        <option value="DOX">Dominican Republic</option>
                        <option value="ECX">Ecuador</option>
                        <option value="EGX">Egypt</option>
                        <option value="SVX">El Salvador</option>
                        <option value="GB2">England</option>
                        <option value="GQX">Equatorial Guinea</option>
                        <option value="ERX">Eritrea</option>
                        <option value="EEX">Estonia</option>
                        <option value="ETX">Ethiopia</option>
                        <option value="FKX">Falkland Islands</option>
                        <option value="FOX">Faroe Islands</option>
                        <option value="FJX">Fiji</option>
                        <option value="FIX">Finland</option>
                        <option value="FRX">France</option>
                        <option value="GFX">French Guiana</option>
                        <option value="PFX">French Polynesia</option>
                        <option value="GAX">Gabon</option>
                        <option value="GMX">Gambia</option>
                        <option value="GEX">Georgia</option>
                        <option value="DEX">Germany</option>
                        <option value="GHX">Ghana</option>
                        <option value="GIX">Gibraltar</option>
                        <option value="GB3">Great Britain</option>
                        <option value="GRX">Greece</option>
                        <option value="GLX">Greenland</option>
                        <option value="GDX">Grenada</option>
                        <option value="GPX">Guadeloupe</option>
                        <option value="GUX">Guam</option>
                        <option value="GTX">Guatemala</option>
                        <option value="GGX">Guernsey</option>
                        <option value="GNX">Guinea</option>
                        <option value="GWX">Guinea-Bissau</option>
                        <option value="GYX">Guyana</option>
                        <option value="HTX">Haiti</option>
                        <option value="HMX">
                          Heard Island and McDonald Islands
                        </option>
                        <option value="HNX">Honduras</option>
                        <option value="HKX">Hong Kong</option>
                        <option value="HUX">Hungary</option>
                        <option value="ISX">Iceland</option>
                        <option value="INX">India</option>
                        <option value="IDX">Indonesia</option>
                        <option value="IRX">Iran</option>
                        <option value="IQX">Iraq</option>
                        <option value="IEX">Ireland</option>
                        <option value="GB4">Isle of Man</option>
                        <option value="ILX">Israel</option>
                        <option value="ITX">Italy</option>
                        <option value="JMX">Jamaica</option>
                        <option value="JPX">Japan</option>
                        <option value="JEX">Jersey</option>
                        <option value="JTX">Johnston Atoll</option>
                        <option value="JOX">Jordan</option>
                        <option value="KZX">Kazakhstan</option>
                        <option value="KEX">Kenya</option>
                        <option value="KIX">Kiribati</option>
                        <option value="KPX">Korea, North</option>
                        <option value="KRX">Korea, South</option>
                        <option value="KWX">Kuwait</option>
                        <option value="KGX">Kyrgyzstan</option>
                        <option value="LAX">Laos</option>
                        <option value="LVX">Latvia</option>
                        <option value="LBX">Lebanon</option>
                        <option value="LSX">Lesotho</option>
                        <option value="LRX">Liberia</option>
                        <option value="LYX">Libya</option>
                        <option value="LIX">Liechtenstein</option>
                        <option value="LTX">Lithuania</option>
                        <option value="LUX">Luxembourg</option>
                        <option value="MOX">Macau</option>
                        <option value="MKX">Macedonia</option>
                        <option value="MGX">Madagascar</option>
                        <option value="MWX">Malawi</option>
                        <option value="MYX">Malaysia</option>
                        <option value="MVX">Maldives</option>
                        <option value="MLX">Mali</option>
                        <option value="MTX">Malta</option>
                        <option value="MHX">Marshall Islands</option>
                        <option value="MQX">Martinique</option>
                        <option value="MRX">Mauritania</option>
                        <option value="MUX">Mauritius</option>
                        <option value="YTX">Mayotte</option>
                        <option value="MXX">Mexico</option>
                        <option value="FMX">Micronesia</option>
                        <option value="MDX">Moldova</option>
                        <option value="MCX">Monaco</option>
                        <option value="MNX">Mongolia</option>
                        <option value="MSX">Montserrat</option>
                        <option value="MAX">Morocco</option>
                        <option value="MEX">Montenegro</option>
                        <option value="MZX">Mozambique</option>
                        <option value="MMX">Myanmar</option>
                        <option value="NAX">Namibia</option>
                        <option value="NRX">Nauru</option>
                        <option value="NVX">Navassa Island</option>
                        <option value="NPX">Nepal</option>
                        <option value="NLX">Netherlands</option>
                        <option value="NZX">New Zealand</option>
                        <option value="NIX">Nicaragua</option>
                        <option value="NEX">Niger</option>
                        <option value="NGX">Nigeria</option>
                        <option value="GB5">Northern Ireland</option>
                        <option value="MPX">Northern Mariana Islands</option>
                        <option value="NOX">Norway</option>
                        <option value="OMX">Oman</option>
                        <option value="PKX">Pakistan</option>
                        <option value="PWX">Palau</option>
                        <option value="PAX">Panama</option>
                        <option value="PGX">Papua New Guinea</option>
                        <option value="PYX">Paraguay</option>
                        <option value="PEX">Peru</option>
                        <option value="PHX">Philippines</option>
                        <option value="PLX">Poland</option>
                        <option value="PTX">Portugal</option>
                        <option value="PRX">Puerto Rico</option>
                        <option value="QAX">Qatar</option>
                        <option value="ROX">Romania</option>
                        <option value="RUX">Russia</option>
                        <option value="RWX">Rwanda</option>
                        <option value="KNX">Saint Kitts and Nevis</option>
                        <option value="LCX">Saint Lucia</option>
                        <option value="VCX">
                          Saint Vincent and Grenadines
                        </option>
                        <option value="OOX">Samoa</option>
                        <option value="SMX">San Marino</option>
                        <option value="STX">Sao Tome and Principe</option>
                        <option value="SAX">Saudi Arabia</option>
                        <option value="GB6">Scotland</option>
                        <option value="SNX">Senegal</option>
                        <option value="RSX">Serbia</option>
                        <option value="SCX">Seychelles</option>
                        <option value="SLX">Sierra Leone</option>
                        <option value="SGX">Singapore</option>
                        <option value="SKX">Slovakia</option>
                        <option value="SIX">Slovenia</option>
                        <option value="SBX">Solomon Islands</option>
                        <option value="SOX">Somalia</option>
                        <option value="ZAX">South Africa</option>
                        <option value="ESX">Spain</option>
                        <option value="LKX">Sri Lanka</option>
                        <option value="SXX">St. Maarten</option>
                        <option value="SDX">Sudan</option>
                        <option value="SRX">Suriname</option>
                        <option value="SZX">Swaziland</option>
                        <option value="SEX">Sweden</option>
                        <option value="CHX">Switzerland</option>
                        <option value="SYX">Syria</option>
                        <option value="TWX">Taiwan</option>
                        <option value="TJX">Tajikistan</option>
                        <option value="TZX">Tanzania</option>
                        <option value="THX">Thailand</option>
                        <option value="TLX">Timor-Leste</option>
                        <option value="TGX">Togo</option>
                        <option value="TOX">Tonga</option>
                        <option value="TTX">Trinidad and Tobago</option>
                        <option value="TNX">Tunisia</option>
                        <option value="TRX">Turkey</option>
                        <option value="TMX">Turkmenistan</option>
                        <option value="TCX">Turks/Caicos Islands</option>
                        <option value="TVX">Tuvalu</option>
                        <option value="UGX">Uganda</option>
                        <option value="UAX">Ukraine</option>
                        <option value="AEX">United Arab Emirates</option>
                        <option value="GBX">United Kingdom</option>
                        <option value="USA">United States</option>
                        <option value="UYX">Uruguay</option>
                        <option value="VIX">US Virgin Islands</option>
                        <option value="UZX">Uzbekistan</option>
                        <option value="VUX">Vanuatu</option>
                        <option value="VAX">Vatican City</option>
                        <option value="VEX">Venezuela</option>
                        <option value="VNX">Vietnam</option>
                        <option value="WKX">Wake Island</option>
                        <option value="GB7">Wales</option>
                        <option value="WFX">Wallis and Futuna</option>
                        <option value="PSX">West Bank/Gaza</option>
                        <option value="EHX">Western Sahara</option>
                        <option value="YEX">Yemen</option>
                        <option value="ZMX">Zambia</option>
                        <option value="ZWX">Zimbabwe</option>
                      </select>
                    </div>

                    <div
                      class="form-group org_own_fld st_formation"
                      style="display: none"
                    >
                      <label>State of Formation:</label>
                      <select
                        name="trademark_organization_state_formation"
                        class="form-control"
                          
                      >
                        <option value="">Select State of Formation</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Position:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_position"
                        placeholder="CEO"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>First Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_first_name"
                        placeholder="First Name"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_last_name"
                        placeholder="Last Name"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Country of Citizenship:</label>
                      <select
                        name="trademark_organization_country"
                        class="form-control"
                          
                      >
                        <option value="">Choose Country of Citizenship</option>
                        <option value="United States of America">
                          United States
                        </option>
                        <option value="AFX">Afghanistan</option>
                        <option value="ALX">Albania</option>
                        <option value="DZX">Algeria</option>
                        <option value="ASX">American Samoa</option>
                        <option value="ADX">Andorra</option>
                        <option value="AOX">Angola</option>
                        <option value="AIX">Anguilla</option>
                        <option value="AGX">Antigua and Barbuda</option>
                        <option value="ARX">Argentina</option>
                        <option value="AMX">Armenia</option>
                        <option value="AWX">Aruba</option>
                        <option value="AUX">Australia</option>
                        <option value="ATX">Austria</option>
                        <option value="AZX">Azerbaijan</option>
                        <option value="BSX">Bahamas</option>
                        <option value="BHX">Bahrain</option>
                        <option value="BDX">Bangladesh</option>
                        <option value="BBX">Barbados</option>
                        <option value="BYX">Belarus</option>
                        <option value="BEX">Belgium</option>
                        <option value="BZX">Belize</option>
                        <option value="BJX">Benin</option>
                        <option value="BMX">Bermuda</option>
                        <option value="BQX">BES Islands</option>
                        <option value="BTX">Bhutan</option>
                        <option value="BOX">Bolivia</option>
                        <option value="BAX">Bosnia and Herzegovina</option>
                        <option value="BWX">Botswana</option>
                        <option value="BVX">Bouvet Island</option>
                        <option value="BRX">Brazil</option>
                        <option value="IOX">
                          British Indian Ocean Territory
                        </option>
                        <option value="VGX">British Virgin Islands</option>
                        <option value="BNX">Brunei Darussalam</option>
                        <option value="BGX">Bulgaria</option>
                        <option value="BFX">Burkina Faso</option>
                        <option value="BIX">Burundi</option>
                        <option value="CIX">Côte d'Ivoire</option>
                        <option value="KHX">Cambodia</option>
                        <option value="CMX">Cameroon</option>
                        <option value="CAX">Canada</option>
                        <option value="CVX">Cabo Verde</option>
                        <option value="KYX">Cayman Islands</option>
                        <option value="CFX">Centralican Republic</option>
                        <option value="TDX">Chad</option>
                        <option value="CLX">Chile</option>
                        <option value="CNX">China</option>
                        <option value="CXX">Christmas Island</option>
                        <option value="CCX">Cocos Islands</option>
                        <option value="COX">Colombia</option>
                        <option value="KMX">Comoros</option>
                        <option value="CGX">Congo</option>
                        <option value="CKX">Cook Islands</option>
                        <option value="CRX">Costa Rica</option>
                        <option value="HRX">Croatia</option>
                        <option value="CUX">Cuba</option>
                        <option value="CWX">Curacao</option>
                        <option value="CYX">Cyprus</option>
                        <option value="CZX">Czech Republic</option>
                        <option value="DKX">Denmark</option>
                        <option value="DJX">Djibouti</option>
                        <option value="DMX">Dominica</option>
                        <option value="DOX">Dominican Republic</option>
                        <option value="ECX">Ecuador</option>
                        <option value="EGX">Egypt</option>
                        <option value="SVX">El Salvador</option>
                        <option value="GB2">England</option>
                        <option value="GQX">Equatorial Guinea</option>
                        <option value="ERX">Eritrea</option>
                        <option value="EEX">Estonia</option>
                        <option value="ETX">Ethiopia</option>
                        <option value="FKX">Falkland Islands</option>
                        <option value="FOX">Faroe Islands</option>
                        <option value="FJX">Fiji</option>
                        <option value="FIX">Finland</option>
                        <option value="FRX">France</option>
                        <option value="GFX">French Guiana</option>
                        <option value="PFX">French Polynesia</option>
                        <option value="GAX">Gabon</option>
                        <option value="GMX">Gambia</option>
                        <option value="GEX">Georgia</option>
                        <option value="DEX">Germany</option>
                        <option value="GHX">Ghana</option>
                        <option value="GIX">Gibraltar</option>
                        <option value="GB3">Great Britain</option>
                        <option value="GRX">Greece</option>
                        <option value="GLX">Greenland</option>
                        <option value="GDX">Grenada</option>
                        <option value="GPX">Guadeloupe</option>
                        <option value="GUX">Guam</option>
                        <option value="GTX">Guatemala</option>
                        <option value="GGX">Guernsey</option>
                        <option value="GNX">Guinea</option>
                        <option value="GWX">Guinea-Bissau</option>
                        <option value="GYX">Guyana</option>
                        <option value="HTX">Haiti</option>
                        <option value="HMX">
                          Heard Island and McDonald Islands
                        </option>
                        <option value="HNX">Honduras</option>
                        <option value="HKX">Hong Kong</option>
                        <option value="HUX">Hungary</option>
                        <option value="ISX">Iceland</option>
                        <option value="INX">India</option>
                        <option value="IDX">Indonesia</option>
                        <option value="IRX">Iran</option>
                        <option value="IQX">Iraq</option>
                        <option value="IEX">Ireland</option>
                        <option value="GB4">Isle of Man</option>
                        <option value="ILX">Israel</option>
                        <option value="ITX">Italy</option>
                        <option value="JMX">Jamaica</option>
                        <option value="JPX">Japan</option>
                        <option value="JEX">Jersey</option>
                        <option value="JTX">Johnston Atoll</option>
                        <option value="JOX">Jordan</option>
                        <option value="KZX">Kazakhstan</option>
                        <option value="KEX">Kenya</option>
                        <option value="KIX">Kiribati</option>
                        <option value="KPX">Korea, North</option>
                        <option value="KRX">Korea, South</option>
                        <option value="KWX">Kuwait</option>
                        <option value="KGX">Kyrgyzstan</option>
                        <option value="LAX">Laos</option>
                        <option value="LVX">Latvia</option>
                        <option value="LBX">Lebanon</option>
                        <option value="LSX">Lesotho</option>
                        <option value="LRX">Liberia</option>
                        <option value="LYX">Libya</option>
                        <option value="LIX">Liechtenstein</option>
                        <option value="LTX">Lithuania</option>
                        <option value="LUX">Luxembourg</option>
                        <option value="MOX">Macau</option>
                        <option value="MKX">Macedonia</option>
                        <option value="MGX">Madagascar</option>
                        <option value="MWX">Malawi</option>
                        <option value="MYX">Malaysia</option>
                        <option value="MVX">Maldives</option>
                        <option value="MLX">Mali</option>
                        <option value="MTX">Malta</option>
                        <option value="MHX">Marshall Islands</option>
                        <option value="MQX">Martinique</option>
                        <option value="MRX">Mauritania</option>
                        <option value="MUX">Mauritius</option>
                        <option value="YTX">Mayotte</option>
                        <option value="MXX">Mexico</option>
                        <option value="FMX">Micronesia</option>
                        <option value="MDX">Moldova</option>
                        <option value="MCX">Monaco</option>
                        <option value="MNX">Mongolia</option>
                        <option value="MSX">Montserrat</option>
                        <option value="MAX">Morocco</option>
                        <option value="MEX">Montenegro</option>
                        <option value="MZX">Mozambique</option>
                        <option value="MMX">Myanmar</option>
                        <option value="NAX">Namibia</option>
                        <option value="NRX">Nauru</option>
                        <option value="NVX">Navassa Island</option>
                        <option value="NPX">Nepal</option>
                        <option value="NLX">Netherlands</option>
                        <option value="NZX">New Zealand</option>
                        <option value="NIX">Nicaragua</option>
                        <option value="NEX">Niger</option>
                        <option value="NGX">Nigeria</option>
                        <option value="GB5">Northern Ireland</option>
                        <option value="MPX">Northern Mariana Islands</option>
                        <option value="NOX">Norway</option>
                        <option value="OMX">Oman</option>
                        <option value="PKX">Pakistan</option>
                        <option value="PWX">Palau</option>
                        <option value="PAX">Panama</option>
                        <option value="PGX">Papua New Guinea</option>
                        <option value="PYX">Paraguay</option>
                        <option value="PEX">Peru</option>
                        <option value="PHX">Philippines</option>
                        <option value="PLX">Poland</option>
                        <option value="PTX">Portugal</option>
                        <option value="PRX">Puerto Rico</option>
                        <option value="QAX">Qatar</option>
                        <option value="ROX">Romania</option>
                        <option value="RUX">Russia</option>
                        <option value="RWX">Rwanda</option>
                        <option value="KNX">Saint Kitts and Nevis</option>
                        <option value="LCX">Saint Lucia</option>
                        <option value="VCX">
                          Saint Vincent and Grenadines
                        </option>
                        <option value="OOX">Samoa</option>
                        <option value="SMX">San Marino</option>
                        <option value="STX">Sao Tome and Principe</option>
                        <option value="SAX">Saudi Arabia</option>
                        <option value="GB6">Scotland</option>
                        <option value="SNX">Senegal</option>
                        <option value="RSX">Serbia</option>
                        <option value="SCX">Seychelles</option>
                        <option value="SLX">Sierra Leone</option>
                        <option value="SGX">Singapore</option>
                        <option value="SKX">Slovakia</option>
                        <option value="SIX">Slovenia</option>
                        <option value="SBX">Solomon Islands</option>
                        <option value="SOX">Somalia</option>
                        <option value="ZAX">South Africa</option>
                        <option value="ESX">Spain</option>
                        <option value="LKX">Sri Lanka</option>
                        <option value="SXX">St. Maarten</option>
                        <option value="SDX">Sudan</option>
                        <option value="SRX">Suriname</option>
                        <option value="SZX">Swaziland</option>
                        <option value="SEX">Sweden</option>
                        <option value="CHX">Switzerland</option>
                        <option value="SYX">Syria</option>
                        <option value="TWX">Taiwan</option>
                        <option value="TJX">Tajikistan</option>
                        <option value="TZX">Tanzania</option>
                        <option value="THX">Thailand</option>
                        <option value="TLX">Timor-Leste</option>
                        <option value="TGX">Togo</option>
                        <option value="TOX">Tonga</option>
                        <option value="TTX">Trinidad and Tobago</option>
                        <option value="TNX">Tunisia</option>
                        <option value="TRX">Turkey</option>
                        <option value="TMX">Turkmenistan</option>
                        <option value="TCX">Turks/Caicos Islands</option>
                        <option value="TVX">Tuvalu</option>
                        <option value="UGX">Uganda</option>
                        <option value="UAX">Ukraine</option>
                        <option value="AEX">United Arab Emirates</option>
                        <option value="GBX">United Kingdom</option>
                        <option value="USA">United States</option>
                        <option value="UYX">Uruguay</option>
                        <option value="VIX">US Virgin Islands</option>
                        <option value="UZX">Uzbekistan</option>
                        <option value="VUX">Vanuatu</option>
                        <option value="VAX">Vatican City</option>
                        <option value="VEX">Venezuela</option>
                        <option value="VNX">Vietnam</option>
                        <option value="WKX">Wake Island</option>
                        <option value="GB7">Wales</option>
                        <option value="WFX">Wallis and Futuna</option>
                        <option value="PSX">West Bank/Gaza</option>
                        <option value="EHX">Western Sahara</option>
                        <option value="YEX">Yemen</option>
                        <option value="ZMX">Zambia</option>
                        <option value="ZWX">Zimbabwe</option>
                      </select>
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Address:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_address"
                        placeholder="Address"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>City:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_city"
                        placeholder="City"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>State/Province/Region:</label>
                      <select
                        name="trademark_organization_state"
                        class="form-control"
                          
                      >
                        <option value="">Select State/Province/Region</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Zip/Postal Code:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_zip_code"
                        placeholder="12345"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Phone:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="trademark_organization_phone"
                        placeholder="Phone"
                          
                      />
                    </div>

                    <div class="form-group org_own_fld" style="display: none">
                      <label>Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        name="trademark_organization_email"
                        placeholder="me@example.com"
                          
                      />
                    </div>

                    <div class="clone_fileds" style="display: none"></div>
                    <br>
                    <div
                      class="submits-wrapper d-md-flex justify-content-between align-items-center mt-3"
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
                      
                      
                      <button class="theme-btn" id="go_step_3">Continue</button>
                    </div>
                  <!-- </form> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    
    <script>


      document.addEventListener("click", function (event) {
        // Add owner
        if (event.target.classList.contains("add_owner")) {
          var numItems = document.querySelectorAll(".new_fields").length + 1;

          var newFields = document.createElement("div");
          newFields.classList.add("new_fields");

          newFields.innerHTML =
            '<div class="trash_this"><i class="fa fa-trash"></i></div>' +
            '<div class="form-group ind_own_fld">' +
            "<label> First Name:</label>" +
            '<input type="text" class="form-control" name="owner_first_name_' +
            numItems +
            '" placeholder="First name" >' +
            "</div>" +
            '<div class="form-group ind_own_fld">' +
            "<label> Last Name:</label>" +
            '<input type="text" class="form-control" name="owner_last_name_' +
            numItems +
            '" placeholder="Last Name" >' +
            "</div>";

          var submitsWrapper = document.querySelector(".submits-wrapper");
          submitsWrapper.parentNode.insertBefore(newFields, submitsWrapper);
        }

        // Delete owner
        if (event.target.classList.contains("trash_this")) {
          var parentFields = event.target.closest(".new_fields");
          if (parentFields) {
            parentFields.parentNode.removeChild(parentFields);
          }
        }
      });

      document.addEventListener("DOMContentLoaded", function () {
        var ownRadioInputs = document.querySelectorAll(
          "input[name='ownership_details_affiliated_with_your_trademark_application_answer']"
        );
        ownRadioInputs.forEach(function (input) {
          input.addEventListener("click", function () {
            var test = this.value;
            var indOwnFields = document.querySelectorAll(".ind_own_fld");
            var orgOwnFields = document.querySelectorAll(".org_own_fld");

            if (test === "organization") {
              indOwnFields.forEach(function (field) {
                field.style.display = "none";
              });
              orgOwnFields.forEach(function (field) {
                field.style.display = "block";
              });
            } else {
              orgOwnFields.forEach(function (field) {
                field.style.display = "none";
              });
              indOwnFields.forEach(function (field) {
                field.style.display = "block";
              });
            }
          });
        });
      });
    </script>
  </div>
</section>
<section id="step_3_" style="display:none;"><div class="header-2">
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
<!-- 
                <form class="" action="#"
                onsubmit="return false" method="post" novalidate> -->
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
                  <br/>
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
                      
                        <button  class="theme-btn" id="go_step_4">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                <!-- </form> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    
  </div>

</section>
<section id="step_4_" style="display:none;"> <div class="header-2">
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
              <!-- <form
                action="#"
                onsubmit="return false"
                method="post"
                novalidate
              > -->
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
                        
                          <button class="theme-btn"  id="go_step_5">
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
              <!-- </form> -->
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

    

    
  </div>

</section>
<section id="step_5_" style="display:none;"><style>
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
          <!-- <form
            action="#"
            onsubmit="return false"
            method="post"
            class="step5_validate"
            style="position: relative"
          > -->
            <div class="bgform pboxcolor" style="position: relative">
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
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Basic Branding Application Package"
                        data-term="1"
                        data-price="35"
                        va=""
                         id="go_step_6_pb_1"
                         onclick="dataAmount(35)"
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
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Standard Branding Application Package"
                        data-term="1"
                        data-price="135"
                         id="go_step_6_pb_2"
                         onclick="dataAmount(135)"
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
                        class="btn-normal data-pkg scroll-dwn-cont"
                        data-pkg="Premium Branding Application Package"
                        data-price="235"
                        data-term="0"
                         id="go_step_6_pb_3"
                         onclick="dataAmount(235)"
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
          <!-- </form> -->
        </div>
      </div>
    </section>

    

    

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

</section>
<section id="step_6_" style="display:none;"><div class="header-2">
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
            <li><span class="completed"></span></li>
            <li><span class="completed"></span></li>
            <li><span></span></li>
          </ul>
        </div>
        <div class="col-md-12">
          <div class="form_wrap" style="position: relative">
            <div class="bg-gradient"></div>
            <!-- <form
              action="#"
              onsubmit="return false"
              method="post"
              class="step5_validate"
              style="position: relative"
            > -->
              <div class="bgform pboxcolor" style="position: relative">
                <h3>
                  You are almost done! Now just pick the processing speed that
                  is right for you.
                  <span> Step-6 </span>
                </h3>

                <div class="expedited-box">
                  <h6>
                    RUSH PRIORITY PROCESSING. NEXT DAY PROCESSING WHEN YOU NEED
                    YOUR MARK FILED QUICKLY.
                  </h6>
                  <p class="form-para">
                    Since you ordered a paid search, we will send you your
                    search results before the end of the next business day (as
                    long as you have sent us your specimen) and file your
                    application as soon you confirm your order after you receive
                    your results and provide us with any additional necessary
                    information.
                  </p>

<!--                   <div class="form-check">
                    <label>
                      <input type="checkbox" name="exp_term" data-uspto="49" />
                      <em
                        style="
                          color: #ff4a00;
                          font-size: 14px;
                          vertical-align: top;
                        "
                        >*</em
                      >24-hour Expedited Processing (Next Business Day):
                      <span style="color: #ff4a00">$49.00 USD </span></label
                    >
                  </div> -->
                  <span
                    class="expedited-info"
                    name="expedited_processing"
                    checked=""
                    value="49"
                  >
                    OPTIONAL
                  </span>
                </div>

                <div class="form-check">
                  <label>
                    <input
                      type="checkbox"
                      name="acp_term"
                      checked=""
                      value="acp_term"
                    />
                    *I accept the Terms. I have read, understand, &amp; agree to
                    the terms of service.
                  </label>
                </div>

                <div class="ov_box inner-content termbox-text">
                  <p>
                    By continuing forward with the Secure Your Mark website
                    (the “Website”), you agree to all of the following terms and
                    conditions as a binding agreement between you and Secure Your Mark
                    , LLC (referred to as “we”, “us” or “our”). This
                    Agreement also assimilates our Privacy Policy as is set
                    forth at an extensive length herein. If you do not see
                    yourself agreeing to these terms and conditions, kindly
                    refrain from using the Website.
                  </p>
                  <p>
                    We are the providers of general information and updates
                    related to and concerning trademarks, and provide a website
                    that allows you to prepare and file trademarks. We are not a
                    law entity. We do not provide, and are not qualified to
                    provide you with legal advice.
                  </p>
                  <h3>
                    THIS AGREEMENT BELOW IS INCLUSIVE OF A BINDING ARBITRATION
                    PROVISION GOVERNED BY THE FEDERAL ARBITRATION ACT AND A
                    WAIVER OF CLASS ACTIONS.
                  </h3>
                  <h4>THE CONDITIONS FOR THE USAGE OF OUR WEBSITE</h4>
                  <p>
                    You are allowed to to use this Website on the precondition
                    that you agree that you:
                  </p>
                  <ul>
                    <li class="first">Will abide by these Terms of Usage;</li>
                    <li>You are 18 years of age or older;</li>
                    <li>
                      Will not replicate or redistribute any portion of this
                      Website in any manner without legally seeking our prior
                      written consent;
                    </li>
                    <li>
                      Will provide correct and non-falsified information when
                      creating a new account, submitting and uploading content,
                      or registering for our Website;
                    </li>
                    <li>
                      Will strictly not allow any other personnel to access this
                      Website utilizing your User ID;
                    </li>
                    <li>
                      Are solely and individually responsible for your User ID,
                      and all of the activity that takes place through your User
                      ID;
                    </li>
                    <li>
                      Will not utilize the Website for any commercial or
                      merchandizing purposes other than the strictly specific
                      commercial activities contained wherein on the Website
                    </li>
                    <li>
                      Will not use the Website to obtain any form of data or
                      personal information on any of the other users, or to
                      solicit other users, merchants, or advertisers;
                    </li>
                    <li>
                      Are solely and individually responsible for all content
                      shared, posted, and provided by your ID on the Website,
                      including, but not restricted to discussion posts, your
                      biodata, external links, videos, and photographs including
                      the ownership of any licenses or rights necessary to use
                      the content creations of others and will not submit any
                      copyrighted materials or work subject to other's
                      proprietary rights;
                    </li>
                    <li>
                      Allow the Website and other users a non-exclusive license
                      to read your materials and to use, reproduce, distribute,
                      prepare derivative works of and/or display any materials
                      provided by you;
                    </li>
                    <li class="last">
                      And agree that we have the complete authority to remove
                      any and/or all of your content and suspend your account
                      with or without any prior notification.
                    </li>
                  </ul>
                  <h4>YOUR ACCOUNT PROFILE</h4>
                  <p>
                    To be granted access to certain sections of the Website, we
                    might oblige you to create an account and/or profile. All of
                    the information provided by you must be accurate, true,
                    non-falsified, and you agree to maintain said information
                    frequently updated. Any individual whose privilege to use
                    the Website was previously revoked by the executive
                    authority is not allowed to register for another profile or
                    account, nor can they use someone else's profile or account
                    to use the site or create an account on their behalf.
                  </p>
                  <p>
                    Because the communal sharing and collusion of User IDs is
                    strictly not allowed, we shall presume that the log-ins to
                    the Website through your User ID are, in fact, being
                    performed by you. Regardless of the circumstances, you stand
                    wholly responsible for any and all access to the Website by
                    individuals using your User ID. If you believe your User ID
                    is being maliciously used without your informed
                    authorization, notify us immediately to have us on board at
                    support@secureyourmark.com
                  </p>
                  <h4>YOUR CONTENT</h4>

                  <ul>
                    <li>
                      Infringes upon the copyright, trademark, trade secret, or
                      other cognitive property or proprietary rights of others;
                    </li>
                    <li>
                      Exploits the privacy, publicity, legal, or other rights of
                      third parties;
                    </li>
                    <li>
                      is against the law, untrue, not accurate, derogatory,
                      discriminatory, hateful, un-sanctimonious, libelous,
                      pornographic or sexually implicit and/or explicit,
                      obscene, abusive, threatening, harassing, or propagates
                      conduct that would be considered incriminating, giving
                      rise to civil disruption and liability, violates any law,
                      or is in any other format inappropriate, as decided by us
                      in our sole discretion; or
                    </li>
                    <li>
                      Is capable of damaging or harming the reputation of our
                      company, parent company, sister companies, affiliates,
                      advertisers, merchants, or other parties.
                    </li>
                    <li>
                      We are not required in any way to withdraw any UGC that
                      may violate one or more of these limitations. We may, but
                      are not committed to, remove any UGC in violations of
                      these terms, terminate user accounts or take other
                      actions. We are not to be held accountable for any loss
                      caused to you by UGC.
                    </li>
                  </ul>
                  <h4>YOUR CONDUCT</h4>
                  <p>By using the Website, You agree not to:</p>
                  <ul>
                    <li>
                      Initiate or participate in the promotion of any illegal
                      activities;
                    </li>
                    <li>
                      Make any attempts to reverse engineer or intrude in any
                      way with the operation of the Website or otherwise
                      endeavor to derive the source code of the software
                      (including the tools, methods, processes, and
                      infrastructure);
                    </li>
                    <li>
                      Device schemes to gain access to codified portions of the
                      Website;
                    </li>
                    <li>
                      Use the Website to generate unsolicited email marketing
                      schemes or spamming;
                    </li>
                    <li>
                      Use any automated or manual process to surf or unearth
                      codified data from the Website;
                    </li>
                    <li>
                      Interfere in any way with the regular operation of the
                      Website; or
                    </li>
                    <li>Masquerade as another user.</li>
                  </ul>
                  <h4>LINKS TO OTHER SITES</h4>
                  <p>
                    We may (or may not) have associations with third-party
                    websites that are not possessed, regulated, or operated by
                    us. We do not presume any responsibility for the content,
                    privacy policies, or practices of any other websites or
                    their owners. Do not suppose that we are advertising or
                    advocating for any other websites, products, or services,
                    based on the mere integration of a link to another website.
                  </p>
                  <h4>TERMINATION</h4>
                  <p>
                    We hold the complete authority to make adjustments to, or
                    terminate the Website or any of the services furnished
                    herein at any time without prior notice. We also hold the
                    right to terminate this Agreement at our election and for
                    any reason, without prior announced notification. This
                    Agreement will automatically terminate if, in our sole
                    judiciousness, you violate any of the terms and conditions
                    drafted below. A termination will result in the immediate
                    suspension of access to the Website. The Disclaimers of
                    Warranty and Limitation of Liability, Indemnity, Dispute
                    Resolution sections, and all terms and conditions related to
                    your Content shall sustain the termination of this
                    Agreement.
                  </p>
                  <h4>DISPLAY OF DATA AND SEARCH</h4>
                  <p>
                    We are dependent upon State records and may exhibit them on
                    this website. While we continually attempt to make use of
                    the latest information available, we cannot guarantee its
                    accuracy, reliability, or timeliness.
                  </p>
                  <h4>CALENDAR REMINDERS</h4>
                  <p>
                    As a significant segment of our services, we may offer
                    reminders or notifications about upcoming and fast
                    approaching deadlines that may apply to your trademark.
                    These notifications are only for informational purposes and
                    are the general standards applicable to most trademarks. It
                    is advised that you consult a licensed attorney regarding
                    applicable deadlines to your particular situation, as
                    individualized situations have guidelines more specific than
                    general ones. Please do not presume that the automated
                    notifications are legal frameworks. We do not offer any form
                    of legal advice or legal interpretation on specific
                    situations.
                  </p>
                  <h4>CREATION OF FORMS AND DISCLAIMER</h4>
                  <p>
                    Please comprehend the distinction: We are a technology
                    platform that aids in the creation of forms and not a law
                    entity or legal service provider. In the event that you
                    purchase one or more than one package that is inclusive of
                    cease and desist, assignment of trademark letters, or other
                    forms, you will be eligible to a form document that is
                    inclusive of the information provided by you or from your
                    uploaded files. We are not a legal alternative, making us
                    ineligible for proving you with legal suggestions. Our
                    customer service representatives are not required to answer
                    any of your legal queries, nor will they entertain any law
                    related conversations. Any information transmissions between
                    yourself and our customer service representatives are not
                    monitored and thus, you should refrain from sharing any
                    confidential information with them. We provide assistance in
                    the preparation of your trademark application but cannot
                    file it for you as your counsel of record. We are not
                    responsible for providing you with any legal advice related
                    to your particular trademark.
                  </p>
                  <p>
                    We may voluntarily, but by no contractual binding are
                    required to review the data you provide us with for
                    completeness, fraudulence, or administrative errors. Under
                    no specified instances are we responsible for reviewing your
                    provided answers for legal accuracy, legal counsel, advice,
                    or opinions. We do not review your data for any legal
                    purposes, nor do we provide legal recommendations about
                    legal rights, remedies, defenses, options, selection of
                    forms, or strategies, or apply the law to the facts of your
                    particular case.
                  </p>
                  <p>
                    In the event that you are under the assumption that you have
                    received any legal assistance or consultancy from us, you
                    will not make your purchase. You accept and understand that
                    your purchase, download, or usage of a form document is not
                    a legal action and is devoid of any legal advice.
                    Additionally, you accept and understand that each form, and
                    all applicable instructions or guiding texts are not
                    designed to meet your individual needs.
                  </p>
                  <p>
                    KINDLY NOTE THAT WE RETAIN YOUR CREDIT CARD DATA IN ORDER TO
                    BE ABLE TO PAY THE STATE FILING FEE ASSOCIATED WITH YOUR
                    ORDER. WE RETAIN YOUR CREDIT CARD INFORMATION ONLY AFTER YOU
                    ARE SATISFIED AND ABLE TO APPROVE THE APPLICATION, WITH THE
                    COST OF THE FILING FEE BROUGHT INTO YOUR COGNIZANCE BEFORE
                    BEING FILED.
                  </p>
                  <p>
                    We provide you with a draft of the application for your
                    review. If you do not respond with timeliness, you authorize
                    us to sign your name to the application, file it as provided
                    in the draft, and to collect from you the governmental
                    filing fee of $350 per class at that time.
                  </p>
                  <h4>SEARCH SERVICES</h4>
                  <p>
                    If you utilize our search services, we use commercially and
                    professionally reasonable methods to identify marks that may
                    be tallied with the ones you seek to use. We, however,
                    cannot guarantee that your mark will make it through and be
                    approved even if you use our search services. There may be a
                    number of reasons the USPTO rejects your mark and there are
                    circumstances where an automated search may not be able to
                    identify a mark the USPTO qualifies as a reason for
                    rejection.
                  </p>
                  <p>
                    Similarly, when your order is inclusive of common law mark
                    searches, we use commercially justifiable methods to
                    identify marks that may be an equal match to the ones you
                    seek to use. We, however, do not guarantee that your mark
                    will be absent of or prevailing all claims or challenges
                    made by holders of common law rights to all marks. There are
                    amongst some of the instances where an automated search may
                    not be able to identify a regular law mark that may be
                    similar to your mark
                  </p>
                  <p>
                    The aim of the search report is to give you with the
                    necessary marks to satisfy the parameters identified for the
                    specific kind of search you use. It is not designed to be a
                    legal framework or legal advice as to whether your proposed
                    mark will be dismissed, or whether it would be considered
                    resembling to another mark. You may want to seek the counsel
                    of an attorney regarding the outcomes of the search report
                    we furnish you.
                  </p>
                  <p>
                    Our Secure Your Mark, LLC federal trademark search reviews
                    the USPTO database and is restricted to direct matches,
                    phonetically similar, similar in terms of translation, or
                    appearance by way of design.
                  </p>

                  <p>
                    Our Secure Your Mark, LLC federal, government and common
                    law search reviews the USPTO database, the databases of all
                    50 states, a business registry and the database of domain
                    names. It is restricted to only direct matches, phonetically
                    similar, similar in terms of translation, or appearance by
                    way of design.
                  </p>

                  <p>
                    Our Secure Your Mark, LLC global search reviews the USPTO
                    database, the databases of all 50 states, a business
                    registry, the database of domain names, the World
                    Intellectual Property Organization (“WIPO”) database and the
                    European Community database. It is restricted to direct
                    matches, phonetically similar, or appearance by way of
                    design.
                  </p>
                  <h4>TRADEMARK MONITORING SERVICES</h4>
                  <p>
                    Our trademark monitoring services assess the filing of new
                    applications that are direct matches, phonetically similar,
                    similar in terms of translation, or appearance by way of
                    design to your marks as published in the Official Gazette of
                    the USPTO and US Trademark Pros, LLC.
                  </p>
                  <h4>DISCLAIMERS OF WARRANTY AND LIMITATIONS OF LIABILITY</h4>
                  <p>
                    We provide the Website and related services "as is",
                    “whereis”, and "as available." We undertake no express
                    and/or implied warranties or guarantees about the Website,
                    and the goods and services described therein, or the
                    Merchants and Advertisers. TO THE MAXIMUM EXTENT ALLOWED BY
                    THE LAW, WE AND OUR OFFICERS, DIRECTORS, AGENTS, VENDORS,
                    AND THE BUSINESSES WHO MARKET WITH US DISCLAIM ANY AND ALL
                    EXPRESS OR IMPLIED WARRANTIES THAT THE WEBSITE AND SERVICES
                    ARE MERCHANTABLE, OF ACCEPTABLE QUALITY, ACCURATE,
                    SEASONABLE, OR FIT FOR A SPECIFIC PURPOSE OR DEMAND. WE IN
                    NO FORM GUARANTEE THAT WE WILL MEET YOUR REQUIREMENTS, ARE
                    ERROR-FREE, ACCURATE, RELIABLE, WITHOUT INTERRUPTION, OR
                    AVAILABLE 24/7. WE MAKE NO GUARANTEE THAT YOU WILL BE ABLE
                    TO ACCESS OR USE THE WEBSITE AT TIMES OR LOCATIONS OF YOUR
                    CHOOSING.
                  </p>

                  <p>
                    YOUR SOLE AND CUSTOMIZED SOLUTION FOR ANY DISPUTE OR CLAIM
                    WITH US IS TO HALT USE OF THE WEBSITE. WE, OUR AFFILIATES,
                    OFFICERS, DIRECTORS, AGENTS, VENDORS, AND MERCHANTS WHO
                    MARKET HERE, SHALL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL,
                    INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES THAT ARISE
                    FROM YOUR USE OF, INABILITY TO USE, OR RELIANCE UPON THE
                    WEBSITE IN ANY WAY. THESE EXCLUSIONS APPLY TO ANY CLAIMS FOR
                    LOST PROFITS, LOST DATA, LOSS OF GOODWILL, WORK STOPPAGE,
                    COMPUTER FAILURE OR MALFUNCTION, HARM, OR LOSS TO ANY OTHER
                    EQUIPMENT, OR ANY OTHER COMMERCIAL DAMAGES OR LOSSES, EVEN
                    IF WE KNEW OR SHOULD HAVE FORESEEN THE POSSIBILITY OF SUCH
                    DAMAGES. IF ANY JURISDICTION DOES NOT PERMIT THE
                    DISTINGUISHING OR THE LIMITATION OF LIABILITY FOR
                    CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH JURISDICTION,
                    OUR LIABILITY, AND THE LIABILITY OF OUR AFFILIATES,
                    OFFICERS, DIRECTORS, AGENTS, VENDORS, AND MERCHANTS WHO
                    ADVERTISE HERE, SHALL BE LIMITED TO THE EXTENT GRANTED BY
                    LAW.
                  </p>

                  <p>
                    In connection with the ongoing release, you hereby waive
                    California Civil Code Section 1542 (and any similar
                    provision in any other jurisdiction) which states: “A
                    general release does not extend to claims which the creditor
                    does not know or suspect to exist in his favor at the time
                    of executing the release, which, if known by him must have
                    materially affected his settlement with the debtor.”
                  </p>
                  <h4>Indemnity</h4>
                  <p>
                    You agree to defend, indemnify, and hold blameless us, our
                    officers, directors, representatives, employees, and agents
                    and all of our parent companies, affiliates, related
                    companies, merchants, and their executives, officers,
                    directors, representatives, employees and agents from and
                    against any and all claims, damages, obligations, losses,
                    liabilities, costs or debt, legal obligations, and expenses
                    (including, but not limited to, reasonable attorney's fees)
                    arising from: (i) your violation of any term of these Terms
                    of Service; (ii) your violation of any third party right,
                    including without restriction any copyright, property,
                    privacy right, or any and all incorporeal or intellectual
                    property rights; or (iii) any claim that any of your UGC
                    causes harm to a third party.
                  </p>
                  <h4>Dispute Resolution</h4>
                  <p>
                    For the purposes of this Section, all references to "US
                    Trademark Solutions," "you," and "us" are inclusive of our
                    respective subsidiaries, affiliates, agents, employees,
                    business partners, predecessors in interest, successors, and
                    assigns, as well as all authorized or unauthorized users or
                    beneficiaries of services or products under these Terms or
                    any prior agreements between us.
                  </p>
                  <p>
                    In this Agreement, Dispute is described as “any dispute,
                    claim or controversy between you and Secure Your Mark, LLC,
                    its members, officers, directors, agents, parent companies
                    and vendors that arises out of or relates to this Agreement
                    or use of the Site or Service, or otherwise regarding any
                    aspect of your relationship with Secure Your Mark that has
                    accrued or may thereafter accrue, whether based in contract,
                    statute (including, but not limited to, any consumer
                    protection statutes, regulation, ordinance, tort (including,
                    but not limited to, fraud, misrepresentation, fraudulent
                    inducement, negligence or any other intentional tort), or
                    any other legal or equitable theory.”
                  </p>
                  <p>
                    The un-predictiveness of any Disputes is governed by the
                    Federal Arbitration Act and not any state laws applicable to
                    arbitrations. Regarding the substantive and significant law
                    of any Disputes, to the optimal extent authorized by law,
                    the laws of the State of California govern the
                    non-arbitration related interpretation of this Agreement and
                    the substantive law of any Dispute, notwithstanding of
                    clashes of laws and principles.
                  </p>

                  <p>
                    Arbitration. Any Dispute shall be CONCLUSIVELY and
                    EXCLUSIVELY solved by bonding individual arbitration
                    conducted by the American Arbitration Association (“AAA”)
                    under its Consumer Arbitration Rules. This arbitration
                    agreement is made pursuant to a transaction involving
                    interstate commerce, and shall be governed by the Federal
                    Arbitration Act (9 U.S.C. 1-16).
                  </p>

                  <p>
                    ARBITRATION OF YOUR CLAIM IS COMPULSORY AND IRREVOCABLE.
                    NEITHER PARTY WILL HAVE THE RIGHT TO LITIGATE THAT CLAIM
                    THROUGH A COURT. IN ARBITRATION, NEITHER PARTY WILL HAVE THE
                    RIGHT TO A JURY TRIAL OR TO ENGAGE IN DISCOVERY, EXCEPT AS
                    PROVIDED FOR IN THE AAA CODE OF PROCEDURE.
                  </p>

                  <p>
                    All regulations as to the scope, interpretation,
                    enforceability, applicableness, and validity of this
                    Agreement shall be made final solely by the arbitrator,
                    which award shall be contractually binding and final.
                    Judgment on the arbitration award may be entered in any
                    court having jurisdiction. This arbitration provision shall
                    survive: i) the termination of the Agreement; or ii) the
                    bankruptcy of any party. If any portion of this arbitration
                    provision is declared void, invalid or unenforceable, the
                    remaining sections shall remain enforceable.
                  </p>

                  <p>
                    NO CLASS ACTION, OR OTHER REPRESENTATIVE ACTION OR PRIVATE
                    ATTORNEY GENERAL ACTION OR JOINDER OR CONSOLIDATION OF ANY
                    CLAIM WITH A CLAIM OF ANOTHER PERSON OR CLASS OF CLAIMANTS
                    SHALL BE ALLOWABLE.
                  </p>

                  <p>
                    THE RIGHT TO OPT OUT OF BINDING ARBITRATION AND CLASS ACTION
                    WAIVER WITHIN 30 DAYS. IF YOU DO NOT WISH TO BE BOUND BY THE
                    BINDING ARBITRATION AND CLASS ACTION WAIVER IN THIS SECTION,
                    YOU ARE REQUIRED TO NOTIFY US IN WRITING WITHIN 30 DAYS OF
                    THE DATE THAT YOU ACCEPT THIS AGREEMENT. YOUR WRITTEN
                    NOTIFICATION MUST BE E-MAILED TO Secure Your Mark, LLC,
                    SUPPORT@ustrademarkpros.com WITH THE SUBJECT LINE “OPT-OUT'
                    AND INCLUDE: (1) YOUR NAME, (2) YOUR ADDRESS, AND (4) A
                    CLEAR STATEMENT THAT YOU DO NOT WISH TO RESOLVE DISPUTES
                    WITH US THROUGH ARBITRATION.
                  </p>

                  <p>
                    Any arbitration will be administered by the AAA under its
                    Commercial Arbitration Rules. If the value of the dispute is
                    $75,000 or less, its Supplementary Procedures for
                    Consumer-Related Disputes shall also be applicable. On
                    disputes involving $75,000 or less, we will punctually
                    reimburse your filing fees and pay the AAA's and
                    arbitrator's fees and expenses. You agree to start
                    arbitration only in your county of permanent residence or in
                    California, US. We agree to commence arbitration only in
                    your county of residence. You may request a telephonic or
                    in-person hearing by following the AAA rules. In a dispute
                    involving $10,000 or less, any hearing will be telephonic
                    unless the arbitrator finds good cause to hold an in-person
                    hearing instead. The arbitrator may award the same damages
                    to you individually as a court could. The arbitrator may
                    award declaratory or injunctive relief only to you
                    individually, and only to the extent required to satisfy
                    your individual claim. Nothing herein restricts Secure Your Mark
                    , LLC from demanding the arbitrator to award
                    Secure Your Mark, LLC all costs of the arbitration
                    including any Administrative Fees paid on your behalf.
                  </p>

                  <p>
                    If the Dispute is not arbitrated by the choice of the
                    parties or a court does not compel arbitration if either
                    party elects to arbitrate for whatever reason, the Dispute
                    will be decided by a court without any right by either party
                    to a trial by jury. Any such court proceeding, including any
                    efforts to compel arbitration or initially filed lawsuits
                    that arise out of or relate to this Agreement or use of the
                    Sites shall be resolved exclusively by a court of proficient
                    jurisdiction located within California.
                  </p>
                  <h4>Intellectual Property</h4>
                  <p>
                    We, or people from whom we obtained a license, retain
                    ownership of all intellectual property rights of any kind
                    affiliated with the Website, inclusive of all applicable
                    trademarks, copyrights, and other proprietary rights such as
                    trade secrets. Through the use of this Website pursuant to
                    this Agreement, you have a privileged and restricted right
                    to use the Website, but by no means are we granting any
                    license to you under any of those intellectual property
                    rights. We hold all rights that are not expressly granted to
                    you in this Agreement. You may print limited numbers of one
                    or more pages from the Website for your personal use.
                  </p>

                  <p>
                    We retain, to the highest lengths possible, all ownership,
                    without limitation, of all the text, software, scripts,
                    graphics, photos, sounds, interactive features and the
                    trademarks, service marks and logos contained therein
                    ("Marks") unless they are marks used by Merchants who have
                    provided them to us for use on this Website. The Marks are
                    owned or licensed to us, subject to copyright and other
                    intellectual property rights under the law of the United
                    States of America, the law of the dominion where you reside,
                    and international conventions. All content on the Website
                    provided by us is provided to you “AS IS” for your
                    information and personal use only and may not be used,
                    copied, reproduced, modified, distributed, transmitted,
                    broadcast, displayed, sold, licensed, plagiarized, or
                    otherwise exploited for any other purposes whatsoever
                    without the prior written and drafted consent of the
                    respective owners. We reserve all rights not expressly
                    granted in and to the Website.
                  </p>

                  <p>
                    You retain any intellectual property rights in any
                    copyrighted materials and trademarks that are contained in
                    UGC that you post to the Website. You grant us an
                    irrevocable, perpetual, non-exclusive, royalty-free, fully
                    paid, worldwide license, with rights to sublicense through
                    multiple levels of sub licensees, to reproduce, make
                    derivative works of, translate, distribute, publicly perform
                    and publicly display in any form or medium, whether now
                    known or later developed, make, use, sell, import, offer for
                    sale, otherwise commercially exploit and exercise any and
                    all such rights, under any and all of your intellectual
                    property rights related to the UGC in any manner decided by
                    us.
                  </p>

                  <h4>Copyright Notice</h4>
                  <p>
                    If you believe we have infringed on your copyrights, please
                    submit a notification pursuant to the Digital Millennium
                    Copyright Act (17 U.S.C. § 512(c)(3) in writing to
                    support@ustrademarkpros.com or to the copyright agent on
                    file with the U.S. Copyright Office with the Subject:
                    “copyright notice.” Your notice needs to include: (1) A
                    physical or electronic signature of a person authorized to
                    act on behalf of the owner of an exclusive right that is
                    reportedly contravened; (2) Identification of the
                    copyrighted work claimed to have been infringed, or, if
                    multiple copyrighted works at a single online site are
                    covered by a single notification, a representative list of
                    such works at that site; (3) Identification of the material
                    that is claimed to be infringing or to be the subject of
                    infringing activity and that is to be removed or access to
                    which is to be disabled and information reasonably
                    sufficient to permit the service provider to locate the
                    material; (4) Information reasonably sufficient to permit
                    the service provider to contact you, such as an address,
                    telephone number, and, if available, an electronic mail; (5)
                    A statement that you have affable sense of faith and belief
                    that use of the material in the manner complained of is not
                    authorized by the copyright owner, its agent, or the law;
                    and (6) A statement that the information in the notification
                    is accurate, and under penalty of perjury, that you are
                    authorized to act on behalf of the owner of an exclusive
                    right that is allegedly infringed.
                  </p>

                  <h4>Entire Agreement</h4>
                  <p>
                    This Agreement, including the Privacy Policy, constitutes
                    the entire agreement of the parties with respect to the
                    subject matter hereof. No waiver by either party of any
                    breach or default hereunder is a waiver of any preceding or
                    ensuing breach or default.
                  </p>
                  <h4>Modifications to the Agreement</h4>
                  <p>
                    We reserve the right at all times to discontinue or alter
                    any of these terms and/or our Privacy Policy as we deem
                    necessary or desirable. Such changes may include, among
                    other things, the adding of certain fees or charges. We may,
                    but are not necessarily obligated to notify you via email of
                    any substantial changes, by sending you an e-mail to the
                    e-mail address that is registered with your account and/or
                    by posting notice of the change on the Website. Any changes
                    to this Agreement will be effective upon the advancing of
                    our transmittal of an e-mail notice to you or our posting of
                    notice of the changes on our Website. We suggest you,
                    therefore, re-read this section of our Website from time to
                    time to stay informed of any such changes. Use of the
                    Website by you after such notice shall be deemed to
                    constitute acceptance by you of such modifications.
                  </p>

                  <h4>Authorization</h4>
                  <p>
                    By submitting an order, you acknowledge that you are giving
                    us the authority to list ourselves, along with you, as a
                    recipient of correspondence from the USPTO related to your
                    trademarks. You may alter this at any time, but including us
                    allows us to better serve you and may prevent us from
                    providing certain services such as monitoring and
                    calendaring.
                  </p>

                  <h4>Refund Policy</h4>
                  <p>
                    The Secure Your Mark strives to meet the trademark needs of
                    our customers in a professional, cordial, and effective
                    manner. We want every single customer to be 100% satisfied,
                    so we will work with any customer who has any questions or
                    concerns about their filings. Our customer service team is
                    made up of dedicated and courteous trademark representatives
                    with one goal - to meet each client's needs in a friendly,
                    caring, and efficient manner. If you do not think we have
                    met this goal, let us know and we will be happy to make
                    every effort to resolve the issues to your satisfaction. You
                    can send us an email at support@ustrademarkpros.com or call
                    us toll free at +1 (855) 267-6525.
                  </p>

                  <p>
                    If we make any mistakes in your filing, we will do our level
                    best to admit it and make the necessary improvements needed
                    to fix the correction as soon as we can at no additional
                    cost to you. Please note the Secure Your Mark fees and all
                    government levied fees involved in your filing services are
                    non-refundable. The USPTO may experience delays or deny your
                    application without any fault of the Secure Your Mark.
                    These issues are beyond our control and will not be the
                    basis for a refund.
                  </p>

                  <p>
                    If you decide that you want a refund, all such requests must
                    be submitted before the initial trademark search clearance
                    report is conducted. Your refund will be issued in the same
                    form that it was received. For example, if the payment to
                    Secure Your Mark, LLC was made by credit card then the
                    refund will be issued to the same credit card used to make
                    the payment. However, if you choose, you may request to
                    receive a credit for future Secure Your Mark, LLC
                    purchases/payments instead of a refund.
                  </p>

                  <h4>Miscellaneous</h4>
                  <p>
                    We hold the total rights, but are not necessitated, to
                    restrict the sales of our products or services to any
                    person, geographic region, or jurisdiction. We may exercise
                    this right on a case-by-case basis. All descriptions of
                    products or product pricing are subject to change at any
                    time without notice, at our sole decision making. We
                    maintain the rights to discontinue any product at any time
                    without any prior notice. Any offer for any product or
                    service made on this site is nullified where prohibited.
                  </p>

                  <p>
                    The section headings used herein are for the sake of
                    convenience only and shall be of no legal force or effect.
                    If any provision of this Agreement is held lawfully invalid
                    by a court of competent jurisdiction, such invalidity shall
                    not have any effect on the enforceability of any other
                    provisions contained in this Agreement, and the remaining
                    portions of this Agreement shall continue function in full
                    force and effect. There are no third-party beneficiaries of
                    this Agreement. You may not assign this Agreement or your
                    rights and obligations hereunder, in completeness or
                    partially, to any third party without our prior written
                    consent, and any attempt by you to do so will be invalid.
                  </p>
                </div>

                <input
                  type="hidden"
                  name="exp_term_fee"
                  class="exp_term_fee"
                  value="0"
                />

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
                      <input
                        type="hidden"
                        name="save_form_manually"
                        value="0"
                      />
                      <!--<div class="form-btns"> <a href="javascript:;" onClick="window.history.back();" class="btn-prev btn btn-transparent">Previous</a>-->
                      <div class="form-btn-inner">
                     
                        <button  class="theme-btn"  id="go_step_7">
                          Continue
                        </button>
                        <!--<a href="javascript:;" class="save_form_manually btn btn-transparent">Save For Later</a> </div>-->
                      </div>
                      <input type="hidden" name="send" value="1" />
                    </div>
                  </div>
                </div>
              </div>
            <!-- </form> -->
            <!--  form end -->
          </div>
          <p class="m-t-20" style="position: relative; padding-top: 30px">
            <small class="fonts-inter">
              Later in this process, Secure Your Mark collects and pays the
              government-discounted TEAS Standard electronic filing fee of $350.
              In some circumstances, your application may qualify for the
              less-available TEAS PLUS system which means we will pay $250 to
              the USPTO which streamlines the process. If your application
              qualifies for TEAS PLUS, we will use it and retain the difference
              between the TEAS Standard filing fee and the TEAS Plus filing fee
              as a result of the additional processing by the Secure Your Mark.
            </small>
          </p>
        </div>
      </div>
    </section>

    <script>
      jQuery(document).ready(function($) {
        $('input[type="checkbox"][name=exp_term]').click(function () {
          if ($(this).prop("checked") == true) {
            $(".exp_term_fee").val($(this).attr("data-uspto"));
          } else if ($(this).prop("checked") == false) {
            $(".exp_term_fee").val(0);
          }
        });
      });
    </script>

    
    
  </div>
</section>
<section id="step_7_" style="display:none;">
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
				
                <p></p><input type='hidden' value='' name='payment_price' id='payment_price'>
				  <input type='hidden' value='action_double' name='action_double' id='_price'>
                <a id='pay_button' href="" class="open_payment"
                  >Pay $<span class="selected_package_amount"></span>  <img src="<?php  echo plugins_url('', __FILE__);?>/assets/images/right-arrow.png" class="r-arrow"></a>
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
      </form>
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

    <!-- commit: added by anik start -->
      <section id="checkoutPopup" style="display:none;">
        <div class="co_popup_box_wrap">
          <div id="co_failed_msg">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#e50606"
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
                />
              </svg>
            </span>
            <h1 id="co_failed_msg_h1"></h1>
          </div>
          <div class="co_popup_box">
            <div class="cop_header_wrap">
              <div class="cop_header">
                <img
                  src="https://secureyourmark.com/wp-content/uploads/2024/01/LOGO-PNG-1.png"
                  alt="Secure Your Mark"
                />
                <h4>
                  <span id="co_cart_icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill="#e95200"
                    >
                      <path
                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                      />
                    </svg>
                  </span>
                  <span id="co_check_icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#e95200"
                    >
                      <path
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      />
                    </svg>
                  </span>
                  <span>$</span><span id="header_amount"></span>
                </h4>
              </div>
            </div>
            <div class="cop_body_wrap" id="cop_body_wrap_">
              <div class="cop_body_head">
                <h1>Pay with debit or credit card</h1>
                <p>
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
                      /></svg></span
                  >Financial information will be secure.
                </p>
              </div>
              <div class="cop_body">
                <div class="cop_input_row">
                  <div class="cop_input_col">
                    <div class="cop_input_box">
                      <label for="cop_country">country</label>
                      <select name="" id="cop_country">
                        <option data-addr="93" value="AF">AFGHANISTAN</option>
                        <option data-addr="358" value="AX">ALAND ISLANDS</option>
                        <option data-addr="355" value="AL">ALBANIA</option>
                        <option data-addr="213" value="DZ">ALGERIA</option>
                        <option data-addr="168" value="AS">AMERICAN SAMOA</option>
                        <option data-addr="376" value="AD">ANDORRA</option>
                        <option data-addr="244" value="AO">ANGOLA</option>
                        <option data-addr="264" value="AI">ANGUILLA</option>
                        <option data-addr="167" value="AQ">ANTARCTICA</option>
                        <option data-addr="268" value="AG">
                          ANTIGUA AND BARBUDA
                        </option>
                        <option data-addr="54" value="AR">ARGENTINA</option>
                        <option data-addr="374" value="AM">ARMENIA</option>
                        <option data-addr="297" value="AW">ARUBA</option>
                        <option data-addr="61" value="AU">AUSTRALIA</option>
                        <option data-addr="43" value="AT">AUSTRIA</option>
                        <option data-addr="994" value="AZ">AZERBAIJAN</option>
                        <option data-addr="242" value="BS">BAHAMAS</option>
                        <option data-addr="973" value="BH">BAHRAIN</option>
                        <option data-addr="880" value="BD">BANGLADESH</option>
                        <option data-addr="246" value="BB">BARBADOS</option>
                        <option data-addr="375" value="BY">BELARUS</option>
                        <option data-addr="32" value="BE">BELGIUM</option>
                        <option data-addr="501" value="BZ">BELIZE</option>
                        <option data-addr="229" value="BJ">BENIN</option>
                        <option data-addr="441" value="BM">BERMUDA</option>
                        <option data-addr="975" value="BT">BHUTAN</option>
                        <option data-addr="591" value="BO">BOLIVIA</option>
                        <option data-addr="387" value="BA">
                          BOSNIA AND HERZEGOVINA
                        </option>
                        <option data-addr="267" value="BW">BOTSWANA</option>
                        <option data-addr="55" value="BR">BRAZIL</option>
                        <option data-addr="246" value="IO">
                          BRITISH INDIAN OCEAN TERRITORY
                        </option>
                        <option data-addr="673" value="BN">
                          BRUNEI DARUSSALAM
                        </option>
                        <option data-addr="359" value="BG">BULGARIA</option>
                        <option data-addr="226" value="BF">BURKINA FASO</option>
                        <option data-addr="257" value="BI">BURUNDI</option>
                        <option data-addr="855" value="KH">CAMBODIA</option>
                        <option data-addr="237" value="CM">CAMEROON</option>
                        <option data-addr="1" value="CA">CANADA</option>
                        <option data-addr="238" value="CV">CAPE VERDE</option>
                        <option data-addr="345" value="KY">CAYMAN ISLANDS</option>
                        <option data-addr="236" value="CF">
                          CENTRAL AFRICAN REPUBLIC
                        </option>
                        <option data-addr="235" value="TD">CHAD</option>
                        <option data-addr="56" value="CL">CHILE</option>
                        <option data-addr="86" value="CN">CHINA</option>
                        <option data-addr="672" value="CX">
                          CHRISTMAS ISLAND
                        </option>
                        <option data-addr="672" value="CC">
                          COCOS (KEELING) ISLANDS
                        </option>
                        <option data-addr="57" value="CO">COLOMBIA</option>
                        <option data-addr="269" value="KM">COMOROS</option>
                        <option data-addr="242" value="CG">CONGO</option>
                        <option data-addr="682" value="CK">COOK ISLANDS</option>
                        <option data-addr="506" value="CR">COSTA RICA</option>
                        <option data-addr="225" value="CI">COTE D'IVOIRE</option>
                        <option data-addr="385" value="HR">CROATIA</option>
                        <option data-addr="53" value="CU">CUBA</option>
                        <option data-addr="357" value="CY">CYPRUS</option>
                        <option data-addr="420" value="CZ">CZECH REPUBLIC</option>
                        <option data-addr="45" value="DK">DENMARK</option>
                        <option data-addr="253" value="DJ">DJIBOUTI</option>
                        <option data-addr="176" value="DM">DOMINICA</option>
                        <option data-addr="809" value="DO">
                          DOMINICAN REPUBLIC
                        </option>
                        <option data-addr="593" value="EC">ECUADOR</option>
                        <option data-addr="20" value="EG">EGYPT</option>
                        <option data-addr="503" value="SV">EL SALVADOR</option>
                        <option data-addr="240" value="GQ">
                          EQUATORIAL GUINEA
                        </option>
                        <option data-addr="291" value="ER">ERITREA</option>
                        <option data-addr="372" value="EE">ESTONIA</option>
                        <option data-addr="251" value="ET">ETHIOPIA</option>
                        <option data-addr="500" value="FK">
                          FALKLAND ISLANDS (MALVINAS)
                        </option>
                        <option data-addr="298" value="FO">FAROE ISLANDS</option>
                        <option data-addr="679" value="FJ">FIJI</option>
                        <option data-addr="358" value="FI">FINLAND</option>
                        <option data-addr="33" value="FR">FRANCE</option>
                        <option data-addr="594" value="GF">FRENCH GUIANA</option>
                        <option data-addr="689" value="PF">
                          FRENCH POLYNESIA
                        </option>
                        <option data-addr="689" value="TF">
                          FRENCH SOUTHERN TERRITORIES
                        </option>
                        <option data-addr="241" value="GA">GABON</option>
                        <option data-addr="220" value="GM">GAMBIA</option>
                        <option data-addr="995" value="GE">GEORGIA</option>
                        <option data-addr="49" value="DE">GERMANY</option>
                        <option data-addr="233" value="GH">GHANA</option>
                        <option data-addr="350" value="GI">GIBRALTAR</option>
                        <option data-addr="30" value="GR">GREECE</option>
                        <option data-addr="299" value="GL">GREENLAND</option>
                        <option data-addr="473" value="GD">GRENADA</option>
                        <option data-addr="590" value="GP">GUADELOUPE</option>
                        <option data-addr="671" value="GU">GUAM</option>
                        <option data-addr="502" value="GT">GUATEMALA</option>
                        <option data-addr="224" value="GN">GUINEA</option>
                        <option data-addr="245" value="GW">GUINEA-BISSAU</option>
                        <option data-addr="592" value="GY">GUYANA</option>
                        <option data-addr="509" value="HT">HAITI</option>
                        <option data-addr="39" value="VA">
                          HOLY SEE (VATICAN CITY STATE)
                        </option>
                        <option data-addr="503" value="HN">HONDURAS</option>
                        <option data-addr="852" value="HK">HONG KONG</option>
                        <option data-addr="36" value="HU">HUNGARY</option>
                        <option data-addr="354" value="IS">ICELAND</option>
                        <option data-addr="91" value="IN">INDIA</option>
                        <option data-addr="62" value="ID">INDONESIA</option>
                        <option data-addr="98" value="IR">
                          IRAN, ISLAMIC REPUBLIC OF
                        </option>
                        <option data-addr="964" value="IQ">IRAQ</option>
                        <option data-addr="353" value="IE">IRELAND</option>
                        <option data-addr="972" value="IL">ISRAEL</option>
                        <option data-addr="39" value="IT">ITALY</option>
                        <option data-addr="876" value="JM">JAMAICA</option>
                        <option data-addr="81" value="JP">JAPAN</option>
                        <option data-addr="962" value="JO">JORDAN</option>
                        <option data-addr="7" value="KZ">KAZAKHSTAN</option>
                        <option data-addr="254" value="KE">KENYA</option>
                        <option data-addr="686" value="KI">KIRIBATI</option>
                        <option data-addr="82" value="KP">
                          KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF
                        </option>
                        <option data-addr="82" value="KR">
                          KOREA, REPUBLIC OF
                        </option>
                        <option data-addr="965" value="KW">KUWAIT</option>
                        <option data-addr="996" value="KG">KYRGYZSTAN</option>
                        <option data-addr="856" value="LA">
                          LAO PEOPLE'S DEMOCRATIC REPUBLIC
                        </option>
                        <option data-addr="371" value="LV">LATVIA</option>
                        <option data-addr="961" value="LB">LEBANON</option>
                        <option data-addr="266" value="LS">LESOTHO</option>
                        <option data-addr="231" value="LR">LIBERIA</option>
                        <option data-addr="218" value="LY">
                          LIBYAN ARAB JAMAHIRIYA
                        </option>
                        <option data-addr="423" value="LI">LIECHTENSTEIN</option>
                        <option data-addr="370" value="LT">LITHUANIA</option>
                        <option data-addr="352" value="LU">LUXEMBOURG</option>
                        <option data-addr="853" value="MO">MACAO</option>
                        <option data-addr="389" value="MK">
                          MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF
                        </option>
                        <option data-addr="261" value="MG">MADAGASCAR</option>
                        <option data-addr="265" value="MW">MALAWI</option>
                        <option data-addr="60" value="MY">MALAYSIA</option>
                        <option data-addr="960" value="MV">MALDIVES</option>
                        <option data-addr="223" value="ML">MALI</option>
                        <option data-addr="356" value="MT">MALTA</option>
                        <option data-addr="692" value="MH">
                          MARSHALL ISLANDS
                        </option>
                        <option data-addr="596" value="MQ">MARTINIQUE</option>
                        <option data-addr="222" value="MR">MAURITANIA</option>
                        <option data-addr="230" value="MU">MAURITIUS</option>
                        <option data-addr="269" value="YT">MAYOTTE</option>
                        <option data-addr="52" value="MX">MEXICO</option>
                        <option data-addr="691" value="FM">
                          MICRONESIA, FEDERATED STATES OF MICRONESIA
                        </option>
                        <option data-addr="373" value="MD">
                          MOLDOVA, REPUBLIC OF
                        </option>
                        <option data-addr="377" value="MC">MONACO</option>
                        <option data-addr="976" value="MN">MONGOLIA</option>
                        <option data-addr="664" value="MS">MONTSERRAT</option>
                        <option data-addr="212" value="MA">MOROCCO</option>
                        <option data-addr="258" value="MZ">MOZAMBIQUE</option>
                        <option data-addr="95" value="MM">MYANMAR</option>
                        <option data-addr="264" value="NA">NAMIBIA</option>
                        <option data-addr="674" value="NR">NAURU</option>
                        <option data-addr="977" value="NP">NEPAL</option>
                        <option data-addr="31" value="NL">NETHERLANDS</option>
                        <option data-addr="599" value="AN">
                          NETHERLANDS ANTILLES
                        </option>
                        <option data-addr="687" value="NC">NEW CALEDONIA</option>
                        <option data-addr="64" value="NZ">NEW ZEALAND</option>
                        <option data-addr="505" value="NI">NICARAGUA</option>
                        <option data-addr="227" value="NE">NIGER</option>
                        <option data-addr="234" value="NG">NIGERIA</option>
                        <option data-addr="683" value="NU">NIUE</option>
                        <option data-addr="672" value="NF">NORFOLK ISLAND</option>
                        <option data-addr="167" value="MP">
                          NORTHERN MARIANA ISLANDS
                        </option>
                        <option data-addr="47" value="NO">NORWAY</option>
                        <option data-addr="968" value="OM">OMAN</option>
                        <option data-addr="92" value="PK">PAKISTAN</option>
                        <option data-addr="680" value="PW">PALAU</option>
                        <option data-addr="970" value="PS">
                          PALESTINIAN TERRITORY,OCCUPIED
                        </option>
                        <option data-addr="507" value="PA">PANAMA</option>
                        <option data-addr="675" value="PG">
                          PAPUA NEW GUINEA
                        </option>
                        <option data-addr="595" value="PY">PARAGUAY</option>
                        <option data-addr="51" value="PE">PERU</option>
                        <option data-addr="63" value="PH">PHILIPPINES</option>
                        <option data-addr="672" value="PN">PITCAIRN</option>
                        <option data-addr="48" value="PL">POLAND</option>
                        <option data-addr="351" value="PT">PORTUGAL</option>
                        <option data-addr="787" value="PR">PUERTO RICO</option>
                        <option data-addr="974" value="QA">QATAR</option>
                        <option data-addr="262" value="RE">REUNION</option>
                        <option data-addr="40" value="RO">ROMANIA</option>
                        <option data-addr="7" value="RU">
                          RUSSIAN FEDERATION
                        </option>
                        <option data-addr="250" value="RW">RWANDA</option>
                        <option data-addr="290" value="SH">SAINT HELENA</option>
                        <option data-addr="186" value="KN">
                          SAINT KITTS AND NEVIS
                        </option>
                        <option data-addr="175" value="LC">SAINT LUCIA</option>
                        <option data-addr="508" value="PM">
                          SAINT PIERRE AND MIQUELON
                        </option>
                        <option data-addr="180" value="VC">
                          SAINT VINCENT AND THE GRENADINES
                        </option>
                        <option data-addr="885" value="WS">SAMOA</option>
                        <option data-addr="378" value="SM">SAN MARINO</option>
                        <option data-addr="239" value="ST">
                          SAO TOME AND PRINCIPE
                        </option>
                        <option data-addr="966" value="SA">SAUDI ARABIA</option>
                        <option data-addr="221" value="SN">SENEGAL</option>
                        <option data-addr="381" value="CS">
                          SERBIA AND MONTENEGRO
                        </option>
                        <option data-addr="248" value="SC">SEYCHELLES</option>
                        <option data-addr="232" value="SL">SIERRA LEONE</option>
                        <option data-addr="65" value="SG">SINGAPORE</option>
                        <option data-addr="421" value="SK">SLOVAKIA</option>
                        <option data-addr="386" value="SI">SLOVENIA</option>
                        <option data-addr="677" value="SB">
                          SOLOMON ISLANDS
                        </option>
                        <option data-addr="252" value="SO">SOMALIA</option>
                        <option data-addr="27" value="ZA">SOUTH AFRICA</option>
                        <option data-addr="34" value="ES">SPAIN</option>
                        <option data-addr="94" value="LK">SRI LANKA</option>
                        <option data-addr="249" value="SD">SUDAN</option>
                        <option data-addr="597" value="SR">SURINAME</option>
                        <option data-addr="47" value="SJ">
                          SVALBARD AND JAN MAYEN
                        </option>
                        <option data-addr="268" value="SZ">SWAZILAND</option>
                        <option data-addr="46" value="SE">SWEDEN</option>
                        <option data-addr="41" value="CH">SWITZERLAND</option>
                        <option data-addr="963" value="SY">
                          SYRIAN ARAB REPUBLIC
                        </option>
                        <option data-addr="886" value="TW">
                          TAIWAN, PROVINCE OF CHINA
                        </option>
                        <option data-addr="992" value="TJ">TAJIKISTAN</option>
                        <option data-addr="255" value="TZ">
                          TANZANIA, UNITED REPUBLIC OF
                        </option>
                        <option data-addr="66" value="TH">THAILAND</option>
                        <option data-addr="670" value="TL">TIMOR-LESTE</option>
                        <option data-addr="228" value="TG">TOGO</option>
                        <option data-addr="690" value="TK">TOKELAU</option>
                        <option data-addr="676" value="TO">TONGA</option>
                        <option data-addr="186" value="TT">
                          TRINIDAD AND TOBAGO
                        </option>
                        <option data-addr="216" value="TN">TUNISIA</option>
                        <option data-addr="90" value="TR">TURKEY</option>
                        <option data-addr="993" value="TM">TURKMENISTAN</option>
                        <option data-addr="164" value="TC">
                          TURKS AND CAICOS ISLANDS
                        </option>
                        <option data-addr="688" value="TV">TUVALU</option>
                        <option data-addr="256" value="UG">UGANDA</option>
                        <option data-addr="380" value="UA">UKRAINE</option>
                        <option data-addr="971" value="AE">
                          UNITED ARAB EMIRATES
                        </option>
                        <option data-addr="44" value="GB">UNITED KINGDOM</option>
                        <option data-addr="1" value="US" selected="selected">
                          UNITED STATES
                        </option>
                        <option data-addr="598" value="UY">URUGUAY</option>
                        <option data-addr="998" value="UZ">UZBEKISTAN</option>
                        <option data-addr="678" value="VU">VANUATU</option>
                        <option data-addr="58" value="VE">VENEZUELA</option>
                        <option data-addr="84" value="VN">VIETNAM</option>
                        <option data-addr="128" value="VG">
                          VIRGIN ISLANDS, BRITISH
                        </option>
                        <option data-addr="134" value="VI">
                          VIRGIN ISLANDS, U.S.
                        </option>
                        <option data-addr="681" value="WF">
                          WALLIS AND FUTUNA
                        </option>
                        <option data-addr="212" value="EH">WESTERN SAHARA</option>
                        <option data-addr="967" value="YE">YEMEN</option>
                        <option data-addr="260" value="ZM">ZAMBIA</option>
                        <option data-addr="263" value="ZW">ZIMBABWE</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col">
                    <div class="cop_input_box">
                      <label for="cop_card_number">card number</label>
                      <input
                        type="number"
                        id="cop_card_number"
                        placeholder="1111 1111 1111 1111"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_expires">expires</label>
                      <input
                        type="text"
                        id="cop_card_expires"
                        placeholder="11/20"
                        required
                      />
                    </div>
                  </div>
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_cvc">CVC</label>
                      <input
                        type="number"
                        id="cop_card_cvc"
                        placeholder="111"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_firstname">first name</label>
                      <input
                        type="text"
                        id="cop_card_firstname"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_lastname">last name</label>
                      <input
                        type="text"
                        id="cop_card_lastname"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>
                <h1 class="cop_b_a">billing address</h1>
                <div class="cop_input_row">
                  <div class="cop_input_col">
                    <div class="cop_input_box">
                      <label for="cop_card_full_address">full address</label>
                      <input
                        type="text"
                        id="cop_card_full_address"
                        placeholder="14 Main Street"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col">
                    <div class="cop_input_box">
                      <label for="cop_card_city">city</label>
                      <input
                        type="text"
                        id="cop_card_city"
                        placeholder="Pecan Springs"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_zip">zip</label>
                      <input
                        type="number"
                        id="cop_card_zip"
                        placeholder="44628"
                        required
                      />
                    </div>
                  </div>
                  <div class="cop_input_col co_half_col">
                    <div class="cop_input_box">
                      <label for="cop_card_state">state</label>
                      <input
                        type="text"
                        id="cop_card_state"
                        placeholder="TX"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="cop_input_row">
                  <div class="cop_input_col">
                    <div class="">
                      <input
                        type="submit"
                        class="cop_submit"
                        id="payBtn"
                        value="pay"
                        onclick="handleCheckoutSubmit()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="co_success_box">
              <div class="csb_wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#20b2aa"
                >
                  <path
                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                  />
                </svg>
                <h2>Payment Successful</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    <!-- commit: added by anik end -->

    
    <script>
    //   new WOW().init();

      // ==================section hide and show managing=========================
      const step_section_1 = document.getElementById('step_1_');
      const step_section_2 = document.getElementById('step_2_');
      const step_section_3 = document.getElementById('step_3_');
      const step_section_4 = document.getElementById('step_4_');
      const step_section_5 = document.getElementById('step_5_');
      const step_section_6 = document.getElementById('step_6_');
      const step_section_7 = document.getElementById('step_7_');

      const go_step_2_btn = document.getElementById('go_step_2');
      const go_step_3_btn = document.getElementById('go_step_3');
      const go_step_4_btn = document.getElementById('go_step_4');
      const go_step_5_btn = document.getElementById('go_step_5');
      const go_step_6_pb_1 = document.getElementById('go_step_6_pb_1');
      const go_step_6_pb_2 = document.getElementById('go_step_6_pb_2');
      const go_step_6_pb_3 = document.getElementById('go_step_6_pb_3');
      const go_step_7_btn = document.getElementById('go_step_7');

        go_step_2_btn.addEventListener('click', function() {
        hideAllSections();
        step_section_2.style.display = 'block';
        });

        go_step_3_btn.addEventListener('click', function() {
        hideAllSections();
        step_section_3.style.display = 'block';
        });

        go_step_4_btn.addEventListener('click', function() {
        hideAllSections();
        step_section_4.style.display = 'block';
        });

        go_step_5_btn.addEventListener('click', function() {
        hideAllSections();
        step_section_5.style.display = 'block';
        });

        go_step_6_pb_1.addEventListener('click', function() {
        hideAllSections();
        // step_section_6.style.display = 'block';
        step_section_7.style.display = 'block';
        });

        go_step_6_pb_2.addEventListener('click', function() {
        hideAllSections();
        // step_section_6.style.display = 'block';
        step_section_7.style.display = 'block';
        });

        go_step_6_pb_3.addEventListener('click', function() {
        hideAllSections();
        // step_section_6.style.display = 'block';
        step_section_7.style.display = 'block';
        });

        // go_step_7_btn.addEventListener('click', function() {
        // hideAllSections();
        // step_section_7.style.display = 'block';
        // });

        // Function to hide all step sections
        function hideAllSections() {
        step_section_1.style.display = 'none';
        step_section_2.style.display = 'none';
        step_section_3.style.display = 'none';
        step_section_4.style.display = 'none';
        step_section_5.style.display = 'none';
        step_section_6.style.display = 'none';
        step_section_7.style.display = 'none';
        }

        
      // ==================changing amount value=========================
      const dataAmount=(amount)=>{
        document.querySelector('.selected_package_amount').textContent = amount;
		  document.querySelector('#payment_price').value=amount;
      }
    //   commit: commented by anik 
    //   document.querySelector('#pay_button').addEventListener("click", function(event){
    //       event.preventDefault();
    //      document.querySelector('#main_form').submit();
    //   });

      // commit: added by anik 
        document.querySelector('#pay_button').addEventListener("click", function(event){
            event.preventDefault();
            document.getElementById('checkoutPopup').style.display = 'flex'; // Show popup
            
            // Serialize form data
            var formData = new FormData(document.querySelector('#main_form'));
            
            // Make a POST request
            fetch('?submit=true', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Handle the response if needed
                console.log('Form submitted successfully');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
        });

    </script>
    
    <script src="<?php  echo plugins_url('assets/js/custom.js', __FILE__);?>"></script>
    <script src="<?php  echo plugins_url('assets/js/dev.js', __FILE__);?>"></script>
    <!--Start of Tawk.to Script-->
      <script type="text/javascript">
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/65c65f260ff6374032cb5fa4/1hm7e7bu5';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      </script>
    <!--End of Tawk.to Script-->
  </div>

</section>