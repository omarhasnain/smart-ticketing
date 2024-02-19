const selectedSeats = [];
let selectedCoupon = "";

const totalSeatCount = document.getElementById("seat-count");
const totalSeatNumber = document.getElementById("total-seat");
const applyButton = document.getElementById("apply-btn");
const nextButton = document.getElementById("next-btn");
const couponInput = document.getElementById("apply-btn");
const phoneNumberInput = document.getElementById("phone-number-input");

//after apply the id the apply coupon seCtion will be hIde
const applySection = document.getElementById("place-coupon");

applyButton.setAttribute("disabled", true);
nextButton.setAttribute("disabled", true);
applyButton.style.cursor = "not-allowed";
nextButton.style.cursor = "not-allowed";

document.querySelectorAll(".seat").forEach(function (seat) {
  seat.addEventListener("click", function () {
    if (nextButton.getAttribute("disabled") === "true") {
      nextButton.removeAttribute("disabled");
      nextButton.style.cursor = "pointer";
    }

    if (applyButton.getAttribute("disabled") === "true") {
      applyButton.removeAttribute("disabled");
    }

    let isAlreadyButtonSelected = false;
    for (let i = 0; i < selectedSeats.length; i++) {
      if (selectedSeats[i] === seat.textContent.trim()) {
        isAlreadyButtonSelected = true;
        break;
      }
    }

    if (isAlreadyButtonSelected) {
      const index = selectedSeats.indexOf(seat.textContent.trim());
      selectedSeats.splice(index, 1);
      seat.style.backgroundColor = "";
    } else {
      if (selectedSeats.length >= 4) {
        alert("You can only select up to 4 seats.");
        return;
      }
      seat.style.backgroundColor = "#1DD100";
      selectedSeats.push(seat.textContent.trim());
    }
    totalSeatCount.textContent = selectedSeats.length;
    totalSeatNumber.textContent = 40 - selectedSeats.length;
    updateSeatInDisplay();

    const changingPriceTicket = document.getElementById("changing-price");
    const ticketPrice = selectedSeats.length * 550;
    changingPriceTicket.textContent = ticketPrice;

    if (selectedSeats.length === 4) {
      applyButton.removeAttribute("disabled");
      applyButton.style.cursor = "pointer";
    } else {
      applyButton.setAttribute("disabled", true);
      applyButton.style.cursor = "not-allowed";
    }
    document.getElementById("grand-total-price").textContent = ticketPrice;
  });
});

applyButton.addEventListener("click", function () {
  const couponCode = couponInput.value.trim();
  if (couponCode === "") {
    return;
  }
  calculateTheTotalPrice(couponCode);
});

phoneNumberInput.addEventListener("input", function () {
  if (selectedSeats.length > 0 && phoneNumberInput.value.trim() !== "") {
    nextButton.removeAttribute("disabled");
    nextButton.style.cursor = "pointer";
  } else {
    nextButton.setAttribute("disabled", true);
    nextButton.style.cursor = "not-allowed";
  }
});

function calculateTheTotalPrice(coupon) {
  const countTotalPrice = document.getElementById("grand-total-price");
  const totalPrice = selectedSeats.length * 550;
  let discountedPrice = totalPrice;

  // Applying discounts based on coupon
  switch (coupon) {
    case "NEW15":
      discountedPrice *= 0.85;
      break;
    case "COUPLE 20":
      discountedPrice *= 0.8;
      break;
    default:
      alert("Invalid coupon code.");
      return;
  }

  countTotalPrice.textContent = discountedPrice.toFixed(2);
  applySection.style.display = "none"; // Hide the apply section after applying the coupon
}

function updateSeatInDisplay() {
  const tableBody = document.getElementById("seat-table-body");
  tableBody.innerHTML = "";
  selectedSeats.forEach((seat) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${seat}</td>
            <td>Economy</td>
            <td>550</td>
        `;
    tableBody.appendChild(row);
  });
}
