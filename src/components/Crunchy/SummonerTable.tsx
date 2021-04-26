import * as React from "react";
import {useTable} from 'react-table';
import {Box, Link, withStyles} from "@material-ui/core";
import {SummonerTableStyles} from "./styles";
import clsx from "clsx";
import {useState} from "react";

type Props = {
    columns: any[];
    data: any[];
    classes: {
        tableDiv: string,
        expand: string,
        expanded: string,
    }

}

const SummonerTable = ({classes, columns, data}: Props) => {
    const tableInstance = useTable({columns, data});
    const [fullHeight, setFullHeight] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <Box>
            <div className={clsx(classes.tableDiv, {[classes.expanded]: fullHeight})}>
                <table {...getTableProps()} style={{width: '100%'}}>
                    <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (

                                        <th {...column.getHeaderProps()} style={{textAlign: 'left'}}>
                                            {
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {

                            prepareRow(row)
                            return (

                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()} style={{
                                                    background: cell.value === 'null' ? '#C46B16' : '#ffffc7',
                                                    fontSize: cell.value === 'null' && 0
                                                }}>
                                                    {
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Link
                className={classes.expand}
                component="button"
                variant="body2"
                onClick={() => setFullHeight(!fullHeight)}
            >
                {fullHeight ? 'Shrink' : 'Expand'}
            </Link>

        </Box>
    )
}

// @ts-ignore
export default withStyles(SummonerTableStyles)(SummonerTable);