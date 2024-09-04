import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderDirection = searchParams.orderBy?.includes('-') ? 'desc' : 'asc';
  const orderParam = searchParams.orderBy?.replace('-', '') as keyof Issue;
  const orderBy = columnNames.includes(orderParam as keyof Issue)
    ? { [orderParam]: orderDirection }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where: { status }
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable
        searchParams={searchParams}
        orderByParams={{ orderParam, orderDirection }}
        issues={issues}
      />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;
