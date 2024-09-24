const KeysWindow = ({ handleButton }) => {
  const sciKeys = ["sin", "cos", "ln", "log", "tan", "π", "e", "^", "!", "√"];

  const basicKeys = [
    "1",
    "2",
    "3",
    "(",
    ")",
    "4",
    "5",
    "6",
    "+",
    "-",
    "7",
    "8",
    "9",
    "*",
    "/",
    "0",
    ".",
    "DEL",
    "AC",
    "=",
  ];

  return (
    <div className="min-w-[320px] flex flex-col  rounded-2xl">
      <div className=" bg-light-blue grid grid-cols-[repeat(5,1fr)] gap-[0.3rem] rounded-t-2xl p-4">
        {sciKeys.map((item, index) => (
          <button key={index} onClick={() => handleButton(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="bg-light-blue grid grid-cols-[repeat(5,1fr)] gap-[0.3rem] rounded-b-2xl p-4">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            className={`${item >= "0" && item <= "9" ? "number" : ""} ${
              item === "=" && "equal"
            }`}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;
