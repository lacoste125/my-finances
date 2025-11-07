import {STATIC_TEXT} from "@objects/static_text";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {ADD_CATEGORY_TO_YEAR_API_PATH, CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH} from "@utils/api.actions";
import {CategoryType} from "@objects/payment.type";
import {Tooltip} from "../../../../elements/tooltip/Tooltip";
import {AddCategoryToYearRequestBody, CreateCategoryAndAddToYearRequestBody} from "@objects/request.type";
import {Box, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./AddCategoryForm.module.css";
import {apiClient} from "@api/apiClient";
import {useYear} from "@app/useYear";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {getAllCategories} from "@redux/category/category.thunk";

export const AddCategoryForm: React.FC<{
    close: () => void;
}> = ({
    close,
}) => {

    const dispatch = useAppDispatch();

    const year = useYear();
    const allCategoryTypes: CategoryType[] = useAppSelector(state => state.categoryReducer.categories);

    const [createCategorySectionVisible, setCreateCategorySectionVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>(undefined);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [categoryDeadline, setCategoryDeadline] = useState<string>("");

    useEffect(() => {
        if (!allCategoryTypes.length) {
            dispatch(getAllCategories());
        }
    }, []);

    const handleCreateCategoryCheckboxClick = () => {
        setCreateCategorySectionVisible(!createCategorySectionVisible);
        setSelectedCategory(undefined);
        setNewCategoryName("");
        setCategoryDeadline("");
    };

    const handleCategorySelection = (key: number | null) => {
        const category = allCategoryTypes.find(
            (categoryType: CategoryType): boolean => categoryType.id === key);
        setSelectedCategory(category);
    };

    const handleClickAddCategoryToMontButton = () => {
        addCategoryToYear().then(close);
    };

    const handleClickCreateNewCategory = () => {
        createNewCategoryAndAddToYear().then(close);
    };

    const handleCategoryNameChange = (value: string) => {
        setNewCategoryName(value);
    };

    const handleCategoryDeadlineChange = (value: string) => {
        setCategoryDeadline(value);
    };

    const addCategoryToYear = async () => {
        const body: AddCategoryToYearRequestBody = {
            yearId: year?.id,
            categoryId: selectedCategory?.id
        };

        return apiClient({
            endpoint: ADD_CATEGORY_TO_YEAR_API_PATH,
            method: "POST",
            body: body,
        });
    };

    const createNewCategoryAndAddToYear = async () => {
        const body: CreateCategoryAndAddToYearRequestBody = {
            name: newCategoryName,
            deadline: categoryDeadline,
            yearNumber: year!.name
        };

        return apiClient({
            endpoint: CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
            method: "PUT",
            body: body,
        });
    };

    const yearCategories = useMemo(() => year?.categories?.map(cat => cat.categoryType), [year]);

    const categoriesDisplayedInDropdown = useMemo(() => {
        return allCategoryTypes?.filter(
            (category: CategoryType) =>
                !yearCategories?.some(
                    (yearCategory: CategoryType) => yearCategory.name === category.name
                )
        ).sort(
            (a: CategoryType, b: CategoryType) => a.name.localeCompare(b.name)
        );
    }, [allCategoryTypes, yearCategories]);

    const isCreateNewCategoryButtonActive = useMemo(() => {
        return categoryDeadline.length && newCategoryName.length;
    }, [categoryDeadline, newCategoryName]);

    if (!year) return null;

    return (
        <React.Fragment>
            <Box className={styles.addCategoryBox} display="flex" alignItems="baseline" gap={1}>
                {
                    !createCategorySectionVisible && <FormControl variant="outlined" fullWidth>
                        <InputLabel id="dropdown-category-label" color="success" sx={{marginTop: 1}}>
                            Wybierz kategorię
                        </InputLabel>
                        <Select
                            id="dropdown-category-list"
                            labelId="dropdown-category-label"
                            value={selectedCategory?.id ?? ""}
                            onChange={(event) => handleCategorySelection(event.target.value)}
                            className={styles.whiteBack}
                            disabled={createCategorySectionVisible || !categoriesDisplayedInDropdown?.length}
                            variant="standard"
                        >
                            {categoriesDisplayedInDropdown.map((categoryType: CategoryType) => (
                                <MenuItem key={categoryType.id} value={categoryType.id}>
                                    {categoryType.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
                {
                    !!selectedCategory && <Button
                        variant="outlined"
                        id="add_existing_category"
                        onClick={handleClickAddCategoryToMontButton}
                    >
                        {STATIC_TEXT.ADD}
                    </Button>
                }
            </Box>
            <FormControl fullWidth>
                <div className={!createCategorySectionVisible ? "mt-2" : ""}>
                    <Tooltip
                        id="new_category_tooltip"
                        text={!createCategorySectionVisible ? STATIC_TEXT.CLICK_TO_CREATE_NEW_CATEGORY : ""}
                        delay={1000}
                        place={"bottom"}
                    >
                        <Checkbox
                            id="new_category_checkbox"
                            name={STATIC_TEXT.NEW_CATEGORY}
                            onChange={handleCreateCategoryCheckboxClick}
                        />
                    </Tooltip>
                    Nowa kategoria?
                </div>

            </FormControl>
            {
                createCategorySectionVisible && <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label={STATIC_TEXT.NAME}
                        value={newCategoryName ?? ""}
                        onChange={event => handleCategoryNameChange(event.target.value)}
                        placeholder={STATIC_TEXT.WRITE_CATEGORY_NUMBER}
                        fullWidth
                        className="flex-grow-1"
                    />
                    <TextField
                        label={STATIC_TEXT.DEADLINE}
                        value={categoryDeadline ?? ""}
                        onChange={event => handleCategoryDeadlineChange(event.target.value)}
                        placeholder={STATIC_TEXT.WRITE_DEADLINE}
                        fullWidth
                        className="flex-grow-1"
                    />
                    <Tooltip
                        id="create-new-category-tooltip"
                        text={!isCreateNewCategoryButtonActive ? STATIC_TEXT.FILL_ALL_FIELDS_TO_ADD_PAYMENT : ""}
                        place="bottom"
                        offset={19}
                    >
                        <Button
                            id="create-new-category-btn"
                            variant="outlined"
                            color={isCreateNewCategoryButtonActive ? "primary" : "secondary"}
                            onClick={handleClickCreateNewCategory}
                            disabled={!isCreateNewCategoryButtonActive}
                        >
                            {STATIC_TEXT.CREATE}
                        </Button>
                    </Tooltip>
                </Box>
            }
        </React.Fragment>
    );
};