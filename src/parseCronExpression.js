#!/usr/bin/env node

const  {expandCronField} = require('./expandCronField');

function parseCronExpression(cronExpression) {
    
    const fields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    // Split the cron expression into individual values
    const cronValues = cronExpression.split(' ');

    if(cronValues.length > 6){
        console.error("The cron expression doesn't have the exact expected 6 fields");
        process.exit(1);
    }
    
    // Generate minute, hour, day of month, month, day of week values
    const expandedValues = cronValues.map((value, index) => {
        return index === 5 ? value : expandCronField(value, index);
    });

    // Return an array containing the field names and their expanded values
    return [fields, expandedValues];
}


module.exports  = {parseCronExpression};