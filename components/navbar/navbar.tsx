import Actions from './actions';
import Links from './links';
import Logo from './logo';

const Navbar = () => (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl  border-b border-inverse-on-surface">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
            <Logo />
            {/* <Links /> */}
            <Actions />
        </nav>
    </header>
);

export default Navbar;
