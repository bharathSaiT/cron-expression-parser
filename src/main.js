#!/usr/bin/env node

const {parseCronExpression} = require('./parseCronExpression');
const {createTableBorder}  = require('./tableFormatter');

function main() {
    try{
        if (process.argv.length !== 3) {
            throw new Error(`Usage: ${process.argv[1]} <cron_expression>`);
            // console.log(`Usage: ${process.argv[1]} <cron_expression>`);
            // process.exit(1);
        }
    
        const cronExpression = process.argv[2];
        const [fields, values] = parseCronExpression(cronExpression);
    
        createTableBorder(99);
        const tableHeader = `|${'Field'.padEnd(13)}|${' Value'.padEnd(85)}|`;
        console.log(tableHeader);
        createTableBorder(99);
    
    
        for (let i = 0; i < fields.length; i++) {
            const paddedFieldName = fields[i].padEnd(14);
            const paddedValue = values[i].padEnd(85); 
            console.log(`|${paddedFieldName}${paddedValue}|`);
            
        }
        createTableBorder(99);
    }catch(error){
        if (process.env.NODE_ENV !== 'test') {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
        throw error;
    }
    
    
}



if (require.main === module) {
    main();
}

module.exports = { main };