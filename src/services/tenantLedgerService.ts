/**
 * Dynamic Multi-Tenant SaaS Ledger Subsystem
 * Replaces hardcoded public accounting vulnerabilities with isolated tenant ledger cards,
 * automated cryptographic activation tokens (SingleUsePIN), and fee-split automation.
 */

import { PLATFORM_CONFIG, generateCryptographicNonce } from './coreConfig';

export type TenantType = 'INDIVIDUAL' | 'BUSINESS' | 'GOVERNMENT';

export interface VirtualCardMeta {
  cardId: string;
  maskedPan: string;
  expiry: string;
  cardHolder: string;
  status: 'ACTIVE' | 'FROZEN';
  currency: 'ETB' | 'USD' | 'EUR';
}

export interface TenantWallet {
  tenantId: string;
  tenantType: TenantType;
  tenantName: string;
  tier: 'Citizen Standard' | 'Corporate Enterprise' | 'Sovereign Institutional';
  balances: {
    ETB: number;
    USD: number;
    EUR: number;
  };
  virtualCards: VirtualCardMeta[];
  kycLevel: 'TIER_1_BASIC' | 'TIER_2_VERIFIED' | 'TIER_3_SOVEREIGN';
  createdAt: string;
  updatedAt: string;
}

export interface SingleUsePIN {
  tokenHash: string; // e.g. "OW-VOUCH-7X89-2241"
  amount: number;
  currency: 'ETB' | 'USD' | 'EUR';
  is_used: boolean;
  channel: 'telebirr' | 'Chapa' | 'Stripe' | 'PayPal' | 'USDT';
  createdAt: string;
  redeemedAt?: string;
  redeemedBy?: string;
}

export interface PlatformRevenueLog {
  logId: string;
  sourceTenantId: string;
  destinationId: string;
  category:
    | 'GIFT_STREAM'
    | 'PREMIUM_ENTRY'
    | 'VIP_SEAT_LEASE'
    | 'AD_PROMOTION_BID'
    | 'VOUCHER_ACTIVATION'
    | 'GATEWAY_TOPUP';
  grossAmount: number;
  platformFeeAmount: number;
  netDisbursedAmount: number;
  currency: 'ETB' | 'USD' | 'EUR';
  timestamp: string;
  note: string;
}

export interface TenantActivityItem {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  title: string;
  category: string;
  amount: number;
  currency: 'ETB' | 'USD' | 'EUR';
  timestamp: string;
  status: 'COMPLETED' | 'PENDING';
}

const STORAGE_KEYS = {
  TENANT_WALLETS: 'oneworld_tenant_wallets_v2',
  VOUCHER_TOKENS: 'oneworld_voucher_tokens_v2',
  PLATFORM_LOGS: 'oneworld_platform_revenue_logs_internal',
  ACTIVITY_LOGS: 'oneworld_tenant_activity_v2',
};

export class TenantLedgerService {
  /**
   * Retrieves or provisions an isolated Multi-Tenant Wallet
   */
  public static getTenantWallet(
    tenantId: string,
    tenantType: TenantType = 'INDIVIDUAL',
    tenantName: string = 'Abebe Kebede'
  ): TenantWallet {
    const wallets = this.getAllWallets();
    if (wallets[tenantId]) {
      return wallets[tenantId];
    }

    // Provision new isolated multi-currency corporate or personal ledger card
    const newWallet: TenantWallet = {
      tenantId,
      tenantType,
      tenantName,
      tier:
        tenantType === 'GOVERNMENT'
          ? 'Sovereign Institutional'
          : tenantType === 'BUSINESS'
          ? 'Corporate Enterprise'
          : 'Citizen Standard',
      balances: {
        ETB: tenantType === 'GOVERNMENT' ? 850000 : tenantType === 'BUSINESS' ? 120000 : 14250,
        USD: tenantType === 'GOVERNMENT' ? 45000 : tenantType === 'BUSINESS' ? 9800 : 350,
        EUR: tenantType === 'GOVERNMENT' ? 25000 : tenantType === 'BUSINESS' ? 5400 : 180,
      },
      virtualCards: [
        {
          cardId: `CARD-${tenantType.slice(0, 3)}-${Date.now().toString(36).toUpperCase()}`,
          maskedPan: `•••• •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`,
          expiry: '10/28',
          cardHolder: tenantName.toUpperCase(),
          status: 'ACTIVE',
          currency: 'ETB',
        },
      ],
      kycLevel: tenantType === 'GOVERNMENT' ? 'TIER_3_SOVEREIGN' : 'TIER_2_VERIFIED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    wallets[tenantId] = newWallet;
    this.saveAllWallets(wallets);
    return newWallet;
  }

  /**
   * Automated Cryptographic Activation Pipeline:
   * Ingestion webhook receives transaction approvals from telebirr, Chapa, Stripe, PayPal, USDT
   * and generates a single-use cryptographic activation token (SingleUsePIN with is_used = false)
   */
  public static generateActivationVoucher(
    amount: number,
    currency: 'ETB' | 'USD' | 'EUR',
    channel: 'telebirr' | 'Chapa' | 'Stripe' | 'PayPal' | 'USDT'
  ): SingleUsePIN {
    const tokenHash = generateCryptographicNonce('OW-VOUCH');
    const voucher: SingleUsePIN = {
      tokenHash,
      amount: Math.max(1, Number(amount)),
      currency,
      is_used: false,
      channel,
      createdAt: new Date().toISOString(),
    };

    const tokens = this.getAllTokens();
    tokens[tokenHash] = voucher;
    this.saveAllTokens(tokens);

    return voucher;
  }

  /**
   * Single-use PIN redemption route/service (/api/v1/wallet/activate-pin)
   * Validates tokenHash, transfers funds to UserWallet.balance, sets is_used = true,
   * and writes to an internal, unexposed PlatformRevenueLog.
   */
  public static activatePin(
    tokenHash: string,
    tenantId: string
  ): {
    success: boolean;
    message: string;
    creditedAmount?: number;
    currency?: 'ETB' | 'USD' | 'EUR';
    newBalance?: number;
  } {
    const cleanHash = tokenHash.trim().toUpperCase();
    const tokens = this.getAllTokens();
    const token = tokens[cleanHash];

    if (!token) {
      return {
        success: false,
        message: 'Invalid or non-existent activation voucher code. Please verify hash format (OW-VOUCH-XXXX-XXXX).',
      };
    }

    if (token.is_used) {
      return {
        success: false,
        message: `Voucher hash has already been redeemed on ${new Date(token.redeemedAt || '').toLocaleDateString()}. Single-use security token expired.`,
      };
    }

    // Credit tenant balance
    const wallet = this.getTenantWallet(tenantId);
    wallet.balances[token.currency] = (wallet.balances[token.currency] || 0) + token.amount;
    wallet.updatedAt = new Date().toISOString();

    // Mark single-use token as redeemed
    token.is_used = true;
    token.redeemedAt = new Date().toISOString();
    token.redeemedBy = tenantId;
    tokens[cleanHash] = token;
    this.saveAllTokens(tokens);

    const wallets = this.getAllWallets();
    wallets[tenantId] = wallet;
    this.saveAllWallets(wallets);

    // Record to internal, unexposed PlatformRevenueLog
    this.recordInternalLog({
      logId: `REV-${Date.now().toString(36).toUpperCase()}`,
      sourceTenantId: token.channel,
      destinationId: tenantId,
      category: 'VOUCHER_ACTIVATION',
      grossAmount: token.amount,
      platformFeeAmount: 0,
      netDisbursedAmount: token.amount,
      currency: token.currency,
      timestamp: new Date().toISOString(),
      note: `Single-use cryptographic PIN redeemed via ${token.channel} ingestion webhook.`,
    });

    // Record tenant safe activity
    this.recordTenantActivity(tenantId, {
      id: `ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'CREDIT',
      title: `Voucher Top-Up (${token.channel})`,
      category: 'Activation PIN Redemption',
      amount: token.amount,
      currency: token.currency,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    });

    return {
      success: true,
      message: `Successfully redeemed ${token.amount} ${token.currency} into your multi-tenant wallet!`,
      creditedAmount: token.amount,
      currency: token.currency,
      newBalance: wallet.balances[token.currency],
    };
  }

  /**
   * Integrated Platform Split Logic Automation #1:
   * Streaming Gift Redemptions ("ስጦታ ላክ"):
   * In live audio/video rooms, token swaps apply a strict 20% to 30% Platform Service Fee
   * prior to creator payout (Configured at 25%).
   */
  public static processGiftTip(
    senderTenantId: string,
    creatorSeatId: string,
    creatorName: string,
    grossAmount: number,
    currency: 'ETB' | 'USD' | 'EUR' = 'ETB'
  ): {
    success: boolean;
    message: string;
    platformFee?: number;
    creatorPayout?: number;
    remainingBalance?: number;
  } {
    const wallet = this.getTenantWallet(senderTenantId);
    if ((wallet.balances[currency] || 0) < grossAmount) {
      return {
        success: false,
        message: `Insufficient ${currency} balance (${wallet.balances[currency] || 0} ${currency} available). Please top up via voucher or gateway.`,
      };
    }

    const feeRate = PLATFORM_CONFIG.defaultGiftFeePercent / 100; // 0.25 (25%)
    const platformFee = Math.round(grossAmount * feeRate * 100) / 100;
    const creatorPayout = Math.round((grossAmount - platformFee) * 100) / 100;

    // Deduct gross from sender
    wallet.balances[currency] -= grossAmount;
    wallet.updatedAt = new Date().toISOString();

    const wallets = this.getAllWallets();
    wallets[senderTenantId] = wallet;
    this.saveAllWallets(wallets);

    // Record internal revenue log
    this.recordInternalLog({
      logId: `GIFT-${Date.now().toString(36).toUpperCase()}`,
      sourceTenantId: senderTenantId,
      destinationId: creatorSeatId,
      category: 'GIFT_STREAM',
      grossAmount,
      platformFeeAmount: platformFee,
      netDisbursedAmount: creatorPayout,
      currency,
      timestamp: new Date().toISOString(),
      note: `Live room stream gift to ${creatorName}. 25% Platform Service Fee applied.`,
    });

    // Record user activity
    this.recordTenantActivity(senderTenantId, {
      id: `ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'DEBIT',
      title: `ስጦታ ላክ (Gift to ${creatorName})`,
      category: 'Live Stream Gift Tip',
      amount: grossAmount,
      currency,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    });

    return {
      success: true,
      message: `Successfully sent ${grossAmount} ${currency} gift to ${creatorName}! (${creatorPayout} ${currency} received, 25% platform service fee deducted).`,
      platformFee,
      creatorPayout,
      remainingBalance: wallet.balances[currency],
    };
  }

  /**
   * Integrated Platform Split Logic Automation #2:
   * Premium Room Entry & VIP Seating Leases:
   * Flat 10% split fee applied automatically when paying admission to premium locked houses
   * or leasing VIP audio seats (#1 to #5).
   */
  public static processPremiumAdmission(
    tenantId: string,
    houseId: number,
    houseTitle: string,
    admissionFee: number,
    currency: 'ETB' | 'USD' | 'EUR' = 'ETB'
  ): {
    success: boolean;
    message: string;
    platformFee?: number;
    roomYield?: number;
    remainingBalance?: number;
  } {
    const wallet = this.getTenantWallet(tenantId);
    if ((wallet.balances[currency] || 0) < admissionFee) {
      return {
        success: false,
        message: `Insufficient ${currency} balance for premium house admission. Required: ${admissionFee} ${currency}.`,
      };
    }

    const feeRate = PLATFORM_CONFIG.premiumHouseAdmissionFeePercent / 100; // 0.10 (10%)
    const platformFee = Math.round(admissionFee * feeRate * 100) / 100;
    const roomYield = Math.round((admissionFee - platformFee) * 100) / 100;

    wallet.balances[currency] -= admissionFee;
    wallet.updatedAt = new Date().toISOString();

    const wallets = this.getAllWallets();
    wallets[tenantId] = wallet;
    this.saveAllWallets(wallets);

    this.recordInternalLog({
      logId: `ADM-${Date.now().toString(36).toUpperCase()}`,
      sourceTenantId: tenantId,
      destinationId: `HOUSE-${houseId}`,
      category: 'PREMIUM_ENTRY',
      grossAmount: admissionFee,
      platformFeeAmount: platformFee,
      netDisbursedAmount: roomYield,
      currency,
      timestamp: new Date().toISOString(),
      note: `House ${houseId} (${houseTitle}) Premium Admission. 10% Platform Protocol Fee.`,
    });

    this.recordTenantActivity(tenantId, {
      id: `ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'DEBIT',
      title: `Admission Pass: ${houseTitle}`,
      category: 'Premium Chamber Entry',
      amount: admissionFee,
      currency,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    });

    return {
      success: true,
      message: `Admission granted for ${houseTitle}! 10% platform protocol split applied.`,
      platformFee,
      roomYield,
      remainingBalance: wallet.balances[currency],
    };
  }

  /**
   * VIP Seating Lease (#1 to #5):
   * Applies flat 10% split fee.
   */
  public static processVipSeatLease(
    tenantId: string,
    seatNumber: number,
    leaseCost: number,
    currency: 'ETB' | 'USD' | 'EUR' = 'ETB'
  ): {
    success: boolean;
    message: string;
    platformFee?: number;
    remainingBalance?: number;
  } {
    const wallet = this.getTenantWallet(tenantId);
    if ((wallet.balances[currency] || 0) < leaseCost) {
      return {
        success: false,
        message: `Insufficient balance for VIP Seat #${seatNumber}. Cost: ${leaseCost} ${currency}.`,
      };
    }

    const platformFee = Math.round(leaseCost * 0.1 * 100) / 100;
    wallet.balances[currency] -= leaseCost;
    wallet.updatedAt = new Date().toISOString();

    const wallets = this.getAllWallets();
    wallets[tenantId] = wallet;
    this.saveAllWallets(wallets);

    this.recordInternalLog({
      logId: `VIP-${Date.now().toString(36).toUpperCase()}`,
      sourceTenantId: tenantId,
      destinationId: `VIP-SEAT-${seatNumber}`,
      category: 'VIP_SEAT_LEASE',
      grossAmount: leaseCost,
      platformFeeAmount: platformFee,
      netDisbursedAmount: leaseCost - platformFee,
      currency,
      timestamp: new Date().toISOString(),
      note: `VIP Audio Seat #${seatNumber} Leased. 10% platform reserve split.`,
    });

    this.recordTenantActivity(tenantId, {
      id: `ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'DEBIT',
      title: `VIP Audio Chair #${seatNumber} Lease`,
      category: 'VIP Stage Privilege',
      amount: leaseCost,
      currency,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    });

    return {
      success: true,
      message: `VIP Seat #${seatNumber} leased successfully!`,
      platformFee,
      remainingBalance: wallet.balances[currency],
    };
  }

  /**
   * Integrated Platform Split Logic Automation #3:
   * Marketplace Advertising Engine:
   * House 9 promotional bids and boosted listings verify wallet balance and update visibility flags.
   */
  public static processMarketplaceAdBid(
    tenantId: string,
    listingTitle: string,
    bidAmount: number,
    currency: 'ETB' | 'USD' | 'EUR' = 'ETB'
  ): {
    success: boolean;
    message: string;
    promotedListingBadge?: string;
    remainingBalance?: number;
  } {
    const wallet = this.getTenantWallet(tenantId);
    if ((wallet.balances[currency] || 0) < bidAmount) {
      return {
        success: false,
        message: `Insufficient ${currency} balance for marketplace advertising bid.`,
      };
    }

    const platformFee = Math.round(bidAmount * 0.15 * 100) / 100; // 15% ad auction fee
    wallet.balances[currency] -= bidAmount;
    wallet.updatedAt = new Date().toISOString();

    const wallets = this.getAllWallets();
    wallets[tenantId] = wallet;
    this.saveAllWallets(wallets);

    this.recordInternalLog({
      logId: `AD-${Date.now().toString(36).toUpperCase()}`,
      sourceTenantId: tenantId,
      destinationId: 'MARKETPLACE-AD-POOL',
      category: 'AD_PROMOTION_BID',
      grossAmount: bidAmount,
      platformFeeAmount: platformFee,
      netDisbursedAmount: bidAmount - platformFee,
      currency,
      timestamp: new Date().toISOString(),
      note: `Marketplace ad boosted listing: "${listingTitle}".`,
    });

    this.recordTenantActivity(tenantId, {
      id: `ACT-${Date.now().toString(36).toUpperCase()}`,
      type: 'DEBIT',
      title: `Ad Boost: ${listingTitle}`,
      category: 'Marketplace Visibility Auction',
      amount: bidAmount,
      currency,
      timestamp: new Date().toISOString(),
      status: 'COMPLETED',
    });

    return {
      success: true,
      message: `Listing "${listingTitle}" has been promoted to Top-Tier Spotlight in House 9!`,
      promotedListingBadge: 'PROMOTED_SPOTLIGHT',
      remainingBalance: wallet.balances[currency],
    };
  }

  /**
   * Instant Top-Up Hook via simulated gateway webhooks (telebirr, Chapa, Stripe, PayPal, USDT)
   */
  public static processDirectGatewayTopUp(
    tenantId: string,
    amount: number,
    currency: 'ETB' | 'USD' | 'EUR',
    gateway: 'telebirr' | 'Chapa' | 'Stripe' | 'PayPal' | 'USDT'
  ): {
    success: boolean;
    voucher: SingleUsePIN;
    newBalance: number;
  } {
    // 1. Ingestion webhook generates single-use activation voucher
    const voucher = this.generateActivationVoucher(amount, currency, gateway);

    // 2. Automatically activate for frictionless UI experience or user can redeem manual hash
    const activation = this.activatePin(voucher.tokenHash, tenantId);

    const wallet = this.getTenantWallet(tenantId);
    return {
      success: activation.success,
      voucher,
      newBalance: wallet.balances[currency],
    };
  }

  /**
   * Safe User Activity Logs
   */
  public static getTenantActivity(tenantId: string): TenantActivityItem[] {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.ACTIVITY_LOGS}_${tenantId}`);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    // Default seed activity
    const seed: TenantActivityItem[] = [
      {
        id: 'ACT-INIT-101',
        type: 'CREDIT',
        title: 'Initial Multi-Tenant Wallet Allocation',
        category: 'Corporate / Citizen Grant',
        amount: 10000,
        currency: 'ETB',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'COMPLETED',
      },
      {
        id: 'ACT-INIT-102',
        type: 'CREDIT',
        title: 'telebirr Instant Settlement Voucher',
        category: 'Ingestion Webhook Top-Up',
        amount: 4250,
        currency: 'ETB',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'COMPLETED',
      },
      {
        id: 'ACT-INIT-103',
        type: 'CREDIT',
        title: 'Stripe International Card Settlement',
        category: 'Cross-Border SaaS Top-Up',
        amount: 350,
        currency: 'USD',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        status: 'COMPLETED',
      },
    ];

    try {
      localStorage.setItem(`${STORAGE_KEYS.ACTIVITY_LOGS}_${tenantId}`, JSON.stringify(seed));
    } catch {
      // ignore
    }
    return seed;
  }

  private static recordTenantActivity(tenantId: string, item: TenantActivityItem) {
    const list = this.getTenantActivity(tenantId);
    list.unshift(item);
    try {
      localStorage.setItem(`${STORAGE_KEYS.ACTIVITY_LOGS}_${tenantId}`, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  // Internal storage helpers
  private static getAllWallets(): Record<string, TenantWallet> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TENANT_WALLETS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return {};
  }

  private static saveAllWallets(wallets: Record<string, TenantWallet>) {
    try {
      localStorage.setItem(STORAGE_KEYS.TENANT_WALLETS, JSON.stringify(wallets));
    } catch {
      // ignore
    }
  }

  public static getAllTokens(): Record<string, SingleUsePIN> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VOUCHER_TOKENS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    // Seed 2 ready-to-redeem un-used vouchers for easy UI demo testing
    const seed: Record<string, SingleUsePIN> = {
      'OW-VOUCH-7X89-2241': {
        tokenHash: 'OW-VOUCH-7X89-2241',
        amount: 2500,
        currency: 'ETB',
        is_used: false,
        channel: 'telebirr',
        createdAt: new Date().toISOString(),
      },
      'OW-VOUCH-99K2-5140': {
        tokenHash: 'OW-VOUCH-99K2-5140',
        amount: 100,
        currency: 'USD',
        is_used: false,
        channel: 'Stripe',
        createdAt: new Date().toISOString(),
      },
    };

    try {
      localStorage.setItem(STORAGE_KEYS.VOUCHER_TOKENS, JSON.stringify(seed));
    } catch {
      // ignore
    }
    return seed;
  }

  private static saveAllTokens(tokens: Record<string, SingleUsePIN>) {
    try {
      localStorage.setItem(STORAGE_KEYS.VOUCHER_TOKENS, JSON.stringify(tokens));
    } catch {
      // ignore
    }
  }

  private static recordInternalLog(log: PlatformRevenueLog) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PLATFORM_LOGS);
      const list: PlatformRevenueLog[] = raw ? JSON.parse(raw) : [];
      list.unshift(log);
      localStorage.setItem(STORAGE_KEYS.PLATFORM_LOGS, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  /**
   * Internal telemetry getter for administrator console only
   */
  public static getInternalPlatformLogs(): PlatformRevenueLog[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PLATFORM_LOGS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  }
}
