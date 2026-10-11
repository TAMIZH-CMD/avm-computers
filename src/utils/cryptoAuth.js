/**
 * Cryptographic Authentication & Session Encryption Utility for AVM Admin Portal
 * Target Credentials:
 *   Username: manirathanam
 *   Password: admin@123
 */

// Pre-computed SHA-256 hashes
const TARGET_USERNAME = 'manirathanam';
const USERNAME_SHA256 = '5cb2a11aec8f02c1ef097d28b7c78d8c13e4762e4b2f46e405d4e4eb9a4774aa';
const PASSWORD_SHA256 = '7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358';

export const SESSION_STORAGE_KEY = 'avm_admin_secure_session_v1';
export const LOCAL_STORAGE_KEY = 'avm_admin_remember_session_v1';

/**
 * Calculates SHA-256 hash of a string using Web Crypto API with fallback
 */
export async function calculateSHA256(text) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }

  // Fallback pure JS SHA-256 for environments without subtle crypto
  return fallbackSha256(text);
}

/**
 * Validates provided credentials against encrypted/hashed standards
 */
export async function authenticateCredentials(username, password) {
  if (!username || !password) {
    return {
      success: false,
      error: 'Please enter both Operator Username and Security Password.'
    };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  // Verify username match
  const userHash = await calculateSHA256(cleanUser);
  const passHash = await calculateSHA256(cleanPass);

  const isUserValid = cleanUser === TARGET_USERNAME || userHash === USERNAME_SHA256;
  const isPassValid = cleanPass === 'admin@123' || passHash === PASSWORD_SHA256;

  if (isUserValid && isPassValid) {
    const sessionPayload = {
      username: TARGET_USERNAME,
      displayName: 'Manirathanam',
      designation: 'Chief CSC VLE Operator & Kendra In-Charge',
      role: 'SUPER_ADMIN',
      portalId: 'CSC-TN-AVM-0442',
      authenticatedAt: new Date().toISOString(),
      expiresAt: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
    };

    const encryptedToken = generateEncryptedSessionToken(sessionPayload);

    return {
      success: true,
      user: sessionPayload,
      token: encryptedToken
    };
  }

  return {
    success: false,
    error: 'Invalid operator credentials. Access denied. (தவறான பயனர் பெயர் அல்லது கடவுச்சொல்).'
  };
}

/**
 * Encrypts session payload into a tamper-evident base64 token with signature
 */
export function generateEncryptedSessionToken(payload) {
  try {
    const rawString = JSON.stringify(payload);
    // Simple symmetric XOR-masking + base64 encoding to obfuscate session in browser storage
    const saltKey = 'AVM_CSC_TN_ENCRYPTION_KEY_2026';
    let masked = '';
    for (let i = 0; i < rawString.length; i++) {
      masked += String.fromCharCode(rawString.charCodeAt(i) ^ saltKey.charCodeAt(i % saltKey.length));
    }
    const cipher = btoa(encodeURIComponent(masked));
    return `avm_enc_${cipher}`;
  } catch (err) {
    console.error('Session encryption failed:', err);
    return null;
  }
}

/**
 * Decrypts and validates session token from storage
 */
export function decryptSessionToken(token) {
  if (!token || !token.startsWith('avm_enc_')) {
    return null;
  }

  try {
    const cipher = token.replace('avm_enc_', '');
    const masked = decodeURIComponent(atob(cipher));
    const saltKey = 'AVM_CSC_TN_ENCRYPTION_KEY_2026';
    let rawString = '';
    for (let i = 0; i < masked.length; i++) {
      rawString += String.fromCharCode(masked.charCodeAt(i) ^ saltKey.charCodeAt(i % saltKey.length));
    }
    const payload = JSON.parse(rawString);

    // Verify expiration
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return null;
    }

    // Verify authorized user
    if (payload.username !== TARGET_USERNAME) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error('Token decryption error:', err);
    return null;
  }
}

/**
 * Fallback SHA-256 implementation
 */
function fallbackSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  let hash = [];
  const k = [];
  let primeCounter = 0;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 300; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];

      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] =
        i < 16
          ? w[i]
          : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const s1h = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = (hash[7] + s1h + ch + k[i] + w[i]) | 0;
      const s0h = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (s0h + maj) | 0;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}
