//HIDING AND UNHIDING DIVS BEHIND INPUTS:

var HiddenStuff = ["trickery", "adaptation", "gods", "magic", "metal", "ranged", "deceitful", "grp", "externar", "construct", "terrible"];
for (let x of HiddenStuff) {
  $("." + x + "Div").hide();
}
//initially hide text behind checkboxes


for (let x of HiddenStuff) {
  $("#" + x + "Check").click(function() {
    $("." + x + "Div").toggle();

    if ($("#" + x + "Input").prop('required') !== true) {
      $("#" + x + "Input").attr('required', 'required')
    } else {
      $("#" + x + "Input").removeAttr('required')
    }

  })
}
//toggle hiding unhiding text behind checkboxes
//toggle required on hidden textboxes
