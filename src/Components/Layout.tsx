import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col bg-sky-100">
      <div className="pt-4 pb-2 text-2xl">NHK 起床庁</div>
      <div className="mx-auto flex w-full items-center justify-center gap-3 bg-sky-100 py-3">
        <div className="">
          <Link to="/">Home</Link>
        </div>
        <div className="">
          <Link to="/setting">設定</Link>
        </div>
        <div className="">
          <Link to="/stop-timer">タイマーを止める</Link>
        </div>
      </div>
      <div className="h-full w-full bg-sky-50">{children}</div>
    </div>
  );
};
