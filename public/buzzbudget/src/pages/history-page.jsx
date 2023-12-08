import FormFilter from "../components/form/formFilter";
import HistoryList from "../components/list/historyList";
import { useState } from "react";

const HistoryPage = () => {
  const [data, setData] = useState([]);

  const handleDataHistory = (data) => {
    setData(data);
  };

  return (
    <div className="h-screen bg-[#f2f2f6]">
      <div className="pt-14">
        <h1 className="text-2xl px-2 mt-2 font-normal">Historique</h1>
        <div id="contianerHistory" className="px-2">
          <div id="wapperHistoryFilter">
            <FormFilter onData={handleDataHistory} />
          </div>
          <div id="wapperHistoryDisplay">
            <HistoryList items={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
