console.log("validation2");

function setupValidation(onSubmitOnly = true) {
  // get refs to form elements
  const form = document.querySelector("form");
  if (!form) {
    console.error("Form not found");
    return;
  }

  const pcode = document.querySelector("#pcode") as HTMLInputElement;
  if (!pcode) {
    console.error("Postal code input not found");
    return;
  }

  const pcodeError = document.querySelector(
    "p#pcode-error"
  ) as HTMLSpanElement;
  if (!pcodeError) {
    console.error("Postal code error message not found");
    return;
  }

  // listener on input widget
  pcode.addEventListener("input", (_) => {
    if (onSubmitOnly || pcode.validity.valid) {
      // reset the error message
      pcodeError.textContent = "";
      pcodeError.classList.remove("active");
    } else if (!onSubmitOnly) {
      showError();
    }
  });

  // show errors on form submit
  form.addEventListener("submit", (e) => {
    if (!pcode.validity.valid) {
      // display error message
      showError();
      // cancel form validation
      e.preventDefault();
    }
  });

  function showError() {
    if (pcode.validity.valueMissing) {
      // field is empty error
      pcodeError.textContent = "A postal code is required";
    } else if (pcode.validity.patternMismatch) {
      // field pattern is not valid error
      pcodeError.textContent =
        "Please enter a valid Canadian postal code.";
    }
    // add "active" class to show error
    pcodeError.classList.add("active");
  }
}

// try calling with false to show validation on input
setupValidation(true);
