import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  hour: number | null;
  minutes: number | null;
};

export const SetTimer = () => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { hour: null, minutes: null },
  });

  const hours = [...Array(24)].map((_, i) => i + 1);

  const minutes = [0, 15, 30, 45];

  // FIXME:url追記
  const url = "";

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    // console.log(`submit: ${data.hour} 時 ${data.minutes} 分`);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hour: data.hour, minutes: data.minutes }),
    };

    fetch(url, requestOptions);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col items-center justify-center gap-4  "
    >
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
          className="rounded-md	bg-violet-100/90  px-3 py-1"
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
      <div className="rounded-md	bg-violet-100/90 px-3 py-1">
        <input type="submit" />
      </div>
    </form>
  );
};
