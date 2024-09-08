import { rooms, booking } from "./rooms.js";
export let bookingstatus = (starttime, endtime, Booking_hours = 8) => {
    starttime = starttime.split(":")[0]
    endtime = endtime.split(":")[0]
    let totalhours = endtime - starttime
    if (totalhours < 0) {
        totalhours += 24
    }
    if (totalhours >= Booking_hours) {
        return "check-out"
    } else {
        return "check-in"
    }
}
export let mergedata = () => {
    let mergetemparray = []
    booking.map((data) => {
        rooms.map((rdata) => {
            if (rdata.room_id == data.room_id) {
                let temparray = { ...rdata, ...data }
                mergetemparray.push(temparray)
            }
        })
    })
    return (mergetemparray)
}