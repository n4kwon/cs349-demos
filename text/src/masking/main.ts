console.log("masking");

const phoneInput = document.querySelector(
  "input#phone"
) as HTMLInputElement;

phoneInput.addEventListener("input", (e) => {
  let target = e.target as HTMLInputElement;
  let val = target.value;
  console.log(val);

  // allow only numbers
  val = val.replace(/\D/g, "");
  console.log(val);

  // allow only 10 number
  val = val.slice(0, 10);

  // do the masking and set the value
  target.value = phoneMask(val);

  // set the cursor position
  let pos = val.length + 1;
  if (val.length > 3) pos += 2;
  if (val.length > 6) pos += 1;
  target.setSelectionRange(pos, pos);
});

function phoneMask(val: string): string {
  return (
    "(" +
    (val[0] ?? "_") +
    (val[1] ?? "_") +
    (val[2] ?? "_") +
    ") " +
    (val[3] ?? "_") +
    (val[4] ?? "_") +
    (val[5] ?? "_") +
    "-" +
    (val[6] ?? "_") +
    (val[7] ?? "_") +
    (val[8] ?? "_") +
    (val[9] ?? "_")
  );
}
