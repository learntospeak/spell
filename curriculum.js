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

  const expandedActivities = {
    maths: [
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: 18 + □ = 43",
        detail: "Work backwards from 43 to 18.",
        answer: ["25"],
        hint: "43 - 18 tells you the missing number."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: □ - 17 = 28",
        detail: "Think about what number becomes 28 after taking away 17.",
        answer: ["45"],
        hint: "Add 28 and 17."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: 6 x □ = 42",
        detail: "Use a multiplication fact or work backwards.",
        answer: ["7"],
        hint: "Ask: 6 times what number makes 42?"
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: □ x 8 = 56",
        detail: "Think of your 8 times table.",
        answer: ["7"],
        hint: "56 shared into groups of 8 gives the missing number."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: 63 / □ = 9",
        detail: "Ask what number of equal groups makes 9 in each group.",
        answer: ["7"],
        hint: "9 x 7 = 63."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: 3 x □ + 4 = 25",
        detail: "Undo the + 4 first, then divide by 3.",
        answer: ["7"],
        hint: "25 - 4 = 21, then 21 / 3."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: 5 x □ - 6 = 34",
        detail: "Undo the - 6 first.",
        answer: ["8"],
        hint: "34 + 6 = 40, then 40 / 5."
      },
      {
        stage: "2",
        skill: "Equations",
        type: "text",
        prompt: "Find the missing number: □ / 4 = 9",
        detail: "Think about the number before it was shared into 4 equal groups.",
        answer: ["36"],
        hint: "9 groups of 4 is 36."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "Marley has 24 stickers. She gives 7 to a friend, then gets 12 more. How many stickers does she have now?",
        detail: "This is a two-step problem. Track the number after each change.",
        answer: ["29"],
        hint: "First do 24 - 7, then add 12."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "There are 6 bags with 8 marbles in each bag. Marley gives away 10 marbles. How many are left?",
        detail: "Multiply first, then subtract.",
        answer: ["38"],
        hint: "6 x 8 = 48, then take away 10."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "A book has 96 pages. Marley reads 28 pages on Monday and 35 pages on Tuesday. How many pages are left?",
        detail: "Find how many pages were read altogether first.",
        answer: ["33"],
        hint: "28 + 35 = 63. Then 96 - 63."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "Four tables each seat 6 students. Three more students sit on the floor. How many students are there altogether?",
        detail: "Use multiplication and addition.",
        answer: ["27"],
        hint: "4 x 6, then add 3."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "A bus has 52 seats. 19 seats are empty. How many seats have people in them?",
        detail: "Choose the operation that compares full and empty seats.",
        answer: ["33"],
        hint: "Subtract the empty seats from all the seats."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "Marley bakes 36 biscuits and shares them equally between 4 plates. She eats 2 biscuits from one plate. How many are left on that plate?",
        detail: "Share first, then subtract.",
        answer: ["7"],
        hint: "36 / 4 = 9, then 9 - 2."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "A garden has 5 rows of 9 carrots. 14 carrots are picked. How many carrots remain?",
        detail: "Find the total number of carrots first.",
        answer: ["31"],
        hint: "5 x 9 = 45, then subtract 14."
      },
      {
        stage: "2",
        skill: "Problem solving",
        type: "text",
        prompt: "Marley saves $3 each week for 7 weeks. Then she spends $8. How much money does she have left?",
        detail: "Multiply the weekly saving first.",
        answer: ["$13", "13", "13 dollars"],
        hint: "3 x 7 = 21, then 21 - 8."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "text",
        prompt: "What is 1/4 of 20?",
        detail: "Split 20 into 4 equal groups.",
        answer: ["5"],
        hint: "20 / 4 = 5."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "text",
        prompt: "What is 1/3 of 24?",
        detail: "Share 24 into 3 equal groups.",
        answer: ["8"],
        hint: "3 groups of 8 make 24."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "text",
        prompt: "What is 3/4 of 16?",
        detail: "Find one quarter first, then take three quarters.",
        answer: ["12"],
        hint: "1/4 of 16 is 4, and 3 lots of 4 is 12."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "choice",
        prompt: "Which is the largest fraction?",
        detail: "The whole is the same size each time.",
        choices: ["3/4", "1/4", "2/4", "1/2"],
        answer: "3/4",
        hint: "Fourths are equal pieces. Three fourths is more than one or two fourths."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "choice",
        prompt: "Which fraction is equal to one half?",
        detail: "Look for a fraction that names the same amount.",
        choices: ["2/4", "1/3", "3/4", "2/3"],
        answer: "2/4",
        hint: "Two out of four equal parts is half the whole."
      },
      {
        stage: "2",
        skill: "Fractions",
        type: "text",
        prompt: "There are 30 counters. Marley colours 1/5 of them blue. How many counters are blue?",
        detail: "Find one fifth of 30.",
        answer: ["6"],
        hint: "30 / 5 = 6."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "Marley buys a snack for $2.35 and a drink for $1.40. How much does she spend altogether?",
        detail: "Add dollars and cents carefully.",
        answer: ["$3.75", "3.75", "375c", "375 cents"],
        hint: "$2.35 + $1.40 = $3.75."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "Marley has $10. She buys a book for $6.75. How much money is left?",
        detail: "Count up from $6.75 to $10.00 or subtract.",
        answer: ["$3.25", "3.25", "325c", "325 cents"],
        hint: "$6.75 to $7.00 is 25c, then $3 more."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "Three pencils cost 65c each. What is the total cost?",
        detail: "Add 65c three times or multiply.",
        answer: ["$1.95", "1.95", "195c", "195 cents"],
        hint: "65 + 65 + 65 = 195 cents."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "Marley buys two notebooks for $2.50 each. How much does she pay?",
        detail: "Double the price of one notebook.",
        answer: ["$5", "$5.00", "5", "5.00", "500c"],
        hint: "$2.50 + $2.50 = $5.00."
      },
      {
        stage: "2",
        skill: "Money",
        type: "choice",
        prompt: "Which coins make exactly $1.40?",
        detail: "Add each set of coins.",
        choices: ["$1 + 20c + 20c", "$1 + 50c", "50c + 50c + 50c", "$1 + 10c + 10c"],
        answer: "$1 + 20c + 20c",
        hint: "$1 plus 40c makes $1.40."
      },
      {
        stage: "2",
        skill: "Money",
        type: "text",
        prompt: "A toy costs $4.80. Marley has $3.25. How much more money does she need?",
        detail: "Find the difference between the two amounts.",
        answer: ["$1.55", "1.55", "155c", "155 cents"],
        hint: "$3.25 to $4.80 is $1.55."
      },
      {
        stage: "2",
        skill: "Time",
        type: "text",
        prompt: "School starts at 9:00 am. Reading starts 45 minutes later. What time does reading start?",
        detail: "Add 45 minutes to 9 o'clock.",
        answer: ["9:45", "9:45 am", "9.45", "9.45 am"],
        hint: "45 minutes after 9:00 is 9:45."
      },
      {
        stage: "2",
        skill: "Time",
        type: "text",
        prompt: "Marley starts homework at 4:20 pm and works for 35 minutes. What time does she finish?",
        detail: "Add 35 minutes.",
        answer: ["4:55", "4:55 pm", "4.55", "4.55 pm"],
        hint: "20 minutes gets to 4:40, then 15 more gets to 4:55."
      },
      {
        stage: "2",
        skill: "Time",
        type: "text",
        prompt: "A movie starts at 2:15 pm and finishes at 3:40 pm. How long is the movie?",
        detail: "Count from 2:15 to 3:40.",
        answer: ["85 minutes", "85", "1 hour 25 minutes", "1 hr 25 min", "1h 25m"],
        hint: "2:15 to 3:15 is 1 hour, then 25 more minutes."
      },
      {
        stage: "2",
        skill: "Time",
        type: "choice",
        prompt: "Which time is quarter to 6?",
        detail: "Quarter to means 15 minutes before the hour.",
        choices: ["5:45", "6:15", "6:45", "5:15"],
        answer: "5:45",
        hint: "15 minutes before 6:00 is 5:45."
      },
      {
        stage: "2",
        skill: "Measurement",
        type: "text",
        prompt: "A ribbon is 1 metre long. Marley cuts off 35 cm. How many centimetres are left?",
        detail: "Remember that 1 metre is 100 centimetres.",
        answer: ["65", "65cm", "65 cm", "65 centimetres", "65 centimeters"],
        hint: "100 - 35 = 65."
      },
      {
        stage: "2",
        skill: "Measurement",
        type: "text",
        prompt: "A rectangle is 9 cm long and 4 cm wide. What is its perimeter?",
        detail: "Perimeter is the distance around the outside.",
        answer: ["26", "26cm", "26 cm", "26 centimetres", "26 centimeters"],
        hint: "Add all sides: 9 + 4 + 9 + 4."
      },
      {
        stage: "2",
        skill: "Measurement",
        type: "text",
        prompt: "A square has sides of 7 cm. What is its perimeter?",
        detail: "A square has four equal sides.",
        answer: ["28", "28cm", "28 cm", "28 centimetres", "28 centimeters"],
        hint: "7 + 7 + 7 + 7 = 28."
      },
      {
        stage: "2",
        skill: "Measurement",
        type: "text",
        prompt: "A fish tank holds 12 litres of water. Marley pours in 3 litres, then 4 litres, then 2 litres. How many more litres are needed to fill it?",
        detail: "Add what has gone in, then compare with 12 litres.",
        answer: ["3", "3l", "3 l", "3 litres", "3 liters"],
        hint: "3 + 4 + 2 = 9. Then 12 - 9."
      },
      {
        stage: "2",
        skill: "Measurement",
        type: "text",
        prompt: "A rectangle has an area of 36 square cm. One side is 6 cm. What is the other side?",
        detail: "Use the area fact backwards.",
        answer: ["6", "6cm", "6 cm"],
        hint: "6 times what number makes 36?"
      },
      {
        stage: "2",
        skill: "Patterns",
        type: "text",
        prompt: "What is the next number? 7, 14, 21, 28, □",
        detail: "Find the rule before answering.",
        answer: ["35"],
        hint: "The pattern adds 7 each time."
      },
      {
        stage: "2",
        skill: "Patterns",
        type: "text",
        prompt: "What is the next number? 96, 88, 80, 72, □",
        detail: "Look at how much the numbers change.",
        answer: ["64"],
        hint: "The pattern subtracts 8 each time."
      },
      {
        stage: "2",
        skill: "Patterns",
        type: "text",
        prompt: "What is the missing number? 3, 6, 12, 24, □",
        detail: "The rule is not adding this time.",
        answer: ["48"],
        hint: "Each number doubles."
      },
      {
        stage: "2",
        skill: "Patterns",
        type: "choice",
        prompt: "Which rule matches this pattern? 5, 10, 20, 40",
        detail: "Check the change from one number to the next.",
        choices: ["Double each time", "Add 5 each time", "Subtract 10 each time", "Add 10 each time"],
        answer: "Double each time",
        hint: "10 is double 5, 20 is double 10, and 40 is double 20."
      },
      {
        stage: "2",
        skill: "Data",
        type: "text",
        prompt: "Marley records favourite fruits: apples 8, bananas 6, grapes 11, oranges 5. How many children chose fruit altogether?",
        detail: "Add all the votes.",
        answer: ["30"],
        hint: "8 + 6 + 11 + 5."
      },
      {
        stage: "2",
        skill: "Data",
        type: "text",
        prompt: "A class survey shows 14 students walk to school and 9 students ride. How many more students walk than ride?",
        detail: "Compare the two numbers.",
        answer: ["5"],
        hint: "14 - 9 = 5."
      },
      {
        stage: "2",
        skill: "Data",
        type: "choice",
        prompt: "A graph shows 12 votes for soccer, 7 for tennis, 9 for swimming, and 5 for netball. Which sport was most popular?",
        detail: "Find the largest number of votes.",
        choices: ["Soccer", "Tennis", "Swimming", "Netball"],
        answer: "Soccer",
        hint: "12 is the largest number in the data."
      }
    ],
    english: [
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Read: Ella packed her library bag, checked the due-date slip, and hurried to school. What is Ella probably trying to do?",
        detail: "Use all the clues in the sentence.",
        choices: ["Return her books on time", "Buy a new school bag", "Go swimming", "Find her lunch"],
        answer: "Return her books on time",
        hint: "Library bag and due-date slip are the strongest clues."
      },
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Read: The cake was still soft in the middle, so Dad put it back in the oven. Why did Dad do this?",
        detail: "Think about cause and effect.",
        choices: ["The cake needed more cooking", "The oven was broken", "The cake was too cold to eat", "Dad wanted to hide the cake"],
        answer: "The cake needed more cooking",
        hint: "Soft in the middle means it was not fully cooked."
      },
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Read: Sam watered the plant every morning, but its leaves turned brown. What detail shows there is still a problem?",
        detail: "Find the evidence in the sentence.",
        choices: ["The leaves turned brown", "Sam watered it", "It was morning", "There was a plant"],
        answer: "The leaves turned brown",
        hint: "Brown leaves suggest the plant is not healthy."
      },
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Read: First Asha measured the flour. Next she cracked two eggs. Finally she stirred the mixture. What was Asha probably making?",
        detail: "Use the sequence of actions.",
        choices: ["Something baked or cooked", "A paper kite", "A garden bed", "A new dress"],
        answer: "Something baked or cooked",
        hint: "Flour, eggs, and stirring usually belong in cooking."
      },
      {
        stage: "2",
        skill: "Comprehension",
        type: "choice",
        prompt: "Read: The sign said, 'Wet paint'. Noah kept his hands in his pockets as he walked past. Why?",
        detail: "Use the sign and Noah's action.",
        choices: ["He did not want paint on his hands", "He was cold", "He lost his gloves", "He was counting coins"],
        answer: "He did not want paint on his hands",
        hint: "The sign warns that touching the paint could make a mess."
      },
      {
        stage: "2",
        skill: "Inference",
        type: "choice",
        prompt: "Luca put his untouched sandwich back in his lunchbox and stared at the rain outside. What can you infer?",
        detail: "Use clues from both parts of the sentence.",
        choices: ["Luca may be sad or worried", "Luca is excited to play outside", "Luca forgot his lunchbox", "Luca is eating quickly"],
        answer: "Luca may be sad or worried",
        hint: "Untouched food and staring at rain are clues about mood."
      },
      {
        stage: "2",
        skill: "Inference",
        type: "choice",
        prompt: "Maya grinned when she saw the envelope with her name on it. She tore it open carefully. How is Maya probably feeling?",
        detail: "Look at the action and expression.",
        choices: ["Excited", "Bored", "Angry", "Sleepy"],
        answer: "Excited",
        hint: "A grin is a strong clue."
      },
      {
        stage: "2",
        skill: "Inference",
        type: "choice",
        prompt: "Ben's hands shook as he stepped onto the stage. What can you infer?",
        detail: "Think about how his body shows feelings.",
        choices: ["He might be nervous", "He is going to sleep", "He is swimming", "He forgot how to walk"],
        answer: "He might be nervous",
        hint: "Shaking hands can be a clue for nerves."
      },
      {
        stage: "2",
        skill: "Inference",
        type: "choice",
        prompt: "The class fell silent when the principal walked in holding a certificate. What might happen next?",
        detail: "Predict using the clue.",
        choices: ["Someone may receive an award", "Everyone will go home", "The room will flood", "The certificate will be eaten"],
        answer: "Someone may receive an award",
        hint: "Certificates are often given as awards."
      },
      {
        stage: "2",
        skill: "Inference",
        type: "choice",
        prompt: "Nina zipped her jacket, pulled on boots, and picked up an umbrella. What is the weather probably like?",
        detail: "Use the clothing and object clues.",
        choices: ["Cold and rainy", "Hot and dry", "Windless and sunny", "Snowing inside"],
        answer: "Cold and rainy",
        hint: "Jacket, boots, and umbrella point to wet or cold weather."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Which word is the verb in this sentence? The puppy chased the red ball.",
        detail: "The verb is the action.",
        choices: ["chased", "puppy", "red", "ball"],
        answer: "chased",
        hint: "Ask what the puppy did."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Which word is the adjective? The tiny frog jumped into the pond.",
        detail: "An adjective describes a noun.",
        choices: ["tiny", "jumped", "pond", "into"],
        answer: "tiny",
        hint: "Tiny describes the frog."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Which sentence uses past tense correctly?",
        detail: "Past tense tells what already happened.",
        choices: ["Yesterday we played soccer.", "Yesterday we play soccer.", "Yesterday we playing soccer.", "Yesterday we plays soccer."],
        answer: "Yesterday we played soccer.",
        hint: "Played shows the action already happened."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Choose the best conjunction: Marley wanted to play outside, ___ it was raining.",
        detail: "Pick the joining word that shows a problem.",
        choices: ["but", "and", "because", "so"],
        answer: "but",
        hint: "But shows the second idea is different or surprising."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Which sentence has subject-verb agreement?",
        detail: "The subject and verb need to match.",
        choices: ["The dogs run quickly.", "The dogs runs quickly.", "The dog run quickly.", "The dogs running quickly."],
        answer: "The dogs run quickly.",
        hint: "Dogs is plural, so use run."
      },
      {
        stage: "2",
        skill: "Grammar",
        type: "choice",
        prompt: "Which word is an adverb? The turtle moved slowly across the path.",
        detail: "An adverb can describe how an action happens.",
        choices: ["slowly", "turtle", "path", "across"],
        answer: "slowly",
        hint: "Slowly tells how the turtle moved."
      },
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence has the comma in the right place?",
        detail: "The sentence has a list.",
        choices: ["I packed a hat, lunch, and water.", "I packed, a hat lunch and water.", "I packed a hat lunch, and water.", "I packed a hat lunch and, water."],
        answer: "I packed a hat, lunch, and water.",
        hint: "Commas separate items in a list."
      },
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence needs a question mark?",
        detail: "A question asks something.",
        choices: ["Where did you put the ruler", "I found the ruler", "The ruler is blue", "Please pass the ruler"],
        answer: "Where did you put the ruler",
        hint: "Where begins a question."
      },
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence is punctuated correctly?",
        detail: "Look for capitals, apostrophe, and ending mark.",
        choices: ["Marley's bag is under the desk.", "marley's bag is under the desk.", "Marleys bag is under the desk", "Marley's bag is under the desk"],
        answer: "Marley's bag is under the desk.",
        hint: "A name needs a capital, ownership needs an apostrophe, and the sentence needs a full stop."
      },
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence uses speech marks correctly?",
        detail: "Speech marks go around the words someone says.",
        choices: ["\"Come here,\" said Mum.", "Come here, said \"Mum.\"", "\"Come here, said Mum.", "Come here,\" said Mum."],
        answer: "\"Come here,\" said Mum.",
        hint: "Only the spoken words go inside the speech marks."
      },
      {
        stage: "2",
        skill: "Punctuation",
        type: "choice",
        prompt: "Which sentence shows excitement?",
        detail: "Choose the best ending punctuation.",
        choices: ["We won the game!", "We won the game?", "We won the game,", "we won the game."],
        answer: "We won the game!",
        hint: "An exclamation mark can show excitement."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "Choose the strongest verb: The horse ___ across the paddock.",
        detail: "Pick the word that creates the clearest picture.",
        choices: ["galloped", "went", "did", "was"],
        answer: "galloped",
        hint: "Galloped is a precise action for a horse."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "Which word means almost the same as enormous?",
        detail: "Look for a synonym.",
        choices: ["huge", "tiny", "quiet", "smooth"],
        answer: "huge",
        hint: "Enormous means very big."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "Which word is the opposite of ancient?",
        detail: "Look for an antonym.",
        choices: ["modern", "old", "dusty", "broken"],
        answer: "modern",
        hint: "Ancient means very old."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "Choose the most precise word: The soup was too ___ to eat.",
        detail: "Pick the adjective that fits soup.",
        choices: ["salty", "square", "loud", "empty"],
        answer: "salty",
        hint: "Salty describes taste."
      },
      {
        stage: "2",
        skill: "Vocabulary",
        type: "choice",
        prompt: "What does inspect mean in this sentence? The scientist inspected the shell closely.",
        detail: "Use the sentence clue closely.",
        choices: ["looked at carefully", "threw away", "painted quickly", "forgot about"],
        answer: "looked at carefully",
        hint: "Closely tells you the scientist looked carefully."
      },
      {
        stage: "2",
        skill: "Editing",
        type: "choice",
        prompt: "Which revision is clearest? Original: The dog was nice.",
        detail: "Choose the sentence with specific detail.",
        choices: ["The dog wagged its tail and rested its head on my knee.", "The dog was very very nice.", "The dog was a dog.", "Nice was the dog."],
        answer: "The dog wagged its tail and rested its head on my knee.",
        hint: "Specific actions help the reader picture the dog."
      },
      {
        stage: "2",
        skill: "Editing",
        type: "choice",
        prompt: "Which sentence removes the repeated word? The girl ran fast because she was fast.",
        detail: "Keep the meaning but improve the wording.",
        choices: ["The girl sprinted because she was quick.", "The girl ran fast because fast.", "The fast girl was fast and ran fast.", "The girl was girl fast."],
        answer: "The girl sprinted because she was quick.",
        hint: "Sprinted replaces ran fast."
      },
      {
        stage: "2",
        skill: "Editing",
        type: "choice",
        prompt: "Which sentence has the best word order?",
        detail: "Choose the sentence that sounds natural.",
        choices: ["I carefully placed the glass on the table.", "Carefully the on table glass I placed.", "The table placed I carefully glass.", "Glass carefully table on I placed."],
        answer: "I carefully placed the glass on the table.",
        hint: "A clear sentence usually names who did what, then where."
      },
      {
        stage: "2",
        skill: "Editing",
        type: "choice",
        prompt: "Which sentence combines the ideas best? The sun came out. The puddles dried.",
        detail: "Use a joining word that explains why.",
        choices: ["The puddles dried because the sun came out.", "The sun came out but the puddles dried.", "The puddles dried or the sun came out.", "The sun dried puddles because out."],
        answer: "The puddles dried because the sun came out.",
        hint: "Because shows the reason."
      },
      {
        stage: "2",
        skill: "Editing",
        type: "choice",
        prompt: "Which sentence is best for a story opening?",
        detail: "Pick the one that makes the reader curious.",
        choices: ["A strange tapping sound came from inside the old cupboard.", "I woke up and it was a day.", "There was a thing somewhere.", "The story started."],
        answer: "A strange tapping sound came from inside the old cupboard.",
        hint: "A specific sound and place create mystery."
      },
      {
        stage: "2",
        skill: "Main idea",
        type: "choice",
        prompt: "Read: Bees visit flowers to collect nectar. As they move, pollen sticks to their bodies and travels to other flowers. What is the main idea?",
        detail: "Choose what the whole text is mostly about.",
        choices: ["Bees help move pollen between flowers", "Bees only like yellow flowers", "Nectar is always sticky", "Flowers can fly"],
        answer: "Bees help move pollen between flowers",
        hint: "Both sentences are about bees moving between flowers."
      },
      {
        stage: "2",
        skill: "Main idea",
        type: "choice",
        prompt: "Read: Helmets protect your head. Knee pads protect your knees. Bright clothes help drivers see you. What is the main idea?",
        detail: "Think about what all details have in common.",
        choices: ["Ways to stay safe while riding", "How to win a bike race", "Why bikes have wheels", "Different colours of clothes"],
        answer: "Ways to stay safe while riding",
        hint: "Each detail is about safety."
      },
      {
        stage: "2",
        skill: "Main idea",
        type: "choice",
        prompt: "Read: Some animals sleep during the day and hunt at night. Owls, bats, and possums are examples. What is the main idea?",
        detail: "Find the idea that covers every sentence.",
        choices: ["Some animals are active at night", "All animals sleep at night", "Owls cannot see", "Possums are plants"],
        answer: "Some animals are active at night",
        hint: "The examples all connect to being active at night."
      },
      {
        stage: "2",
        skill: "Sequence",
        type: "choice",
        prompt: "Which event should come first when planting a seed?",
        detail: "Think about the order of steps.",
        choices: ["Put soil in the pot", "Pick the ripe fruit", "Measure the tall plant", "Collect seeds from the flower"],
        answer: "Put soil in the pot",
        hint: "You need soil before the seed can be planted."
      },
      {
        stage: "2",
        skill: "Sequence",
        type: "choice",
        prompt: "Read: First, Tom mixed the batter. Next, he poured it into a pan. What probably happens after that?",
        detail: "Use the cooking sequence.",
        choices: ["He puts the pan in the oven", "He packs his school bag", "He washes the car", "He plants the pan"],
        answer: "He puts the pan in the oven",
        hint: "Batter in a pan is usually ready to bake."
      },
      {
        stage: "2",
        skill: "Sequence",
        type: "choice",
        prompt: "Which word best shows that something happened after another event?",
        detail: "Look for a time-order word.",
        choices: ["finally", "under", "blue", "quiet"],
        answer: "finally",
        hint: "Finally tells about the last step."
      },
      {
        stage: "2",
        skill: "Text features",
        type: "choice",
        prompt: "Where would you look to quickly find the page about frogs in an information book?",
        detail: "Think about book features.",
        choices: ["Index", "Front cover picture", "Barcode", "Spine colour"],
        answer: "Index",
        hint: "An index lists topics and page numbers."
      },
      {
        stage: "2",
        skill: "Text features",
        type: "choice",
        prompt: "What is the purpose of a caption under a photo?",
        detail: "Think about how captions help readers.",
        choices: ["It explains the photo", "It hides the photo", "It replaces the title", "It tells the price of the book"],
        answer: "It explains the photo",
        hint: "A caption gives information about an image."
      },
      {
        stage: "2",
        skill: "Text features",
        type: "choice",
        prompt: "What does a heading usually tell you?",
        detail: "Use what you know about information texts.",
        choices: ["What the section is about", "The author's home address", "The book's weight", "Where to put the book"],
        answer: "What the section is about",
        hint: "Headings introduce topics or sections."
      },
      {
        stage: "2",
        skill: "Writing purpose",
        type: "choice",
        prompt: "Which sentence belongs in a persuasive text about school gardens?",
        detail: "Persuasive writing tries to convince the reader.",
        choices: ["Every school should have a garden because students can learn outside.", "The garden has six tomato plants.", "I watered the garden on Tuesday.", "The shovel is beside the shed."],
        answer: "Every school should have a garden because students can learn outside.",
        hint: "Should and because help make an argument."
      },
      {
        stage: "2",
        skill: "Writing purpose",
        type: "choice",
        prompt: "Which sentence sounds most like an information report?",
        detail: "Information reports give facts.",
        choices: ["Penguins are birds that cannot fly.", "Please buy me a penguin.", "I had the best penguin dream ever!", "The penguin whispered a secret."],
        answer: "Penguins are birds that cannot fly.",
        hint: "It gives a factual statement about penguins."
      },
      {
        stage: "2",
        skill: "Writing purpose",
        type: "choice",
        prompt: "Which opening best suits a recount?",
        detail: "A recount tells what happened.",
        choices: ["On Saturday, my family visited the museum.", "Dinosaurs lived millions of years ago.", "You must visit the museum today.", "How to make a paper plane."],
        answer: "On Saturday, my family visited the museum.",
        hint: "It tells when and what happened to the writer."
      },
      {
        stage: "2",
        skill: "Writing purpose",
        type: "choice",
        prompt: "Which sentence best belongs in an imaginative story?",
        detail: "Imaginative writing often creates a character, setting, or problem.",
        choices: ["The tiny door in the tree opened with a golden flash.", "Dogs are mammals with sharp hearing.", "First, fold the paper in half.", "Every student should wear a hat outside."],
        answer: "The tiny door in the tree opened with a golden flash.",
        hint: "It creates a story moment that makes the reader wonder what happens next."
      }
    ],
    science: [
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "Marley needs to make a raincoat for a toy. Which material would work best?",
        detail: "Think about water resistance.",
        choices: ["Plastic sheet", "Tissue", "Cotton wool", "Paper towel"],
        answer: "Plastic sheet",
        hint: "A raincoat needs a material that does not soak up water easily."
      },
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "Which property makes glass useful for windows?",
        detail: "Think about what windows need to do.",
        choices: ["It is transparent", "It is fluffy", "It absorbs water", "It bends like rubber"],
        answer: "It is transparent",
        hint: "Transparent materials let light pass through."
      },
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "A spoon for hot soup should not burn your hand. Which material is best for the handle?",
        detail: "Think about heat transfer.",
        choices: ["Wood", "Metal", "Ice", "Thin foil"],
        answer: "Wood",
        hint: "Wood does not let heat travel through it as quickly as metal."
      },
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "Which object is most likely magnetic?",
        detail: "Magnets attract some metals, especially iron and steel.",
        choices: ["Steel paperclip", "Wooden ruler", "Plastic cup", "Rubber eraser"],
        answer: "Steel paperclip",
        hint: "Steel contains iron."
      },
      {
        stage: "2",
        skill: "Materials",
        type: "choice",
        prompt: "Why is rubber useful for shoe soles?",
        detail: "Think about grip and flexibility.",
        choices: ["It grips surfaces and bends", "It dissolves in water", "It shatters easily", "It is always transparent"],
        answer: "It grips surfaces and bends",
        hint: "Shoe soles need grip and some flexibility."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "Which list has only things a plant needs to grow well?",
        detail: "Think about plant needs.",
        choices: ["Water, light, air, and nutrients", "Paint, sand, music, and glue", "Rocks, plastic, sugar, and oil", "Darkness, no water, and no air"],
        answer: "Water, light, air, and nutrients",
        hint: "Plants need light, water, air, and nutrients."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "A seed sprouts, grows leaves, flowers, and makes new seeds. What is this called?",
        detail: "Think about the stages of a plant's life.",
        choices: ["Life cycle", "Weather forecast", "Magnetic force", "Evaporation"],
        answer: "Life cycle",
        hint: "A life cycle is the repeating stages of a living thing."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "Which feature helps a fish live in water?",
        detail: "Think about body parts and habitats.",
        choices: ["Gills", "Feathers", "Fur", "Tree roots"],
        answer: "Gills",
        hint: "Gills help fish get oxygen from water."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "Why do birds build nests?",
        detail: "Think about survival and young animals.",
        choices: ["To protect eggs and chicks", "To make rain", "To grow leaves", "To store electricity"],
        answer: "To protect eggs and chicks",
        hint: "Nests are safe places for eggs and young birds."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "Which animal is most likely a herbivore?",
        detail: "A herbivore eats plants.",
        choices: ["Kangaroo eating grass", "Shark eating fish", "Spider eating insects", "Owl eating mice"],
        answer: "Kangaroo eating grass",
        hint: "Grass is a plant."
      },
      {
        stage: "2",
        skill: "Living things",
        type: "choice",
        prompt: "What might happen if a plant gets no sunlight for many days?",
        detail: "Think about how plants make food.",
        choices: ["It may become weak or die", "It will turn into a rock", "It will grow metal leaves", "It will need no water"],
        answer: "It may become weak or die",
        hint: "Plants need light to make food."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "Marley pushes a toy car harder. What will probably happen?",
        detail: "Think about push strength.",
        choices: ["The car will move faster or farther", "The car will become invisible", "The car will melt", "Gravity will stop existing"],
        answer: "The car will move faster or farther",
        hint: "A stronger push can change motion more."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "Why does a bike slow down when the brakes are squeezed?",
        detail: "The brake pads rub against the wheel.",
        choices: ["Friction slows the wheel", "Light pushes the bike", "The air becomes water", "The bike loses its shadow"],
        answer: "Friction slows the wheel",
        hint: "Friction is a force from rubbing surfaces."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "Which action is a pull?",
        detail: "A pull moves something toward you.",
        choices: ["Opening a drawer", "Pressing a button", "Kicking a ball", "Pushing a trolley"],
        answer: "Opening a drawer",
        hint: "You pull a drawer toward you to open it."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "A magnet picks up one object but not another. What should Marley test?",
        detail: "Think about the object's material.",
        choices: ["What material each object is made from", "The colour of the table", "The day of the week", "The sound of the magnet"],
        answer: "What material each object is made from",
        hint: "Magnets attract some materials and not others."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "What force pulls a dropped pencil toward the floor?",
        detail: "Think about the force from Earth.",
        choices: ["Gravity", "Friction", "Magnetism", "Evaporation"],
        answer: "Gravity",
        hint: "Gravity pulls objects toward Earth."
      },
      {
        stage: "2",
        skill: "Forces",
        type: "choice",
        prompt: "Which surface would probably let a toy car travel farthest?",
        detail: "Less friction usually lets objects move farther.",
        choices: ["Smooth tile", "Thick carpet", "Sand", "Grass"],
        answer: "Smooth tile",
        hint: "Smooth surfaces usually have less friction than rough surfaces."
      },
      {
        stage: "2",
        skill: "Fair testing",
        type: "choice",
        prompt: "Marley tests which paper towel absorbs the most water. What should she change?",
        detail: "In a fair test, change one thing.",
        choices: ["The brand of paper towel", "The amount of water each time", "The size of each piece", "The way she measures"],
        answer: "The brand of paper towel",
        hint: "The brand is the thing being tested."
      },
      {
        stage: "2",
        skill: "Fair testing",
        type: "choice",
        prompt: "Marley tests which ramp makes a car travel farther. What should stay the same?",
        detail: "Only the ramp surface should change.",
        choices: ["The toy car", "The question", "The result", "The colour of Marley's shoes"],
        answer: "The toy car",
        hint: "Use the same car so the test is fair."
      },
      {
        stage: "2",
        skill: "Fair testing",
        type: "choice",
        prompt: "Why should Marley repeat an experiment three times?",
        detail: "Think about trustworthy results.",
        choices: ["To check the results are reliable", "To make the table messy", "To change every variable", "To avoid measuring"],
        answer: "To check the results are reliable",
        hint: "Repeating helps you see if the same thing happens again."
      },
      {
        stage: "2",
        skill: "Fair testing",
        type: "choice",
        prompt: "Which measurement would help compare plant growth?",
        detail: "Choose data that can be measured.",
        choices: ["Height in centimetres", "How pretty the plant looks", "The plant's favourite song", "The name of the pot"],
        answer: "Height in centimetres",
        hint: "Centimetres give a clear measurement."
      },
      {
        stage: "2",
        skill: "Fair testing",
        type: "choice",
        prompt: "Marley asks, 'Which cup keeps water warm longest?' What should she measure?",
        detail: "Choose the evidence that answers the question.",
        choices: ["Water temperature over time", "The colour of the cup only", "The sound of the cup", "The shape of the table"],
        answer: "Water temperature over time",
        hint: "Temperature shows how warm the water is."
      },
      {
        stage: "2",
        skill: "Earth and space",
        type: "choice",
        prompt: "Why is it bright during the day?",
        detail: "Think about Earth's main natural light source.",
        choices: ["The Sun lights the part of Earth we are on", "The Moon makes all daylight", "Clouds shine like lamps", "Stars move into the classroom"],
        answer: "The Sun lights the part of Earth we are on",
        hint: "Daylight comes from the Sun."
      },
      {
        stage: "2",
        skill: "Earth and space",
        type: "choice",
        prompt: "When will a shadow usually be shortest?",
        detail: "Think about the Sun being high or low.",
        choices: ["Around midday", "At sunset", "At night", "Before sunrise"],
        answer: "Around midday",
        hint: "When the Sun is high, shadows are shorter."
      },
      {
        stage: "2",
        skill: "Earth and space",
        type: "choice",
        prompt: "What causes day and night?",
        detail: "Think about Earth moving.",
        choices: ["Earth spins on its axis", "The Sun turns off", "The Moon blocks every country", "Clouds cover the whole planet"],
        answer: "Earth spins on its axis",
        hint: "As Earth spins, different places face the Sun."
      },
      {
        stage: "2",
        skill: "Earth and space",
        type: "choice",
        prompt: "Why does the Moon seem to change shape?",
        detail: "Think about how much of the lit side we can see.",
        choices: ["We see different amounts of the lit half", "The Moon melts each week", "The Moon is a different object each night", "Stars cover parts of it"],
        answer: "We see different amounts of the lit half",
        hint: "The Moon's phases depend on how much of its lit side is visible from Earth."
      },
      {
        stage: "2",
        skill: "Earth and space",
        type: "choice",
        prompt: "Which object is a natural source of light?",
        detail: "Natural means it is not made by people.",
        choices: ["The Sun", "A torch", "A classroom lamp", "A phone screen"],
        answer: "The Sun",
        hint: "The Sun gives its own light naturally."
      },
      {
        stage: "2",
        skill: "Energy",
        type: "choice",
        prompt: "Which object changes electrical energy into sound energy?",
        detail: "Think about what energy goes in and what comes out.",
        choices: ["Speaker", "Book", "Spoon", "Pencil"],
        answer: "Speaker",
        hint: "A speaker uses electricity to make sound."
      },
      {
        stage: "2",
        skill: "Energy",
        type: "choice",
        prompt: "A toaster changes electrical energy mostly into what useful energy?",
        detail: "Think about what cooks the bread.",
        choices: ["Heat energy", "Magnetic energy", "Light only", "Sound only"],
        answer: "Heat energy",
        hint: "Toast cooks because the toaster gets hot."
      },
      {
        stage: "2",
        skill: "Energy",
        type: "choice",
        prompt: "Which item stores chemical energy that your body can use?",
        detail: "Think about food as fuel.",
        choices: ["Apple", "Rock", "Empty cup", "Metal key"],
        answer: "Apple",
        hint: "Food stores energy for living things."
      },
      {
        stage: "2",
        skill: "Energy",
        type: "choice",
        prompt: "Why does Marley wear a hat in strong sunlight?",
        detail: "Think about light and heat from the Sun.",
        choices: ["To reduce light and heat reaching her head", "To make the Sun colder", "To stop gravity", "To turn sunlight into water"],
        answer: "To reduce light and heat reaching her head",
        hint: "A hat gives shade."
      },
      {
        stage: "2",
        skill: "Energy",
        type: "choice",
        prompt: "Which object changes stored chemical energy into movement?",
        detail: "Think about things that use fuel.",
        choices: ["A petrol car driving", "A rock sitting still", "A window letting light in", "A cup on a shelf"],
        answer: "A petrol car driving",
        hint: "Fuel stores chemical energy that can be changed into motion."
      },
      {
        stage: "2",
        skill: "States of matter",
        type: "choice",
        prompt: "What happens to ice when it is heated enough?",
        detail: "Think about changing state.",
        choices: ["It melts into liquid water", "It becomes wood", "It disappears forever", "It turns into metal"],
        answer: "It melts into liquid water",
        hint: "Melting changes a solid into a liquid."
      },
      {
        stage: "2",
        skill: "States of matter",
        type: "choice",
        prompt: "Water left in a shallow dish slowly disappears on a warm day. What is happening?",
        detail: "The liquid changes into a gas.",
        choices: ["Evaporation", "Freezing", "Magnetism", "Friction"],
        answer: "Evaporation",
        hint: "Evaporation is liquid water changing into water vapour."
      },
      {
        stage: "2",
        skill: "States of matter",
        type: "choice",
        prompt: "Which one is a gas at room temperature?",
        detail: "A gas spreads out to fill space.",
        choices: ["Air", "Ice", "Milk", "Sand"],
        answer: "Air",
        hint: "Air is a mixture of gases."
      },
      {
        stage: "2",
        skill: "States of matter",
        type: "choice",
        prompt: "What change happens when water vapour cools on a cold window?",
        detail: "Gas changes back into liquid drops.",
        choices: ["Condensation", "Melting", "Burning", "Stretching"],
        answer: "Condensation",
        hint: "Condensation forms liquid water droplets."
      },
      {
        stage: "2",
        skill: "Weather",
        type: "choice",
        prompt: "Dark clouds, strong wind, and falling temperature may suggest what weather is coming?",
        detail: "Use the weather clues.",
        choices: ["A storm or rain", "A heatwave for sure", "No weather at all", "A rainbow indoors"],
        answer: "A storm or rain",
        hint: "Dark clouds and wind often happen before rain or storms."
      },
      {
        stage: "2",
        skill: "Weather",
        type: "choice",
        prompt: "Which tool measures temperature?",
        detail: "Think about weather instruments.",
        choices: ["Thermometer", "Ruler", "Balance scale", "Compass"],
        answer: "Thermometer",
        hint: "A thermometer measures how hot or cold something is."
      },
      {
        stage: "2",
        skill: "Weather",
        type: "choice",
        prompt: "Which tool shows wind direction?",
        detail: "Think about weather tools outside.",
        choices: ["Wind vane", "Magnifying glass", "Stopwatch", "Measuring cup"],
        answer: "Wind vane",
        hint: "A wind vane points with the wind direction."
      },
      {
        stage: "2",
        skill: "Weather",
        type: "choice",
        prompt: "Why do puddles often dry faster on hot windy days?",
        detail: "Think about evaporation.",
        choices: ["Heat and wind speed up evaporation", "Wind turns water into rocks", "Heat makes puddles magnetic", "Clouds drink the puddles"],
        answer: "Heat and wind speed up evaporation",
        hint: "Warmth and moving air can help liquid water evaporate faster."
      },
      {
        stage: "2",
        skill: "Environment",
        type: "choice",
        prompt: "Why is recycling paper helpful?",
        detail: "Think about using resources again.",
        choices: ["It can reduce waste and save resources", "It makes paper impossible to use", "It creates more rubbish", "It stops all rain"],
        answer: "It can reduce waste and save resources",
        hint: "Recycling turns used materials into something useful again."
      },
      {
        stage: "2",
        skill: "Environment",
        type: "choice",
        prompt: "Which action helps save water?",
        detail: "Choose the action that uses less water.",
        choices: ["Turning off the tap while brushing teeth", "Leaving the hose running", "Taking longer showers every day", "Washing one sock at a time"],
        answer: "Turning off the tap while brushing teeth",
        hint: "Turning off the tap stops wasted water."
      },
      {
        stage: "2",
        skill: "Environment",
        type: "choice",
        prompt: "A habitat is changed when trees are cut down. What might happen to animals that lived there?",
        detail: "Think about food and shelter.",
        choices: ["They may lose food or shelter", "They will all learn to fly", "They will need no water", "They will turn into plants"],
        answer: "They may lose food or shelter",
        hint: "Animals depend on habitats for what they need to survive."
      },
      {
        stage: "2",
        skill: "Environment",
        type: "choice",
        prompt: "Which item should go in a compost bin?",
        detail: "Compost is made from natural waste that breaks down.",
        choices: ["Apple core", "Plastic wrapper", "Glass bottle", "Metal spoon"],
        answer: "Apple core",
        hint: "Food scraps like apple cores can break down into compost."
      }
    ]
  };

  Object.entries(expandedActivities).forEach(([activitySubject, additions]) => {
    activities[activitySubject].push(...additions);
  });

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
