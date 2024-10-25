import React from 'react';
import { Trash2, Car, Hotel, Plane } from 'lucide-react';
import Table from '../components/dashboard/Table';  // Assuming Table component is in the same directory
import UserLayout from '@/Layout/UserLayout';

const Transaction = () => {
  // Dummy transaction data
  const transactions = [
    {
      id: 1,
      name: "Uber Ride to Airport",
      amount: 45.50,
      date: "2024-10-24",
      type: "uber",
      status: "completed"
    },
    {
      id: 2,
      name: "Marriott Hotel Booking",
      amount: 299.99,
      date: "2024-10-25",
      type: "hotel",
      status: "pending"
    },
    {
      id: 3,
      name: "Flight to New York",
      amount: 450.00,
      date: "2024-10-26",
      type: "plane",
      status: "completed"
    },
    {
      id: 4,
      name: "Uber Ride Downtown",
      amount: 28.75,
      date: "2024-10-26",
      type: "uber",
      status: "pending"
    },
    {
      id: 5,
      name: "Hilton Stay",
      amount: 389.99,
      date: "2024-10-27",
      type: "hotel",
      status: "completed"
    }
  ];

  // Type icons mapping
  const typeIcons = {
    uber: <Car className="h-5 w-5 text-black" />,
    hotel: <Hotel className="h-5 w-5 text-blue-600" />,
    plane: <Plane className="h-5 w-5 text-green-600" />
  };

  // Table columns configuration
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      minWidth: 200
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({ value }) => (
        <span className="font-medium">
          ${value.toFixed(2)}
        </span>
      ),
      minWidth: 120
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }) => {
        const formattedDate = new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        return <span>{formattedDate}</span>;
      },
      minWidth: 120
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ value }) => (
        <div className="flex items-center gap-2">
          {typeIcons[value]}
          <span className="capitalize">{value}</span>
        </div>
      ),
      minWidth: 120
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${value === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value}
        </span>
      ),
      minWidth: 120
    }
  ];

  // Filter options
  const filters = [
    {
      name: 'type',
      label: 'Type',
      options: [
        { value: 'uber', label: 'Uber' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'plane', label: 'Plane' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ];

  // Action handlers
  const handleDelete = (row) => {
    console.log('Delete transaction:', row);
    // Add your delete logic here
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    // Add your refresh logic here
  };

  // Table actions
  const actions = [
    {
      type: 'delete',
      icon: <Trash2 className="h-4 w-4" />,
      label: 'Delete Transaction',
      onClick: handleDelete
    }
  ];

  return (
    <UserLayout>
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track your transactions across different services
        </p>
      </div>
      
      <div className="h-[calc(100vh-200px)]">
        <Table
          columns={columns}
          data={transactions}
          actions={actions}
          filters={filters}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
    </UserLayout>
  );
};

export default Transaction;