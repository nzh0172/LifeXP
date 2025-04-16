
//Show quest box details
function showDetail() {
    document.getElementById('detailBox').classList.add('active');
    document.body.classList.add('detail-open');

  }
function hideDetail() {
    document.getElementById('detailBox').classList.remove('active');
    document.body.classList.remove('detail-open');

}

//Show add quest box
function showAddQuest(){
    document.getElementById('addQuestBox').classList.add('active');
    document.body.classList.add('addquest-open');

}
function hideAddQuest(){
    document.getElementById('addQuestBox').classList.remove('active');
    document.body.classList.remove('addquest-open');
    document.getElementById('newtask').value = '';
    document.getElementById('outputPrompt').value = '';

}

//Prompt quest for adding task
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("newtask");
    const hiddenText = document.getElementById("hiddenCopyText");

    textarea.addEventListener("input", function () {
        hiddenText.value =
            "You are to turn a given task into a quest with short backstory consists of 1 short paragraph with 3 sentences, 50 words max. If the task contains a name or a deadline, you must include it. " +
            "The quest must have the user's involvement using pronoun 'You', not a third party. Make it under this format 'Backstory:' " +
            "For each task, give a cool epic medieval quest name under this format, Title: X. " +
            "Write exactly as the original task under this format, Objective: X, do not add any additional info such as time or deadline or other character unless mentioned in the task. " +
            "Do not put any symbols such as double ** in title, backstory, objective and reward. " +
            "For each task, give an amount of coins that is appropriate for the level of difficulty of the task. " +
            "The coins must not be zero or negative. Give only coins, no other comments needed. Make it under this format 'Reward: X coins'. " +
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
      reward: rewardMatch ? rewardMatch[1].trim() : null
    };
  }


// Validate the format of the output prompt
document.getElementById("outputPrompt").addEventListener("input", function () {
    const text = this.value;

    const isValid = /^Title:\s*(.+)\nBackstory:\s*((?:.|\n)*?)\nObjective:\s*(.+)\nReward:\s*(\d+)\s*coins$/i.test(text.trim());

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


/* Test input */
/*
  const input = `Title: Feast of the Evening Flame
  Backstory: As nightfall nears, your strength wanes and your stomach growls like a restless beast. You must seek a hearty meal to restore your vigor and prepare for tomorrow’s trials. A simple feast tonight shall grant you the power to endure.
  Objective: i want to eat dinner tonight
  Reward: 100 coins`;
  
  const parsed = parseQuestText(input);
  console.log(parsed);
*/
  
  
  
