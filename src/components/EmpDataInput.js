import React from 'react'
import { TextField } from "@mui/material";


const EmpDataInput = ({field, handleInputChange, formData, formErrors}) => {
    const inputType = ["salary", "nicNumber", "contact"].includes(field.key)
    ? "number"
    : "text";
  return (
    <div key={field.key}>
            <TextField
              required={field.key === 'lastName' ? false : true}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="dense"
              type = {inputType}
              value={formData[field.key]} // Bind value to state
              onChange={(e) => handleInputChange(e, field.key)} // Handle input change
              error={!!formErrors[field.key]} // Show error if validation failed
              helperText={formErrors[field.key]} // Display error message
              sx={{
                input: { backgroundColor: "#ffffff", borderRadius: "5px" },
              }}
            />
          </div>
  )
}

export default EmpDataInput