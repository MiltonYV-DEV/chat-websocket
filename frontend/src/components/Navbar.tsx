const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full">
      <nav className="flex md:justify-around justify-between text-xl p-2 text-white">
        <a href="/">
          <h1>
            Idea<span className="text-blue-500 font-bold">World!</span>
          </h1>{" "}
        </a>

        <div>X</div>
      </nav>
    </div>
  );
};

export default Navbar;
