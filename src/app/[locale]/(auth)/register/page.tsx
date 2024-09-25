import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('@/app/[locale]/components/auth/RegisterForm'), { ssr: false });
const RegisterHeader = dynamic(() => import('@/app/[locale]/components/auth/RegisterHeader'), { ssr: false });

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}