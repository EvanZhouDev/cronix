import { useTable } from "react-table"
import useStore from '@app/redux/accessors/useStore';
import { useMemo } from "react"
import styles from "../sessions.module.css"
import { FiTrash, FiArrowUp, FiArrowDown, FiPenTool } from "react-icons/fi";
import classNames from "classnames";
import Gate from "@app/redux/gate";
import { moveSessionDown, moveSessionUp, deleteSession, setSession, renameSession } from "@app/redux/slices/sessions/manager";
import { confirmAlert } from 'react-confirm-alert';
import { Events } from "@app/utils/settings";
import { useDispatch } from "react-redux";
import useSettings from "@app/redux/accessors/useSettings";
import { success, error } from "@app/utils/notify";
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import useIsMobile from "@app/utils/useIsMobile";

let flip = obj => Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
export default function SessionTable() {
    let isMobile = useIsMobile()
    let dispatch = useDispatch()
    let settings = useSettings();
    let { sessions: { data, order, current } } = useStore()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let [currentEditingSession, setCurrentEditingSession] = useState(null);
    let sessionTableData = order.map((x, i) => {
        let session = structuredClone(data[x]);
        session.name = x;
        session.idx = i + 1;
        session.event = flip(Events)[session.event]
        session.timeAmount = session.list.length;
        session.operations = <span className={styles.opWrap}>
            <span className={classNames(styles.selection)} onClick={(e) => {
                e.stopPropagation()
                dispatch(moveSessionUp(x))
                if (i === 0) {
                    error("Already at top.")
                    return;
                }
                success(`Moved "${x}" up.`)
            }}>
                <FiArrowUp />
            </span>
            <span className={classNames(styles.selection)} onClick={(e) => {
                e.stopPropagation()
                dispatch(moveSessionDown(x))
                if (i === order.length - 1) {
                    error("Already at bottom.")
                    return;
                }
                success(`Moved "${x}" down.`)
            }}>
                <FiArrowDown />
            </span>
            <span className={classNames(styles.selection)} onClick={(e) => {
                e.stopPropagation()
                openModal()
                setCurrentEditingSession(x);
            }}>
                <FiPenTool />
            </span>
            <span className={styles.trash} onClick={(e) => {
                e.stopPropagation()
                if (settings.showDeleteConfirmation) {
                    confirmAlert({
                        title: 'Confirm Deletion',
                        message: `Are you sure you want to delete "${x}"? This is an irreversable action.`,
                        buttons: [
                            {
                                label: 'Cancel',
                            },
                            {
                                label: 'Delete',
                                onClick: () => {
                                    dispatch(deleteSession(x))
                                    success(`Moved "${x}."`)
                                }
                            },
                        ]
                    });
                } else {
                    dispatch(deleteSession(x))
                    success(`Deleted "${x}."`)
                }
            }}>
                <FiTrash />
            </span>
        </span>
        return session;
    })

    const columns = useMemo(() => [
        { Header: "#", accessor: 'idx' },
        { Header: "Name", accessor: 'name' },
        { Header: "Event", accessor: 'event' },
        { Header: "Times", accessor: 'timeAmount' },
        { Header: "Actions", accessor: 'operations' },
    ], [])

    const tableInstance = useTable({
        columns, data: sessionTableData
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function modalRenameSesssion() {
        setIsOpen(false);
        if (!renameModalRef.current.value) {
            error("Cannot rename session to blank value.")
        } else {
            dispatch(renameSession({ from: currentEditingSession, to: renameModalRef.current.value }))
            success(`Renamed "${currentEditingSession}" to "${renameModalRef.current.value}"`)
        }
    }

    let renameModalRef = useRef(undefined)

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => { }}
                onRequestClose={closeModal}
                className={classNames(styles.modal, { [styles.mobileModal]: isMobile })}
                contentLabel="Rename modal"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                }}
            >
                <h2>Rename "{currentEditingSession}" to:</h2>
                <input ref={renameModalRef} defaultValue={currentEditingSession} className={styles.renameBox} />
                <span>
                    <button className={styles.renameButton} onClick={modalRenameSesssion}>Rename</button>
                </span>
            </Modal>
            <table className={classNames(styles.table, { [styles.tableMobile]: isMobile })} {...getTableProps()}>
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
                                <tr onClick={() => {
                                    dispatch(setSession(row.values.name))
                                }} className={classNames({ [styles.selected]: row.values.name === current })} {...row.getRowProps()} key={row.getRowProps().key}>
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
        </>
    )
}