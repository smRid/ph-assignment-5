// Load issues from API
const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const loadIssues = () => {
  startLoading();
  fetch(url)
    .then((re) => re.json())
    .then((data) => displayIssues(data.data));
};

loadIssues();

// Create HTML elements for issue labels
const createElements = (array) => {
  const htmlElements = array.map(
    (el) =>
      `
        <div class="badge badge-soft ${el == "bug" ? "badge-error" : el == "help wanted" ? "badge-warning" : "badge-success"} text-xs"> 
            <i class="fa-solid ${el == "bug" ? "fa-bug" : el == "help wanted" ? "fa-life-ring" : "fa-wand-magic-sparkles"}"></i>
            ${el.toUpperCase()}
        </div>
        `,
  );
  return htmlElements.join(" ");
};

// Issue cards
const displayIssues = (issues) => {
  const parent = document.getElementById("issues-grid");
  parent.innerHTML = "";
  for (let issue of issues) {
    const issueCard = document.createElement("div");

    issueCard.classList.add(
      "issue-box",
      "rounded-lg",
      "bg-white",
      "flex",
      "flex-col",
      "h-full",
      "border",
      "border-[#E4E4E7]",
      "shadow-sm",
    );
    if (issue.status == "open") {
      issueCard.classList.add("open");
    } else {
      issueCard.classList.add("closed");
    }
    issueCard.setAttribute("id", issue.id);

    issueCard.innerHTML = `
        <div class="card-section flex flex-col gap-3 p-4 flex-1">
            <div class="card-top flex items-center justify-between w-full">
                <img src="../assets/${issue.status == "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="${issue.status}">
                <div class="badge badge-soft rounded-[100px] text-sm ${issue.priority == "high" ? "badge-error text-[#EF4444] bg-[#FEECEC]" : issue.priority == "medium" ? "badge-warning text-[#F59E0B] bg-[#FFF6D1]" : "badge-neutral text-[#9CA3AF]"}">
                ${issue.priority.toUpperCase()} </div>
            </div>
            <div class="card-body flex flex-col gap-1">
                <h3 class="text-md font-semibold m-0 line-clamp-2">${issue.title} </h3>
                <p class="text-sm text-[#64748B] m-0 line-clamp-2">${issue.description} </p>
            </div>
            <div class="tag-list flex flex-wrap gap-1">
                ${createElements(issue.labels)}
            </div>
        </div>
        <div class="card-section p-4 text-[#64748B] text-xs border-t border-[#E4E4E7] mt-auto">
            <div class="card-footer flex flex-col gap-1">
                <p class="m-0" id="issue-author-id">#${issue.id} by ${issue.author}</p>
                <p class="m-0" id="issue-date">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        </div>
        `;
    parent.append(issueCard);
  }
  stopLoading();
  calculateCount();
};

//Search issue
const searchInput = document.getElementById("search-field");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", function () {
  startLoading();
  const query = searchInput.value.trim();
  const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;

  fetch(searchUrl)
    .then((re) => re.json())
    .then((data) => displayIssues(data.data))
    .catch((err) => {
      console.log(err);
      stopLoading();
    });
});

// Filter tabs (All, Open, Closed)
function showTab(tabId) {
  // Remove active class from all filter buttons
  const allBtns = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove("active-tab");
  }

  // Add active class to clicked button
  const clickedBtn = document.getElementById(tabId);
  clickedBtn.classList.add("active-tab");

  // Get all issue cards
  const allCards = document.querySelectorAll(".issue-box");

  for (let i = 0; i < allCards.length; i++) {
    if (tabId == "all-tab") {
      allCards[i].style.display = "flex";
    } else if (tabId == "open-tab") {
      if (allCards[i].classList.contains("open")) {
        allCards[i].style.display = "flex";
      } else {
        allCards[i].style.display = "none";
      }
    } else if (tabId == "close-tab") {
      if (allCards[i].classList.contains("closed")) {
        allCards[i].style.display = "flex";
      } else {
        allCards[i].style.display = "none";
      }
    }
  }
}

// Set "All" tab as active by default
document.getElementById("all-tab").classList.add("active-tab");
