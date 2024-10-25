
import LeftSidebar from '@/components/user/LeftSidebar'
import Navbar from '@/components/user/Navbar'
import CardPreview from '@/components/user/payments/CardPreview'
import CreditCardForm from '@/components/user/payments/CreditCardForm'
import UserLayout from '@/Layout/UserLayout'
import React from 'react'

const payments = () => {
  return (
    <UserLayout>
      <CreditCardForm/>
      <CardPreview/>
    </UserLayout>
  )
}

export default payments
