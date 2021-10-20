import { useEffect, useRef } from "react";

export default function VerticalForm({
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

  const intialPrice = useRef(selectOptions[0].price || 0);

  useEffect(() => {
    let priceList = selectOptions.filter((item) => item.name === selectValue);
    let amount = 0;
    if (inputValue === 0) {
      amount = 0;
    } else {
      amount = parseInt(inputValue);
    }
    let cost = intialPrice;
    if (priceList.length > 0) {
      cost = parseInt(priceList[0].price);

      setPriceCost(cost);
    } else {
      setPriceCost(parseInt(intialPrice.current));
    }

    if (cost.current === undefined) {
      setTotalCost(amount * cost);
    } else {
      setTotalCost(amount * cost.current);
    }
  }, [
    selectValue,
    inputValue,
    intialPrice,
    setPriceCost,
    setTotalCost,
    selectOptions,
  ]);

  return (
    <div className="my-2 w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {select && (
            <div className="flex w-full mb-4">
              <label htmlFor={selectName} className="w-1/2 pl-8">
                select a {selectName} :
              </label>
              <select
                name={selectName}
                id={selectName}
                onChange={({ target }) => setSelectValue(target.value)}
                value={selectValue || "select"}
                className="w-36 bg-transparent border-b-2 pb-1"
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
            <div className="flex w-full mb-4">
              <label htmlFor={inputName} className="w-1/2 pl-8">
                Enter a {inputName} :
              </label>
              <input
                type="text"
                name={inputName}
                id={inputName}
                onChange={({ target }) => setInputValue(target.value)}
                value={inputValue || ""}
                placeholder={` Enter a ${inputName}`}
                className="w-36 bg-transparent border-b-2 pb-1"
              ></input>
            </div>
          )}
          {price && (
            <div className="flex w-full mb-5">
              <label htmlFor={priceName} className="w-1/2 pl-8">
                {priceName} :
              </label>
              <h2 className="w-36 bg-transparent">{priceCost} Rs.</h2>
            </div>
          )}
          {cost && (
            <div className="flex w-full mb-4">
              <label htmlFor={costName} className="w-1/2 pl-8">
                {costName} :
              </label>
              <h2 className="w-36 bg-transparent">{totalCost} Rs.</h2>
            </div>
          )}
          <div className="flex w-full justify-center mt-8 pr-24">
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
