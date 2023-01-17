import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import config from "../config";

type Inputs = {
  hour: number | null;
  minutes: number | null;
};

export const SetTimer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { hour: null, minutes: null },
  });

  const hours = [...Array(24)].map((_, i) => i);

  // 必要に応じて変更
  const minutes = [...Array(60)].map((_, i) => i);

  const url = config.URL;

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setIsLoading(true);
    console.log(JSON.stringify({ hour: data.hour, minutes: data.minutes }));

    // requestの設定
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hour: Number(data.hour),
        minute: Number(data.minutes),
      }),
    };

    // 送信の処理
    fetch(url + "/setting", requestOptions)
      .then((res) => {
        if (!res?.ok) {
          setMessage("サーバーエラーです");
        }
        setMessage(`${data.hour}時${data.minutes}分に設定しました！`);
      })
      .catch((e) => {
        setMessage("送信に失敗しました");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col items-center gap-4"
    >
      <div className="mt-5 flex gap-4">
        <select
          {...register("hour")}
          required
          className="rounded-md	bg-violet-100/90  px-3 py-1"
        >
          {hours.map((hour) => {
            return (
              <option value={hour} key={hour}>
                {hour}
              </option>
            );
          })}
        </select>
        時
        <select
          {...register("minutes")}
          required
          className="rounded-md	bg-violet-100/90  px-3 py-1 "
        >
          {minutes.map((minutes) => {
            return (
              <option value={minutes} key={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
        分
      </div>
      <button
        type="submit"
        className="rounded-md	bg-violet-100/90 px-3 py-1 hover:bg-violet-200 active:border-solid disabled:bg-slate-400"
        disabled={isLoading}
      >
        {isLoading ? "送信中" : "送信する"}
      </button>
      <div className=" p-4">{message}</div>
    </form>
  );
};
