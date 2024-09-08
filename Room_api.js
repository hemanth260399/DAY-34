import express from "express"
import { v4 } from "uuid"
import { rooms, booking } from "./rooms.js";
import { bookingstatus, mergedata } from "./function.js";
let server = express()
server.use(express.json())
// Get all details of the rooms
server.get("/rooms", (req, res) => {
    res.json(rooms)
})
// Post method to create the room please enter the fields [room_name,number_of_seats,amenitices_in_room,price_for_1hour]
server.post("/rooms", (req, res) => {
    let roomdata = req.body
    rooms.push({
        room_id: v4(),
        room_status: "not_booked",
        ...roomdata
    })
    res.status(201).json({ "msg": "Room created successfully" })
})
// Get all details of the booking and customer
server.get("/booking", (req, res) => {
    res.json(booking)
})
// Post method to create the booking and customer please enter the fields [customer_name,date,start_time,end_time,room_id]
server.post("/booking", (req, res) => {
    let bookingdata = req.body
    let roomdata = rooms.find((data) => data.room_id === bookingdata.room_id)
    if (roomdata.room_status == "booked") {
        res.json({ msg: "sorry this room already booked" })
    }
    else {
        let roombookstatus = bookingstatus(bookingdata.start_time, bookingdata.end_time, bookingdata.Room_booking_hours)
        booking.push({
            ...bookingdata,
            booking_id: v4(),
            booking_status: roombookstatus,
            Room_booking_hours: 8
        })
        if (roombookstatus === "check-in") {
            let tempdata = rooms.findIndex((data) => data.room_id === roomdata.room_id)
            if (tempdata !== -1) {
                rooms[tempdata].room_status = "booked"
            }
        }
        if (roombookstatus === "check-in") {
            res.status(201).json({ msg: "Room Booked" })
        } else {
            res.status(201).json({ msg: `Recently Check-out by ${bookingdata.customer_name}` })
        }
    }
})
// Get all details of the room booked data with field
server.get("/roomsbookeddata", (req, res) => {
    let tempdata = []
    let currentmergedata = mergedata()
    currentmergedata.forEach((data) => {
        tempdata.push({
            "Room_name": data.room_id,
            "Room_status": data.booking_status,
            "Customer_name": data.customer_name,
            "Date": data.date,
            "Start_time": data.start_time,
            "End_time": data.end_time
        })
    })
    res.json(tempdata)
})
// Get all details of the customer booked data with field
server.get("/customerbookeddata", (req, res) => {
    let tempdata = []
    let currentmergedata = mergedata()
    currentmergedata.forEach((data) => {
        tempdata.push({
            "Customer_name": data.customer_name,
            "Room_name": data.room_id,
            "Date": data.date,
            "Start_time": data.start_time,
            "End_time": data.end_time,
        })
    })
    res.json(tempdata)
})
// Get all detail of customer checked IN
server.get("/customerbookdata/", (req, res) => {
    let name = req.query
    let availname = booking.find((data) => data.customer_name === name.customer_name)
    if (availname) {
        let currentmergedata = mergedata()
        let filterdata = currentmergedata.filter((data) => data.customer_name === name.customer_name)
        let tempdata = []
        filterdata.forEach((data) => {
            tempdata.push({
                "Customer_name": data.customer_name,
                "Room_name": data.room_id,
                "Date": data.date,
                "Start_time": data.start_time,
                "End_time": data.end_time,
                "Booking_id": data.booking_id,
                "Booking_date": data.date,
                "Booking_status": data.booking_status
            })
        })
        res.json(tempdata)
    }
    else {
        res.status(404).json({ msg: "Customer not found" })
    }

})
let port = 7777
server.listen(port, () => {
    console.log("server Running")
})