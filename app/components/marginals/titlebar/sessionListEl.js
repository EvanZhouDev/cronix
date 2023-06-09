import styles from "./titlebar.module.css"
import { FiTrash, FiPenTool, FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";
import { renameSession } from "@app/redux/slices/sessions/manager";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { success } from "@app/utils/notify";
import { confirmAlert } from 'react-confirm-alert';
import useSettings from "@app/redux/accessors/useSettings";
import './custom-react-confirm.css'; // Import the default styles (optional)

export default function SessionListEl({ sessionName, onClick, onDeleteClick, className, resetEditStatus }) {
    let inputRef = useRef()
    let dispatch = useDispatch();
    let settings = useSettings();
    const [editing, setEditing] = useState(false);
    const [editedSessionName, setEditedSessionName] = useState(sessionName);

    useEffect(() => {
        setEditing(false)
    }, [resetEditStatus])

    const handleEditClick = (event) => {
        if (typeof onClick === "function") onClick()
        event.stopPropagation();
        setEditing(true);
    }

    const handleSaveClick = (event) => {
        event.stopPropagation();
        setEditing(false);
        dispatch(renameSession({ from: sessionName, to: editedSessionName }));
        success(`Successfully edited session name to "${editedSessionName}"`)
    }

    const handleKeyDown = (event) => {
        event.stopPropagation();
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default behavior of the Enter key
            setEditing(false);
            dispatch(renameSession({ from: sessionName, to: editedSessionName }));
            success(`Successfully edited session name to "${editedSessionName}"`)
        }
    }

    const handleCancelClick = (event) => {
        event.stopPropagation();
        setEditing(false);
        setEditedSessionName(sessionName);
        dispatch(renameSession(sessionName));
        success(`Successfully canceled edit`)
    }

    const handleInputChange = (event) => {
        event.stopPropagation(); // prevent
        setEditedSessionName(event.target.value);
    }

    useEffect(() => {
        let keyup = function (e) {
            e.stopPropagation();
        }
        let keydown = handleKeyDown; // Use handleKeyDown instead of creating a new function
        if (inputRef.current) {
            inputRef.current.addEventListener('keyup', keyup, false);
            inputRef.current.addEventListener('keydown', keydown, false);
        }
        return (
            () => {
                if (inputRef.current) {
                    inputRef.current.removeEventListener('keyup', keyup, false);
                    inputRef.current.removeEventListener('keydown', keydown, false);
                }
            }
        )
    }, [inputRef, inputRef.current, editing, handleKeyDown]);

    const openConfirmationDialog = (e) => {
        if (settings.showDeleteConfirmation) {
            confirmAlert({
                title: 'Confirm Deletion',
                message: `Are you sure you want to delete "${sessionName}"? This is an irreversable action.`,
                buttons: [
                    {
                        label: 'Cancel',
                    },
                    {
                        label: 'Delete',
                        onClick: () => onDeleteClick(e)
                    },
                ]
            });
        } else {
            onDeleteClick(e)
        }
    };

    const renderContent = () => {
        if (editing) {
            return (
                <>
                    <input ref={inputRef} className={styles.inputBox} type="text" value={editedSessionName} onChange={handleInputChange} />
                    <span>
                        <span className={styles.check} onClick={handleSaveClick}><FiCheck /></span>
                        <span className={styles.xButton} onClick={handleCancelClick}><FiX /></span>
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <span className={styles.sessionName}>{sessionName}</span>
                    <span>
                        <span className={styles.edit} onClick={handleEditClick}><FiPenTool /></span>
                        <span className={styles.trash} onClick={openConfirmationDialog}><FiTrash /></span>
                    </span>
                </>
            );
        }
    }

    return (
        <span onClick={onClick} className={className}>
            {renderContent()}
        </span>
    )
}