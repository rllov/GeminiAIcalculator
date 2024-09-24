const DisplayWindow = ({ expression, result }) => {
  return (
    <div className="overflow-x-auto bg-[#DCE1DE] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
      <p className="expression">{expression}</p>
      <p className="result">{result}</p>
    </div>
  );
};

export default DisplayWindow;
