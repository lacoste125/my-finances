import {STATIC_TEXT} from "../../../../../objects/static_text";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {
    ADD_CATEGORY_TO_YEAR_API_PATH,
    CREATE,
    CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH,
    GET,
    GET_ALL_CATEGORIES_API_PATH
} from "../../../../../utils/api.actions";
import {CategoryType, Year} from "../../../../../objects/payment.type";
import {Tooltip} from "../../../../elements/tooltip/Tooltip";
import {AddCategoryToYearRequestBody, CreateCategoryAndAddToYearRequestBody} from "../../../../../objects/request.type";
import {Box, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";

export const AddCategoryForm: React.FC<{
    year?: Year;
    close: () => void;
}> = ({
    year,
    close,
}) => {
    const [allCategoryTypes, setAllCategoryTypes] = useState<CategoryType[]>([]);
    const [createCategorySectionVisible, setCreateCategorySectionVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>(undefined);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [categoryDeadline, setCategoryDeadline] = useState<string>("");

    useEffect(() => {
        if (!allCategoryTypes.length) {
            GET(setAllCategoryTypes, GET_ALL_CATEGORIES_API_PATH).then();
        }
    });

    const handleCreateCategoryCheckboxClick = () => {
        setCreateCategorySectionVisible(!createCategorySectionVisible);
        setSelectedCategory(undefined);
        setNewCategoryName("");
        setCategoryDeadline("");
    };

    const handleCategorySelection = (key: string | null) => {
        const category = allCategoryTypes.find(
            categoryType => categoryType.id === parseInt(key!));
        setSelectedCategory(category);
    };

    const handleClickAddCategoryToMontButton = () => {
        addCategoryToYear().then(close);
    };

    const handleClickCreateNewCategory = () => {
        createNewCategoryAndAddToYear().then(close);
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
            yearId: year?.id,
            categoryId: selectedCategory?.id
        };

        await CREATE(ADD_CATEGORY_TO_YEAR_API_PATH, body);
    };

    const createNewCategoryAndAddToYear = async () => {
        const body: CreateCategoryAndAddToYearRequestBody = {
            name: newCategoryName,
            deadline: categoryDeadline,
            yearNumber: year!.name
        };

        await CREATE(CREATE_CATEGORY_AND_ADD_TO_YEAR_API_PATH, body, "PUT");
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

    return (
        <React.Fragment>
            <Box sx={{minWidth: 200, maxWidth: 400}} display="flex" alignItems="baseline" gap={1}>
                {
                    !createCategorySectionVisible && <FormControl variant="outlined" fullWidth>
                        <InputLabel id="dropdown-category-label" color="success" sx={{marginTop: 1}}>
                            Wybierz kategorię
                        </InputLabel>
                        <Select
                            id="dropdown-category-list"
                            labelId="dropdown-category-label"
                            value={selectedCategory?.name}
                            onChange={(event) => handleCategorySelection(event.target.value)}
                            sx={{backgroundColor: "white"}}
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
                        element={
                            <Checkbox
                                id="new_category_checkbox"
                                name={STATIC_TEXT.NEW_CATEGORY}
                                onChange={handleCreateCategoryCheckboxClick}
                            />
                        }
                    />
                    Nowa kategoria?
                </div>

            </FormControl>
            {
                createCategorySectionVisible && <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label={STATIC_TEXT.NAME}
                        value={newCategoryName}
                        onChange={event => handleCategoryNameChange(event)}
                        placeholder={STATIC_TEXT.WRITE_CATEGORY_NUMBER}
                        fullWidth
                        sx={{flex: 1}}
                    />
                    <TextField
                        label={STATIC_TEXT.DEADLINE}
                        value={categoryDeadline}
                        onChange={event => handleCategoryDeadlineChange(event)}
                        placeholder={STATIC_TEXT.WRITE_DEADLINE}
                        fullWidth
                        sx={{flex: 1}}
                    />
                    <Tooltip
                        id="create-new-category-tooltip"
                        text={!isCreateNewCategoryButtonActive ? STATIC_TEXT.FILL_ALL_FIELDS_TO_ADD_PAYMENT : ""}
                        place="bottom"
                        offset={19}
                        element={
                            <Button
                                id="create-new-category-btn"
                                variant="outlined"
                                color={isCreateNewCategoryButtonActive ? "primary" : "secondary"}
                                onClick={handleClickCreateNewCategory}
                                disabled={!isCreateNewCategoryButtonActive}
                                sx={{flex: 1}}
                            >
                                {STATIC_TEXT.CREATE}
                            </Button>
                        }
                    />
                </Box>
            }
        </React.Fragment>
    );
};