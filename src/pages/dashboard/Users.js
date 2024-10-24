import Breadcrumb from '@/components/dashboard/Breadcrumb'
import Navbar from '@/components/dashboard/Navbar'
import DashboardLayout from '@/Layout/DashboardLayout'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Badge, Avatar, AvatarImage, AvatarFallback } from "../../components/dashboard/CustomUiComponents";
import GenericTable from '../../components/dashboard/Table';

const UserTable = () => {
  // Dummy data
  const dummyUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      gender: 'male',
      DOB: '1990-05-15',
      active: true,
      cardDetail: true,
      createdAt: '2024-01-15T08:30:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'customer',
      gender: 'female',
      DOB: '1988-09-23',
      active: true,
      cardDetail: true,
      createdAt: '2024-02-01T14:20:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      role: 'customer',
      gender: 'male',
      DOB: '1995-03-10',
      active: false,
      cardDetail: false,
      createdAt: '2024-02-15T11:45:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      role: 'customer',
      gender: 'female',
      DOB: '1992-11-28',
      active: true,
      cardDetail: false,
      createdAt: '2024-03-01T09:15:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.b@example.com',
      role: 'admin',
      gender: 'male',
      DOB: '1985-07-19',
      active: true,
      cardDetail: true,
      createdAt: '2024-03-10T16:30:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'customer',
      gender: 'female',
      DOB: '1993-12-05',
      active: false,
      cardDetail: true,
      createdAt: '2024-03-15T13:20:00',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    }
  ];

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Column definitions based on your mongoose schema
  const columns = [
    {
      Header: 'User',
      accessor: 'name',
      Cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback>{row.original.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.original.name}</span>
            <span className="text-xs text-gray-500">{row.original.email}</span>
          </div>
        </div>
      )
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => (
        <Badge variant={value === 'admin' ? 'destructive' : 'default'}>
          {value}
        </Badge>
      )
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      Cell: ({ value }) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'
    },
    {
      Header: 'Date of Birth',
      accessor: 'DOB',
      Cell: ({ value }) => value ? format(new Date(value), 'MMM dd, yyyy') : '-'
    },
    {
      Header: 'Status',
      accessor: 'active',
      Cell: ({ value }) => (
        <Badge variant={value ? 'success' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      Header: 'Card Details',
      accessor: 'cardDetail',
      Cell: ({ value }) => (
        <Badge variant={value ? 'success' : 'secondary'}>
          {value ? 'Added' : 'Not Added'}
        </Badge>
      )
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => format(new Date(value), 'MMM dd, yyyy HH:mm')
    }
  ];

  const filters = [
    {
      name: 'role',
      label: 'Role',
      options: [
        { value: 'customer', label: 'Customer' },
        { value: 'admin', label: 'Admin' }
      ]
    },
    {
      name: 'active',
      label: 'Status',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ]
    },
    {
      name: 'gender',
      label: 'Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'cardDetail',
      label: 'Card Status',
      options: [
        { value: 'true', label: 'Added' },
        { value: 'false', label: 'Not Added' }
      ]
    }
  ];

  // Modified fetchUsers to use dummy data
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(dummyUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = async (user) => {
    console.log('Delete user:', user);
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <DashboardLayout>
      <Navbar/>
      <div className='px-2 md:px-8 mt-32'>
        <Breadcrumb pageName="Users"/>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">User Management</h1>
        <GenericTable
          columns={columns}
          data={users}
          filters={filters}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserTable;