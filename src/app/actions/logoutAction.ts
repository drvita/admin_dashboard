'use server';

import { cookies } from 'next/headers';

export async function logoutAction() {
  try {
    // Call the logout API route
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/auth/logout`;

    const cookieStore = cookies();
    const cookieHeader = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Cookie': cookieHeader
      },
    });

    if (!response.ok) {
      throw new Error('Failed to logout on server');
    }

    // Remove auth_token and user_profile cookies
    cookies().delete('auth_token');
    cookies().delete('user_profile');
    return { success: true, message: 'Logout successful' };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to logout. Please try again.',
    };
  }
}