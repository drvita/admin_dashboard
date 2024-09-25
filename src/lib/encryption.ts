const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-12345';
const SALT = 'custom-salt';

async function generateKey(key: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  try {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(SALT),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  } catch (error) {
    console.error('Error in generateKey:', error);
    throw error;
  }
}

export async function encryptData(text: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const key = await generateKey(ENCRYPTION_KEY);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );

    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode.apply(null, encryptedArray as unknown as number[]));
  } catch (error) {
    console.error('Error in encryptData:', error);
    throw error;
  }
}

export async function decryptData(encryptedText: string): Promise<string> {
  try {
    const encryptedArray = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);

    const key = await generateKey(ENCRYPTION_KEY);

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );

    const decoder = new TextDecoder();
    const result = decoder.decode(decryptedData);
    return result;
  } catch (error) {
    console.error('Error in decryptData:', error);
    if (error instanceof DOMException) {
      console.error('DOMException name:', error.name);
      console.error('DOMException message:', error.message);
    }
    throw error;
  }
}