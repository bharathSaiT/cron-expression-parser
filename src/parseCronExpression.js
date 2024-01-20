const  {expandCronField} = require('./expandCronField');

function parseCronExpression(cronExpression) {
    
    const fields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    // Split the cron expression into individual values
    const cronValues = cronExpression.split(' ');
    try{
        if(cronValues.length > 6){
            throw new Error("The cron expression doesn't have the exact expected 6 fields");
        }
        // Generate minute, hour, day of month, month, day of week values
        const expandedValues = cronValues.map((value, index) => {
            return index === 5 ? value : expandCronField(value, index);
        });

        // Return an array containing the field names and their expanded values
        return [fields, expandedValues];
    }catch(error){
        if (process.env.NODE_ENV !== 'test') {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
        throw error;
    }

}

module.exports  = {parseCronExpression};