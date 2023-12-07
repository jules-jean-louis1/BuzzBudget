const HistoryList = ({ items }) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div id="containerRecapAccount">
          <div id="TotalInAccount">
            {items.map((item) => (
              <div key={item.id_transaction}>
                <div className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#3e3e3e]">
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
