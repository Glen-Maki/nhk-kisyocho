import { useEffect, useState } from "react";
import config from "../config";

export const StopTimer = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const url = config.URL;

  useEffect(() => {
    fetch(url + "/get_phrase")
      .then((res) => {
        if (!res?.ok) {
          setMessage("サーバーエラーです");
        }
        return res.text();
      })
      .then((res) => {
        // console.log(res);
        setPassword(res);
      })
      .catch((e) => {
        setMessage("受信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  const onButton = () => {
    // 止める処理
    setIsLoading(true);
    console.log(text);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: text,
      }),
    };

    fetch(url + "/stop", requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        alert(res);
        setMessage(res);
      })
      .catch((e) => {
        setMessage("送信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const preventCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    alert("コピー禁止です");
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <form className="mt-5 flex h-full w-full flex-col items-center gap-4 ">
      {password ? (
        <div
          onCopy={(e) => {
            preventCopy(e);
          }}
          className="text-lg"
        >
          {password}
        </div>
      ) : (
        <></>
      )}
      <input
        type="text"
        placeholder="パスワードを入力する"
        className="rounded-md border-2 border-violet-300 px-2 py-1 text-lg focus:border-violet-500 focus:outline-none"
        onChange={(event) => setText(event.target.value)}
      ></input>
      <button
        type="button"
        onClick={() => onButton()}
        className="rounded-md	bg-violet-100/90 px-3 py-1 hover:bg-violet-200 active:border-solid disabled:bg-slate-400"
        disabled={isLoading}
      >
        {isLoading ? "送信中" : "送信する"}{" "}
      </button>
      <div className="text-lg">{message}</div>
    </form>
  );
};
