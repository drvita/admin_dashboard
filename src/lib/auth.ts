import { decryptData } from './encryption';

export async function verifySession(encryptedToken: string | null): Promise<boolean> {
  if (!encryptedToken) {
    console.log('No token provided to verifySession');
    return false;
  }

  try {
    console.log('Attempting to verify session with token:', encryptedToken);
    const decryptedToken = await decryptData(encryptedToken);
    console.log('Decrypted token:', decryptedToken);
    
    // Here you would typically verify the token with your backend
    // For this example, we'll just check if it's not empty
    const isValid = !!decryptedToken;
    console.log('Session is valid:', isValid);
    return isValid;

  } catch (error) {
    console.error('Error in verifySession:', error);
    if (error instanceof DOMException) {
      console.error('DOMException name:', error.name);
      console.error('DOMException message:', error.message);
    } else if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
    }
    return false;
  }
}