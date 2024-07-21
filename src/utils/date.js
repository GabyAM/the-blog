const units = [
    { name: 'second', seconds: 1 },
    { name: 'minute', seconds: 60 },
    { name: 'hour', seconds: 60 * 60 },
    { name: 'day', seconds: 60 * 60 * 24 },
    { name: 'week', seconds: 60 * 60 * 24 * 7 },
    { name: 'month', seconds: 60 * 60 * 24 * (365 / 12) },
    { name: 'year', seconds: 60 * 60 * 24 * 365 }
];

export function formatDateToDistance(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    let difference = Math.floor((currentDate - inputDate) / 1000);
    for (let i = units.length - 1; i >= 0; i--) {
        if (difference >= units[i].seconds) {
            const count = Math.floor(difference / units[i].seconds);
            // console.log(count + ' ' + units[i].name + (count !== 1 ? 's' : ''));
            return (
                count + ' ' + units[i].name + (count !== 1 ? 's' : '') + ' ago'
            );
        }
    }
    // console.log('just now');
    return 'just now';

    // if (difference === 0) return 'now';
    // if (difference < 60) {
    //     let string = difference + ' second';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = Math.floor(difference / 60);
    // if (difference < 60) {
    //     let string = difference + ' minute';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = Math.floor(difference / 60);
    // if (difference < 24) {
    //     let string = difference + ' hour';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = Math.floor(difference / 24);
    // if (difference < 7) {
    //     let string = difference + ' day';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = difference / 7;
    // if (difference < 30 / 7) {
    //     let string = difference + ' week';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = Math.floor(difference / 4);
    // if (difference < 12) {
    //     let string = difference + ' month';
    //     if (difference > 1) string += 's';
    //     console.log(string);
    //     return string;
    // }
    // difference = Math.floor(difference / 12);
    // let string = difference + ' year';
    // if (difference > 1) string += 's';
    // console.log(string);
    // return string;
}

/*
formatDate('2024-07-20T21:47:26.622Z');
formatDate('2024-07-19T13:05:56.532Z');
formatDate(Date.now()); // just now
formatDate(Date.now() - 1000); // 1 second
formatDate(Date.now() - 1000 * 60); // 1 minute
formatDate(Date.now() - 1000 * 60 * 60); // 1 hour
formatDate(Date.now() - 1000 * 60 * 60 * 24); // 1 day
formatDate(Date.now() - 1000 * 60 * 60 * 24 * 7); // 1 week
formatDate(Date.now() - 1000 * 60 * 60 * 24 * 365); // 1 year

formatDate(Date.now() - 1000 * 60 * 59); // 59 minutes
formatDate(Date.now() - 1000 * 60 * 60 * 3); // 3 hours
formatDate(Date.now() - 1000 * 60 * 60 * 24 * 6); // 6 days
formatDate(Date.now() - 1000 * 60 * 60 * 24 * 365 * 14); //14 years

formatDate(Date.now() - 1000 * 60 * 30.3); // 30 minutes
formatDate(Date.now() - 1000 * 60 * 60 * 24 * 7.5); // 1 week
formatDate(Date.now() - 1000 * 60 * 60 * 23.975); // 23 hours

formatDate(Date.now() - 1000 * 60 * 60 * 24 * 7 * 4); // 4 weeks
*/
