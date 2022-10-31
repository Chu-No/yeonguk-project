const testsheet = document.getElementById("testsheet");
const submit = document.getElementById("showResultBtn");

var breakList = [5, 10, 15, 20];
const mbtiList = [
  ["E", "I"],
  ["S", "N"],
  ["F", "T"],
  ["J", "P"],
];

let res = "";
let start = 1;
// Function to show the result
function showResult() {
  for (let i in breakList) {
    let breakPoint = breakList[i];
    let tmp = 0;
    for (start; start <= breakPoint; start++) {
      questionName = `q${Number(start)}`;
      console.log(questionName);
      isEmpty =
        document.querySelector(`input[name=${questionName}]:checked`) === null;
      if (isEmpty) {
        alert("모든 문항을 선택해주세요.");
        return;
      } else {
        const selectedOption = document.querySelector(
          `input[name=${questionName}]:checked`
        ).value;
        tmp += Number(selectedOption);
        console.log(tmp);
      }
    }
    if (tmp > 12) {
      console.log(mbtiList[breakList.indexOf(breakPoint)][0]);
      res += mbtiList[breakList.indexOf(breakPoint)][0];
    } else {
      console.log(mbtiList[breakList.indexOf(breakPoint)][1]);
      res += mbtiList[breakList.indexOf(breakPoint)][1];
    }
    start = breakPoint + 1;
    tmp = 0;
  }
  console.log(res);
  testsheet.innerHTML = "당신의 MBTI는 : " + res;
}

// Add event listener to the submit button
submit.addEventListener("click", (e) => {
  e.preventDefault();
  showResult();
});
