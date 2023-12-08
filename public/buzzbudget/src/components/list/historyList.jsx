import { useState } from "react";
import FormattedDate from "../form/formattedDate";
const HistoryList = ({ items }) => {
  const [buttons, setButtons] = useState({});

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div id="containerRecapAccount">
          <div id="TotalInAccount">
            {items.map((item) => (
              <div key={item.id_transaction}>
                <button
                  type="button"
                  onClick={() =>
                    setButtons({
                      ...buttons,
                      [item.id_transaction]: !buttons[item.id_transaction],
                    })
                  }
                  className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#3e3e3e]"
                >
                  <span className="text-xl text-[#f8f8f8]">
                    {item.name_transaction}
                  </span>
                  <span
                    style={{
                      background: "linear-gradient(140deg, #FF2E00, #FD9D58)",
                    }}
                    className="rounded-md p-3 text-slate-50 font-semibold"
                  >
                    {item.amount_transaction} €
                  </span>
                </button>
                <div id="containerDetailTransaction">
                  {buttons[item.id_transaction] && (
                    <>
                      <div className="w-full">
                        <p className="text-xl font-bold">Détails</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg">Date</p>
                          <p className="text-lg">
                            <FormattedDate
                              dateString={item.date_of_transaction}
                            />
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg">Type</p>
                          <p className="text-lg">{item.type_of_transaction}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryList;
