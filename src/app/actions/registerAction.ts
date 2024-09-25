'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { encryptData } from '@/lib/encryption';

const RegisterSchema = z.object({
  name: z.string().min(4, { message: 'Name must be at least 4 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
});

type FormData = z.infer<typeof RegisterSchema>;

const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export async function registerAction(formData: FormData) {
  const result = RegisterSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const normalizedData = {
    ...result.data,
    name: normalizeString(result.data.name),
    email: result.data.email.toLowerCase(),
    password_confirmation: result.data.password,
  };

  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/auth/register`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizedData),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        errors: data.errors || { form: [data.message || 'Failed to register'] }
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

    return { success: true, message: 'Registration successful' };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      errors: { form: [(error as Error).message || 'Failed to register. Please try again.'] }
    };
  }
}