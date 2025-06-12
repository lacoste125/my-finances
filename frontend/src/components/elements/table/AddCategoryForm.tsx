import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Form from "react-bootstrap/Form";
import {Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {STATIC_TEXT} from "../../../objects/static_text";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {
    ADD_CATEGORY_TO_YEAR_API_PATH,
    CREATE,
    CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
    GET,
    GET_ALL_CATEGORIES_API_PATH,
    GET_YEAR_BY_YEAR_NUMBER_API_PATH
} from "../../../utils/api.actions";
import {CategoryType, Year} from "../../../objects/payment.type";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {Tooltip} from "../tooltip/Tooltip";
import {AddCategoryToYearRequestBody, CreateCategoryAndAddToYearRequestBody} from "../../../objects/request.type";

type Props = {
    year?: Year,
    setYear: Dispatch<SetStateAction<Year | undefined>>,
    setNotificationDetails: () => void,
    addCategorySectionVisible: boolean,
    setAddCategorySectionVisible: Dispatch<SetStateAction<boolean>>
};

export const AddCategoryForm = (props: Props) => {
    const [allCategoryTypes, setAllCategoryTypes] = useState<CategoryType[]>([]);
    const [createCategorySectionVisible, setCreateCategorySectionVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>(undefined);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [categoryDeadline, setCategoryDeadline] = useState<string>("");

    const handlePlusCircleClick = () => {
        if (!allCategoryTypes.length) {
            GET(setAllCategoryTypes, GET_ALL_CATEGORIES_API_PATH).then();
        }

        props.setAddCategorySectionVisible(!props.addCategorySectionVisible);
        setCreateCategorySectionVisible(false);
        setSelectedCategory(undefined);
    };

    const handleCreateCategoryCheckboxClick = () => {
        setCreateCategorySectionVisible(!createCategorySectionVisible);
        setSelectedCategory(undefined);
        setNewCategoryName("");
        setCategoryDeadline("");
    };

    function handleCategorySelection(key: string | null) {
        const category = allCategoryTypes.find(
            categoryType => categoryType.id === parseInt(key!));
        setSelectedCategory(category);
    }

    function handleClickAddCategoryToMontButton() {
        hideFormAndRefresh(addCategoryToYear());
    }

    const handleClickCreateNewCategory = () => {
        hideFormAndRefresh(createNewCategoryAndAddToYear());
    };

    const hideFormAndRefresh = (operation: Promise<unknown>) => {
        operation
            .then(handlePlusCircleClick)
            .then(
                () => GET(
                    props.setYear,
                    GET_YEAR_BY_YEAR_NUMBER_API_PATH(props.year!.name)
                )
            );
    };

    const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event) {
            setNewCategoryName(event.target.value);
        }
    };

    const handleCategoryDeadlineChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event) {
            setCategoryDeadline(event.target.value);
        }
    };

    const addCategoryToYear = async () => {
        const body: AddCategoryToYearRequestBody = {
            yearId: props.year?.id,
            categoryId: selectedCategory?.id
        };

        await CREATE(
            ADD_CATEGORY_TO_YEAR_API_PATH,
            body,
            props.setNotificationDetails,
            STATIC_TEXT.SUCCESS_ADD_CATEGORY
        );
    };

    const createNewCategoryAndAddToYear = async () => {
        const body: CreateCategoryAndAddToYearRequestBody = {
            name: newCategoryName,
            deadline: categoryDeadline,
            yearNumber: props.year!.name
        };

        await CREATE(
            CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
            body,
            props.setNotificationDetails,
            STATIC_TEXT.SUCCESS_ADD_CATEGORY,
            "PUT"
        );
    };

    const yearCategories = props.year?.categories?.map(cat => cat.categoryType);
    const categoriesDisplayedInDropdown = allCategoryTypes?.filter(category =>
        !yearCategories?.some(yearCategory => yearCategory.name === category.name))
        .sort((a, b) => a.name.localeCompare(b.name));
    const isCreateNewCategoryButtonActive = categoryDeadline.length && newCategoryName.length;

    return <>
        <TableRow key={"tableHeader"}>
            <TableCell>
                <Tooltip
                    id={!props.addCategorySectionVisible ? "add-row-tooltip" : "hide-row-tooltip"}
                    text={!props.addCategorySectionVisible ? STATIC_TEXT.ADD_ROW : STATIC_TEXT.HIDE}
                    place={"right"}
                    delay={2000}
                    element={
                        <IconButton
                            id={"add-hide-row-btn"}
                            aria-label="expand row"
                            size="small"
                            onClick={handlePlusCircleClick}
                        >
                            {
                                !props.addCategorySectionVisible ? <ControlPointIcon htmlColor={"white"}/> :
                                    <RemoveCircleOutlineIcon htmlColor={"white"}/>
                            }
                        </IconButton>
                    }
                />
            </TableCell>
            <TableCell colSpan={13} height={60}/>
        </TableRow>
        {
            props.addCategorySectionVisible &&
            <TableRow>
                <TableCell/>
                <TableCell colSpan={14} height={"70px"}>
                    {
                        <Form>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Tooltip
                                        id={"no-categories-tooltip"}
                                        text={!categoriesDisplayedInDropdown?.length ? STATIC_TEXT.NO_CATEGORIES_IN_CONFIGURATION : ""}
                                        place={"bottom"}
                                        element={
                                            <DropdownButton
                                                id="dropdown-category-list"
                                                variant="secondary"
                                                title={!selectedCategory ? STATIC_TEXT.CHOOSE_CATEGORY : selectedCategory!.name}
                                                data-bs-theme="dark"
                                                disabled={createCategorySectionVisible || !categoriesDisplayedInDropdown?.length}
                                                onSelect={(eventKey) => handleCategorySelection(eventKey)}
                                            >
                                                {
                                                    categoriesDisplayedInDropdown.map(
                                                        (categoryType: CategoryType) =>
                                                            <Dropdown.Item
                                                                key={categoryType.id}
                                                                eventKey={categoryType.id}
                                                            >
                                                                {categoryType.name}
                                                            </Dropdown.Item>
                                                    )
                                                }
                                            </DropdownButton>
                                        }
                                    />
                                </Col>
                                {
                                    selectedCategory && <Col xs="auto">
                                        <Button
                                            id={"add_existing_category"}
                                            type="button"
                                            onClick={handleClickAddCategoryToMontButton}
                                        >
                                            {STATIC_TEXT.ADD}
                                        </Button>
                                    </Col>
                                }
                                <Col xs="auto">
                                    <Tooltip
                                        id={"new_category_tooltip"}
                                        text={!createCategorySectionVisible ? STATIC_TEXT.CLICK_TO_CREATE_NEW_CATEGORY : ""}
                                        delay={1000}
                                        place={"bottom"}
                                        element={
                                            <Form.Check
                                                type="checkbox"
                                                id="new_category_checkbox"
                                                label={STATIC_TEXT.NEW_CATEGORY}
                                                onClick={handleCreateCategoryCheckboxClick}
                                            />
                                        }
                                    />
                                </Col>
                                {
                                    createCategorySectionVisible &&
                                    <>
                                        <Col xs="auto">
                                            <Form.Label htmlFor="category_name_input" visuallyHidden column={"sm"}/>
                                            <InputGroup>
                                                <InputGroup.Text>{STATIC_TEXT.NAME}</InputGroup.Text>
                                                <Form.Control
                                                    id="category_name_input"
                                                    placeholder={STATIC_TEXT.WRITE_CATEGORY_NUMBER}
                                                    className={"shadow-none"}
                                                    onChange={event => handleCategoryNameChange(event)}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Label htmlFor="category_deadline_input" visuallyHidden column={"sm"}/>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    {STATIC_TEXT.DEADLINE}
                                                </InputGroup.Text>
                                                <Form.Control
                                                    id="category_deadline_input"
                                                    placeholder={STATIC_TEXT.WRITE_DEADLINE}
                                                    className={"shadow-none"}
                                                    onChange={event => handleCategoryDeadlineChange(event)}
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col xs="auto">
                                            <Tooltip
                                                id={"create-new-category-tooltip"}
                                                text={!isCreateNewCategoryButtonActive ? STATIC_TEXT.FILL_ALL_FIELDS_TO_ADD_PAYMENT : ""}
                                                place={"bottom"}
                                                offset={19}
                                                element={
                                                    <Button
                                                        id={"create-new-category-btn"}
                                                        variant={isCreateNewCategoryButtonActive ? "success" : "secondary"}
                                                        type="button"
                                                        onClick={handleClickCreateNewCategory}
                                                        disabled={!isCreateNewCategoryButtonActive}
                                                    >
                                                        {STATIC_TEXT.CREATE}
                                                    </Button>
                                                }
                                            />
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Form>
                    }
                </TableCell>
            </TableRow>
        }
    </>;
};