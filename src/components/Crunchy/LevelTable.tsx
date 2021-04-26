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

const LevelTable = ({classes, columns, data}: Props) => {
    const tableInstance = useTable({columns, data});
    const [fullHeight, setFullHeight] = useState(true);

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

                                        <th {...column.getHeaderProps()}>
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
                                                    padding:0
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
        </Box>
    )
}

// @ts-ignore
export default withStyles(SummonerTableStyles)(LevelTable);