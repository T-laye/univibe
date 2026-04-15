"use client";

import Features from "../components/landing/Features";
import { Footer } from "../components/landing/footer";
import ForHost from "../components/landing/ForHost";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import How from "../components/landing/How";
import ReadyCta from "../components/landing/ReadyCta";
import Trust from "../components/landing/Trust";

export default function Home() {
	return (
		<main>
			<Header />
			<Hero />
			<Features />
			<How />
			<ForHost />
			<Trust />
			<ReadyCta />
      <Footer />
		</main>
	);
}
