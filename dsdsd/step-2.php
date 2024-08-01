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
                  <form
                    class="pt-md-4"
                    action="<?php echo esc_url($link);?>"
                    method="post"
                    class="step2_valdate"
                  >
                    <div class="form-check form-chk-ind-org">
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
                      <input type='hidden' name='trademark_id' value='<?php echo $_POST['trademark_id']; ?>'>
                      
                      <button type="submit" class="theme-btn">Continue</button>
                    </div>
                  </form>
                </div>
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
    <script>
      // jQuery(document).ready(function($) {
      // $(document).on("click", ".add_owner", function () {
      //   var numItems = $(".new_fields").length + 1;
      //   $(".submits-wrapper").before(
      //     '<div class="new_fields"><div class="trash_this"><i class="fa fa-trash"></i></div><div class="form-group ind_own_fld"><label> First Name:</label><input type="text" class="form-control" name="owner_first_name_' +
      //       numItems +
      //       '" placeholder="First name" ></div><div class="form-group ind_own_fld"><label> Last Name:</label><input type="text" class="form-control" name="owner_last_name_' +
      //       numItems +
      //       '" placeholder="Last Name" ></div></div>'
      //   );
      // });

      // $(document).on("click", ".trash_this", function () {
      //   $(this).parent(".new_fields").remove();
      // });
      
      //   $("input[name='own_radio']").click(function () {
      //     var test = $(this).val();
      //     if (test === "organization") {
      //       $(".ind_own_fld").hide();
      //       $(".org_own_fld").show();
      //     } else {
      //       $(".org_own_fld").hide();
      //       $(".ind_own_fld").show();
      //     }
      //   });
      // });


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
