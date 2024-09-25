'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { encryptData } from '@/lib/encryption';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export async function loginAction(formData: LoginFormData) {
  const result = LoginSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/auth/login`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        errors: data.errors || { form: [data.message || 'Failed to login'] }
      };
    }

    if (!data.token || !data.profile) {
      throw new Error('Invalid response from API');
    }

    try {
      // Encrypt user token and profile
      const encryptedToken = await encryptData(data.token);
      const encryptedProfile = await encryptData(JSON.stringify(data.profile));

      // Store encrypted data in cookies
      cookies().set('auth_token', encryptedToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24 * 7 // 1 week, adjust as needed
      });
      cookies().set('user_profile', encryptedProfile, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24 * 7 // 1 week, adjust as needed
      });

      console.log('Cookies set successfully');
    } catch (encryptionError) {
      console.error('Encryption error:', encryptionError);
      throw new Error('Failed to secure user data');
    }

    return { success: true, message: 'Login successful' };
  } catch (error) {
    if(error instanceof Error){
      console.error('Login error:', error.message);
    }
    return {
      success: false,
      errors: { form: [(error as Error).message || 'Failed to login. Please try again.'] }
    };
  }
}