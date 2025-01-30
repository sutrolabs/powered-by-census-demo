import Head from "next/head"
import { Line } from "react-chartjs-2"

import { Anchor } from "@components/Anchor"
import Button from "@components/Button"
import Card from "@components/Card"
import Header from "@components/Structural/Header/Header"

export default function Index() {
  return (
    <>
      <Head>
        <title>Census Embedded Demo App</title>
      </Head>
      <Header title="Dashboard" />
      <div className="flex h-full flex-col gap-8 overflow-y-auto px-8 py-6">
        <p className=" mx-auto w-full max-w-[1200px] text-neutral-500 ">
          Unlock the full potential of your business with comprehensive data on consumer trends, retailers,
          industry reports, and more.
        </p>
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <h3 className="font-medium text-neutral-800">Trend Datasets</h3>
            <ul className="ml-6 flex grow list-disc flex-col gap-1 text-sm text-neutral-600">
              <li>
                <Anchor href="/">Market Trends</Anchor> updated 1 day ago
              </li>
              <li>
                <Anchor href="/">Seasonal trends</Anchor> updated 2 week ago
              </li>
              <li>
                <Anchor href="/">Competitive Analysis</Anchor> updated 1 month ago
              </li>
            </ul>
            <Button>
              <i className="fa-solid fa-search mr-2" />
              Explore Trends
            </Button>
          </Card>
          <Card className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h3 className="font-medium text-neutral-800">Retailer Highlights</h3>
              <span className="text-sm text-neutral-500">1 / 12</span>
            </div>
            <ul className="ml-2 flex grow flex-col text-sm text-neutral-600">
              <ol>
                <span>Name:</span> <span className="font-medium text-neutral-800">Healthways</span>
              </ol>
              <ol>
                <span>Type:</span> Grocery chain
              </ol>
              <ol>
                <span>Location:</span> UK
              </ol>
              <ol>
                <span>Annual revenue:</span> $2.1M
              </ol>
              <ol>
                <span>Contacts:</span> 4
              </ol>
            </ul>
            <div className="flex flex-row items-center gap-3">
              <Button>
                <i className="fa-solid fa-chevron-left" />
              </Button>

              <Button>
                <i className="fa-solid fa-chevron-right" />
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col gap-3">
            <h3 className="font-medium text-neutral-800">Industry Reports</h3>
            <ul className="ml-6 flex grow list-disc flex-col gap-1 text-sm text-neutral-600">
              <li>
                <Anchor href="/">Global IT Services Market Report</Anchor> updated 1 week ago
              </li>
              <li>
                <Anchor href="/">Canada Market Report</Anchor> updated 3 week ago
              </li>
              <li>
                <Anchor href="/">Renewable Energy Market Report</Anchor> updated 2 months ago
              </li>
            </ul>
            <Button>
              <i className="fa-solid fa-search mr-2" />
              Explore Retailers
            </Button>
          </Card>
          <Card className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h3 className="font-medium text-neutral-800">Trend Highlights</h3>
              <span className="text-sm text-neutral-500">1 / 12</span>
            </div>
            <div className="-mb-3 text-sm text-neutral-800 underline">
              Average Global Price of Oil ($/bbl)
            </div>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Oil Prices",
                    data: [75.9, 78.0, 82.2, 89.0, 83.4, 83.7],
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                plugins: {
                  tooltip: {
                    enabled: true,
                    mode: "index",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
              }}
            />
            <div className="flex flex-row items-center gap-3">
              <Button>
                <i className="fa-solid fa-chevron-left" />
              </Button>
              <Button>
                <i className="fa-solid fa-chevron-right" />
              </Button>
            </div>
          </Card>
          <Card className="flex animate-[wiggle] flex-col items-center gap-3 lg:col-span-2">
            <h3 className="font-medium">Integrations</h3>
            <p>Did you know you can connect this data directly to your CRM and ad platforms?</p>
            <Button
              solid
              onClick={() => (window.location.href = "/integrations")}
              emphasize
              className="w-1/3"
            >
              <i className="fa-solid fa-rocket-launch text-sm" />
              Get started
            </Button>
          </Card>
        </div>
      </div>
    </>
  )
}
