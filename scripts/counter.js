// Calculate count of total issues
function calculateCount() {
  const count = document.getElementById("issues-count");
  const parent = document.getElementById("issues-grid");
  const allCards = parent.querySelectorAll(".issue-box");
  let visibleCount = 0;
  for (let i = 0; i < allCards.length; i++) {
    if (allCards[i].style.display !== "none") {
      visibleCount++;
    }
  }
  count.innerText = visibleCount;
}

calculateCount();

const loadingSpinner = document.getElementById("loading-spinner");
const issuesGrid = document.getElementById("issues-grid");

// Loading spinner
function startLoading() {
  loadingSpinner.classList.remove("hidden");
  issuesGrid.classList.add("hidden");
}

function stopLoading() {
  loadingSpinner.classList.add("hidden");
  issuesGrid.classList.remove("hidden");
}
