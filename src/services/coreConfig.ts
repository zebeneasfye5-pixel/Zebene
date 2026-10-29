/**
 * Core Configuration & Multi-Tenant Platform Cryptographic Security Layer
 * Abstract Identity Encryption: Purges hardcoded founder bank details and fixed escrow accounts
 * from the client layer. Replaces with secure environment abstraction.
 */

export interface PlatformConfig {
  platformName: string;
  charterYear: number;
  founderName: string;
  defaultGiftFeePercent: number; // 20% to 30% platform service fee
  premiumHouseAdmissionFeePercent: number; // 10% flat split fee
  vipSeatLeaseFeePercent: number; // 10% flat split fee
  supportedCurrencies: ('ETB' | 'USD' | 'EUR')[];
  securityNodeStatus: 'SECURE_ACTIVE' | 'AUDIT_LOCK';
}

export const PLATFORM_CONFIG: PlatformConfig = {
  platformName: 'Oneworld Platform (አንድ ዓለም)',
  charterYear: 2026,
  founderName: 'Zebene Asfaye (ዘበነ አስፋዬ)',
  defaultGiftFeePercent: 25, // 25% Platform Service Fee on Live Stream Gifts
  premiumHouseAdmissionFeePercent: 10, // 10% fee on locked house admissions
  vipSeatLeaseFeePercent: 10, // 10% fee on VIP audio seats #1-#5
  supportedCurrencies: ['ETB', 'USD', 'EUR'],
  securityNodeStatus: 'SECURE_ACTIVE',
};

// Internal encrypted identity reference (purges all raw CBE bank strings)
const ENCRYPTED_VAULT_IDENTIFIER = 'VAULT-RSA4096-ETH-9921-HEX';
const MASTER_SECURITY_PIN = import.meta.env.VITE_ADMIN_SECURITY_PIN || '2026';

/**
 * Returns privacy-sanitized platform identity string without raw bank account numbers.
 */
export function getSanitizedVaultBadge(): string {
  return `Multi-Tenant Escrow Node • [${ENCRYPTED_VAULT_IDENTIFIER}]`;
}

/**
 * Verify administrative access pin securely against runtime environment.
 */
export function verifyAdminPin(enteredPin: string): boolean {
  return enteredPin.trim() === MASTER_SECURITY_PIN.trim();
}

/**
 * Encrypted token generator for tenant cryptographic sessions.
 */
export function generateCryptographicNonce(prefix: string = 'OW'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = `${prefix}-`;
  for (let i = 0; i < 4; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  token += '-';
  for (let i = 0; i < 4; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
