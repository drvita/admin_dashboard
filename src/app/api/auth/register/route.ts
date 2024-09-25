import { NextResponse } from 'next/server';
import { api, ApiError } from '@/lib/apiRequest';
import { User } from '@/lib/interfaces';

interface RegisterResponse {
  data: {
    access_token: string;
    user: User;
  };
}

export async function POST(request: Request) {
  try {
    const { name, email, password, password_confirmation } = await request.json();
    const responseData = await api.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
      password_confirmation
    });

    // Extract token and user profile from the response
    const token = responseData.data.access_token;
    const profile = responseData.data.user;

    return NextResponse.json({ success: true, token, profile }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({
        success: false,
        message: error.message,
        errors: error.errors
      }, { status: error.status });
    } else {
      console.error('Unexpected error during registration:', error);
      return NextResponse.json({
        success: false,
        message: 'An unexpected error occurred',
        errors: { form: ['Please try again later.'] }
      }, { status: 500 });
    }
  }
}