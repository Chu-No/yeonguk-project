const signup = document.getElementById("signup_form");

userArr = JSON.parse(localStorage.getItem("userArr")) || [];

signup.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("signup_id").value;
  const pw = document.getElementById("signup_pw").value;

  const pwCheck =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (id === "") {
    alert("아이디를 입력해주세요.");
    return;
  }
  if (pw === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  }
  if (!pwCheck.test(pw)) {
    alert(
      "비밀번호는 대문자로 시작하고, 소문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다."
    );
    return;
  } else {
    alert("회원가입 성공");
    const userObj = {
      id: userArr.length,
      user_id: id,
      user_pw: pw,
    };
    userArr.push(userObj);
    localStorage.setItem("userArr", JSON.stringify(userArr));
  }
});

const login = document.getElementById("login_form");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("login_id").value;
  const pw = document.getElementById("login_pw").value;
  if (id === "") {
    alert("아이디를 입력해주세요.");
    return;
  }
  if (pw === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  } else {
    if (userArr.length === 0) {
      alert("회원가입을 해주세요.");
      return;
    } else {
      const userObj = userArr.find((user) => user.user_id === id);
      if (userObj === undefined) {
        alert("아이디가 존재하지 않습니다.");
        return;
      } else {
        if (userObj.user_pw === pw) {
          alert("로그인 성공");
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }
      }
    }
  }
});
