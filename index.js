
//--------------- Log with typewriter effect in the terminal console --------------


const pause = (time = 0) => {
    return new Promise(resolve => {
        setTimeout(() => { resolve(); }, ( time >= 0 ) ? time : 0);
    });
};

const logErr = (errToBeLogged, str, i) => {
    const errorTxt = [
        [
            "\n\twriter() takes a string as first parameter,",
            "\n\tand optionally the time period to log each character."
        ],

        [
            `\n\tthe string,`,
            `\n\t => "${str}"`,
            `\n\tpassed through argument no. ${i},`,
            `\n\tdoes not exist within the main string`
        ],

        [
            "\n\tdynamicWriter() takes a string as first parameter,",
            "\n\tfollowed by greater than 0 number of arrays of two elements",
            "\n\twhich define the final word of the partial string",
            "\n\tand the time perod to log each character."
        ]
    ];

    const currentErr = errorTxt[errToBeLogged];
    process.stdout.write("\n\x1b[31mError: ");

    currentErr.forEach(element => {
        process.stdout.write("\x1b[31m" + element);
    });
};

const writer = async (str, time = 50) => {
    if( typeof str === "string" && typeof time === "number" )
    {
        const logEachChar = async character => {
            await pause(time);

            process.stdout.write(character);
            return Promise.resolve();
        };

        var arr = str.split("");
        for (var i = 0; i < str.length; i++) {
            await logEachChar(arr[i]);
        };
    }
    else logErr(0);

    return Promise.resolve();
};


async function dynamicwriter () {
    const logPartialStr = async arr => {
        end  = (oneLastCycle || arr[0] == 'end//') ? str.length
                           : ( str.search( arr[0] ) + arr[0].length );
        const time = oneLastCycle ? 50 : arr[1];

        const partialStr = str.slice(start, end);
        await writer(partialStr, time);
        return Promise.resolve();
    };

    if( arguments.length > 1 ) {
        var str = arguments[0], start, end, oneLastCycle = false;

        for(var runningArr = 1; runningArr < ( arguments.length ); runningArr++) {
            var arr = arguments[runningArr];
            if(runningArr == 1) start = 0;

            if( str.search( arr[0] ) == -1 && arr[0] != 'end//' ) {
                logErr(1, arr[0], runningArr);
                runningArr = arguments.length;
            }
            else await logPartialStr(arr);

            start = end;
        };

        if( end != -1 && end < str.length ) {
            oneLastCycle = true;
            await logPartialStr();
        };
    }
    else logErr(2);

    return Promise.resolve();        
};

export { dynamicwriter, writer };
