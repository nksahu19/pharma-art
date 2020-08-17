import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '15 Aug, 2020', 'Ravi Raghuvir', 'AP, IN', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '15 Aug, 2020', 'Pramit Pathy', 'Odisha, IN', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '15 Aug, 2020', 'Apoorva Sardesai', 'Khurda, IN', 'MC ⠀•••• 1253', 100.81),
  createData(3, '15 Aug, 2020', 'Acharya Puli', 'BAM, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Aug, 2020', 'Jayashekhar Radheshyam', 'BBSR, IN', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RecentOrders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}