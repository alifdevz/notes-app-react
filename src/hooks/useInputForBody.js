import React from "react";
import { useState } from "react";

function useInputForBody(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);
    const onValueChangeHandler = (event) => {
        setValue(event.target.innerHTML);
    }
    return [value, onValueChangeHandler];
}

export default useInputForBody;