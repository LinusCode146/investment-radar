import InvestmentMap from "@/components/InvestmentMap";
import InvestmentsFinished from "@/components/InvestmentsFinished";
import styles from "@/components/Navigation.module.css";
import React from "react";


export default function Home() {
  return <div>

    <InvestmentMap />
    <InvestmentsFinished />
  </div>;
}
