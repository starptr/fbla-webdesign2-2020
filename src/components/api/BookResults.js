import airports from './airports.json'

const charCodeSum = (str) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

const chaos = (date_noTime, str) => {
    return Math.floor(date_noTime / 1000000) % 1000 + charCodeSum(str);
}

const chaoses = (date, str, ct) => {
    //console.log({date, str, ct});
    let arrChaos = [];
    for (let i = 0; i < ct; i++) {
        let cur_date_noTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);   
        arrChaos.push(chaos(cur_date_noTime, str));
    }
    return arrChaos;
}

const haversineDistance = (coords1, coords2, isMiles) => {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coords1[0];
    var lat1 = coords1[1];

    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;

    return d;
}

const Main = (query) => {
    //?dateStart=1583049600000&dateEnd=1583136000000&ctPassengers=1&isRoundTrip=true&portStart=SFO&portEnd=SAN
    //?dateStart=1583049600000&dateEnd=1583136000000&ctPassengers=1&isRoundTrip=true&portStart=SFO&portEnd=LAS
    //?dateStart=1584687600000&dateEnd=1584774000000&ctPassengers=1&isRoundTrip=true&portStart=SFO&portEnd=LAS
    const args_str = query;
    const dateStart = args_str.date.valueOf();
    const ctPassengers = parseInt(args_str.ctPassengers);
    const portStart = args_str.portStart;
    const portEnd = args_str.portEnd;

    //console.log({ dateStart, ctPassengers, portStart, portEnd });
    const speed = 520; //mph

    const arrChaos = chaoses(new Date(dateStart), portStart, 4);

    //console.log(arrChaos);

    let flights = [];

    for (let x of arrChaos) {
        let dept_hour = x % 24;
        let dept_minute = Math.floor(x / 10) % 60;

        let indexStart;
        let indexEnd;
        for (let i = 0; i < airports.length; i++) {
            if (airports[i].local_code === portStart) indexStart = i;
            if (airports[i].local_code === portEnd) indexEnd = i;
        }
        let distance_mi = haversineDistance(
            [airports[indexStart].longitude_deg, airports[indexStart].latitude_deg],
            [airports[indexEnd].longitude_deg, airports[indexEnd].latitude_deg],
            true);
        let price_cents = Math.floor((5000 + distance_mi * 12 + dept_minute * 10) * 1.075);
        let vehicle = "A320";
        let vehicle_long = "Airbus A320";

        let time_minutes = Math.round((distance_mi / speed) * 60) + 40;

        flights.push({
            "dept_hour": dept_hour,
            "dept_minute": dept_minute,
            "timeInMinutes": time_minutes,
            "dist_mi": distance_mi,
            "price_cents": price_cents,
            "vehicalName": vehicle,
            "vehicalName_long": vehicle_long,
        });
    }

    flights.sort((a, b) => {
        let a_dept_military = a.dept_hour * 100 + a.dept_minute;
        let b_dept_military = b.dept_hour * 100 + b.dept_minute;
        return a_dept_military - b_dept_military;
    });

	return flights;
};

export default Main;