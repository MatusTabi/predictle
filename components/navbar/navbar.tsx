import Actions from './actions';
import Logo from './logo';
import MobileMenu from './mobile-menu';

const Navbar = () => (
    <header className="sticky top-0 z-50 w-full border-b border-inverse-on-surface backdrop-blur-xl">
        <nav className="container mx-auto flex h-16 items-center justify-between gap-3 px-4">
            <div className="flex min-w-0 items-center gap-2">
                <MobileMenu />
                <Logo />
            </div>
            <div className="shrink-0">
                <Actions />
            </div>
        </nav>
    </header>
);

export default Navbar;
