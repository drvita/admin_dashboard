import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/app/[locale]/components/auth/LoginForm'), { ssr: false });
const RegisterHeader = dynamic(() => import('@/app/[locale]/components/auth/RegisterHeader'), { ssr: false });

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4">
            <RegisterHeader />
            <LoginForm />
        </div>
    );
}