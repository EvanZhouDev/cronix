import { useTable } from "react-table"
import { useMemo } from "react"
import useData from '@app/redux/accessors/useSessionData'
import styles from "./table.module.css"
import { modifyTime, deleteTime } from "@app/redux/slices/sessions/operations"
import { useDispatch } from "react-redux"
import { Penalty } from "@app/utils/enums"
import classNames from "classnames"
import { FiTrash } from "react-icons/fi"
import injectAverages from "@app/utils/injectAverages"
export default function Table({ data, timeList, set, session }) {
    let [{ list }] = useData()
    let dispatch = useDispatch()
    let newList = injectAverages(list)

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'index',
            },
            {
                Header: 'Time',
                accessor: 'derived.formattedTimePrecise',
            },
            {
                Header: 'mo3',
                accessor: 'mo3',
            },
            {
                Header: 'ao5',
                accessor: 'ao5',
            },
            {
                Header: 'ao12',
                accessor: 'ao12',
            },
            {
                Header: 'Operations',
                accessor: 'operations',
            },
        ],
        []
    )


    const tableInstance = useTable({
        columns, data: structuredClone(newList).map((x, i) => {
            x.index = i + 1;
            x.operations = <span className={styles.opWrap}>
                <span className={styles.trash} onClick={() => {
                    dispatch(deleteTime(i))
                }}>
                    <FiTrash />
                </span>
                <span className={classNames(styles.selection, {
                    [styles.selected]: newList[i].penalty === Penalty.OK
                })} onClick={() => {
                    dispatch(modifyTime({ idx: i, penalty: Penalty.OK }))
                }}>
                    OK
                </span>
                <span className={classNames(styles.selection, {
                    [styles.selected]: newList[i].penalty === Penalty.PLUS2
                })} onClick={() => {
                    dispatch(modifyTime({ idx: i, penalty: Penalty.PLUS2 }))
                }}>
                    +2
                </span>
                <span className={classNames(styles.selection, {
                    [styles.selected]: newList[i].penalty === Penalty.DNF
                })} onClick={() => {
                    dispatch(modifyTime({ idx: i, penalty: Penalty.DNF }))
                }}>
                    DNF
                </span>
            </span>
            return x
        }).reverse()
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} key={row.getRowProps().key}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                                    {// Render the cell contents
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
    )
}