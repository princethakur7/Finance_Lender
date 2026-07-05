/* Funding calculator */
(function () {
  var form = document.querySelector("#calculatorForm");
  if (!form) {
    return;
  }

  var amount = document.querySelector("#fundingAmount");
  var interest = document.querySelector("#interestRate");
  var tenure = document.querySelector("#tenure");
  var revenue = document.querySelector("#monthlyRevenue");
  var age = document.querySelector("#businessAge");
  var emiOutput = document.querySelector("#emiOutput");
  var interestOutput = document.querySelector("#interestOutput");
  var eligibilityOutput = document.querySelector("#eligibilityOutput");
  var recommendationOutput = document.querySelector("#recommendationOutput");
  var chartBar = document.querySelector("#chartBar");

  function currency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function calculate() {
    var principal = Number(amount.value);
    var annualRate = Number(interest.value);
    var months = Number(tenure.value);
    var monthlyRevenue = Number(revenue.value);
    var businessAge = Number(age.value);
    var monthlyRate = annualRate / 12 / 100;
    var emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    var totalInterest = emi * months - principal;
    var burden = emi / Math.max(monthlyRevenue, 1);
    var ageScore = businessAge >= 24 ? 20 : businessAge >= 12 ? 12 : 5;
    var revenueScore = monthlyRevenue >= emi * 4 ? 45 : monthlyRevenue >= emi * 3 ? 34 : monthlyRevenue >= emi * 2 ? 22 : 10;
    var score = Math.min(95, Math.round(ageScore + revenueScore + (principal <= monthlyRevenue * 3 ? 25 : 12)));

    emiOutput.textContent = currency(emi);
    interestOutput.textContent = currency(totalInterest);
    eligibilityOutput.textContent = score + "% fit";
    chartBar.style.setProperty("--value", score + "%");

    if (burden <= 0.25 && businessAge >= 12) {
      recommendationOutput.textContent = "Strong fit for working capital or revenue financing. Keep bank statements and GST returns ready for faster offers.";
    } else if (burden <= 0.38) {
      recommendationOutput.textContent = "Moderate fit. Consider a smaller ticket size or longer tenure to improve monthly cash-flow comfort.";
    } else {
      recommendationOutput.textContent = "High repayment pressure. NIKIT would recommend reducing the requested amount before applying.";
    }
  }

  form.addEventListener("input", calculate);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });
  calculate();
})();
