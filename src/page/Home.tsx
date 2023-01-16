import { useEffect, useState } from "react";

type TableValues = {
  time: string[];
};

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [tableValue, setTableValue] = useState<TableValues | undefined>(
    undefined
  );

  const testUrl = "";
  const url = "http://192.168.11.59:8080";

  useEffect(() => {
    // 送信の処理
    fetch(testUrl + "/setting")
      .then((response) => {
        // return response.json();
      })
      .then((data) => {
        // setTableValue();
      })
      .catch((e) => {
        setMessage("受信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <table className="mt-5 w-24 table-auto text-lg">
        <thead className="">
          <tr className="border-2 p-2">
            <th>設定時間</th>
          </tr>
        </thead>
        <tbody>
          {tableValue?.time.map((element) => {
            return (
              <tr className="border-2">
                <td>{element}</td>
              </tr>
            );
          })}
          <tr className="border-2">
            <td>11:00</td>
          </tr>
        </tbody>
      </table>

      <div>{message}</div>
    </div>
  );
};
