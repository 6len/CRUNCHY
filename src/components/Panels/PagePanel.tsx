import * as React from "react";

type Props = {
    children: React.ReactNode;
    value: number;
    index: number;
}
const PagePanel = ({children, value, index}: Props) => (
    <div hidden={value !== index}>
        {value === index && children}
    </div>
)

export default PagePanel;
