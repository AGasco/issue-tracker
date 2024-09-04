import { IssueStatusBadge, Link } from '@/app/components';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
];

export const columnNames = columns.map((column) => column.value);

export interface IssueQuery {
  page: string;
  status: Status;
  orderBy: keyof Issue;
}

interface Props {
  searchParams: IssueQuery;
  orderByParams: {
    orderParam: keyof Issue;
    orderDirection: 'asc' | 'desc';
  };
  issues: Issue[];
}

const IssueTable = ({
  searchParams,
  orderByParams: { orderParam, orderDirection },
  issues
}: Props) => {
  return (
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
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
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
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
