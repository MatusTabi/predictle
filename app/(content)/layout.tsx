import Sidebar from '@/components/sidebar/sidebar';

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full p-4 gap-8 justify-start">
            <Sidebar />
            <div className="flex flex-1 justify-center gap-16">{children}</div>
        </div>
    );
};

export default ContentLayout;
