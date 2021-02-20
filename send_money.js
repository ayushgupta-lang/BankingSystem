$(document).ready(function () {
  //Need to integrate the API
  const customerList = {
    customers: [
      {
        name: "Atul Gupta",
        email: "atulgupta@gmail.com",
      },
      {
        name: "Rahul Gupta",
        email: "rahul@gmail.com",
      },
      {
        name: "Lakshay Bansal",
        email: "lak@gmail.com",
      },
      {
        name: "Sanjana",
        email: "sanjana57@gmail.com",
      },
      {
        name: "Chandan",
        email: "cg25@gmail.com",
      },
      {
        name: "Aakash",
        email: "akb69@gmail.com",
      },
      {
        name: "Vishal Kumar",
        email: "vk@gmail.com",
      },
      {
        name: "Somya",
        email: "somya866@gmail.com",
      },
      {
        name: "Manish Dubey",
        email: "manish58@gmail.com",
      },
      {
        name: "Hitesh Singh",
        email: "hitesh45@gmail.com",
      },
    ],
  };
  let fromCustomer;
  let toCustomer;
  renderFromCustomers(customerList, "fromCustomers", "from-customer-radio");

  $(".from-customer").click(function () {
    var radioValue = $("input[name='customer']:checked").val();
    if (radioValue) {
      fromCustomer = customerList.customers[radioValue];
      alert("Your are a - " + JSON.stringify(fromCustomer));
      return;
    }
    return false;
  });

  $("#send-money").click(function () {
    alert("=");
    var x = $("#fname").val();
    var y = $("#email").val();
    var z = $("#amount").val();
    toCustomer = JSON.stringify({ x, y, z });
    if (toCustomer.length) {
      //fill value here in from and to
      $("#from_name").text(fromCustomer.name);
      $("#from_email").text(fromCustomer.email);
      $("#to_name").text(x);
      $("#to_email").text(y);
      $("#to_amount").text(z);
    }
    alert(x);
    alert(y);
    alert(z);
  });

  var navListItems = $("div.setup-panel div a"),
    allWells = $(".setup-content"),
    allNextBtn = $(".nextBtn"),
    allPrevBtn = $(".prevBtn");

  allWells.hide();

  navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr("href")),
      $item = $(this);

    if (!$item.hasClass("disabled")) {
      navListItems.removeClass("btn-primary").addClass("btn-default");
      $item.addClass("btn-primary");
      allWells.hide();
      $target.show();
      $target.find("input:eq(0)").focus();
    }
  });

  allPrevBtn.click(function () {
    var curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
        .parent()
        .prev()
        .children("a");

    prevStepWizard.removeAttr("disabled").trigger("click");
  });

  allNextBtn.click(function () {
    if (fromCustomer || toCustomer) {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
          .parent()
          .next()
          .children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;

      $(".form-group").removeClass("has-error");
      for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
          isValid = false;
          $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
      }

      if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");
    } else {
      alert("Please verify might be you skip from or to details.");
      return false;
    }
  });

  $("div.setup-panel div a.btn-primary").trigger("click");
});

function renderFromCustomers(customer, attributeId, className) {
  let templates = "";
  for (let i = 0; i < customer.customers.length; i++) {
    templates += `<tr>
                    <td><input class=${className} type="radio" name="customer" value=${i}></td>
                    <td>${customer.customers[i].name}</td>
                    <td>${customer.customers[i].email}</td>
                  </tr>`;
    $(`#${attributeId} > tbody`).append(templates);
    console.log(templates);
    templates = "";
  }
}
