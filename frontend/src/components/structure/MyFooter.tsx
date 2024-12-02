import Container from "@mui/material/Container";
import {STATIC_TEXT} from "../../objects/static_text";

type Props = {};

export const MyFooter = (props: Props) => {
    return (
        <Container id="footer_container" maxWidth="xl">
            {STATIC_TEXT.COPYRIGHT_BY_MARIUSZ_FOOTER(new Date().getFullYear())}
        </Container>
    );
};