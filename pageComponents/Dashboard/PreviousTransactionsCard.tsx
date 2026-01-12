import React from "react";
import { Grid, GridItem } from "@/components/grid";
import { Button } from "@/components/ui/button";
import { TransactionCard } from "./TransactionCard";
import Typography from "@/components/ui/typography";
import CustomTabs from "@/components/shared/CustomTabs";

const donationsDummyData = [
  {
    id: 1,
    giftwell_id: 101,
    user_id: 12,
    title: "Support for Medical Aid",
    donation_method: "credit_card",
    amount: "2500",
    message: "Hope this helps someone in need.",
    status: "completed",
    created_at: "2025-01-05T10:30:00Z",
    updated_at: "2025-01-05T10:30:00Z",
  },
];

const registryItemsDummyData = [
  {
    id: 1,
    giftwell_id: 101,
    product_id: 501,
    registry_product: {
      name: "Baby Diapers Pack",
      brand: "Huggies",
      price: 4200,
      image_url: "https://example.com/images/diapers.jpg",
    },
    quantity: 2,
    order_index: 1,
    priority: "high",
    is_claimed: false,
    status: "listed",
    notes: "Prefer size M or L",
    created_at: "2025-01-05T08:20:00Z",
    updated_at: "2025-01-05T08:20:00Z",
  },
];

function PreviousTransactionsCard() {
  const tabs = [
    {
      value: "all",
      title: "All",
      description: "All your activity in one place",
      content: (
        <div className="space-y-4">
          {registryItemsDummyData.map((item, idx) => (
            <TransactionCard
              key={`purchase-${idx}`}
              type="purchase"
              productName={item.registry_product.name || "Unknown Product"}
              date={item.created_at || ""}
              productLink={item.registry_product.image_url || "#"}
            />
          ))}

          {donationsDummyData?.map((donation, idx) => (
            <TransactionCard
              key={`donation-${idx}`}
              type="donation"
              title={donation.title || ""}
              donorName={"John Doe"}
              amount={donation.amount}
              date={donation.created_at || ""}
              status={donation.status}
              transactionId={donation.id.toString()}
              platformFee={donation.amount}
              netAmount={donation.amount}
            />
          ))}

          {registryItemsDummyData.length === 0 &&
            donationsDummyData?.length === 0 && (
              <Typography className="text-gray-500">
                No support received yet.
              </Typography>
            )}
        </div>
      ),
    },
    {
      value: "purchases",
      title: "Purchases",
      description: "Your past product purchases",
      content: (
        <div className="space-y-4">
          {registryItemsDummyData.length > 0 ? (
            registryItemsDummyData.map((item, idx) => (
              <TransactionCard
                key={`purchase-${idx}`}
                type="purchase"
                productName={item.registry_product.name || "Unknown Product"}
                date={item.created_at || ""}
                productLink={item.registry_product.brand || "#"}
              />
            ))
          ) : (
            <Typography size="sm" className="text-gray-500">
              No gift recieved yet.
            </Typography>
          )}
        </div>
      ),
    },
    {
      value: "donations",
      title: "Donations",
      description: "Your charitable contributions",
      content: (
        <div className="space-y-4">
          {donationsDummyData && donationsDummyData?.length > 0 ? (
            donationsDummyData?.map((donation, idx) => (
              <TransactionCard
                key={`donation-${idx}`}
                type="donation"
                title={donation.title || ""}
                donorName={"John Doe"}
                amount={donation.amount}
                date={donation.created_at}
                status={donation.status}
                transactionId={donation.id.toString()}
                platformFee={donation.amount}
                netAmount={donation.amount}
              />
            ))
          ) : (
            <Typography size="sm" className="text-gray-500">
              No donation recieved yet.
            </Typography>
          )}
        </div>
      ),
    },
  ];
  return (
    <Grid className="bg-white md:mx-6 mx-2 md:p-6 my-4 w-[calc(100vw-6)] overflow-hidden relative p-6 shadow-md rounded-md border organic-bg">
      <GridItem>
        <div className="">
          <CustomTabs
            tabs={tabs}
            defaultValue="all"
            tabStyles="bg-transparent w-full rounded-none pb-0"
          />
        </div>
      </GridItem>
    </Grid>
  );
}

export default PreviousTransactionsCard;
