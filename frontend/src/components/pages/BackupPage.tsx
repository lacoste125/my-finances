import * as React from "react";
import {ChangeEvent, useState} from "react";
import {CREATE, CREATE_DATABASE_BACKUP_API_PATH, NotificationDetails} from "../../utils/api.actions";
import {Form, Stack} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {BACKUP_TEXT} from "../../objects/static_text";
import {CreateDatabaseBackupRequestBody} from "../../objects/request.type";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

type Props = {
    setNotificationDetails: (value?: NotificationDetails) => void
}

export const BackupPage = (props: Props) => {
    const [path, setPath] = useState<string>(BACKUP_TEXT.INITIAL_FILE_PATH);
    const [databaseName, setDatabaseName] = useState<string>(BACKUP_TEXT.INITIAL_DATABASE_NAME);
    const [fileName, setFileNameChange] = useState<string>(BACKUP_TEXT.FILE_NAME(BACKUP_TEXT.INITIAL_DATABASE_NAME));
    const [emailTo, setEmailTo] = useState<string>(BACKUP_TEXT.INITIAL_EMAIL);

    const handlePathChange = (event: ChangeEvent<FormControlElement>) => {
        setPath(event.target.value);
    }

    const handleEmailToChange = (event: ChangeEvent<FormControlElement>) => {
        setEmailTo(event.target.value);
    }

    const handleDatabaseNameChange = (event: ChangeEvent<FormControlElement>) => {
        setDatabaseName(event.target.value);
        setFileNameChange(BACKUP_TEXT.FILE_NAME(event.target.value))
    }

    const handleSubmitClick = () => {
        const request: CreateDatabaseBackupRequestBody = {
            databaseName: databaseName,
            fileResource: path,
            emailTo: emailTo,
            fileName: fileName
        }

        setPath("")
        setDatabaseName("")
        setFileNameChange("")
        setEmailTo("")

        createBackup(request).then()
    }

    const createBackup = async (request: CreateDatabaseBackupRequestBody) => {
        await CREATE
        (
            CREATE_DATABASE_BACKUP_API_PATH,
            request,
            props.setNotificationDetails,
            BACKUP_TEXT.SUCCESS_CREATE_BACKUP
        )
    }

    const isCreateBackupButtonEnabled = !!path && !!databaseName && !!fileName && !!emailTo;

    return <div>
        <Stack id={"admin_backup"}>
            <h1>
                {BACKUP_TEXT.DATABASE_BACKUP}
            </h1>
            <Stack>
                <Form.Label htmlFor="inputPath">{BACKUP_TEXT.PATH}</Form.Label>
                <Form.Control
                    id="inputPath"
                    onChange={event => handlePathChange(event)}
                    value={path}
                />
                <Form.Text>
                    {BACKUP_TEXT.WRITE_PATH}
                </Form.Text>
            </Stack>
            <br/>
            <Stack>
                <Form.Label htmlFor="inputDatabaseName">{BACKUP_TEXT.DATABASE_NAME}</Form.Label>
                <Form.Control
                    id="inputDatabaseName"
                    value={databaseName}
                    onChange={event => handleDatabaseNameChange(event)}
                />
                <Form.Text>
                    {BACKUP_TEXT.WRITE_DATABASE}
                </Form.Text>
            </Stack>
            <br/>
            <Stack>
                <Form.Label htmlFor="inputEmailTo">{BACKUP_TEXT.SEND_EMAIL_TO}</Form.Label>
                <Form.Control
                    id="inputEmailTo"
                    value={emailTo}
                    onChange={event => handleEmailToChange(event)}
                />
                <Form.Text>
                    {BACKUP_TEXT.WRITE_EMAIL}
                </Form.Text>
            </Stack>
            <br/>
            <Stack>
                <Form.Label htmlFor="inputFileName">{BACKUP_TEXT.FILE_NAME_TITLE}</Form.Label>
                <Form.Control
                    id="inputFileName"
                    disabled={true}
                    value={fileName}
                />
                <Form.Text>
                    {BACKUP_TEXT.BACKUP_FILE_NAME}
                </Form.Text>
            </Stack>
            <br/>
            <Stack direction="horizontal" gap={3}>
                <Button
                    className="ms-auto"
                    id="create_backup_button"
                    variant="success"
                    disabled={!isCreateBackupButtonEnabled}
                    onClick={handleSubmitClick}
                >
                    {BACKUP_TEXT.CREATE_DATABASE_BACKUP}
                </Button>
            </Stack>
        </Stack>
    </div>
};

export default BackupPage;