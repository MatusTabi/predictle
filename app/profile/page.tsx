import { auth } from '@/auth/auth';

const ProfilePage = async () => {
    const session = await auth();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">
                {'Hello, ' + (session?.user?.name ?? 'User Profile')}
            </h1>
            <p>
                This is the user profile page. More features will be added here
                soon.
            </p>
        </div>
    );
};

export default ProfilePage;
