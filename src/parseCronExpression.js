const  {expandCronField} = require('./expandCronField');
const {daysToNum} = require('./daysToNum');

function parseCronExpression(cronExpression) {
    
    const fields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    // Split the cron expression into individual values


    //usr/fnd/bin -b foo -> 3 units

    const cronValues = cronExpression.split(' ');
    try{
        // if(cronValues.length > 6){
        //     throw new Error("The cron expression doesn't have the exact expected 6 fields");
        // }

        // Generate minute, hour, day of month, month, day of week values
        const expandedValues = [];
        // cronValues.map((value, index) => {
        //     if(index <=4){
        //         return expandCronField(value, index);
        //     }
        // });
        for( let i =0 ; i<5 ;i++){
            if(i == 4){
                expandedValues.push( expandCronField( daysToNum(cronValues[i]), i) )
            }else{
                expandedValues.push(expandCronField(cronValues[i], i));
            }
            
        }

        let commandsList=[];

        for( let i =5 ; i<cronValues.length;i++){
            //commands starts at index 5
                commandsList.push(cronValues[i]);
        }
        let temp = commandsList.join(' ');
        expandedValues.push(temp);
        // console.log(commandsList);
        // console.log(expandedValues);
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