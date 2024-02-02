const {checkValidEntry} = require('./inputValidator')

function expandCronField(cronFieldValue, index) {
    let result = [];
    const fieldIndex = index;
    // Check if there is any interval specified in the cron field
    const intervalCheck =  cronFieldValue.includes('/');
    // Destructure the cron field into its components, considering the possibility of an interval
    const [cronField, frequency = 1] = (intervalCheck ? cronFieldValue.split('/') : [cronFieldValue]);

    const data = cronField.includes(',') ? cronField.split(',') : [cronField];

    data.forEach(entry => {

        // Determine if the entry represents a range
        if (entry.includes('-')) {
            // Expand the range and update the result array
            result =  fieldWithRange(entry , intervalCheck, frequency, fieldIndex);
        } 
        else {
            // Process the entry  and update the result array
            result =  fieldWithoutRange(entry , intervalCheck, frequency, fieldIndex);
        }
    });

    // Special case for the day of the week (convert 7 to 0 for Sunday)
    if (index === 4) {
        result.forEach((day, i, arr) => arr[i] = (day === '7') ? '0' : day);
        // result.sort();
        result = [...new Set(result)];
    }

    return result.join(' ');
}

// Function to handle cron field entries with a range
function fieldWithRange(entry , intervalCheck ,frequency, fieldIndex){
    const result =[];
    const [start, end] = entry.split('-').map(Number);
    console.log(start ,end);

    //start < end >>all good
    //start > end 
        // start - upperlimit
        // = - end
    
    // Check the validity of entry in the cron expression
    checkValidEntry(start , fieldIndex );
    checkValidEntry(end , fieldIndex );
    if(start <= end){
        for (let i = start; i <= end; i=i+ Number(frequency)) {
            result.push(i.toString());
        }
        return result;
    }
    else{
        for (let i = start; i <= 7; i=i+ Number(frequency)) {
            result.push(i.toString());
        }
        for (let i = 0; i <= end; i=i+ Number(frequency)) {
            result.push(i.toString());
        }
        return result;
    }
    
}

// Function to handle cron field entries without a range
function fieldWithoutRange(entry , intervalCheck ,frequency, fieldIndex){
    const result =[];
    if(intervalCheck || entry.includes('*')){
         // Determine the upper limit based on the field index
        const upperLimits = [59, 23, 31, 12, 7];
        const limit = upperLimits[fieldIndex];
        // If entry is '*', set it to 0
        entry = entry.includes('*') ? Number(0) : Number(entry);
        // Check the validity of entry in the cron expression
        checkValidEntry(entry , fieldIndex );
        for(let i = Number(entry);i<=limit ;i=i+Number(frequency)){
            result.push(i.toString());
        }
    }else{
        // Check the validity of entry in the cron expression
        checkValidEntry(entry , fieldIndex );
        // If there is no interval and the entry is a single value, add it to the result array
        result.push(entry);
    }
    return result;
}

module.exports = {expandCronField}