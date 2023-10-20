import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { order } from './OrderData';


const OrderBook = () => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader className='bg-red-500'>
        <TableColumn>Position</TableColumn>
        <TableColumn>Net Value</TableColumn>
        <TableColumn>Size</TableColumn>
        <TableColumn>Collateral</TableColumn>
        <TableColumn>Entry Price</TableColumn>
        <TableColumn>Mark Price</TableColumn>
        <TableColumn>Liq Price</TableColumn>
      </TableHeader>
      <TableBody>
        {order.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.Position}</TableCell>
          <TableCell>{item['Net Value']}</TableCell>
          <TableCell>{item['Size']}</TableCell>
          <TableCell>{item.Collateral}</TableCell>
          <TableCell className='text-teal-400'>{item['Entry Price']}</TableCell>
          <TableCell className='text-warning'>{item['Mark Price']}</TableCell>
          <TableCell>{item['Liq Price']}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default OrderBook;