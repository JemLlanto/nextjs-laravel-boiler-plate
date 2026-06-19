import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const HomeLayout = ({ children }: Props) => {
  return (
    <div className="h-dvh w-dvw overflow-auto">
      <header className="w-full min-h-15 bg-(--background) shadow flex flex-col justify-between items-center z-50">
        <div className="w-full flex justify-between items-center px-5 py-2">
          <h5>Sample Header</h5>
          <div className="bg-(--primary) text-(--background) flex justify-center items-center rounded-sm py-2 px-5">
            UserName
          </div>
        </div>
        <nav className="w-full ">
          <ul className="bg-(--foreground)/90 text-(--background) flex justify-center items-center gap-10 p-2">
            <li>Home</li>
            <li>Dashboard</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>
      <main className="h-9/10 w-full px-35">{children}</main>
    </div>
  );
};

export default HomeLayout;
