import { useEffect, useState } from "react";
import config from "../config";

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [tableValue, setTableValue] = useState<string[] | undefined>(undefined);

  const [onDelete, setOnDelete] = useState<boolean>(false);

  const url = config.URL;

  useEffect(() => {
    // 設定時間の取得
    fetch(url + "/confirm")
      .then((res) => {
        if (!res?.ok) {
          setMessage("サーバーエラーです");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTableValue(res);
      })
      .catch((e) => {
        setMessage("受信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onDelete, url]);

  const onButton = (index: number) => {
    console.log(index);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: index,
      }),
    };

    // 送信の処理
    fetch(url + "/delete", requestOptions)
      .then((res) => {
        if (!res?.ok) {
          setMessage("サーバーエラーです");
        }
        setMessage(`削除に成功しました!`);
      })
      .catch((e) => {
        setMessage("送信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
        setOnDelete(!onDelete);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <table className="mt-5 table-auto text-lg">
        <thead className="">
          <tr className="border-2 p-2">
            <th className="border-2 px-3">設定時間</th>
            <th className="border-2 px-3">削除</th>
          </tr>
        </thead>
        <tbody>
          {tableValue?.map((element, index) => {
            return (
              <tr className="border-2" key={index}>
                <td className="px-2 py-1">{element}</td>
                <td className="px-2 py-1">
                  <button
                    className="rounded-md bg-violet-100/90 p-1 text-base"
                    onClick={() => onButton(index)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>{message}</div>
    </div>
  );
};
