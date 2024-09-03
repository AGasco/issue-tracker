import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import IssueActions from './IssueActions';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
];

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderDirection = searchParams.orderBy?.includes('-') ? 'desc' : 'asc';
  const orderParam = searchParams.orderBy?.replace('-', '');
  const orderBy = columns
    .map((column) => column.value)
    .includes(orderParam as keyof Issue)
    ? { [orderParam]: orderDirection }
    : undefined;

  const issues = await prisma.issue.findMany({ where: { status }, orderBy });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => {
              const orderBySameColumn = orderParam === col.value;
              const newSortOrder =
                orderBySameColumn && orderDirection === 'asc'
                  ? `-${col.value}`
                  : col.value;

              return (
                <Table.ColumnHeaderCell
                  key={col.value}
                  className={col.className}
                >
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: newSortOrder }
                    }}
                  >
                    {col.label}
                  </NextLink>
                  {col.value === orderParam && orderDirection === 'asc' && (
                    <ArrowUpIcon className="inline" />
                  )}
                  {col.value === orderParam && orderDirection === 'desc' && (
                    <ArrowDownIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
