import { styled, Box } from "@mui/material";

export const MyFormWrapper = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
})

export const CheckBoxLabelWrapper = styled(Box)({
    display: "flex",
    gap: "2px",
    alignItems: "center"
})

export const CheckBoxParentWrapper = styled(Box)({
    display: "flex",
    gap: "5px",
    alignItems: "center"
})

export const MyTitle = styled("p")({
    margin: "1px"
})