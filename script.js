const questions = [
  { question: "Which animal has black and white stripes?", options: ["Leopard", "Zebra", "Tiger", "Elephant"], answer: 1 },
  { question: "Which country is overpopulated?", options: ["Zambia", "India", "South Korea", "South Africa"], answer: 1 },
  { question: "Which country is the richer GDP per Capita?", options: ["China", "Bangladesh", "India", "Iran"], answer: 0 },
  { question: "Which animal is a scavenger?", options: ["Leopard", "Snake", "Vulture", "Chicken"], answer: 2 },
  { question: "Which of the countries is the largest?", options: ["Canada", "Algeria", "Russia", "Argentina"], answer: 2 }
];

const backgrounds = [
  "url('1.jpg')","url('7.jpg')","url('6.jpg')","url('4.jpg')","url('5.jpg')"
];

let currentQuestion = 0;
let score = 0;
let answered = false; 

function loadQuestion() {
  const q = questions[currentQuestion];
  answered = false; 
  document.getElementById("question").innerText = q.question;
  document.getElementById("message").innerText = "";

  document.body.style.backgroundImage = backgrounds[currentQuestion % backgrounds.length];
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background-image 0.6s ease-in-out";

  q.options.forEach((option, index) => {
    const btn = document.getElementById(`option${index + 1}`);
    btn.innerText = option;
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
    btn.onclick = () => selectAnswer(index);
  });

  const next = document.getElementById("next");
  next.innerText = (currentQuestion < questions.length - 1) ? "Next" : "Finish";
  next.style.display = "block"; 
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const correctIndex = q.answer;
  answered = true; 

  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`option${i + 1}`);
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
  }

  if (selectedIndex === correctIndex) score++;
}

document.getElementById("next").onclick = () => {
  if (!answered) {
    document.getElementById("message").innerText = "🚨 PLEASE CHOOSE ONE OPTION BEFORE PROCEEDING";
    return;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").innerText = score + " / " + questions.length;
}

document.getElementById("restart").onclick = () => {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadQuestion();
};

loadQuestion();
