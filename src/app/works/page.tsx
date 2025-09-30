import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WorksPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">Selected works</h1>
        <p className="text-neutral-400">A selection of projects experimenting with Ethereum’s evolving standards, Web3 infrastructure, embedded wallets, and account abstraction while testing ideas for building scalable Web3 applications.</p>
      </header>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>KAIROS Smart Wallet </CardTitle>
            <CardDescription>
              A modular ERC-4337 account abstraction wallet that extends standard smart accounts with task-based staking, penalties, and automated payout Mechanism.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-neutral-300">
            <ul className="list-disc space-y-1 pl-5">
              <li>Task staking and penalties.</li>
              <li>Automated payouts and delayed reward mechanisms.</li>
              <li>Modular task manager integration.</li>
              <li>Gasless Transactions</li>
              <li>Web2-style onboarding with embedded wallets</li>
            </ul>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button asChild>
              <a href="https://useKairos.xyz" target="_blank" rel="noopener noreferrer">Live project</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/Stoneybro/kairos-frontend" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAUCET FACTORY</CardTitle>
            <CardDescription>
              A modular faucet deployment system that streamlines creating, configuring, and managing token faucets for blockchain projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-neutral-300">
            <ul className="list-disc space-y-1 pl-5">
              <li>Preset faucet policy templates for quick deployment</li>
              <li>Customizable rules for rate limits, eligibility, and access</li>
              <li>Minimal proxy clones for gas-efficient faucet creation</li>
              <li>Upgradeable architecture for long-term flexibility</li>
              <li>SDK integration for seamless developer adoption</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <a href="https://github.com/Stoneybro/faucet-factory" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
