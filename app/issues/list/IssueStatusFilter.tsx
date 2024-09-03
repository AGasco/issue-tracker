'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const orderBy = searchParams.get('orderBy');

  const applyFilter = (status: Status | 'ALL') => {
    const params = new URLSearchParams();

    if (status != 'ALL') params.append('status', status);
    if (orderBy) params.append('orderBy', orderBy);

    const query = params.size ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
  };

  return (
    <Select.Root defaultValue={status || ''} onValueChange={applyFilter}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
