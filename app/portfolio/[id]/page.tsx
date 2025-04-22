import PortfolioDetailClient from "./PortfolioDetailClient"
import { portfolioIds } from "@/lib/portfolio-data"

// Generate static params for all portfolio items
export function generateStaticParams() {
  return portfolioIds.map((id) => ({ id }))
}

export default function PortfolioDetail({ params }: { params: { id: string } }) {
  return <PortfolioDetailClient params={params} />
}
