import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Grid, GridItem } from "../grid";

function FormSkeleton() {
  return (
    <Grid>
      <GridItem>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem size={4}>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem size={4}>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem size={4}>
        <Skeleton className="h-10" />
      </GridItem>
      <GridItem>
        <Skeleton className="h-10" />
      </GridItem>
    </Grid>
  );
}

export default FormSkeleton;
