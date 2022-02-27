

//HIDING AND UNHIDING DIVS BEHIND INPUTS:

var checkedDivs = ["trickery", "adaptation", "gods", "magic", "metal", "ranged", "deceitful", "grp", "externar", "construct", "terrible"];
for (let x of checkedDivs) {
  $("." + x + "Div").hide();
}
//initially hide text behind checkboxes
for (let x of checkedDivs) {
  $("#" + x + "Check").click(function() {
    $("." + x + "Div").toggle();
  })
}
//toggle hiding unhiding text behind checkboxes
