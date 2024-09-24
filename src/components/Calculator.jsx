import { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  async function calcResult() {
    if (expression.length !== 0) {
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GEMINI_API_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Calculate and only return the result of ${expression}`;
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        setResult("Gemini AI says the result is " + result.response.text());
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  function handleButton(value) {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") calcResult();
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="flex-col">
      <p className="text-light-orange">
        Please Hit AC to clear expression after every calculation
      </p>
      <p className="text-light-orange">
        When using Trig or Log Functions please input parenthesis. Example:
        sin(30)
      </p>
      <div className="bg-mid-blue flex flex-col gap-5 p-5 rounded-2xl">
        <DisplayWindow expression={displayEXP} result={result} />
        <KeysWindow handleButton={handleButton} />
      </div>
      <div className="text-light-orange flex flex-col items-end text-xs">
        <p>Ryan Lov</p>
        <p>Updated: 09/24/2024</p>
      </div>
    </div>
  );
};

export default Calculator;
