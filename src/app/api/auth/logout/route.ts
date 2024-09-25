import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '@/lib/apiRequest';

interface LogoutResponse {
    success: boolean;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        // Llamamos a la API externa para invalidar el token
        const responseData = await api.post<LogoutResponse>('/auth/logout',{},true);
        console.log("[DEBUG] response external", responseData.message);

        // Si la llamada a la API externa es exitosa, devolvemos una respuesta de éxito
        return NextResponse.json({
            success: true,
            message: responseData.message || 'Logged out successfully'
        }, { status: 200 });

    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json({
                success: false,
                message: error.message,
                errors: error.errors
            }, { status: error.status });
        } else {
            console.error('Unexpected error during logout:', error);
            return NextResponse.json({
                success: false,
                message: 'An unexpected error occurred',
                errors: { form: ['Please try again later.'] }
            }, { status: 500 });
        }
    }
}