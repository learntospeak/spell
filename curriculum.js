(() => {
  "use strict";

  const activities = {
    maths: [
      {
        stage: "2",
        skill: "Fractions",
        type: "choice",
        prompt: "Which fraction is bigger?",
        detail: "Think about how many equal parts are shaded.",
        choices: ["1/2", "1/4", "They are the same", "1/8"],
        answer: "1/2",
        hint: "When the top number is the same, fewer bottom parts means bigger pieces."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "You buy a pencil for $1.20 and pay with $2.00. How much change?",
        detail: "Write dollars and cents, or just cents.",
        answer: ["$0.80", "80c", "80 cents", "0.80"],
        hint: "Count up from $1.20 to $2.00."
      },
      {
        stage: "2",
        skill: "Times tables",
        type: "text",
        prompt: "6 x 7 = ?",
        detail: "Use a known fact nearby if you need it.",
        answer: ["42"],
        hint: "6 x 5 is 30, then add two more sixes."
      },
      {
        stage: "3",
        skill: "Fractions",
        type: "choice",
        prompt: "Which is equivalent to 3/4?",
        detail: "Equivalent means the same amount split into different sized pieces.",
        choices: ["6/8", "4/6", "3/8", "9/16"],
        answer: "6/8",
        hint: "Multiply the top and bottom by the same number."
      },
      {
        stage: "3",
        skill: "Decimals",
        type: "text",
        prompt: "0.6 + 0.25 = ?",
        detail: "Line up tenths and hundredths.",
        answer: ["0.85", ".85"],
        hint: "Write 0.6 as 0.60 first."
      },
      {
        stage: "3",
        skill: "Area",
        type: "text",
        prompt: "A rectangle is 8 cm long and 5 cm wide. What is its area?",
        detail: "Area means the space inside the shape.",
        answer: ["40", "40cm2", "40 cm2", "40 square cm", "40 square centimetres", "40 square centimeters"],
        hint: "For a rectangle, multiply length by width."
      }
    ],
    english: [
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence is punctuated correctly?",
        detail: "Look for the capital letter and ending mark.",
        choices: ["we went to the park.", "We went to the park.", "We went to the park", "we went to the park"],
        answer: "We went to the park.",
        hint: "A sentence starts with a capital and ends with punctuation."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "Which word is the strongest verb?",
        detail: "The sentence is: The dog ___ across the yard.",
        choices: ["went", "moved", "sprinted", "was"],
        answer: "sprinted",
        hint: "Choose the word that gives the clearest picture."
      },
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Mia packed an umbrella because dark clouds covered the sky. Why did Mia pack it?",
        detail: "Find the clue in the sentence.",
        choices: ["She thought it might rain.", "She was going swimming.", "She wanted shade.", "She lost her umbrella."],
        answer: "She thought it might rain.",
        hint: "Dark clouds are usually a clue about weather."
      },
      {
        stage: "3",
        skill: "Grammar",
        type: "choice",
        prompt: "Which sentence uses commas best?",
        detail: "The list has three things.",
        choices: ["I packed socks, lunch, and a torch.", "I packed socks lunch, and a torch.", "I packed, socks lunch and a torch.", "I packed socks lunch and, a torch."],
        answer: "I packed socks, lunch, and a torch.",
        hint: "Commas separate items in a list."
      },
      {
        stage: "3",
        skill: "Inference",
        type: "choice",
        prompt: "Tom stared at the trophy cabinet and tightened his shoelaces. What can you infer?",
        detail: "Use clues, not just exact words.",
        choices: ["He wants to do well in sport.", "He forgot his lunch.", "He is cleaning the cabinet.", "He is looking for a book."],
        answer: "He wants to do well in sport.",
        hint: "Trophy plus shoelaces points to sport or competition."
      },
      {
        stage: "3",
        skill: "Editing",
        type: "choice",
        prompt: "Which revision is clearest?",
        detail: "Original: The storm was bad.",
        choices: ["The storm smashed branches across the road.", "The storm was really very bad.", "The storm happened.", "The bad storm was bad."],
        answer: "The storm smashed branches across the road.",
        hint: "Specific details usually beat vague adjectives."
      }
    ],
    science: [
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "Which material is best for keeping water in a cup?",
        detail: "Think about properties, not colour.",
        choices: ["Plastic", "Tissue paper", "Cotton wool", "Cardboard"],
        answer: "Plastic",
        hint: "The best choice does not soak up water."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "Which is evidence that something is living?",
        detail: "Look for life processes.",
        choices: ["It grows and needs food.", "It is shiny.", "It makes a loud sound.", "It is heavy."],
        answer: "It grows and needs food.",
        hint: "Living things need energy and change over time."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "A ball slows down as it rolls over carpet. What force is acting on it?",
        detail: "The surface is rubbing against the ball.",
        choices: ["Friction", "Gravity only", "Magnetism", "Evaporation"],
        answer: "Friction",
        hint: "Friction happens when surfaces rub together."
      },
      {
        stage: "3",
        skill: "Fair testing",
        type: "choice",
        prompt: "You test which soil grows beans best. What should stay the same?",
        detail: "Only one thing should change in a fair test.",
        choices: ["Amount of water and sunlight", "The type of soil", "The result", "The question"],
        answer: "Amount of water and sunlight",
        hint: "Keep everything the same except what you are testing."
      },
      {
        stage: "3",
        skill: "Earth and space",
        type: "choice",
        prompt: "Why do shadows change during the day?",
        detail: "Think about the Sun's position in the sky.",
        choices: ["The Sun appears to move across the sky.", "The object gets smaller.", "The ground turns.", "The shadow chooses a new direction."],
        answer: "The Sun appears to move across the sky.",
        hint: "A shadow points away from the light source."
      },
      {
        stage: "3",
        skill: "Energy",
        type: "choice",
        prompt: "Which change shows electrical energy becoming light energy?",
        detail: "Follow the energy from source to result.",
        choices: ["A lamp turning on", "Ice melting", "A paper plane falling", "A book sitting on a shelf"],
        answer: "A lamp turning on",
        hint: "Electricity enters the device, and light comes out."
      }
    ]
  };

  const subject = document.body.dataset.subject;
  if (!subject || !activities[subject]) return;

  const els = {
    stage: document.querySelector("#stageSelect"),
    skill: document.querySelector("#skillSelect"),
    question: document.querySelector("#question"),
    choices: document.querySelector("#choices"),
    form: document.querySelector("#answerForm"),
    input: document.querySelector("#answerInput"),
    feedback: document.querySelector("#feedback"),
    hint: document.querySelector("#hint"),
    next: document.querySelector("#nextBtn"),
    coach: document.querySelector("#coachBtn"),
    progress: document.querySelector("#progressList"),
    coachBox: document.querySelector("#coachBox"),
    reset: document.querySelector("#resetProgressBtn")
  };

  const storageKey = `skillHub_${subject}_progress`;
  const soundStorageKey = "skillHub_soundEnabled";
  const state = {
    current: null,
    progress: readProgress(),
    soundEnabled: localStorage.getItem(soundStorageKey) === "true"
  };

  const celebration = {
    emojis: ["🎉", "⭐", "🎊", "✨", "🏆", "👏"],

    playSuccess() {
      playTone([
        { frequency: 760, start: 0, duration: 0.11 },
        { frequency: 1080, start: 0.1, duration: 0.18 }
      ], 0.22);
    },

    playError() {
      playTone([
        { frequency: 260, start: 0, duration: 0.12 },
        { frequency: 190, start: 0.12, duration: 0.16 }
      ], 0.18);
    },

    createConfetti() {
      const container = document.querySelector("#celebrationContainer");
      if (!container) return;

      for (let i = 0; i < 30; i += 1) {
        const confetti = document.createElement("div");
        confetti.className = `confetti type-${i % 6}`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "-10px";
        confetti.style.animationDelay = `${Math.random() * 0.25}s`;
        confetti.style.animationDuration = `${2.2 + Math.random() * 0.7}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confetti);
        window.setTimeout(() => confetti.remove(), 3200);
      }
    },

    createEmojis() {
      const container = document.querySelector("#celebrationContainer");
      if (!container) return;

      for (let i = 0; i < 3; i += 1) {
        const emoji = document.createElement("div");
        emoji.className = "celebration-emoji";
        emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        emoji.style.left = `${30 + Math.random() * 40}%`;
        emoji.style.top = "50%";
        emoji.style.animationDelay = `${i * 0.15}s`;
        container.appendChild(emoji);
        window.setTimeout(() => emoji.remove(), 1600);
      }
    },

    celebrate() {
      this.createConfetti();
      this.createEmojis();
      this.playSuccess();
    },

    notifyError() {
      this.playError();
    }
  };

  function playTone(notes, volume) {
    if (!state.soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;

      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      notes.forEach((note) => {
        const osc = audioContext.createOscillator();
        osc.connect(gain);
        osc.frequency.setValueAtTime(note.frequency, now + note.start);
        osc.start(now + note.start);
        osc.stop(now + note.start + note.duration);
      });
    } catch (error) {
      // Browsers can block audio before a user gesture; the app still works silently.
    }
  }

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(state.progress));
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\.$/, "");
  }

  function scoreForSkill(skill) {
    const item = state.progress[skill] || { attempts: 0, correct: 0, hints: 0 };
    if (!item.attempts) return 0;
    return Math.round((item.correct / item.attempts) * 100);
  }

  function getFilteredPool() {
    return activities[subject].filter((item) => {
      const stageMatch = els.stage.value === "all" || item.stage === els.stage.value;
      const skillMatch = els.skill.value === "all" || item.skill === els.skill.value;
      return stageMatch && skillMatch;
    });
  }

  function chooseActivity() {
    const pool = getFilteredPool();
    if (!pool.length) return null;
    const sorted = [...pool].sort((a, b) => scoreForSkill(a.skill) - scoreForSkill(b.skill));
    const weakSlice = sorted.slice(0, Math.max(1, Math.ceil(sorted.length / 2)));
    return weakSlice[Math.floor(Math.random() * weakSlice.length)];
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderSkills() {
    const skills = [...new Set(activities[subject].map((item) => item.skill))].sort();
    els.skill.innerHTML = '<option value="all">All skills</option>' + skills
      .map((skill) => `<option value="${skill}">${skill}</option>`)
      .join("");
  }

  function renderQuestion() {
    const item = chooseActivity();
    state.current = item;
    els.feedback.textContent = "";
    els.feedback.className = "feedback";
    els.hint.textContent = "Try it first, then ask for a hint if you get stuck.";
    els.hint.dataset.used = "false";
    els.coachBox.hidden = true;
    els.coachBox.textContent = "";
    els.input.value = "";

    if (!item) {
      els.question.innerHTML = "No activity found.<small>Try another stage or skill.</small>";
      els.choices.innerHTML = "";
      els.form.hidden = true;
      return;
    }

    els.question.innerHTML = `${item.prompt}<small>${item.detail}</small>`;
    els.form.hidden = item.type !== "text";
    els.choices.innerHTML = "";

    if (item.type === "choice") {
      els.choices.innerHTML = shuffle(item.choices)
        .map((choice) => `<button type="button" class="choice" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`)
        .join("");
    }
  }

  function recordResult(correct, usedHint) {
    if (!state.current) return;
    const key = state.current.skill;
    const existing = state.progress[key] || { attempts: 0, correct: 0, hints: 0 };
    existing.attempts += 1;
    if (correct) existing.correct += 1;
    if (usedHint) existing.hints += 1;
    state.progress[key] = existing;
    saveProgress();
    renderProgress();
  }

  function isCorrect(value) {
    const answer = state.current.answer;
    const answers = Array.isArray(answer) ? answer : [answer];
    return answers.some((item) => normalize(item) === normalize(value));
  }

  function check(value) {
    if (!state.current) return;
    const correct = isCorrect(value);
    recordResult(correct, els.hint.dataset.used === "true");

    if (correct) {
      els.feedback.className = "feedback good";
      els.feedback.textContent = "Correct. Nice thinking.";
      celebration.celebrate();
      window.setTimeout(renderQuestion, 850);
      return;
    }

    els.feedback.className = "feedback bad";
    els.feedback.textContent = `Not quite. ${state.current.hint}`;
    celebration.notifyError();
  }

  function renderProgress() {
    const skills = [...new Set(activities[subject].map((item) => item.skill))].sort();
    els.progress.innerHTML = skills.map((skill) => {
      const item = state.progress[skill] || { attempts: 0, correct: 0, hints: 0 };
      const percent = item.attempts ? Math.round((item.correct / item.attempts) * 100) : 0;
      const label = item.attempts ? `${percent}% from ${item.attempts} tries` : "Not started";
      return `
        <div class="progress-item">
          <strong>${skill}</strong>
          <div class="meter" aria-label="${skill} progress"><span style="width: ${percent}%"></span></div>
          <span class="note">${label}</span>
        </div>
      `;
    }).join("");
  }

  function localCoachText() {
    if (!state.current) return "Pick an activity first.";
    const skill = state.current.skill;
    const progress = state.progress[skill] || { attempts: 0, correct: 0, hints: 0 };
    if (progress.attempts >= 3 && progress.correct / progress.attempts < 0.5) {
      return `Let's slow down on ${skill}. Try explaining the question in your own words before choosing an answer.`;
    }
    return state.current.hint;
  }

  async function getCoachHelp() {
    if (!state.current) return;
    els.coach.disabled = true;
    els.coachBox.hidden = false;
    els.coachBox.textContent = "Thinking...";

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          stage: state.current.stage,
          skill: state.current.skill,
          question: state.current.prompt,
          progress: state.progress[state.current.skill] || null
        })
      });

      if (!response.ok) throw new Error("Coach API unavailable");
      const data = await response.json();
      els.coachBox.textContent = data.hint || localCoachText();
    } catch (error) {
      els.coachBox.textContent = localCoachText();
    } finally {
      els.coach.disabled = false;
    }
  }

  renderSkills();
  renderProgress();
  renderQuestion();
  renderSoundToggle();

  els.stage.addEventListener("change", renderQuestion);
  els.skill.addEventListener("change", renderQuestion);
  els.next.addEventListener("click", renderQuestion);
  els.coach.addEventListener("click", getCoachHelp);
  els.reset.addEventListener("click", () => {
    state.progress = {};
    saveProgress();
    renderProgress();
    renderQuestion();
  });

  els.choices.addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer]");
    if (!button) return;
    check(button.dataset.answer);
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    check(els.input.value);
  });

  document.querySelector("#hintBtn").addEventListener("click", () => {
    if (!state.current) return;
    els.hint.dataset.used = "true";
    els.hint.textContent = state.current.hint;
  });

  function renderSoundToggle() {
    const button = document.querySelector("#soundToggle");
    if (!button) return;
    button.textContent = state.soundEnabled ? "Sound on" : "Sound off";
    button.title = state.soundEnabled ? "Turn sound off" : "Turn sound on";
  }

  document.querySelector("#soundToggle").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem(soundStorageKey, String(state.soundEnabled));
    renderSoundToggle();
  });
})();
