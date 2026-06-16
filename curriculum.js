(() => {
  "use strict";

  const funny = [
    "a lunchbox committee with suspiciously strong opinions",
    "Professor Pickle's extremely dramatic clipboard",
    "a pancake-powered robot named Sir Flips-a-Lot",
    "the neighbourhood sock inspector",
    "a tiny mayor who only speaks in sticky notes",
    "a skateboard club for confused calculators",
    "a classroom shop run by a very serious banana",
    "the Great Hallway Noodle Festival",
    "a homework detective wearing magnificent gumboots",
    "Captain Spreadsheet and the Budget Biscuits"
  ];

  const names = ["Mia", "Leo", "Asha", "Noah", "Zara", "Finn", "Ruby", "Kai", "Evie", "Sam"];
  const items = ["stickers", "marbles", "cupcakes", "pencils", "bookmarks", "shells", "trading cards", "magnets", "paper planes", "buttons"];

  const skillsBySubject = {
    maths: ["Number", "Fractions", "Measurement", "Data", "Problem solving"],
    english: ["Comprehension", "Grammar", "Vocabulary", "Writing", "Persuasion"],
    science: ["Living things", "Materials", "Forces", "Earth and space", "Investigations"],
    engineering: ["Design brief", "Materials", "Forces", "Systems", "Testing"],
    finance: ["Money maths", "Needs and wants", "Budgeting", "Saving", "Value choices"]
  };

  const subjectTitles = {
    maths: "Maths",
    english: "English",
    science: "Science",
    engineering: "Engineering",
    finance: "Finance"
  };

  const activities = Object.fromEntries(
    Object.keys(skillsBySubject).map((subject) => [subject, buildSubject(subject)])
  );

  const subject = document.body.dataset.subject;
  if (!subject || !activities[subject]) return;

  const els = {
    year: document.querySelector("#stageSelect"),
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
    emojis: ["Great", "Nice", "Yes", "Sharp", "Boom", "Solved"],

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

      for (let i = 0; i < 28; i += 1) {
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

    createWords() {
      const container = document.querySelector("#celebrationContainer");
      if (!container) return;

      for (let i = 0; i < 3; i += 1) {
        const word = document.createElement("div");
        word.className = "celebration-emoji";
        word.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        word.style.left = `${30 + Math.random() * 40}%`;
        word.style.top = "50%";
        word.style.animationDelay = `${i * 0.15}s`;
        container.appendChild(word);
        window.setTimeout(() => word.remove(), 1600);
      }
    },

    celebrate() {
      this.createConfetti();
      this.createWords();
      this.playSuccess();
    },

    notifyError() {
      this.playError();
    }
  };

  function buildSubject(activitySubject) {
    const result = [];
    ["3", "6"].forEach((year) => {
      skillsBySubject[activitySubject].forEach((skill) => {
        for (let index = 1; index <= 20; index += 1) {
          result.push(makeActivity(activitySubject, year, skill, index));
        }
      });
    });
    return result;
  }

  function makeActivity(activitySubject, year, skill, index) {
    const kindCycle = year === "3"
      ? ["choice", "text", "grid", "long", "text"]
      : ["text", "long", "choice", "grid", "long"];
    const type = kindCycle[(index - 1) % kindCycle.length];
    const context = funny[(index + skill.length + year.length) % funny.length];
    const person = names[(index + skill.length) % names.length];
    const thing = items[(index + activitySubject.length) % items.length];

    if (activitySubject === "maths") return makeMaths(year, skill, index, type, context, person, thing);
    if (activitySubject === "english") return makeEnglish(year, skill, index, type, context, person);
    if (activitySubject === "science") return makeScience(year, skill, index, type, context, person);
    if (activitySubject === "engineering") return makeEngineering(year, skill, index, type, context, person);
    return makeFinance(year, skill, index, type, context, person, thing);
  }

  function makeMaths(year, skill, index, type, context, person, thing) {
    const base = year === "3" ? index + 4 : index + 17;
    if (skill === "Fractions" || type === "grid") {
      const total = year === "3" ? [4, 6, 8, 10][index % 4] : 100;
      const target = year === "3" ? Math.max(1, index % total) : [15, 20, 25, 30, 35, 40, 45, 50, 60, 75][index % 10];
      return {
        year,
        skill,
        type: "grid",
        prompt: `${context}: colour ${target}${year === "6" ? "%" : `/${total}`} of the grid without starting a mathematical food fight.`,
        detail: year === "6" ? "Use the hundred grid, then explain the matching fraction or decimal." : `Tap ${target} of the ${total} equal parts.`,
        grid: { rows: total === 100 ? 10 : 1, columns: total === 100 ? 10 : total, target },
        answer: year === "6" ? [`${target}%`, `${target}/100`, String(target / 100), String(target)] : [`${target}/${total}`, String(target)],
        hint: year === "6" ? `${target}% means ${target} out of 100.` : `The top number tells how many parts to colour.`,
        sample: year === "6" ? `${target}% = ${target}/100. Simplify if possible, then write the decimal.` : `I coloured ${target} equal parts.`
      };
    }

    if (type === "choice") {
      const correct = base * 3;
      return {
        year,
        skill,
        type,
        prompt: `${person} packs ${base} boxes with 3 ${thing} in each. How many ${thing} are there?`,
        detail: `${context} is checking the answer with a tiny clipboard.`,
        choices: shuffle([correct, correct + 3, correct - 3, base + 3]).map(String),
        answer: String(correct),
        hint: `Multiply ${base} by 3.`
      };
    }

    if (type === "long") {
      const a = year === "3" ? base + 8 : base * 3;
      const b = year === "3" ? index + 6 : base + 12;
      return {
        year,
        skill,
        type,
        prompt: `${context} has ${a} ${thing}. ${person} adds ${b}, then shares the total equally between ${year === "3" ? 4 : 7} tables. Show the steps and explain whether there are leftovers.`,
        detail: "Write more than one line: calculation, answer, and a sentence explaining your thinking.",
        sample: year === "3" ? `Step 1: ${a} + ${b} = ${a + b}. Step 2: share into 4 groups. Explain any remainder.` : `Add first, divide by 7, then explain what the remainder means in the story.`,
        checklist: ["I found the total first.", "I divided into equal groups.", "I wrote a sentence about the answer."],
        hint: "Do the story in the order it happens."
      };
    }

    const answer = year === "3" ? base * 4 + 6 : (base * 12) - 19;
    return {
      year,
      skill,
      type: "text",
      prompt: year === "3" ? `${base} x 4 + 6 = ?` : `${base} x 12 - 19 = ?`,
      detail: `${context} insists the working must be neat enough for a sandwich to understand.`,
      answer: [String(answer)],
      hint: year === "3" ? `Work out ${base} x 4 first, then add 6.` : `Work out ${base} x 12 first, then subtract 19.`
    };
  }

  function makeEnglish(year, skill, index, type, context, person) {
    const sentence = `${person} found a mysterious lunchbox under the library stairs`;
    if (type === "choice") {
      const choices = skill === "Grammar"
        ? ["verb", "noun", "adjective", "conjunction"]
        : ["It makes the reader curious.", "It proves lunchboxes can drive.", "It is a shopping list.", "It gives the author's shoe size."];
      return {
        year,
        skill,
        type,
        prompt: skill === "Grammar" ? `In this sentence, what kind of word is "found"? ${sentence}.` : `Why is this a strong story opening? "${sentence}."`,
        detail: `${context} is reading it aloud in a very official whisper.`,
        choices,
        answer: choices[0],
        hint: skill === "Grammar" ? "Found is the action." : "A strong opening gives a clear situation and makes the reader wonder."
      };
    }

    if (type === "long") {
      return {
        year,
        skill,
        type,
        prompt: year === "3"
          ? `Write 3 to 4 sentences about ${context}. Include one describing word, one because sentence, and one funny detail.`
          : `Write a short paragraph explaining whether ${context} should be allowed to run the school assembly. Use a clear opinion, evidence, and a concluding sentence.`,
        detail: "Use multiple lines. Make it funny, but keep the meaning clear.",
        sample: year === "3"
          ? `The serious banana opened the shop because everyone needed pencils. It wore a tiny badge. The customers were confused but polite.`
          : `I do not think the banana should run assembly because it may spend too much time discussing fruit prices. A good assembly leader needs clear instructions and calm timing. Therefore, the banana can help, but a teacher should lead.`,
        checklist: year === "3"
          ? ["I wrote at least 3 sentences.", "I used a describing word.", "I used because."]
          : ["I gave an opinion.", "I included evidence or a reason.", "I finished with a conclusion."],
        hint: "Plan the idea first, then write the sentences."
      };
    }

    const target = skill === "Vocabulary" ? "enormous" : "because";
    return {
      year,
      skill,
      type: "text",
      prompt: year === "3" ? `Write a sentence using the word "${target}".` : `Improve this sentence: "The thing was good." Make it precise and interesting.`,
      detail: `${context} will accept sensible writing, even if it refuses to clap.`,
      answer: null,
      sample: year === "3" ? `The enormous sandwich blocked the classroom door.` : `The solar-powered scooter glided smoothly across the courtyard.`,
      checklist: ["My sentence makes sense.", "I used careful word choices.", "I checked punctuation."],
      hint: "Say it out loud and check whether it sounds complete."
    };
  }

  function makeScience(year, skill, index, type, context, person) {
    if (type === "choice") {
      const bank = {
        "Living things": ["It grows, needs energy, and responds to its environment.", "It is shiny.", "It has wheels.", "It can sit on a shelf."],
        Materials: ["Waterproof and flexible", "Fluffy and absorbent", "Made of jelly", "Invisible on Tuesdays"],
        Forces: ["Friction", "Evaporation", "Condensation", "Reflection"],
        "Earth and space": ["Earth spins on its axis", "The Sun turns off", "Clouds push the Moon", "Stars sweep the floor"],
        Investigations: ["Keep all other variables the same", "Change every variable", "Hide the results", "Measure with a spoon"]
      };
      return {
        year,
        skill,
        type,
        prompt: `${person} is testing ${context}. Which answer best matches ${skill.toLowerCase()}?`,
        detail: "Choose the scientific idea, not the funniest nonsense option.",
        choices: bank[skill],
        answer: bank[skill][0],
        hint: "Look for the option that could be used as scientific evidence."
      };
    }

    if (type === "long") {
      return {
        year,
        skill,
        type,
        prompt: year === "3"
          ? `${context} claims a wet paper towel is the best roof for a toy house. Explain what you would test and what result would prove it wrong.`
          : `Design a fair test for ${context}. State the question, the one variable you change, two variables you keep the same, and the evidence you would collect.`,
        detail: "Answer in separate lines so the investigation is easy to follow.",
        sample: year === "3"
          ? `I would pour the same amount of water on paper towel and plastic. If the paper towel leaks or tears, it is not the best roof.`
          : `Question: Which material keeps water out best? Change: material. Keep same: water amount and roof size. Evidence: measure water leaked in millilitres.`,
        checklist: ["I named what is being tested.", "I used evidence.", "I explained the result."],
        hint: "A fair test changes one thing and measures what happens."
      };
    }

    return {
      year,
      skill,
      type: "text",
      prompt: skill === "Forces" ? `Name the force that slows ${context} sliding across carpet.` : `Name one piece of evidence ${person} could collect for a ${skill.toLowerCase()} investigation.`,
      detail: "A one-line answer is okay here, but be precise.",
      answer: skill === "Forces" ? ["friction"] : null,
      sample: "Measure, observe, or record something that answers the question.",
      checklist: ["My answer is observable or measurable."],
      hint: skill === "Forces" ? "Surfaces rubbing together create it." : "Evidence is something you can observe or measure."
    };
  }

  function makeEngineering(year, skill, index, type, context, person) {
    if (type === "choice") {
      const choices = ["Test it, improve it, then test again", "Paint it gold and hope", "Only ask the loudest person", "Ignore the design brief"];
      return {
        year,
        skill,
        type,
        prompt: `${person} builds a bridge for ${context}. What should happen after the first test fails?`,
        detail: "Engineering improves designs using evidence.",
        choices,
        answer: choices[0],
        hint: "Engineers use test results to improve a design."
      };
    }

    if (type === "long") {
      return {
        year,
        skill,
        type,
        prompt: year === "3"
          ? `Design a paper tower for ${context}. Write the goal, two materials, and one rule for keeping it safe.`
          : `Create a design plan for a device that helps ${context} move a small object across a desk. Include criteria for success, constraints, materials, and how you would test it.`,
        detail: "Use headings or separate lines. This should be more than one sentence.",
        sample: year === "3"
          ? `Goal: hold a small toy. Materials: paper and tape. Safety rule: keep scissors pointed down.`
          : `Criteria: moves 30 cm and protects the object. Constraints: only paper, tape, string. Test: measure distance, record failures, improve weak parts.`,
        checklist: ["I named the problem.", "I listed materials.", "I explained how to test or improve it."],
        hint: "A design plan says what success looks like before building."
      };
    }

    return {
      year,
      skill,
      type: "text",
      prompt: `${context} needs a strong base. Should a wide base or narrow base be more stable?`,
      detail: "Type the better choice.",
      answer: ["wide", "wide base", "a wide base"],
      hint: "A wider base usually makes a structure harder to tip over."
    };
  }

  function makeFinance(year, skill, index, type, context, person, thing) {
    const income = year === "3" ? index + 3 : index + 12;
    const weeks = year === "3" ? 4 : 8;
    const spend = year === "3" ? index + 2 : index + 17;

    if (type === "choice") {
      const choices = skill === "Needs and wants"
        ? ["Needs are essential; wants are nice extras.", "Wants are always free.", "Needs are things with glitter.", "Budgets only work on Mondays."]
        : ["Compare cost, usefulness, and leftover money", "Buy the loudest option", "Spend all money immediately", "Hide the receipt in a sandwich"];
      return {
        year,
        skill,
        type,
        prompt: `${person} is planning money for ${context}. Which statement is most sensible?`,
        detail: "Choose the answer that helps with wise money choices.",
        choices,
        answer: choices[0],
        hint: "Good money choices compare cost with purpose."
      };
    }

    if (type === "long") {
      return {
        year,
        skill,
        type,
        prompt: `${person} earns $${income} each week for ${weeks} weeks, then spends $${spend} on ${thing}. Work out the leftover money and explain whether buying it was a need or a want.`,
        detail: "Use at least three lines: earnings, spending, and explanation.",
        sample: `Earnings: $${income} x ${weeks} = $${income * weeks}. Leftover: $${income * weeks} - $${spend} = $${income * weeks - spend}. It is a want if it is not essential.`,
        checklist: ["I multiplied income by weeks.", "I subtracted the spending.", "I explained need or want."],
        hint: "Find total income before subtracting the cost."
      };
    }

    const answer = income * weeks - spend;
    return {
      year,
      skill,
      type: "text",
      prompt: `${person} saves $${income} each week for ${weeks} weeks and spends $${spend}. How much is left?`,
      detail: `${context} is auditing the snack budget with great seriousness.`,
      answer: [`$${answer}`, String(answer), `${answer} dollars`],
      hint: `Work out ${income} x ${weeks}, then subtract ${spend}.`
    };
  }

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
      const yearMatch = els.year.value === "all" || item.year === els.year.value;
      const skillMatch = els.skill.value === "all" || item.skill === els.skill.value;
      return yearMatch && skillMatch;
    });
  }

  function chooseActivity() {
    const pool = getFilteredPool();
    if (!pool.length) return null;
    const sorted = [...pool].sort((a, b) => scoreForSkill(a.skill) - scoreForSkill(b.skill));
    const weakSlice = sorted.slice(0, Math.max(1, Math.ceil(sorted.length / 2)));
    return weakSlice[Math.floor(Math.random() * weakSlice.length)];
  }

  function shuffle(itemsToShuffle) {
    const copy = [...itemsToShuffle];
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
      .map((skill) => `<option value="${escapeHtml(skill)}">${escapeHtml(skill)}</option>`)
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
    els.input.type = "text";
    els.input.placeholder = "Type your answer";
    els.form.querySelector(".primary").textContent = "Check";

    if (!item) {
      els.question.innerHTML = "No activity found.<small>Try another year level or skill.</small>";
      els.choices.innerHTML = "";
      els.form.hidden = true;
      return;
    }

    els.question.innerHTML = `${escapeHtml(item.prompt)}<small>${escapeHtml(item.detail)}</small>`;
    els.choices.innerHTML = "";
    els.form.hidden = !["text", "long"].includes(item.type);
    els.input.hidden = false;
    if (item.type === "text" && !item.answer) {
      els.form.querySelector(".primary").textContent = "Review";
      els.input.placeholder = "Write a sentence or short answer";
    }

    if (item.type === "choice") renderChoices(item);
    if (item.type === "grid") renderGrid(item);
    if (item.type === "long") renderLongInput(item);
  }

  function renderChoices(item) {
    els.choices.innerHTML = shuffle(item.choices)
      .map((choice) => `<button type="button" class="choice" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`)
      .join("");
  }

  function renderGrid(item) {
    const total = item.grid.rows * item.grid.columns;
    els.choices.innerHTML = `
      <div class="work-area">
        <div class="fraction-grid" style="grid-template-columns: repeat(${item.grid.columns}, 1fr)" aria-label="Tap cells to colour them">
          ${Array.from({ length: total }, (_, cell) => `<button type="button" class="grid-cell" data-cell="${cell + 1}" aria-label="Cell ${cell + 1}"></button>`).join("")}
        </div>
        <div class="grid-actions">
          <button type="button" id="checkGridBtn">Check coloured parts</button>
          <button type="button" id="clearGridBtn">Clear</button>
        </div>
      </div>
    `;
    els.form.hidden = true;
  }

  function renderLongInput(item) {
    els.input.hidden = true;
    document.querySelectorAll("#longAnswerInput").forEach((node) => node.remove());
    els.form.insertAdjacentHTML("afterbegin", `<textarea id="longAnswerInput" rows="6" placeholder="Write your answer on a few lines"></textarea>`);
    els.form.querySelector(".primary").textContent = item.answer ? "Check" : "Review";
  }

  function resetFormButton() {
    const textarea = document.querySelector("#longAnswerInput");
    if (textarea) textarea.remove();
    els.form.querySelector(".primary").textContent = "Check";
  }

  function recordResult(correct, usedHint) {
    if (!state.current) return;
    const key = `${state.current.year} ${state.current.skill}`;
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
    if (!answer) return normalize(value).length >= 18;
    const answers = Array.isArray(answer) ? answer : [answer];
    return answers.some((item) => normalize(item) === normalize(value));
  }

  function check(value) {
    if (!state.current) return;
    const correct = isCorrect(value);
    recordResult(correct, els.hint.dataset.used === "true");

    if (correct) {
      els.feedback.className = state.current.answer ? "feedback good" : "feedback warn";
      els.feedback.innerHTML = state.current.answer
        ? "Correct. Nice thinking."
        : reviewHtml(state.current);
      celebration.celebrate();
      if (state.current.answer) window.setTimeout(() => { resetFormButton(); renderQuestion(); }, 850);
      return;
    }

    els.feedback.className = "feedback bad";
    els.feedback.textContent = `Not quite. ${state.current.hint}`;
    celebration.notifyError();
  }

  function reviewHtml(item) {
    const checklist = item.checklist || ["I answered the question.", "I explained my thinking."];
    return `
      <strong>Review your answer:</strong>
      <ul>${checklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      <span>Sample: ${escapeHtml(item.sample || "A clear answer explains the idea and uses evidence.")}</span>
    `;
  }

  function renderProgress() {
    const skills = [];
    ["3", "6"].forEach((year) => {
      skillsBySubject[subject].forEach((skill) => skills.push(`${year} ${skill}`));
    });
    els.progress.innerHTML = skills.map((skill) => {
      const item = state.progress[skill] || { attempts: 0, correct: 0, hints: 0 };
      const percent = item.attempts ? Math.round((item.correct / item.attempts) * 100) : 0;
      const label = item.attempts ? `${percent}% from ${item.attempts} tries` : "Not started";
      return `
        <div class="progress-item">
          <strong>Year ${escapeHtml(skill)}</strong>
          <div class="meter" aria-label="${escapeHtml(skill)} progress"><span style="width: ${percent}%"></span></div>
          <span class="note">${label}</span>
        </div>
      `;
    }).join("");
  }

  function localCoachText() {
    if (!state.current) return "Pick an activity first.";
    if (!state.current.answer) return state.current.sample || state.current.hint;
    const key = `${state.current.year} ${state.current.skill}`;
    const progress = state.progress[key] || { attempts: 0, correct: 0, hints: 0 };
    if (progress.attempts >= 3 && progress.correct / progress.attempts < 0.5) {
      return `Let's slow down on ${state.current.skill}. Try restating the question, then write the first step before answering.`;
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
          subject: subjectTitles[subject],
          year: state.current.year,
          skill: state.current.skill,
          question: state.current.prompt,
          progress: state.progress[`${state.current.year} ${state.current.skill}`] || null
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

  els.year.addEventListener("change", () => {
    resetFormButton();
    renderQuestion();
  });
  els.skill.addEventListener("change", () => {
    resetFormButton();
    renderQuestion();
  });
  els.next.addEventListener("click", () => {
    resetFormButton();
    renderQuestion();
  });
  els.coach.addEventListener("click", getCoachHelp);
  els.reset.addEventListener("click", () => {
    state.progress = {};
    saveProgress();
    renderProgress();
    resetFormButton();
    renderQuestion();
  });

  els.choices.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-answer]");
    if (choiceButton) {
      check(choiceButton.dataset.answer);
      return;
    }

    const cell = event.target.closest(".grid-cell");
    if (cell) {
      cell.classList.toggle("selected");
      return;
    }

    if (event.target.id === "clearGridBtn") {
      els.choices.querySelectorAll(".grid-cell").forEach((node) => node.classList.remove("selected"));
      return;
    }

    if (event.target.id === "checkGridBtn") {
      const selected = els.choices.querySelectorAll(".grid-cell.selected").length;
      check(String(selected));
    }
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const longAnswer = document.querySelector("#longAnswerInput");
    check(longAnswer ? longAnswer.value : els.input.value);
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

  window.skillHubActivities = activities;
})();
