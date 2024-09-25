import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '@/lib/apiRequest';
import { User } from '@/lib/interfaces';

interface LoginResponseData {
    user: User;
    access_token: string;
    token_type: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginResponseData;
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const responseData = await api.post<LoginResponse>('/auth/login', {
            email, password,
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