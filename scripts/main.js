function initializeQuests() {
  const existingQuests = getQuests();
  if (existingQuests.length === 0) {
    const defaultQuests = [
      {
        title: "The Scrolls of Wisdom",
        backstory:
          "The ancient tomes await, heavy with knowledge and the promise of brain ache. Your sanity hangs by a thread, but you must face the pages to conquer the chaos of unknowing. You alone can wield the power buried within these cursed notes.",
        objective: "study",
        reward: 1000,
        icon: "📖",
        status: "Pages Turning",
      },
      {
        title: "Sanity Run",
        backstory:
          "Madness brews like a storm in your skull, and the couch whispers sweet nothings of surrender. But your legs remember freedom, and the path awaits your thundering footsteps. You must flee the grip of chaos before it claims your mind.",
        objective: "jog",
        reward: 900,
        icon: "🏃‍♀️",
        status: "Yet to Embark",
      },
      {
        title: "Brew of Awakening",
        backstory:
          "The morning fog clings to your mind, and dark circles haunt your eyes like battle scars. Only the sacred brew of the bean can lift this veil and soothe your weary soul. You must craft this elixir and reclaim your clarity.",
        objective: "make a cup of coffee.",
        reward: 850,
        icon: "🔮",
        status: "Yet to Embark",
      },
    ];

    saveQuests(defaultQuests);
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
      "Write exactly as the original task under this format, Objective: X, do not add any additional info such as time or deadline or other character unless mentioned in the task. " +
      "Do not put any symbols such as double ** in title, backstory, objective and reward. " +
      "For each task, give an amount of XP that is appropriate for the level of difficulty of the task. " +
      "The coins must not be zero or negative. Give only XP, no other comments needed. Make it under this format 'Reward: X XP'. " +
      "The appearance order must be: first, Title, then Backstory, Objective, and Reward.\n\n" +
      textarea.value;
  });
});

function copyToClipboard() {
  const hiddenText = document.getElementById("hiddenCopyText");
  navigator.clipboard.writeText(hiddenText.value);
  alert("Copied to clipboard!");
}

function parseQuestText(text) {
  const titleMatch = text.match(/Title:\s*(.+)/);
  const backstoryMatch = text.match(/Backstory:\s*((?:.|\n)*?)Objective:/);
  const objectiveMatch = text.match(/Objective:\s*(.+)/);
  const rewardMatch = text.match(/Reward:\s*(\d+)\s*coins/i);

  return {
    title: titleMatch ? titleMatch[1].trim() : null,
    backstory: backstoryMatch ? backstoryMatch[1].trim() : null,
    objective: objectiveMatch ? objectiveMatch[1].trim() : null,
    reward: rewardMatch ? rewardMatch[1].trim() : null,
  };
}

// Validate the format of the output prompt
document.getElementById("outputPrompt").addEventListener("input", function () {
  const text = this.value;

  const isValid =
    /^Title:\s*(.+)\nBackstory:\s*((?:.|\n)*?)\nObjective:\s*(.+)\nReward:\s*(\d+)\s*coins$/i.test(
      text.trim()
    );

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
    document.getElementById("submitNewQuesst-btn").disabled = false;
  }
});

// Sample quest data (replace with getQuests() if using localStorage)

let currentQuestIndex = -1;

function showDetail(index) {
  currentQuestIndex = index;
  //const quest = quests[index];
  const quest = getQuests()[index]; // Use from storage to reflect current data
  currentQuestIndex = index;
  //const quest = quests[index];
  const box = document.getElementById("detailBox");

  box.querySelector(".quest-title").textContent = `${quest.icon || "📜"} ${
    quest.title
  }`;
  box.querySelector(".quest-backstory").textContent = quest.backstory;
  box.querySelector(".quest-objective").textContent = quest.objective;
  box.querySelector(".quest-reward").textContent = ` ${quest.reward}`;

  box.classList.add("active");
  document.body.classList.add("detail-open");
}

document.addEventListener("DOMContentLoaded", renderCards);

function renderCards() {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";

  const quests = getQuests(); // Get quests from localStorage

  quests.forEach((quest, index) => {
    const card = document.createElement("div");
    card.className = "card";
    // card.onclick = () => showDetail(index);
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
}

// Save coin count to localStorage
function saveXP(value) {
  localStorage.setItem("totalXP", value);
}

// Get XP from localStorage
function getXP() {
  return parseInt(localStorage.getItem("totalXP")) || 0;
}

// Initialize XP
let totalXP = getXP();

// Update the coin UI
function updateXPDisplay() {
  document.getElementById("xp-amount").innerText = totalXP + " XP";
}

// Accept and complete a quest
function acceptQuest(index) {
  const quests = getQuests();
  const reward = quests[index].reward;

  totalXP += reward;
  saveXP(totalXP);
  updateXPDisplay();

  quests[index].status = "Completed";
  saveQuests(quests);
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

/* Test input */
/*
  const input = `Title: Feast of the Evening Flame
  Backstory: As nightfall nears, your strength wanes and your stomach growls like a restless beast. You must seek a hearty meal to restore your vigor and prepare for tomorrow’s trials. A simple feast tonight shall grant you the power to endure.
  Objective: i want to eat dinner tonight
  Reward: 100 coins`;
  
  const parsed = parseQuestText(input);
  console.log(parsed);
*/
