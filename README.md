# What is this?

A program to log statements to the nodejs terminal with typewriter effect.

## Installation

Run `npm i dynamicwriter`

## Use

```javascript

import { dynamicwriter, writer } from 'dynamicwriter';

(async () => {
    await writer('logging first statement...\n', 100);

    await dynamicwriter('logging second statement dynamically...\n', [" ", 50], ["statement", 400], ["end//", 10]);

    await dynamicwriter('logging third statement with slow ending...', [" ", 100], ["with", 10], ["slow", 400]);
})();

```

## Parameters

The writer is a much simple function which accepts two parameters, first is the string that is to be logged and the second is the time period to log each character of the string. The default value of the time period is 50 ms.

Note: In the above example, a string has been provided as first argument. writer will log each character every 100 ms till the last character in the string.

The dynamicwriter accepts a string as first parameter, followed by one or more arrays of two elements, each of which defines the word inside the provided string upto which the dynamicwriter has to log with a certain pace.
dynamicwriter divides the provided string into sub strings as per the arguments and utilizes the writer to log each sub string.
The first element of the array can be set as '`end//`' which specifies the that upto the last character of the string will be logged as per the time period which will be specified in the next element.

Note: In the second example, a string has been provided followed by arrays. As specified, dynamicWriter will log each character every 50 ms upto the first '` `' (space) , then each character every 150 ms upto the first  '`statement`' and finally each character every 10 ms till the last character in the string.
In the third example, the words will be logged as specified, only after '`slow`' to the end will be logged with default time (50 ms).

## Caution

Both dynamicWriter and writer returns as promise and therefore they are to be awaited to avoid any other logging statements before either of the function is completed.\

