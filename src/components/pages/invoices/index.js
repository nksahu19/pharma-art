import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

function createData(date, name, shipTo, payMethod, saleAmount) {
  return { date, name, shipTo, payMethod, saleAmount };
}

const rows = [
  createData('15 Aug, 2020', 'Ravi Raghuvir', 'AP, IN', 'VISA ⠀•••• 3719', 312.44),
  createData('16 Aug, 2020', 'Pramit Pathy', 'Odisha, IN', 'VISA ⠀•••• 2574', 866.99),
  createData('13 Aug, 2020', 'Apoorva Sardesai', 'Khurda, IN', 'MC ⠀•••• 1253', 100.81),
  createData('17 Aug, 2020', 'Acharya Puli', 'BAM, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData('18 Aug, 2020', 'Jayashekhar Radheshyam', 'BBSR, IN', 'VISA ⠀•••• 5919', 212.79),
  createData('15 Aug, 2020', 'Narendra Pandit', 'Ichapur, IN', 'VISA ⠀•••• 5919', 212.79),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'shipTo', numeric: false, disablePadding: false, label: 'Ship To' },
  { id: 'payMethod', numeric: false, disablePadding: false, label: 'Payment Method' },
  { id: 'saleAmount', numeric: true, disablePadding: false, label: 'Sale Amount' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding : theme.spacing(3),
  },
  paper: {
    width: '100%',
    padding : theme.spacing(3),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  pdfIcon : {
    color: 'rgb(220, 0, 78)',
  }
}));

export default function Invoices() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openPdf = () => {
    window.open("/static/documents/dummy.pdf",'_blank');
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div" color="primary">
          Invoices
        </Typography>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                 
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.date}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.shipTo}</TableCell>
                      <TableCell>{row.payMethod}</TableCell>
                      <TableCell>{row.saleAmount}</TableCell>
                      <TableCell>
                      <PictureAsPdfIcon className={classes.pdfIcon} onClick={openPdf}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
