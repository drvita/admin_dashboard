import { NextRequest, NextResponse } from 'next/server';
import { encryptData, decryptData } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    let text: string;
    
    try {
      const body = await request.json();
      text = body.text;
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ 
        error: 'Invalid JSON in request body', 
        details: (parseError as Error).message 
      }, { status: 400 });
    }
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log('Original text:', text);
    
    const encrypted = await encryptData(text);
    console.log('Encrypted:', encrypted);
    
    const decrypted = await decryptData(encrypted);
    console.log('Decrypted:', decrypted);

    return NextResponse.json({ 
      original: text, 
      encrypted, 
      decrypted,
      success: text === decrypted
    });
  } catch (error) {
    console.error('Encryption test failed:', error);
    return NextResponse.json(
      { error: 'Encryption test failed', details: (error as Error).message }, 
      { status: 500 }
    );
  }
}