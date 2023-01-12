import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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

  const hours = [...Array(24)].map((_, i) => i + 1);

  const minutes = [0, 15, 30, 45];

  // FIXME:url追記
  const url = "";

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setIsLoading(true);
    console.log(JSON.stringify({ hour: data.hour, minutes: data.minutes }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hour: Number(data.hour),
        minutes: Number(data.minutes),
      }),
    };
    fetch(url, requestOptions)
      .then(() => {
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
      <div className=" p-4 text-2xl">NHK 起床庁</div>
      <div className="flex gap-4">
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
