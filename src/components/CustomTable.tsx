/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

interface CustomTableTypes {
  columns: { [key: string | number]: string | null | number | any | unknown }[]
  rows: { [key: string]: string | null | number | any | unknown }[]
  loading?: boolean
}
const ScrollBarDesign = {
  '&::-webkit-scrollbar-thumb': {
    background: '#BFD6F8',
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar': {
    // background: "#BFD6F8",
    width: { xs: '6px', md: '8px' },
    height: '10px'
    // display:{xs:"none",sm:"block"}
  },
  '&::-webkit-scrollbar-track': {
    '-webkit-box-shadow': '#BFD6F8'
  },
  '&:hover::-webkit-scrollbar-thumb': {
    background: '#BFD6F8'
  },
  '&::-webkit-scrollbar-button:single-button': {
    background: '#BFD6F8',
    display: 'block',
    height: '8px',
    width: '8px',
    borderRadius: '4px'
  }
  // "&::-webkit-scrollbar-button:single-button:vertical:decrement": {
  //     background:
  //         'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>\') center no-repeat',
  // },
  // "&::-webkit-scrollbar-button:single-button:vertical:increment": {
  //     background:
  //         'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>\') center no-repeat',
  // },
  // "&::-webkit-scrollbar-button:single-button:horizontal:decrement": {
  //     background:
  //         'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>\') center no-repeat',
  // },
  // "&::-webkit-scrollbar-button:single-button:horizontal:increment": {
  //     background:
  //         'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>\') center no-repeat',
  // },
}
export function CustomTable ({
  columns = [],
  rows = [],
  loading
}: CustomTableTypes) {
  return (
    <TableContainer
      component={Paper}
      variant='outlined'
      sx={{
        maxHeight: `${window.innerHeight - 240}px`,
        overflow: 'auto',
        ...ScrollBarDesign
      }}
    >
      <Table stickyHeader aria-label='sticky table' sx={{ borderSpacing: '0' }}>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column?.align || 'center'}
                style={{
                  minWidth:
                    column.id == 'SI No'
                      ? '80px'
                      : column?.width
                      ? column?.width
                      : '150px',
                  padding: '15px 0px',
                  verticalAlign: 'middle'
                }}
              >
                {column.label}
                {column.sort ? (
                  <IconButton color='primary' onClick={() => column?.onSort()}>
                    <Box
                      component='img'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => column?.onSort()}
                      src={column?.icon}
                    />
                  </IconButton>
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading
            ? rows.map((row, index) => {
                return (
                  <TableRow role='checkbox' tabIndex={-1} key={index}>
                    {columns.map(column => {
                      const value = row[column?.id]
                      return (
                        <TableCell
                          key={column?.id}
                          align={column?.align || 'center'}
                          style={{ padding: '15px 0px' }}
                        >
                          {column.renderCell
                            ? column.renderCell(row, index)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            : [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={'center'}
                      style={{ padding: '15px 10px' }}
                    >
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
