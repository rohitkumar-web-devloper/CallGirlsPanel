/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import event_cancel from "../assets/preveiw_cancel.svg";

interface CustomModalTypes {
    children: React.ReactNode
    open: boolean
    close: () => void
    iconClick?: () => void
    heading: string
    action: React.ReactNode
    canceltext?: React.ReactHTML
    extraButton?: React.ReactHTML
    size?: string
    icon?: React.ReactHTML
    headingColor?: string

}
export function CustomModal({ children, open, close, heading, action, size, icon, headingColor = "primary", canceltext, extraButton, iconClick }: CustomModalTypes) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={close}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth={size ? size : "sm"}
            >
                <DialogTitle id="scroll-dialog-title">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {icon && <IconButton onClick={iconClick}>
                                    <Box component="img" src={icon} />
                                </IconButton>}
                                <Typography variant="h4" color={headingColor}>
                                    {heading}
                                </Typography>
                            </Box>
                        <IconButton onClick={close}>
                            <Box component="img" src={event_cancel} />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers={true}>
                    {children}
                </DialogContent>
                <DialogActions sx={{ display: "flex", flexDirection: "column", padding: "10px 20px", justifyContent: "flex-end" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0px 0px 5px 5px", width: "100%" }}>
                        <Button type='button' variant='outlined' onClick={close}>{canceltext || 'Cancel'}</Button>
                        {action}
                    </Box>
                    {extraButton}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
