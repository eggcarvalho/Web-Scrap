import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import $ from "jquery";
import "jquery-mask-plugin";

function TextfieldMaskedComponent({
    label,
    placeholder,
    required = false,
    mask,
    value = "",
    onchange = () => {},
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            $(inputRef.current).mask(mask);

            $(inputRef.current).on("input", function () {
                onchange(this.value);
            });
        }
    }, [mask, onchange]);

    return (
        <TextField
            label={label}
            fullWidth
            required={required}
            title={label}
            placeholder={placeholder}
            inputRef={inputRef}
            defaultValue={value}
            variant="outlined"
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "0.8rem",
                    color: "hsl(222 47% 11%))",
                    "& fieldset": {
                        border: "1px solid rgb(228, 228, 231);",
                    },
                },
            }}
        />
    );
}

export default TextfieldMaskedComponent;
