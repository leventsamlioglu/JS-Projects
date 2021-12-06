let counter = 0;

const btns = document.querySelectorAll(".btn");
const counterValue = document.getElementById("value");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;

    if (styles.contains("increase")) counter++;
    else if (styles.contains("decrease")) counter--;
    else counter = 0;

    if (counter > 0) counterValue.style.color = "green";
    else if (counter < 0) counterValue.style.color = "red";
    else counterValue.style.color = "inherit";

    counterValue.textContent = counter;
  });
});
