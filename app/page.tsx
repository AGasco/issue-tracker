import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

export default async function Home() {
  const openIssueCount = await prisma.issue.count({
    where: { status: 'OPEN' }
  });
  const inProgressIssueCount = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' }
  });
  const closedIssueCount = await prisma.issue.count({
    where: { status: 'CLOSED' }
  });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
        <IssueChart
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};
