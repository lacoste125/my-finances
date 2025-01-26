import Container from "@mui/material/Container";
import {STATIC_TEXT} from "../../objects/static_text";

export const MyFooter = () => {
    return <Container id="footer_container" maxWidth="xl">
        {STATIC_TEXT.COPYRIGHT_BY_MARIUSZ_FOOTER(new Date().getFullYear())}
    </Container>;
};