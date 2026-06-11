import Sidebar from '@/components/sidebar/sidebar';

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 min-h-0 w-full justify-start overflow-x-hidden lg:gap-8">
            <Sidebar />
            <div className="flex flex-1 min-w-0 justify-center lg:gap-16">
                {children}
            </div>
        </div>
    );
};

export default ContentLayout;
