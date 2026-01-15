import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Grid, GridItem } from "../grid";

function FormSkeleton() {
  return (
    <Grid>
      {/* Journey textarea */}
      <GridItem>
        <Skeleton className="h-35 rounded-md" />
      </GridItem>

      {/* Address Line 1 */}
      <GridItem className="col-span-12 lg:col-span-6">
        <Skeleton className="h-12 rounded-md" />
      </GridItem>

      {/* Address Line 2 */}
      <GridItem className="col-span-12 lg:col-span-6">
        <Skeleton className="h-12 rounded-md" />
      </GridItem>

      {/* City */}
      <GridItem className="col-span-12 md:col-span-4">
        <Skeleton className="h-12 rounded-md" />
      </GridItem>

      {/* State */}
      <GridItem className="col-span-12 md:col-span-4">
        <Skeleton className="h-12 rounded-md" />
      </GridItem>

      {/* Zip Code */}
      <GridItem className="col-span-12 md:col-span-4">
        <Skeleton className="h-12 rounded-md" />
      </GridItem>

      {/* Privacy Settings title */}
      <GridItem>
        <Skeleton className="h-4 w-40 mb-2" />
      </GridItem>

      {/* Privacy checkboxes */}
      <GridItem>
        <Skeleton className="h-5 w-full mb-2" />
      </GridItem>
      <GridItem>
        <Skeleton className="h-5 w-full mb-2" />
      </GridItem>
      <GridItem>
        <Skeleton className="h-5 w-full" />
      </GridItem>

      {/* Terms title */}
      <GridItem>
        <Skeleton className="h-4 w-56 mb-2 mt-4" />
      </GridItem>

      {/* Terms checkbox */}
      <GridItem>
        <Skeleton className="h-10 w-full" />
      </GridItem>

      {/* Divider */}
      <GridItem className="my-4">
        <Skeleton className="h-px w-full" />
      </GridItem>

      {/* Footer buttons */}
      <GridItem>
        <div className="flex justify-between gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </GridItem>
    </Grid>
  );
}

export default FormSkeleton;
