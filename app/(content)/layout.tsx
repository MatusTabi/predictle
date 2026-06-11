const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 min-h-0 w-full justify-center overflow-x-hidden lg:gap-16">
            {children}
        </div>
    );
};

export default ContentLayout;
