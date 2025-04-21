// landingpage.tsx
"use client";

import React from 'react';
import styles from './landingpage.module.css';

// Importing placeholder components
import WelcomeCard from '@/components/WelcomeCard';
import TotalPortfolioCard from '@/components/TotalPortfolioCard';
import CashToInvestCard from '@/components/CashToInvestCard';
import GettingStartedCard from '@/components/GettingStartedCard';
import TipsTricksCard from '@/components/TipsTricksCard';
import PortfolioHealthCard from '@/components/PortfolioHealthCard';
import MedicationProgressCard from '@/components/MedicationProgressCard';
import AssetSearchCard from '@/components/AssetSearchCard';
import PortfolioSettingsCard from '@/components/PortfolioSettingsCard';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Column 1 */}
      <div className={styles.column}>
        <WelcomeCard />
        <TotalPortfolioCard />
        <CashToInvestCard />
        <GettingStartedCard />
        <TipsTricksCard />
      </div>

      {/* Column 2 */}
      <div className={styles.column}>
        <PortfolioHealthCard />
        <MedicationProgressCard />
      </div>

      {/* Column 3 */}
      <div className={styles.column}>
        <AssetSearchCard />
        <PortfolioSettingsCard />
      </div>
    </div>
  );
}
