function operate(num1, op, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
      break;

    case "-":
      return num1 - num2;
      break;

    case "*":
      return num1 * num2;
      break;

    case "/":
      return num1 / num2;
      break;

    default:
      alert("Op need like +,-,*,/");
  }
}
