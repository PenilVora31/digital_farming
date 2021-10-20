import { useEffect, useRef } from "react";

export default function HorizontalForm({
  selectObject,
  inputObject,
  priceObject,
  costObject,
  handleSubmit,
}) {
  const { select, selectName, selectOptions, selectValue, setSelectValue } =
    selectObject;
  const { input, inputName, inputValue, setInputValue } = inputObject;
  const { price, priceName, priceCost, setPriceCost } = priceObject;
  const { cost, costName, totalCost, setTotalCost } = costObject;

  const intialPrice = useRef(selectOptions[0].price);

  useEffect(() => {
    let priceList = selectOptions.filter((item) => item.name === selectValue);
    let amount = 0;
    if (inputValue === "") {
      amount = 0;
    } else {
      amount = parseInt(inputValue);
    }
    let cost = intialPrice;
    if (priceList.length > 0) {
      cost = priceList[0].price;
      setPriceCost(cost);
    } else {
      setPriceCost(intialPrice.current);
    }
    setTotalCost(amount * cost.current);
  }, [
    selectValue,
    inputValue,
    intialPrice,
    setPriceCost,
    setTotalCost,
    selectOptions,
  ]);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {select && (
            <div className="flex w-full mb-2">
              <label htmlFor={selectName} className="w-1/2">
                select a {selectName} :
              </label>
              <select
                name={selectName}
                id={selectName}
                onChange={({ target }) => setSelectValue(target.value)}
                value={selectValue || "select"}
                className="bg-transparent border-b-2 w-24"
              >
                {selectOptions.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {input && (
            <div className="flex w-full mb-3">
              <label htmlFor={inputName} className="w-1/2">
                {inputName} :
              </label>
              <input
                type="text"
                name={inputName}
                id={inputName}
                onChange={({ target }) => setInputValue(target.value)}
                value={inputValue || ""}
                placeholder={` Enter a ${inputName}`}
                className="bg-transparent border-b-2 w-24 pl-1"
              ></input>
            </div>
          )}
          {price && (
            <div className="flex w-full mb-4">
              <label htmlFor={priceName} className="w-1/2">
                {priceName} :
              </label>
              <h2 className="bg-transparent w-24 pl-1">{priceCost} Rs.</h2>
            </div>
          )}
          {cost && (
            <div className="flex w-full mb-3">
              <label htmlFor={costName} className="w-1/2">
                {costName} :
              </label>
              <h2 className="bg-transparent w-24 pl-1">{totalCost} Rs.</h2>
            </div>
          )}
          <div className="flex w-full justify-center mt-4">
            <button
              type="submit"
              className="inline-block px-3 py-1 border-2 border-gray-normal rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
