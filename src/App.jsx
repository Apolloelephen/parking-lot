import React, { useState } from 'react';
import './App.css';

const App = () => {
  const smallSlotsCount = 10;
  const totalSlots = 15;
  const smallVehicleFee = 60;
  const bigVehicleFee = 100;
  const extraFeePerHour = 15;
  const maxParkingTimeMinutes = 30;

  const [smallVehicleSlots, setSmallVehicleSlots] = useState(Array(smallSlotsCount).fill(false));
  const [bigVehicleSlots, setBigVehicleSlots] = useState(Array(totalSlots - smallSlotsCount).fill(false));
  const [bookingStatus, setBookingStatus] = useState(Array(totalSlots).fill(''));
  const [totalCollectedAmount, setTotalCollectedAmount] = useState(0);

  const handleSlotClick = (slotIndex, isSmallVehicleSlot) => {
    const isSlotAvailable = isSmallVehicleSlot ? !smallVehicleSlots[slotIndex] : !bigVehicleSlots[slotIndex - smallSlotsCount];
    if (isSlotAvailable) {
      const updatedBookingStatus = [...bookingStatus];
      updatedBookingStatus[slotIndex] = 'Booked';
      setBookingStatus(updatedBookingStatus);

      if (isSmallVehicleSlot) {
        const updatedSmallVehicleSlots = [...smallVehicleSlots];
        updatedSmallVehicleSlots[slotIndex] = true;
        setSmallVehicleSlots(updatedSmallVehicleSlots);
      } else {
        const updatedBigVehicleSlots = [...bigVehicleSlots];
        updatedBigVehicleSlots[slotIndex - smallSlotsCount] = true;
        setBigVehicleSlots(updatedBigVehicleSlots);
      }

      const parkedTimeInMinutes = calculateParkedTimeInMinutes();
      const totalCharge = calculateTotalCharge(parkedTimeInMinutes, isSmallVehicleSlot);
      setTotalCollectedAmount(totalCollectedAmount + totalCharge);

      alert(`Amount charged: ${totalCharge} USD`);
    }
  };

  const handleExit = (slotIndex, isSmallVehicleSlot) => {
    const updatedBookingStatus = [...bookingStatus];
    updatedBookingStatus[slotIndex] = '';
    setBookingStatus(updatedBookingStatus);

    const parkedTimeInMinutes = calculateParkedTimeInMinutes();
    const totalCharge = calculateTotalCharge(parkedTimeInMinutes, isSmallVehicleSlot);
    setTotalCollectedAmount(totalCollectedAmount + totalCharge);

    if (isSmallVehicleSlot) {
      const updatedSmallVehicleSlots = [...smallVehicleSlots];
      updatedSmallVehicleSlots[slotIndex] = false;
      setSmallVehicleSlots(updatedSmallVehicleSlots);
    } else {
      const updatedBigVehicleSlots = [...bigVehicleSlots];
      updatedBigVehicleSlots[slotIndex - smallSlotsCount] = false;
      setBigVehicleSlots(updatedBigVehicleSlots);
    }

    alert(`Total charge owed: ${totalCharge} USD`);
  };

  const calculateParkedTimeInMinutes = () => {
    // Generate a random parked time for demonstration purposes
    return Math.floor(Math.random() * 120);
  };

  const calculateTotalCharge = (parkedTimeInMinutes, isSmallVehicleSlot) => {
    let totalCharge = isSmallVehicleSlot ? smallVehicleFee : bigVehicleFee;

    if (parkedTimeInMinutes > maxParkingTimeMinutes) {
      const extraHours = Math.ceil((parkedTimeInMinutes - maxParkingTimeMinutes) / 60);
      totalCharge += extraHours * extraFeePerHour;
    }

    return totalCharge;
  };

  return (
    <div className="App">
      <h1>Parking Lot Management System</h1>
      <div className="parking-lot">
        <div className="small-vehicle-section">
          <h2>Small Vehicle Section</h2><br/>
          {smallVehicleSlots.map((slot, index) => (
            <div
              key={index}
              className={`parking-slot ${smallVehicleSlots[index] ? 'booked' : ''}`}
              onClick={() => handleSlotClick(index, true)}
            >
              Slot {index + 1}
            </div>
          ))}
        </div>
        <div className="big-vehicle-section">
          <h2>Big Vehicle Section</h2><br/>
          {bigVehicleSlots.map((slot, index) => (
            <div
              key={index + smallSlotsCount}
              className={`parking-slot ${bigVehicleSlots[index] ? 'booked' : ''}`}
              onClick={() => handleSlotClick(index + smallSlotsCount, false)}
            >
              Slot {index + smallSlotsCount + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="booking-screen">
        <h2>Booking Status</h2>
        <ul>
          {bookingStatus.map((status, index) => (
            <li key={index}>Slot {index + 1}: {status}</li>
          ))}
        </ul>
      </div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="total-collected-amount">
          Total Collected Amount: {totalCollectedAmount} USD
        </div>
      </div>
      <button onClick={() => handleExit(0, true)}>Exit Slot 1 (Small Vehicle)</button>
      <button onClick={() => handleExit(1, false)}>Exit Slot 2 (Big Vehicle)</button>
      {/* Add buttons for other slots as needed */}
    </div>
  );
};

export default App;