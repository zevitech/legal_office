
      document.querySelector('#pay_button').addEventListener("click", function () {
        document.getElementById("header_amount").innerHTML = document.querySelector('.selected_package_amount').innerHTML;
        console.log('clicked 2', document.querySelector('.selected_package_amount').innerHTML);
      });    

    // prepare the billing and card information for transaction and send a post request to the authorize.net api
      const handleCheckoutSubmit = async () => {
  const fullAddress = document.getElementById("cop_card_full_address").value;
  const customerId = Math.floor(Math.random(9, 999) * 99999999999).toString();
  const refId = Math.floor(Math.random(9, 999) * 999999).toString();
  const payBtn = document.getElementById("payBtn");
  const endpoint = "https://api.authorize.net/xml/v1/request.api";
  const cardNumber = document.getElementById("cop_card_number").value;
  const expirationDate = document.getElementById("cop_card_expires").value;
  const cardCode = document.getElementById("cop_card_cvc").value;
  const city = document.getElementById("cop_card_city").value;
  const state = document.getElementById("cop_card_state").value;
  const zip = document.getElementById("cop_card_zip").value;
  const country = document.getElementById("cop_country").value;
  const firstName = document.getElementById("cop_card_firstname").value;
  const lastName = document.getElementById("cop_card_lastname").value;
  const co_failed_msg = document.getElementById("co_failed_msg");
  const co_failed_msg_h1 = document.getElementById("co_failed_msg_h1");
  const success_box = document.getElementById("co_success_box");
  const cop_body_wrap = document.getElementById("cop_body_wrap_");
  const co_cart_icon = document.getElementById("co_cart_icon");
  const co_check_icon = document.getElementById("co_check_icon");
  const selected_package_amount = document.querySelector('.selected_package_amount').innerHTML;

  let packagename = "";
  let packagedesc = "";
  if (selected_package_amount === "35") {
    packagename = "Basic";
    packagedesc = "Basic Branding Application Package";
  } else if (selected_package_amount === "135") {
    packagename = "Standard";
    packagedesc = "Standard Branding Application Package";
  } else if (selected_package_amount === "235") {
    packagename = "Premium";
    packagedesc = "Premium Branding Application Package";
  }

  // disable the button to prevent duplicate submission
  payBtn.value = "Loading...";
  payBtn.disabled = true;
  payBtn.style.cursor = "not-allowed";

  // prepare the request data
  const coRequestData = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: "8kxaGu78Kr",
        transactionKey: "2Q7w9Nam79cZ89q4",
      },
      refId: refId,
      transactionRequest: {
        transactionType: "authCaptureTransaction",
        amount: selected_package_amount,
        payment: {
          creditCard: {
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cardCode: cardCode,
          },
        },
        lineItems: {
          lineItem: {
            itemId: refId,
            name: packagename,
            description: packagedesc,
            quantity: "1",
            unitPrice: selected_package_amount,
          },
        },
        poNumber: " ",
        customer: {
          id: customerId,
        },
        billTo: {
          firstName: firstName,
          lastName: lastName,
          company: " ",
          address: fullAddress,
          city: city,
          state: state,
          zip: zip,
          country: country,
        },
        customerIP: "",
        processingOptions: {
          isSubsequentAuth: "true",
        },
        subsequentAuthInformation: {
        },
        authorizationIndicatorType: {
          authorizationIndicator: "final",
        },
      },
    },
  };

  // sending the request
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coRequestData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);

      if ("transactionResponse" in data) {
        if ("messages" in data.transactionResponse) {
          if (data.transactionResponse.messages[0].code === "1") {
            console.log("success", data.transactionResponse.messages[0].description);
            // show payment successful page and redirect
            co_failed_msg.style.display = "none";
            cop_body_wrap.style.display = "none";
            co_cart_icon.style.display = "none";
            success_box.style.display = "block";
            co_check_icon.style.display = "block";
            // Redirect to thank you page
            window.location.href = "https://secureyourmark.com/thank-you/";
          } else {
            console.log("fail", data.transactionResponse.messages[0]);
            co_failed_msg_h1.innerHTML = data.transactionResponse.messages[0].description;
            co_failed_msg.style.display = "block";
          }
        } else if ("errors" in data.transactionResponse) {
          console.log('transactionResponse error', data.transactionResponse.errors[0]);

          co_failed_msg_h1.innerHTML = data.transactionResponse.errors[0].errorText;
          co_failed_msg.style.display = "block";
        } else {
          console.log('failed data', data);
          co_failed_msg_h1.innerHTML = "Please enter a valid card information.";
          co_failed_msg.style.display = "block";
        }
      } else {
        console.log('failed:invalid ', data);
        co_failed_msg_h1.innerHTML = "Please enter a valid card information.";
        co_failed_msg.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the request:", error);
      co_failed_msg_h1.innerHTML =
        "There was a problem with the request, Try again.";
      co_failed_msg.style.display = "block";
    })
    .finally(() => {
      // Enable the button after request completes
      payBtn.value = "Pay";
      payBtn.disabled = false;
      payBtn.style.cursor = "pointer";
    });
};
