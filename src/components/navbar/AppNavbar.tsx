import { Navbar } from "react-daisyui";

export default function AppNavbar() {
  return (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Navbar>
        <h1 className="text-xl normal-case">Country Comparison</h1>
      </Navbar>
    </div>
  );
}
