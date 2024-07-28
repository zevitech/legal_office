import SmallLabel from "./SmallLabel";
import { FaRegCheckCircle } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const Package = ({
  packageName,
  price,
  complementaryTreat,
  rows,
  badge,
  handleNext,
}) => {
  const badgeBorder = badge
    ? "border-2 border-orange-600"
    : "border-2 border-slate-100";

  return (
    <div
      className={`w-[350px] py-7 bg-white rounded-2xl flex flex-col justify-between gap-6 relative  ${badgeBorder} hover:translate-y-5 transition-all max-md:hover:translate-y-0`}
    >
      {badge === true && (
        <div className="absolute top-[-15px] bg-orange-600 text-white left-[130px] rounded-md text-xs px-2 py-1">
          Most Popular
        </div>
      )}
      <div className="px-5 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-slate-600 text-center">
          {packageName}
        </h1>
        <div className="flex justify-center items-end">
          <h1 className="text-4xl text-orange-600 font-bold">${price}</h1>
          <SmallLabel text={complementaryTreat} />
        </div>
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-[10px]">
              <div className="w-5 mt-[2px] text-orange-600">
                <FaRegCheckCircle />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold text-slate-600">
                  {row.title}
                </h1>
                <p className="text-sm text-slate-700">{row.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-center">
        <Button
          color="primary"
          variant="solid"
          className="bg-gradient-to-tr from-pink-500 to-orange-500 text-white shadow-lg w-[80%] m-auto font-medium"
          onClick={() => handleNext({ packageName, price })}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default Package;
