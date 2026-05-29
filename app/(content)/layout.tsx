import Sidebar from '@/components/sidebar/sidebar';

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 min-h-0 w-full gap-8 justify-start overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 justify-center gap-16">{children}</div>
        </div>
    );
};

export default ContentLayout;
