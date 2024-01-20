#!/usr/bin/env node

function parseCronExpression(cronExpression) {
    
    const fields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    const cronValues = cronExpression.split(' ');

    // Generate minute, hour, day of month, month, day of week values
    const expandedValues = cronValues.map((value, index) => {
        return index === 5 ? value : expandCronField(value, index);
    });

    return [fields, expandedValues];
}

//cronFieldValues :
// can have single value  , can have a range (-):  which can have frequency
//can have list of values seperate by comma
//can have an *


function expandCronField(cronFieldValue, index) {
    const result = [];
    const intervalCheck =  cronFieldValue.includes('/');
    const cronFields = intervalCheck ? cronFieldValue.split('/') : [cronFieldValue];
    //set the frequency if avialable
    const frequency = (cronFields[1] || 1);
    //get the values : single value or list of values or range of values
    const range = cronFields[0].includes(',')?cronFields[0].split(',') : [cronFields[0]];
   
    range.forEach(entry => {
        if (entry.includes('-')) {
            const [start, end] = entry.split('-').map(Number);
            for (let i = start; i <= end; i=i+ Number(frequency)) {
                result.push(i.toString());
            }
        } else {
            if(intervalCheck || entry.includes('*')){
                const upperLimits = [59, 23, 31, 12, 7];
                const limit = upperLimits[index];
                if(entry.includes('*')){
                    entry = Number(0);
                }
                for(let i = Number(entry);i<=limit ;i=i+Number(frequency)){
                    result.push(i.toString());
                }
            }else{
                result.push(entry);
            }
        }
    });

    // Special case for the day of the week (convert 7 to 0 for Sunday)
    if (index === 4) {
        result.forEach((day, i, arr) => arr[i] = (day === '7') ? '0' : day);
        result.sort();
    }

    return result.join(' ');
}

function main() {
    // console.log(process.argv);
    if (process.argv.length !== 3) {
        console.log(`Usage: ${process.argv[1]} <cron_expression>`);
        process.exit(1);
    }

    const cronExpression = process.argv[2];
    const [fields, values] = parseCronExpression(cronExpression);

    // console.log(fields);
    // console.log(values);

    // const table = values.map((value, index) => [fields[index]].concat(value.split(' ')));
    // console.table(table);

    createTableBorder(99);
    const tableHeader = `|${'Field'.padEnd(13)}|${' Value'.padEnd(85)}|`;
    // console.log('| Field       | Value                                                                               |');
    console.log(tableHeader);
    createTableBorder(99);


    for (let i = 0; i < fields.length; i++) {
        const paddedFieldName = fields[i].padEnd(14);
        const paddedValue = values[i].padEnd(85); 
        console.log(`|${paddedFieldName}${paddedValue}|`);
        
    }
    createTableBorder(99);


    

}

function createTableBorder(width) {
    const horizontalLine = '-'.repeat(width);
    console.log(`+${horizontalLine}+`);
}

if (require.main === module) {
    main();
}
