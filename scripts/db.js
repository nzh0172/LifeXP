
// Get quests from localStorage or empty array
function getQuests(){
    const data = localStorage.getItem('quests');
    return data ? JSON.parse(data) : [];
}

// Save quests array to localStorage
function saveQuests(quests){
    localStorage.setItem('quests', JSON.stringify(quests));
}

// Add a new quest to the db
function addQuest(quest){
    const quests = getQuests();
    quests.push(quest); // Add the new quest to the array
    saveQuests(quests);
}

// Remove a quest from the db
function removeQuest(index){
    const quests = getQuests();
    quests.splice(index, 1); // Remove the quest at the specified index
    saveQuests(quests);
}

function renderQuests() {
    const questList = document.querySelector(".task-list");
    questList.innerHTML = "";
  
    const quests = getQuests();
    quests.forEach((quest, index) => {
      const task = document.createElement("div");
      task.className = "task";
      task.innerHTML = `
        <div class="status">${quest.status}</div>
        <div>${quest.title}</div>
        <div class="xp">+${quest.xp}</div>
        <button onclick="deleteQuest(${index})" style="position:absolute; top:5px; right:5px;">❌</button>
      `;
      task.onclick = () => showQuestDetail(index);
      questList.appendChild(task);
    });
  }

function deleteQuest(index) {
    removeQuest(index); // from db.js
    renderQuests();     // refresh the list
  }



