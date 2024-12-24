'use client';
import { useAuth } from "./AuthProvider";
import { useRouter } from 'next/navigation';
import SignIn from '../app/sign-in/page';

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SignIn />
    </div>
  );
}