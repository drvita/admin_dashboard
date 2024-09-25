import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '@/lib/apiRequest';
import { User } from '@/lib/interfaces';

export async function GET(request: NextRequest) {
  try {
    const profile = await api.get<User>('/auth/user', true);

    return NextResponse.json({
      isValid: true,
      message: 'Session is valid',
      profile
    });

  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        // Token inválido o expirado
        return NextResponse.json({
          isValid: false,
          message: 'Invalid or expired session'
        }, { status: 401 });
      } else {
        return NextResponse.json({
          isValid: false,
          message: 'Error validating session'
        }, { status: error.status });
      }
    } else {
      console.error('Unexpected error validating session:', error);
      return NextResponse.json({
        isValid: false,
        message: 'An unexpected error occurred'
      }, { status: 500 });
    }
  }
}