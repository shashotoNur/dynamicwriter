//--------------- Log with typewriter effect in the console --------------

/*
    import it via es5 syntax:
        const { pause, writer, dynamicWriter } = require("./writer");
*/


const pause = (time = 0) =>
    {
        return new Promise( (resolve) =>
            {
                setTimeout(() => { resolve(); }, ( time >= 0 ) ? time : 0);
            });
    };

const logErr = (numOfArr, str, i) =>
    {
        const errorTxt =
            [
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
            ]

        var currentErr = errorTxt[numOfArr];
        process.stdout.write("\n\x1b[31mError: ");
        currentErr.forEach( (element) =>
        {
            process.stdout.write("\x1b[31m" + element);
        });
    }

const writer = async (str, time = 50) =>
    {
        if( typeof str === "string" && typeof time === "number" )
        {
            const logEachChar = async ( char ) =>
            {
                await pause(time);
                process.stdout.write( char );
                return Promise.resolve();
            };

            var arr = str.split("");
            for (var i = 0; i < str.length; i++)
            {
                await logEachChar(arr[i]);
            }
        }
        else logErr(0);

        return Promise.resolve();
    };


async function dynamicWriter()
    {

        async function logPartialStr( arr )
        {
            end  = (oneLastCycle || arr[0] == 'end//') ? str.length
                               : ( str.search( arr[0] ) + arr[0].length );
            time = (oneLastCycle) ? 50 
                               : arr[1];

            partialStr = str.slice(start, end);
            await writer(partialStr, time);
            return Promise.resolve();
        }

        if( arguments.length > 1 )
        {
            var str = arguments[0], start, end, time, partialStr, oneLastCycle = false;

            for(var i = 1; i < ( arguments.length ); i++)
            {
                if(i == 1) { start = 0; }
                var arr = arguments[i];

                if( str.search( arr[0] ) == -1 && arr[0] != 'end//' )
                {
                    logErr(1, arr[0], i);
                    i = arguments.length;
                }
                else await logPartialStr( arr );

                start = end;
            }

            if( end != -1 && end < str.length )
            {
                oneLastCycle = true;
                await logPartialStr();
            }
        }
        else logErr(2);

        return Promise.resolve();        
    }


exports.pause = pause;
exports.writer = writer;
exports.dynamicWriter = dynamicWriter;