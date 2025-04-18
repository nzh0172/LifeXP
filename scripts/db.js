
// Get quests (just return the array)
function getQuests() {
  return quests;
}


// Remove a quest from the array
function removeQuest(index) {
  quests.splice(index, 1);
}


// Delete and re-render
function deleteQuest(index) {
  removeQuest(index);
  renderQuests();
}
