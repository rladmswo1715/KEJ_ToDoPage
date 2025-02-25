import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full bg-var-primary-300">
      <nav className="py-6 px-12 flex gap-6 text-2xl text-white font-semibold">
        <Link href="/">홈</Link>
      </nav>
    </header>
  );
};

export default Header;
