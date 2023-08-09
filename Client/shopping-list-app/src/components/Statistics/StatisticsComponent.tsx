"use client";

import { useStatistics } from "@/app/hooks";
import { Card, Title, Flex, Bold, BarList, Text, Grid, Col, AreaChart } from "@tremor/react";

export function StatisticsComponent() {
  
  const { dataItemsToStatistics, dataCategoriesToStatistics, dataListsByCreationDate } = useStatistics()

  return (
    <section className="relative flex flex-col min-h-screen pl-32 pr-24 pt-16">
      <div className="w-full overflow-auto max-h-[calc(100vh-120px)] ScrollCards pr-4">
        <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-10">
          <Col numColSpan={2} numColSpanLg={1}>
            <Card className="w-full">
              <Title>Top Items</Title>
              <Flex className="mt-4">
                <Text>
                  <Bold>Name</Bold>
                </Text>
                <Text>
                  <Bold>Amounts</Bold>
                </Text>
              </Flex>
              <BarList data={dataItemsToStatistics} className="mt-2" />
            </Card>
          </Col>
          <Col numColSpan={2} numColSpanLg={1}>
          <Card className="w-full">
              <Title>Top Categories</Title>
              <Flex className="mt-4">
                <Text>
                  <Bold>Name</Bold>
                </Text>
                <Text>
                  <Bold>Amounts</Bold>
                </Text>
              </Flex>
              <BarList data={dataCategoriesToStatistics} className="mt-2" />
            </Card>
          </Col>
          <Col numColSpan={2} numColSpanSm={2} numColSpanMd={2} numColSpanLg={2}>
          <Card>
            <Title>Monthly Summary</Title>
            <AreaChart
              className="h-72 mt-4"
              data={dataListsByCreationDate}
              index="date"
              categories={["amount"]}
              colors={["indigo", "cyan"]}
            />
            </Card>
          </Col>
        </Grid>
      </div>
    </section>
  );
}
