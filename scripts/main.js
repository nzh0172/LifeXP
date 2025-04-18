let quests = [];

function initializeQuests() {
  if (quests.length === 0) {
    quests = [
      {
        title: "The Scrolls of Wisdom",
        backstory: "The ancient tomes await, heavy with knowledge...",
        objective: "study",
        reward: 1000,
        icon: "📖",
        status: "Pages Turning",
      },
      {
        title: "Sanity Run",
        backstory: "Madness brews like a storm in your skull...",
        objective: "jog",
        reward: 900,
        icon: "🏃‍♀️",
        status: "Yet to Embark",
      },
      {
        title: "Brew of Awakening",
        backstory: "The morning fog clings to your mind...",
        objective: "make a cup of coffee.",
        reward: 850,
        icon: "🔮",
        status: "Yet to Embark",
      },
    ];
  }
}

//Show quest box details
function showDetail() {
  document.getElementById("detailBox").classList.add("active");
  document.body.classList.add("detail-open");
}
function hideDetail() {
  document.getElementById("detailBox").classList.remove("active");
  document.body.classList.remove("detail-open");
}

//Show add quest box
function showAddQuest() {
  document.getElementById("addQuestBox").classList.add("active");
  document.body.classList.add("addquest-open");
}
function hideAddQuest() {
  document.getElementById("addQuestBox").classList.remove("active");
  document.body.classList.remove("addquest-open");
  document.getElementById("newtask").value = "";
  document.getElementById("outputPrompt").value = "";
}

//Prompt quest for adding task
document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("newtask");
  const hiddenText = document.getElementById("hiddenCopyText");

  textarea.addEventListener("input", function () {
    hiddenText.value =
      "You are to turn a given task into a quest with short backstory consists of 1 short paragraph with 3 sentences, 50 words max. If the task contains a name or a deadline, you must include it. " +
      "The quest must have the user's involvement using pronoun 'You', not a third party. Make it under this format 'Backstory:' " +
      "For each task, give a cool epic medieval quest name under this format (make it under 20 characters), Title: X. " +
      "Rephrase the original task under this format, Objective: X, do not add any additional info such as time or deadline or other character unless mentioned in the task. " +
      "Do not put any symbols such as double ** in title, backstory, objective, reward and icon. " +
      "Make a suitable icon for the quest under this format, Icon: X." +
      "For each task, give an amount of XP that is appropriate for the level of difficulty of the task. " +
      "The coins must not be zero or negative. Give only XP, no other comments needed. Make it under this format 'Reward: X XP'. " +
      "The appearance order must be: first, Title, then Backstory, Objective, Reward and Icon.\n\n" +
      textarea.value;
  });
});

function copyToClipboard() {
  const hiddenText = document.getElementById("hiddenCopyText");
  navigator.clipboard.writeText(hiddenText.value);
  alert("Copied to clipboard!");
}

function parseQuestText(text) {
  const titleMatch = text.match(/Title:\s*(.+)/i);
  const backstoryMatch = text.match(/Backstory:\s*((?:.|\n)*?)\nObjective:/i);
  const objectiveMatch = text.match(/Objective:\s*(.+)/i);
  const rewardMatch = text.match(/Reward:\s*(\d+)\s*XP?/i);
  const iconMatch = text.match(/Icon:\s*(.+)/i);


  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    backstory: backstoryMatch ? backstoryMatch[1].trim() : "",
    objective: objectiveMatch ? objectiveMatch[1].trim() : "",
    reward: rewardMatch ? parseInt(rewardMatch[1]) : 0,
    icon: iconMatch ? iconMatch[1].trim() : getRandomIcon(),
    status: "Not Started"
  };
}

// Validate the format of the output prompt
document.getElementById("outputPrompt").addEventListener("input", function () {
  const text = this.value;

const isValid = /^Title:\s*(.+)\nBackstory:\s*((?:.|\n)*?)\nObjective:\s*(.+)\nReward:\s*(\d+)\s*XP(?:\nIcon:\s*(.+))?$/i.test(text.trim());

  const error = document.getElementById("formatError");

    if (!isValid) {
        error.style.display = "block";
        this.style.borderColor = "red";
        // Optionally: disable a submit button here
         document.getElementById("submitNewQuest-btn").disabled = true;
    } else {
        error.style.display = "none";
        this.style.borderColor = "#ccc";
        // Optionally: enable a submit button here
        document.getElementById("submitNewQuest-btn").disabled = false;
    }
});

// Sample quest data (replace with getQuests() if using localStorage)
let currentQuestIndex = -1;

//Show quest details
function showDetail(index) {
  const quest = getQuests()[index];
  currentQuestIndex = index;
  const box = document.getElementById("detailBox");

  box.querySelector(".quest-title").textContent = `${quest.icon|| '📜'} ${quest.title}`;
  box.querySelector(".quest-backstory").textContent = quest.backstory;
  box.querySelector(".quest-objective").textContent = quest.objective;
  box.querySelector(".quest-reward").textContent = ` ${quest.reward}`;

  box.classList.add("active");
  document.body.classList.add("detail-open");
}

// Render the quest cards
function renderCards() {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";

  quests.forEach((quest, index) => {
    if (!quest) return; // skip if undefined

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-content">
        <div class="ch3">${quest.icon || "📜"} ${quest.title}</div>
        <br>
        ${quest.status ? `<div class="status">${quest.status}</div>` : ""}
        <div class="xp">Reward: +${quest.reward}</div>
        <button class="accept-btn" onclick="event.stopPropagation(); showDetail(${index})">
     ✦ Details
    </button>
      </div>
    `;

    container.appendChild(card);
  });

  console.log("Cards rendered");
  console.log(quests);
}
// Initialize XP
let totalXP = 0;

function getXP() { 
  return totalXP; 
}

// Update the XP UI
function updateXPDisplay() {
  document.getElementById("xp-amount").innerText = totalXP + " XP";
}

// Accept and complete a quest
function acceptQuest(index) {
  const reward = quests[index].reward;

  totalXP += reward;
  updateXPDisplay();

  quests[index].status = "Completed";
  renderCards();

  alert(`Quest completed! You earned ${reward} XP.`);
}


// On page load, initialize everything
window.addEventListener("DOMContentLoaded", () => {
  initializeQuests();
  renderCards();
  updateXPDisplay();
});

document.querySelector(".complete").addEventListener("click", function () {
  const questTitle = document
    .querySelector(".quest-title")
    .textContent.split(" ")
    .slice(1)
    .join(" ");
  const quests = getQuests();
  const index = quests.findIndex((q) => q.title === questTitle);
  if (index !== -1) {
    acceptQuest(index);
    hideDetail();
  }
});
    
//Add quest
function addQuest() {
  const text = document.getElementById("outputPrompt").value;
  const newQuest = parseQuestText(text);

  if (!newQuest || !newQuest.title || !newQuest.objective || !newQuest.reward || !newQuest.icon || !newQuest.backstory) {
    alert("Invalid quest format.");
    return;
  }

  quests.push(newQuest);
  renderCards();
}
