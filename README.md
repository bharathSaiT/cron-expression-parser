
# cron-expression-parser

A command line application or script which parses a cron string and expands each field to show the times at which it will run

## Deployment

1. Link the Cron Expression Parser globally using npm:

```bash
  sudo npm link
```
This makes the **cep** command available system-wide,

2. Run the Cron Expression Parser with your desired cron expression:

 ```bash
 cep <cron_expression>
 ```

Replace <cron_expression> with the specific cron string you want to parse.

Example:
```bash
cep "*/15 2 5/3 3-5 2,4 /usr/bin/find"
```

 
## Usage/Examples

A cron expression is a string conforming to a pre-defined format that tell a computer program (or a person) how often a task needs to run.


```bash
* * * * * *
| | | | | |--- command
| | | | +----- Day of the week (0 - 6) (Sunday to Saturday)
| | | +------- Month (1 - 12)
| | +--------- Day of the month (1 - 31)
| +----------- Hour (0 - 23)
+------------- Minute (0 - 59)
```
### Cron Expression Components
#### Asterisk ( * )
The asterisk indicates that the cron expression matches for all values of the field. E.g., using an asterisk in the 4th field (month) indicates every month.

####  Slash ( / )
Slashes describe increments of ranges. For example 3-59/15 in the minute field indicate the third minute of the hour and every 15 minutes thereafter. The form */... is equivalent to the form “first-last/...”, that is, an increment over the largest possible range of the field.

#### Comma ( , )
Commas are used to separate items of a list. For example, using 1,3,5 in the 5th field (day of week) means Mondays, Wednesdays and Fridays.

#### Hyphen ( - )
Hyphens define ranges. For example, 2000-2010 indicates every year between 2000 and 2010 , inclusive.

For more details on CRON expressions, you can refer to the [Wikipedia page](https://en.wikipedia.org/wiki/Cron#CRON_expression).


## Tech Stack

- Node.js
- JavaScript


## Authors

- [@bharathSaiT](https://github.com/bharathSaiT

