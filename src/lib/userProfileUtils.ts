import { cookies } from 'next/headers';
import { User } from '@/lib/interfaces';
import { decryptData } from '@/lib/encryption';

export async function getUserProfile(): Promise<User | null> {
  const cookieStore = cookies();
  const encryptedProfileCookie = cookieStore.get('user_profile');

  if (!encryptedProfileCookie) {
    return null;
  }

  try {
    const decryptedProfile = await decryptData(encryptedProfileCookie.value);
    return JSON.parse(decryptedProfile) as User;
  } catch (error) {
    console.error('Error parsing user profile:', error);
    return null;
  }
}