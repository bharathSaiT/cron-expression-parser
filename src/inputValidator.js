
// Function to get the field name based on the field index
function getFieldName(index) {
    const fields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    return fields[index];
}

// Function to check the validity of an entry in the cron field
function checkValidEntry(entry , fieldIndex ){
    try{
        const numericValue = Number(entry);

        if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
            throw new Error(`Entry for ${getFieldName(fieldIndex)} field should be a valid numerical value`);
        }
        // Define upper limits for each field
        const upperLimits = [59, 23, 31, 12, 7];

        if(entry < 0 || entry > upperLimits[fieldIndex]){
            throw new Error(`Entry for ${getFieldName(fieldIndex)} field should be in the range of 0-${upperLimits[fieldIndex]}`);
            // console.log(`Entry for ${getFieldName(fieldIndex)} field should be in the range of 0-${upperLimits[fieldIndex]}`);
            // process.exit(1); // Terminate the program with an error code
        } 

    }catch (error) {   
            if (process.env.NODE_ENV !== 'test') {
                console.error(`Error: ${error.message}`);
                process.exit(1);
            }
            throw error;
    }
       
}

module.exports = {checkValidEntry}