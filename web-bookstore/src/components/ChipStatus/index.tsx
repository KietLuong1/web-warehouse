import React from "react";
import { Chip } from "@mui/material";
import {
    HourglassEmpty as InProgressIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    RemoveCircleOutline as ClosedIcon,
} from "@mui/icons-material";

// Define statuses
export enum CustomChipStatus {
    InProgress = "in progress",
    Active = "active",
    Inactive = "inactive",
    Closed = "closed",
}

// Define custom styles 
const statusStyles: Record<CustomChipStatus, { style: React.CSSProperties; icon: JSX.Element }> = {
    [CustomChipStatus.InProgress]: {
        style: {
            backgroundColor: "#1677FF", // blue
            color: "white",
            fontWeight: "bold",
            fontSize: "0.875rem",
        },
        icon: <InProgressIcon style={{ color: "white", fontSize: "1.2rem" }} />,
    },
    [CustomChipStatus.Active]: {
        style: {
            backgroundColor: "#6DC195", // green
            color: "white",
            fontWeight: "600",
            fontSize: "0.875rem",
            padding: "0.4rem 0.8rem",
        },
        icon: <ActiveIcon style={{ color: "white", fontSize: "1.2rem" }} />,
    },
    [CustomChipStatus.Inactive]: {
        style: {
            backgroundColor: "#E0282E", // red
            color: "white",
            fontWeight: "normal",
            fontSize: "0.875rem",
            padding: "0.4rem 0.8rem",
        },
        icon: <InactiveIcon style={{ color: "white", fontSize: "1.2rem" }} />,
    },
    [CustomChipStatus.Closed]: {
        style: {
            backgroundColor: "#5C636A", // grey
            color: "white",
            fontWeight: "lighter",
            fontSize: "0.875rem",
            padding: "0.4rem 0.8rem",
        },
        icon: <ClosedIcon style={{ color: "white", fontSize: "1.2rem" }} />,
    },
};

// Define props 
interface StatusChipProps {
    status: CustomChipStatus;
}

// Define the CustomChipStatus component
const ChipStatus: React.FC<StatusChipProps> = ({ status }) => {
    const { style, icon } = statusStyles[status];

    return (
        <Chip
            label={status}
            icon={icon}
            sx={{
                ...style,
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
            }}
        />
    );
};

export default ChipStatus;
