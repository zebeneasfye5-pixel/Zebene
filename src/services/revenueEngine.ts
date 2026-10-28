import { RevenueSplitResult } from '../types';
import { getMaskedFounderAccount, FOUNDER_NAME, VAULT_TOKENS } from './secureConfig';

export const ZEBENE_ASFAYE_ACCOUNT_META = {
  accountName: FOUNDER_NAME,
  cbeAccountNumber: getMaskedFounderAccount(false),
  developerCommissionId: 'ZA-SOVEREIGN-SETTLEMENT-VAULT',
  bankRouting: 'Commercial Bank of Ethiopia (CBE) / Swift: CBETETAA [Secured Gateway]',
  accountTier: 'Principal Architect & Founder Direct Settlement Vault',
  establishedYear: 2026,
  getAccountNumber: (isAdmin: boolean = false) => getMaskedFounderAccount(isAdmin),
};

const STORAGE_KEY_LEDGER = 'oneworld_financial_ledger_2026';

export class RevenueEngine {
  /**
   * Automated Revenue Split Ledger Algorithm:
   * 80% to User's Wallet (Creators, Speakers, Hosts, Citizen Participants)
   * 10% to Bank Savings Yield (Secure reserve & liquidity escrow)
   * 10% Developer Commission seamlessly routed to the platform founder:
   *     Zebene Asfaye (ዘበነ አስፍዬ), Sovereign Settlement Vault
   */
  public static calculateSplit(
    grossAmount: number,
    currency: 'ETB' | 'USD',
    gateway: 'Chapa' | 'CBE' | 'Stripe' | 'PayPal',
    houseId: number,
    donorName: string = 'Verified Citizen',
    purpose: string = 'House Discussion Contribution'
  ): RevenueSplitResult {
    const safeAmount = Math.max(0, Number(grossAmount) || 0);

    const userEarnings = Number((safeAmount * 0.80).toFixed(2));
    const bankSavings = Number((safeAmount * 0.10).toFixed(2));
    // Remaining balance guarantees exact checksum equal to grossAmount
    const devCommission = Number((safeAmount - userEarnings - bankSavings).toFixed(2));

    const transactionId = `TXN-${gateway.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result: RevenueSplitResult = {
      grossAmount: safeAmount,
      currency,
      userEarnings,
      bankSavings,
      devCommission,
      paymentGateway: gateway,
      transactionId,
      timestamp: new Date().toISOString(),
      houseId,
      donorName,
      purpose,
    };

    this.recordTransaction(result);
    return result;
  }

  public static getLedger(): RevenueSplitResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LEDGER);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }

    // Seed realistic historic transactions based on the 80% / 10% / 10% model
    const seed: RevenueSplitResult[] = [
      {
        grossAmount: 5000,
        currency: 'ETB',
        userEarnings: 4000,
        bankSavings: 500,
        devCommission: 500,
        paymentGateway: 'Chapa',
        transactionId: 'TXN-CHAPA-M78B-4192',
        timestamp: '2026-10-27T10:14:00Z',
        houseId: 1,
        donorName: 'Abebe Bikila Heritage Guild',
        purpose: 'House 1 Universal Onboarding Pool',
      },
      {
        grossAmount: 15000,
        currency: 'ETB',
        userEarnings: 12000,
        bankSavings: 1500,
        devCommission: 1500,
        paymentGateway: 'CBE',
        transactionId: 'TXN-CBE-K90P-8841',
        timestamp: '2026-10-27T12:30:00Z',
        houseId: 5,
        donorName: 'Virtual Wedding Registry Gift',
        purpose: 'Civil Registry & Marriage Ceremony Fee',
      },
      {
        grossAmount: 300,
        currency: 'USD',
        userEarnings: 240,
        bankSavings: 30,
        devCommission: 30,
        paymentGateway: 'Stripe',
        transactionId: 'TXN-STRIPE-W22X-6503',
        timestamp: '2026-10-27T14:45:00Z',
        houseId: 8,
        donorName: 'Global Talent Judge Sponsor',
        purpose: 'Talent Showcase Prize Pool',
      },
      {
        grossAmount: 200,
        currency: 'USD',
        userEarnings: 160,
        bankSavings: 20,
        devCommission: 20,
        paymentGateway: 'PayPal',
        transactionId: 'TXN-PAYPAL-Q55Y-9102',
        timestamp: '2026-10-27T15:20:00Z',
        houseId: 14,
        donorName: 'Diaspora Arbitration Filing',
        purpose: 'Arbitration Case Archive Registration',
      },
    ];

    try {
      localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(seed));
    } catch {
      // ignore
    }
    return seed;
  }

  public static recordTransaction(txn: RevenueSplitResult) {
    try {
      const current = this.getLedger();
      current.unshift(txn);
      localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(current));
    } catch {
      // ignore
    }
  }

  public static getFinancialSummary() {
    const ledger = this.getLedger();
    let totalETB = 0;
    let totalUSD = 0;
    let devCommissionETB = 0;
    let devCommissionUSD = 0;
    let userEarningsETB = 0;
    let userEarningsUSD = 0;
    let bankSavingsETB = 0;
    let bankSavingsUSD = 0;

    for (const item of ledger) {
      if (item.currency === 'ETB') {
        totalETB += item.grossAmount;
        devCommissionETB += item.devCommission;
        userEarningsETB += item.userEarnings;
        bankSavingsETB += item.bankSavings;
      } else {
        totalUSD += item.grossAmount;
        devCommissionUSD += item.devCommission;
        userEarningsUSD += item.userEarnings;
        bankSavingsUSD += item.bankSavings;
      }
    }

    return {
      totalETB,
      totalUSD,
      devCommissionETB,
      devCommissionUSD,
      userEarningsETB,
      userEarningsUSD,
      bankSavingsETB,
      bankSavingsUSD,
      transactionCount: ledger.length,
      founderCbeAccount: ZEBENE_ASFAYE_ACCOUNT_META.cbeAccountNumber,
    };
  }
}
