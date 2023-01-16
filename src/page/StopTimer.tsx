import { useState } from "react";

export const StopTimer = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const testUrl = "";
  const url = "http://192.168.11.59:8080";

  const onButton = () => {
    // 止める処理
    setIsLoading(true);
    console.log(text);

    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: text,
    };

    fetch(testUrl + "/setting", requestOptions)
      .then((res) => {
        // return res.json();
      })
      .then((res) => {
        setMessage(`${res}`);
      })
      .catch((e) => {
        setMessage("送信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <form className="mt-5 flex h-full w-full flex-col items-center gap-4">
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
      {message}
    </form>
  );
};
