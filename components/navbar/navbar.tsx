import Links from './links';
import Logo from './logo';
import ModeToggle from './mode-toggle';

const Navbar = () => (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
            <Logo />
            <Links />
            <ModeToggle />
        </nav>
    </header>
);

export default Navbar;
