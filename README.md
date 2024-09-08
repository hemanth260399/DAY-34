<h1>Day-34 Room booking task</h1>
<ul>
  <li>In this task i have the api end points for get room details,post room details,get booking details,post booking details,get all room booked details,get customer booked details and get details of specific customer details</li>
  <<li>I have created the  post call for room creation fields you have to enter is (number_of_seats,amenitices_in_room,price_for_1hour) these fields you have to end room id created by uuid and room_status set defaults as not_booked</li>
  <li>For get the rooms details use get call for see all the room details i already added 5 room details in this task</li>
  <li>I have created the post call for booking fields you have to enter for booking are (customer_name,date,start_time,end_time,room_id) these fileds are manditory and (Room_booking_hours) is field is option i you want to set booking hours you can enter otherwise i set default it as 8 hours and i write function for room status if the end time is above the room booking hours i automatically set it as check-out if the time is below the end time room status set as check -in i write function for this
    example:start_time:13:00:00,end_time:22:00:00,room_booking_hours:10 Room_status:"check-out"
            start_time:13:00:00,end_time:14:00:00,room_booking_hours:8 Room_status:"check-in"
  </li>
    <li>In the booking i write logic when customer try to book the room with room id i will check the room_id is already booked or not if the room not_booked i will allow to book the room if the booked is already booked means i will send the error as sorry the room is already booked if customer book the room i set room_status as booked </li>
    <li>Another logic for room booking is based on room_status if the room status is check_out the room will be free and customer data is added to booking and status as check-out and room_status stay as not_booked from this we can added the old customer data also and multiple data also added</li>
    <li>If the customer checked out output is Recently Check-out by customer_name</li>
    <li>I have created the api for "/roomsbookeddata" to show all booked data with the fields(Room_name,Room_status,Customer_name,Date,Start_time,End_time) i set as room_id as name you dont specific name so i use room id as name when you call this api all customer data will display</li>
    <li>I have created the api for "/customerbookeddata" to show the all customer data with the field(Customer_name,Room_name,Date,Start_time,End_time)</li>
    <li>I have created the api "/customerbookdata/" to get a all data of the customer name i use query parameter to get the customer name and i use filter to get data from booking data and displayed with these fields(Customer_name,Room_name,Date,Start_time,End_time,Booking_id,Booking_date,Booking_status) please use customer name for filter</li>
</ul>
