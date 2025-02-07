import type React from "react";

import Box from "@mui/material/Box";


import styles from "./style.module.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className={styles.layout}>
			{/* ヘッダー */}
			<div className={styles.header}>
				<Header />
			</div>
			{/* メイン */}
			<div className={styles.main}>
				<Box height="100%" pt={2} px={2}>
					{children}
				</Box>
			</div>
			{/* フッター */}
			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
	);
}
