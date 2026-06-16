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
    "Captain Spreadsheet and the Budget Biscuits",
    "a cafeteria courtroom where the ruler is the judge",
    "the annual Under-Desk Treasure Audit",
    "a glue-stick orchestra with terrible timing",
    "the Midnight Library of Slightly Rude Bookmarks",
    "a solar-powered scooter race around the sofa",
    "the emergency meeting of the Lost Pencil Society",
    "a cupcake factory with a suspiciously tiny conveyor belt",
    "the school garden's dramatic watering roster",
    "a paper-plane airport with strict snack security",
    "the Museum of Almost Useful Inventions",
    "a hat shop that only accepts exact change",
    "the secret tunnel behind the whiteboard",
    "a very competitive measuring tape championship",
    "the Great Backpack Weight Investigation",
    "a tiny theme park for bored paperclips",
    "the canteen's legendary soup-launch disaster",
    "a bridge-building contest for miniature lunch trays",
    "the classroom weather station's dramatic forecast",
    "a silent disco for calculators with low battery",
    "the Friday Afternoon Mystery Graph"
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
    soundEnabled: localStorage.getItem(soundStorageKey) === "true",
    typePreference: 0,
    recentPrompts: []
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
          result.push(rebalanceActivity(makeActivity(activitySubject, year, skill, index), index));
        }
      });
    });
    return result;
  }

  function rebalanceActivity(activity, index) {
    if (activity.type !== "choice" || index % 3 === 0) return activity;

    return openReview(
      activity.year,
      activity.skill,
      `${activity.prompt} Write the answer and explain why, instead of choosing from options.`,
      activity.detail,
      `${activity.answer}. ${activity.hint}`,
      ["I wrote the answer.", "I gave a reason.", "I used evidence or working."],
      activity.hint
    );
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

  function pick(list, index, offset = 0) {
    return list[(index + offset) % list.length];
  }

  function openReview(year, skill, prompt, detail, sample, checklist, hint) {
    return { year, skill, type: "long", prompt, detail, sample, checklist, hint };
  }

  function shortReview(year, skill, prompt, detail, sample, checklist, hint) {
    return { year, skill, type: "text", prompt, detail, answer: null, sample, checklist, hint };
  }

  function exactText(year, skill, prompt, detail, answer, hint) {
    return { year, skill, type: "text", prompt, detail, answer: Array.isArray(answer) ? answer : [String(answer)], hint };
  }

  function choice(year, skill, prompt, detail, choices, answer, hint) {
    return { year, skill, type: "choice", prompt, detail, choices, answer, hint };
  }

  function makeMaths(year, skill, index, type, context, person, thing) {
    const base = year === "3" ? index + 5 : index + 18;
    const variant = (index - 1) % 10;

    if (skill === "Fractions") {
      const total = year === "3" ? pick([4, 6, 8, 10], index) : 100;
      const target = year === "3" ? Math.max(1, (index * 2) % total) : pick([12, 15, 20, 25, 30, 35, 40, 45, 60, 75], index);
      if ([0, 4, 8].includes(variant)) {
        return choice(
          year,
          skill,
          year === "3" ? `${person} coloured ${target} of ${total} equal jelly tiles. Which fraction is coloured?` : `${context} filled ${target} squares on a hundred grid. Which decimal matches?`,
          "Use the parts shown in the story.",
          year === "3" ? [`${target}/${total}`, `${total}/${target}`, `1/${total}`, `${target}/10`] : [String(target / 100), `${target / 10}`, `${target}/10`, `${100 - target}%`],
          year === "3" ? `${target}/${total}` : String(target / 100),
          year === "3" ? "Coloured parts go on top; total parts go on bottom." : "A hundred grid turns percent into hundredths."
        );
      }
      return {
        year,
        skill,
        type: "grid",
        prompt: year === "3" ? `${context}: colour ${target}/${total} of the snack bar.` : `${context}: colour ${target}% of the hundred grid, then think of the matching decimal.`,
        detail: year === "6" ? "Use the hundred grid as your visual model." : `Tap ${target} of the ${total} equal parts.`,
        grid: { rows: total === 100 ? 10 : 1, columns: total === 100 ? 10 : total, target },
        answer: year === "6" ? [`${target}%`, `${target}/100`, String(target / 100), String(target)] : [`${target}/${total}`, String(target)],
        hint: year === "6" ? `${target}% means ${target} out of 100.` : `The top number tells how many parts to colour.`,
        sample: year === "6" ? `${target}% = ${target}/100. Simplify if possible, then write the decimal.` : `I coloured ${target} equal parts.`
      };
    }

    if (skill === "Number") {
      const prompts = [
        () => exactText(year, skill, `Find the missing number: ${base} + □ = ${base + index + 11}`, `${context} hid the number under a napkin.`, index + 11, "Subtract the known part from the total."),
        () => exactText(year, skill, year === "3" ? `Round ${base * 37} to the nearest ten.` : `Round ${base * 137} to the nearest thousand.`, "Look at the place-value digit next door.", year === "3" ? Math.round((base * 37) / 10) * 10 : Math.round((base * 137) / 1000) * 1000, "Five or more rounds up."),
        () => choice(year, skill, `Which number is ${year === "3" ? "odd" : "prime"}?`, `${person} is sorting numbers before the calculators start arguing.`, year === "3" ? ["17", "24", "36", "48"] : ["29", "21", "39", "51"], year === "3" ? "17" : "29", year === "3" ? "Odd numbers cannot be shared into pairs exactly." : "A prime has exactly two factors."),
        () => exactText(year, skill, `${person} has ${base} trays with ${year === "3" ? 5 : 12} ${thing} on each tray. How many altogether?`, "Use multiplication, then type the total.", base * (year === "3" ? 5 : 12), "Equal groups can be multiplied."),
        () => openReview(year, skill, `${context} says ${base * 4} is definitely double ${base * 3}. Explain why that is wrong and show the correct double.`, "Use at least two lines: one calculation and one explanation.", `Double ${base * 3} is ${base * 6}, not ${base * 4}.`, ["I checked the claim.", "I showed the correct calculation.", "I explained the mistake."], "Double means multiply by 2.")
      ];
      return prompts[variant % prompts.length]();
    }

    if (skill === "Measurement") {
      const length = base + 3;
      const width = year === "3" ? (index % 5) + 3 : (index % 8) + 5;
      const prompts = [
        () => exactText(year, skill, `A rectangle for ${context} is ${length} cm long and ${width} cm wide. What is the perimeter?`, "Add every side around the outside.", 2 * (length + width), "Perimeter of a rectangle is length + width + length + width."),
        () => exactText(year, skill, `A lesson starts at ${year === "3" ? "9:20" : "10:45"} and lasts ${year === "3" ? 35 : 95} minutes. What time does it finish?`, "Count forward carefully.", year === "3" ? ["9:55", "9:55 am"] : ["12:20", "12:20 pm"], "Bridge through the next hour if needed."),
        () => choice(year, skill, `Which unit best measures the mass of a school bag?`, "Pick the sensible measurement unit.", ["kilograms", "millimetres", "litres", "minutes"], "kilograms", "Mass is measured in grams or kilograms."),
        () => exactText(year, skill, year === "3" ? `A ribbon is 1 metre long. ${person} uses ${base + 20} cm. How many centimetres are left?` : `A tank holds ${base + 40} L. It is ${width}/10 full. About how many litres are in it?`, "Convert or scale before answering.", year === "3" ? 100 - (base + 20) : Math.round((base + 40) * width / 10), year === "3" ? "One metre is 100 centimetres." : "Multiply the capacity by the fraction full."),
        () => openReview(year, skill, `${person} wants to cover a desktop for ${context}. Explain whether area or perimeter matters more, then show one calculation you might use.`, "This is a reasoning answer, not just a number.", "Area matters for covering the top; perimeter matters for edging around it.", ["I chose area or perimeter.", "I gave a reason.", "I included a calculation."], "Area covers space; perimeter goes around an edge.")
      ];
      return prompts[variant % prompts.length]();
    }

    if (skill === "Data") {
      const data = [index + 4, index + 7, index + 5, index + 10];
      const labels = ["skateboards", "sandwiches", "science hats", "mystery coupons"];
      const prompts = [
        () => exactText(year, skill, `Data table for ${context}: ${labels.map((label, i) => `${label} ${data[i]}`).join(", ")}. What is the total?`, "Add the four values.", data.reduce((sum, value) => sum + value, 0), "A total means add all categories."),
        () => exactText(year, skill, `Votes are ${data.join(", ")}. What is the range?`, "Range is largest minus smallest.", Math.max(...data) - Math.min(...data), "Find the biggest and smallest values first."),
        () => choice(year, skill, `Which graph would best show favourite lunch choices for ${context}?`, "Think about categories.", ["column graph", "line graph", "clock face", "map scale"], "column graph", "Column graphs compare categories well."),
        () => exactText(year, skill, year === "3" ? `The highest score is ${Math.max(...data)} and the lowest is ${Math.min(...data)}. How many more is the highest?` : `Find the mean of these four scores: ${data.join(", ")}.`, "Use the data, not a guess.", year === "3" ? Math.max(...data) - Math.min(...data) : data.reduce((sum, value) => sum + value, 0) / data.length, year === "3" ? "Compare by subtracting." : "Add them, then divide by 4."),
        () => openReview(year, skill, `${person} made a graph but forgot the title and labels. Explain two things that would make the graph easier to read.`, "Use data vocabulary in your answer.", "A clear title and labelled axes would tell readers what the data shows.", ["I named two improvements.", "I explained why they help.", "I used data words."], "Think title, labels, scale, and units.")
      ];
      return prompts[variant % prompts.length]();
    }

    const a = year === "3" ? base + 8 : base * 3;
    const b = year === "3" ? index + 6 : base + 12;
    const prompts = [
      () => exactText(year, skill, `${context} has ${a} ${thing}. ${person} adds ${b}, then gives away ${index + 3}. How many remain?`, "This has two steps.", a + b - (index + 3), "Add first, then subtract."),
      () => choice(year, skill, `Which number sentence matches: ${person} buys ${base} bags with 4 ${thing} in each, then gets 6 extra?`, "Choose the matching calculation.", [`${base} x 4 + 6`, `${base} + 4 x 6`, `${base} x 6 - 4`, `${base} + 4 + 6`], `${base} x 4 + 6`, "Bags with equal amounts means multiplication first."),
      () => openReview(year, skill, `${context} says the answer to a two-step problem is ${a + b}. Write a story problem that has this answer and explain the two steps.`, "Create your own maths story.", `Example: I had ${a}, then got ${b} more. ${a} + ${b} = ${a + b}.`, ["I wrote a clear story.", "I used two steps.", "The answer matches the story."], "Start with the answer, then build the steps backwards."),
      () => exactText(year, skill, year === "3" ? `${person} shares ${base * 6} ${thing} equally among 6 teams. How many per team?` : `${person} shares ${base * 9 + 4} ${thing} among 9 teams. How many are left over?`, "Think about equal groups.", year === "3" ? base : 4, year === "3" ? "Division undoes multiplication." : "The remainder is what cannot be shared equally."),
      () => openReview(year, skill, `${person} solved a problem by adding first. Explain when adding first is sensible and when it might not be. Use your own example.`, "This is about choosing operations.", "Adding first is sensible when combining groups before sharing or comparing.", ["I explained the operation choice.", "I gave an example.", "I used maths language."], "Look at what happens first in the story.")
    ];
    return prompts[variant % prompts.length]();
  }

  function makeEnglish(year, skill, index, type, context, person) {
    const variant = (index - 1) % 10;
    const passages = [
      `${person} opened the cupboard and found a map, three spoons, and a note saying, "Do not trust the purple jelly."`,
      `The playground was silent except for a squeaky wheel rolling slowly past the handball courts.`,
      `At lunchtime, ${context} announced a new rule: all sandwiches must have a plot twist.`,
      `${person} missed the bus because the alarm clock had been set to "weekend mode".`
    ];

    if (skill === "Comprehension") {
      const passage = pick(passages, index);
      const prompts = [
        () => choice(year, skill, `Read: ${passage} What is the best inference?`, "Use clues from the text.", ["Something unusual is happening.", "Everything is completely ordinary.", "The text is a recipe.", "No character has a problem."], "Something unusual is happening.", "An inference uses clues, not just exact words."),
        () => shortReview(year, skill, `Read: ${passage} Write the main idea in one sentence.`, "Do not copy the whole passage.", "The main idea is that something unusual interrupts an ordinary school moment.", ["I wrote one clear sentence.", "I included the most important idea."], "Ask what the whole passage is mostly about."),
        () => openReview(year, skill, `Read: ${passage} Answer in two parts: what happened, and what clue helped you know?`, "Use evidence from the passage.", "Something strange happened; the clue is the odd note or unexpected object.", ["I answered both parts.", "I used evidence.", "I explained the clue."], "Quote or mention the clue that proves your idea.")
      ];
      return prompts[variant % prompts.length]();
    }

    if (skill === "Grammar") {
      const prompts = [
        () => choice(year, skill, `Which word is the verb? "${person} balanced three cupcakes on a ruler."`, "Find the action.", ["balanced", "cupcakes", "three", "ruler"], "balanced", "A verb can show action."),
        () => choice(year, skill, `Which sentence is punctuated correctly?`, "Check capitals and ending punctuation.", [`${person} packed a pencil, a snack, and a tiny calculator.`, `${person} packed a pencil a snack and a tiny calculator`, `${person} packed, a pencil a snack, and`, `${person.toLowerCase()} packed a pencil.`], `${person} packed a pencil, a snack, and a tiny calculator.`, "Commas separate list items."),
        () => shortReview(year, skill, `Rewrite this as one sentence with a conjunction: "${person} wanted to read. The bell rang."`, "Use because, but, so, or although.", `${person} wanted to read, but the bell rang.`, ["I joined both ideas.", "I used a sensible conjunction.", "My sentence is complete."], "Choose the joining word that shows the relationship."),
        () => openReview(year, skill, year === "3" ? `Write two sentences about ${context}: one statement and one question.` : `Write a complex sentence about ${context}. Underline or name the main clause and subordinate clause.`, "Show that you understand sentence structure.", year === "3" ? `The calculator looked worried. Why was it wearing gumboots?` : `Although the calculator looked worried, it still solved the problem.`, ["I followed the sentence type.", "I used correct punctuation."], "Read it aloud to check it is complete.")
      ];
      return prompts[variant % prompts.length]();
    }

    if (skill === "Vocabulary") {
      const words = year === "3" ? ["enormous", "scampered", "gloomy", "sparkling"] : ["reluctant", "astonished", "precise", "unconvincing"];
      const word = pick(words, index);
      const prompts = [
        () => choice(year, skill, `Which word is closest in meaning to "${word}"?`, "Use word knowledge.", year === "3" ? ["huge", "tiny", "silent", "flat"] : ["not eager", "careless", "ordinary", "finished"], year === "3" ? "huge" : "not eager", "A synonym has a similar meaning."),
        () => shortReview(year, skill, `Write a sentence using "${word}" about ${context}.`, "Make the meaning clear from the sentence.", year === "3" ? `The enormous pancake covered the plate.` : `The reluctant judge finally tasted the suspicious pancake.`, ["I used the word correctly.", "The sentence gives context.", "Punctuation is correct."], "Your sentence should show what the word means."),
        () => choice(year, skill, `Choose the strongest verb: ${person} ___ across the oval when the bell rang.`, "Choose the word with the clearest picture.", ["sprinted", "went", "did", "was"], "sprinted", "Strong verbs show the action precisely."),
        () => openReview(year, skill, `Replace three boring words in this sentence: "The big thing went fast past the room."`, "Write the improved sentence and explain one word choice.", "The enormous scooter zoomed past the classroom.", ["I replaced vague words.", "I explained one choice.", "The sentence still makes sense."], "Swap big, thing, went, and fast for precise words.")
      ];
      return prompts[variant % prompts.length]();
    }

    if (skill === "Writing") {
      const prompts = [
        () => openReview(year, skill, `Write a story opening where ${context} interrupts a normal school day.`, "Use setting, character, and a problem.", "At 9:01, the classroom door clicked open and the lunchbox committee marched in with a glittery rule book.", ["I introduced a setting.", "I introduced a problem.", "I used vivid detail."], "Start normal, then add the surprise."),
        () => openReview(year, skill, year === "3" ? `Write 3 instructions for making a ridiculous but safe pencil holder.` : `Write a short procedure for testing a ridiculous but safe pencil holder design.`, "Use ordered steps.", "First, fold the cardboard. Next, tape the corners. Finally, test it with five pencils.", ["My steps are in order.", "Each step starts with an action.", "It would be safe to follow."], "Procedures use clear action verbs."),
        () => shortReview(year, skill, `Improve this sentence: "The lunch was bad."`, "Add specific detail.", "The soggy sandwich collapsed like a tiny, tragic tent.", ["I used detail.", "I avoided repeating bad.", "The sentence is clear."], "Show the reader why it was bad."),
        () => openReview(year, skill, `Write a diary entry from ${person}'s point of view after meeting ${context}.`, "Include feelings and one event.", "Dear Diary, today the calculator accused my sandwich of suspicious division.", ["I used first person.", "I included a feeling.", "I described one event."], "A diary tells what happened and how the writer felt.")
      ];
      return prompts[variant % prompts.length]();
    }

    const prompts = [
      () => openReview(year, skill, `Convince the class that ${context} should or should not be allowed at sports day.`, "Use an opinion, two reasons, and a conclusion.", "I believe the serious banana should not run sports day because it may confuse the relay teams and distract the timekeepers.", ["I stated an opinion.", "I gave two reasons.", "I concluded clearly."], "Persuasive writing tries to change the reader's mind."),
      () => choice(year, skill, `Which sentence is most persuasive?`, "Look for opinion plus reason.", ["Our class should have a reading corner because quiet books help everyone focus.", "There is a corner.", "Books have pages.", "I saw a chair."], "Our class should have a reading corner because quiet books help everyone focus.", "A reason makes an opinion stronger."),
      () => shortReview(year, skill, `Write one persuasive sentence using an emotive word about ${context}.`, "Make the reader care.", "It would be disastrous to let the budget biscuits control the canteen menu.", ["I used an emotive word.", "I gave a clear opinion."], "Words like unfair, wonderful, wasteful, and essential can persuade."),
      () => openReview(year, skill, `Write a mini debate response: one sentence for, one sentence against, and your final opinion about ${context}.`, "Show both sides before deciding.", "For: it is funny. Against: it may distract learning. My opinion: it can visit at lunchtime only.", ["I gave both sides.", "I made a final judgement.", "I used clear sentences."], "Balanced thinking makes persuasion stronger.")
    ];
    return prompts[variant % prompts.length]();
  }

  function makeScience(year, skill, index, type, context, person) {
    const variant = (index - 1) % 10;
    const banks = {
      "Living things": [
        () => choice(year, skill, `Which clue shows that ${context} is studying something living?`, `${person} is trying to classify a suspicious object.`, ["It grows and needs energy", "It is shiny", "It has a price tag", "It makes a loud beep"], "It grows and needs energy", "Living things grow and need energy."),
        () => openReview(year, skill, `Compare a bean plant and ${context}. Give two reasons only one is living.`, "Use life-process words.", "The bean plant grows and needs water and light. The object can move or make noise, but it does not grow or reproduce.", ["I compared both things.", "I gave two reasons.", "I used science vocabulary."], "Movement alone does not make something alive.")
      ],
      Materials: [
        () => choice(year, skill, `Which material would make the best rain hat for ${context}?`, "Think about properties.", ["waterproof plastic", "tissue paper", "cotton wool", "dry pasta"], "waterproof plastic", "A rain hat needs to resist water."),
        () => openReview(year, skill, `Choose two materials for a lunchbox designed for ${context}. It must be light, strong, and washable. Explain your choices.`, "Link each material to a property.", "Plastic could be light and washable; metal hinges could be strong.", ["I named materials.", "I linked them to properties.", "I explained the design need."], "Properties explain why a material is useful.")
      ],
      Forces: [
        () => choice(year, skill, `${person}'s toy car rolls farther on tile than carpet during ${context}. What force is smaller on tile?`, "Use the surface clue.", ["friction", "gravity", "magnetism", "evaporation"], "friction", "Smoother surfaces usually create less friction."),
        () => openReview(year, skill, `Draw or imagine arrows for a cart pushed by ${context}. Explain the push, friction, and gravity in words.`, "Use a line for each force.", "Push moves it forward, friction slows it, gravity pulls it down.", ["I named three forces.", "I explained direction or effect.", "I used evidence from motion."], "Forces can speed up, slow down, or change direction.")
      ],
      "Earth and space": [
        () => choice(year, skill, `During ${context}, why does ${person}'s shadow move during the day?`, "Think about the Sun's apparent position.", ["The Sun appears to move across the sky", "The object gets bored", "The ground becomes smaller", "The shadow runs away"], "The Sun appears to move across the sky", "A shadow points away from the light source."),
        () => openReview(year, skill, year === "3" ? `Explain why ${context} still has day and night using Earth and the Sun.` : `Explain why ${person} sees moon phases change over a month.`, "Use cause and effect.", year === "3" ? "Earth spins. When our side faces the Sun, it is day; when it faces away, it is night." : "We see different amounts of the Moon's lit half as it orbits Earth.", ["I named the objects involved.", "I explained the change.", "I used correct vocabulary."], "Think about what is moving and what is lit.")
      ],
      Investigations: [
        () => choice(year, skill, `In ${person}'s fair test for ${context}, what should change?`, `${person} is testing which ramp surface is fastest.`, ["only the ramp surface", "the car, ramp, and timer", "the result", "the notebook colour"], "only the ramp surface", "A fair test changes one variable."),
        () => openReview(year, skill, `Design a fair test for ${context}. Include the question, one thing to change, two things to keep the same, and what you measure.`, "Use headings or separate lines.", "Question: Which surface is fastest? Change: surface. Keep same: car and ramp height. Measure: distance or time.", ["I wrote a question.", "I changed one variable.", "I named evidence to collect."], "Measurements make results stronger.")
      ]
    };
    const templates = banks[skill];
    return templates[variant % templates.length]();
  }

  function makeEngineering(year, skill, index, type, context, person) {
    const variant = (index - 1) % 10;
    const banks = {
      "Design brief": [
        () => openReview(year, skill, `Write a design brief for helping ${context} carry three pencils across a desk.`, "Include user, need, and success criteria.", "User: student. Need: carry pencils. Success: holds 3 pencils and moves 30 cm without dropping them.", ["I named the user.", "I named the need.", "I wrote success criteria."], "A brief explains the problem before the solution."),
        () => choice(year, skill, `Which is the clearest design criterion for ${person}'s ${context} prototype?`, "Criteria can be tested.", ["It must hold 500 g for 10 seconds", "It should be sort of nice", "It must feel lucky", "It should impress everyone somehow"], "It must hold 500 g for 10 seconds", "Measurable criteria are easier to test.")
      ],
      Materials: [
        () => choice(year, skill, `Which material is best for a flexible hinge on ${context}?`, "Think about bending.", ["rubber band", "dry spaghetti", "glass strip", "chalk"], "rubber band", "Flexible materials bend without breaking."),
        () => openReview(year, skill, `Choose materials for ${person}'s bridge for ${context}. It must be light but strong. Explain trade-offs.`, "Use properties such as stiff, flexible, strong, light.", "Cardboard can be light and stiff; tape can join parts but may fail if overloaded.", ["I named materials.", "I used property words.", "I explained a trade-off."], "Trade-offs mean gaining one benefit may create another problem.")
      ],
      Forces: [
        () => exactText(year, skill, `A tall tower for ${context} keeps tipping. Should the base be wider or narrower?`, "Type the better option.", ["wider", "wide", "wide base"], "A wider base usually improves stability."),
        () => openReview(year, skill, `Explain how triangles could help strengthen a bridge for ${person}.`, "Use the word stable or support.", "Triangles can spread loads and stop the bridge shape from bending easily.", ["I explained the shape.", "I linked it to strength.", "I used force or load language."], "Some shapes resist bending better than others.")
      ],
      Systems: [
        () => choice(year, skill, `Which ${context} system has input, process, and output?`, "Think about how parts work together.", ["press button -> motor spins -> fan moves air", "blue -> purple -> maybe", "paper -> sandwich -> cloud", "chair -> quiet -> triangle"], "press button -> motor spins -> fan moves air", "Systems transform inputs into outputs."),
        () => openReview(year, skill, `Describe the input, process, and output for a classroom doorbell designed by ${context}.`, "Use three labelled lines.", "Input: button press. Process: circuit sends energy. Output: sound.", ["I labelled input.", "I labelled process.", "I labelled output."], "A system has connected parts.")
      ],
      Testing: [
        () => choice(year, skill, `${person}'s prototype for ${context} fails its first test. What should happen next?`, "Engineering uses evidence.", ["change one thing and test again", "throw away all notes", "declare victory", "make the test easier every time"], "change one thing and test again", "Improvement comes from test evidence."),
        () => openReview(year, skill, `Create a test plan for ${context}'s paper tower. Include what you measure, how many trials, and what change would count as improvement.`, "Use practical, measurable details.", "Measure height and load held. Do 3 trials. Improvement means it holds more load or stands longer.", ["I named a measurement.", "I included repeated trials.", "I defined improvement."], "A good test can be repeated.")
      ]
    };
    const templates = banks[skill];
    return templates[variant % templates.length]();
  }

  function makeFinance(year, skill, index, type, context, person, thing) {
    const income = year === "3" ? index + 3 : index + 12;
    const weeks = year === "3" ? 4 : 8;
    const spend = year === "3" ? index + 2 : index + 17;
    const variant = (index - 1) % 10;
    const answer = income * weeks - spend;
    const banks = {
      "Money maths": [
        () => exactText(year, skill, `${person} saves $${income} each week for ${weeks} weeks and spends $${spend}. How much is left?`, `${context} is checking the receipt twice.`, [`$${answer}`, String(answer), `${answer} dollars`], `Work out ${income} x ${weeks}, then subtract ${spend}.`),
        () => exactText(year, skill, `${thing} cost $${spend}. ${person} pays with $${spend + 10}. What change is owed?`, "Count up or subtract.", [`$10`, "10", "10 dollars"], "Change is paid money minus cost."),
        () => choice(year, skill, `Which total matches three items costing $${income}, $${spend}, and $${index + 5}?`, "Add the prices.", [`$${income + spend + index + 5}`, `$${income + spend}`, `$${spend + index}`, `$${income * 3}`], `$${income + spend + index + 5}`, "Add all three prices.")
      ],
      "Needs and wants": [
        () => choice(year, skill, `Which is a need for a school day?`, "Needs are essential.", ["water bottle", "glitter bookmark", "second dessert", "novelty hat"], "water bottle", "Needs are important for health, safety, or learning."),
        () => openReview(year, skill, `${person} wants to buy ${thing} before replacing a broken school lunch container. Explain which should come first and why.`, "Use need, want, and reason.", "The lunch container should come first because it is useful for school food; the other item can wait.", ["I identified need and want.", "I gave a reason.", "I made a choice."], "Needs usually come before wants.")
      ],
      Budgeting: [
        () => openReview(year, skill, `${person} has $${income * weeks}. Plan a budget with saving, spending, and one emergency amount for ${context}.`, "Use three lines with amounts.", `Save $${income}, spend $${spend}, keep $${income * weeks - income - spend} spare.`, ["My budget adds up.", "I included saving.", "I kept some money aside."], "A budget is a plan for money before spending."),
        () => choice(year, skill, `A good budget should...`, "Choose the sensible planning idea.", ["include income, costs, and savings", "ignore small costs", "spend until empty", "only count coins"], "include income, costs, and savings", "Budgets compare money coming in and going out.")
      ],
      Saving: [
        () => exactText(year, skill, `${person} wants $${income * weeks}. If they save $${income} each week, how many weeks will it take?`, "Use division or repeated addition.", [String(weeks), `${weeks} weeks`], "Goal divided by weekly saving gives weeks."),
        () => openReview(year, skill, `${context} offers two saving plans: $${income} per week for ${weeks} weeks, or $${income + 2} per week for ${weeks - 1} weeks. Compare them and explain which saves more.`, "Show both totals.", `Plan A: $${income * weeks}. Plan B: $${(income + 2) * (weeks - 1)}. Compare the totals.`, ["I calculated both plans.", "I compared totals.", "I wrote a sentence."], "Calculate before choosing.")
      ],
      "Value choices": [
        () => choice(year, skill, `Which is best value if both are useful?`, "Compare price per item.", [`4 for $${income}`, `2 for $${income - 1}`, `1 for $${spend}`, `3 for $${spend + 9}`], `4 for $${income}`, "Best value often has lower cost per item."),
        () => openReview(year, skill, `${person} can buy a cheap item that breaks quickly or a dearer item that lasts longer. Explain what value for money means.`, "Do not just choose cheapest.", "Value means comparing cost, usefulness, quality, and how long it lasts.", ["I explained value.", "I compared more than price.", "I used a reason."], "Cheapest is not always best value.")
      ]
    };
    const templates = banks[skill];
    return templates[variant % templates.length]();
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

  function scoreForProgressKey(key) {
    const item = state.progress[key] || { attempts: 0, correct: 0, hints: 0 };
    if (!item.attempts) return 0;
    return Math.round((item.correct / item.attempts) * 100);
  }

  function progressKeyFor(item) {
    return `${item.year} ${item.skill}`;
  }

  function activityKind(item) {
    if (item.type === "grid") return "grid";
    if (item.type === "choice") return "choice";
    if (item.type === "long" || !item.answer) return "written";
    return "text";
  }

  function typeOrderForSubject() {
    if (subject === "maths") return ["written", "grid", "text", "written", "choice"];
    return ["written", "text", "written", "choice"];
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
    const sorted = [...pool].sort((a, b) => scoreForProgressKey(progressKeyFor(a)) - scoreForProgressKey(progressKeyFor(b)));
    const weakSlice = sorted.slice(0, Math.max(1, Math.ceil(sorted.length / 2)));
    const typeOrder = typeOrderForSubject();
    const preferredType = typeOrder[state.typePreference % typeOrder.length];
    state.typePreference += 1;

    const candidates = weakSlice.filter((item) => activityKind(item) === preferredType);
    const fallback = pool.filter((item) => activityKind(item) === preferredType);
    const options = candidates.length ? candidates : (fallback.length ? fallback : weakSlice);
    const freshOptions = options.filter((item) => !state.recentPrompts.includes(item.prompt));
    const finalOptions = freshOptions.length ? freshOptions : options;
    const selected = finalOptions[Math.floor(Math.random() * finalOptions.length)];

    state.recentPrompts.push(selected.prompt);
    state.recentPrompts = state.recentPrompts.slice(-10);
    return selected;
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
