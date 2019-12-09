import React, { Component } from "react";
import firebase from "../../../../config/firebase";
import moment from "moment";
import loader from "../../../../Assets/loader.gif";
import parking from "../../../../Assets/parking.jpg";

class ViewBookings extends Component {
  state = {
    loading: true
  };

  componentDidMount = async () => {
    let slots = await firebase.getSlots();
    console.log(slots);

    let slotsArr = [];

    slots.map(slot => {
      slot.slots.map(slot => slotsArr.push(slot));
    });
    this.setState({ slotsArr, loading: false });
  };

  deleteBooking = async () => {
    console.log("delete booking func");
    let slots = await firebase.getSlots();
    console.log(slots);

    let currDate = moment(new Date());
    console.log(currDate);

    let newSlot = [];
    slots.map(slot => {
      let slotArr = [];
      let slotName = slot.slotName;
      slot.slots.filter(slot => {
        // console.log(slot.parkingStartTime.seconds);
        console.log(moment(slot.parkingStartTime.seconds * 1000));
        console.log(currDate < moment(slot.parkingStartTime.seconds * 1000));
        return currDate < moment(slot.parkingStartTime.seconds * 1000)
          ? slotArr.push(slot)
          : null;
      });
      newSlot.push({ slot: slotArr, slotName });
    });
    console.log("newSlot", newSlot);
    newSlot.map(slot => {
      console.log(slot);
      firebase.updateSlots(slot.slotName, slot.slot);
    });
  };

  render() {
    return (
      <div>
        <h1>View Bookings</h1>
        <button onClick={() => this.deleteBooking()}>
          Delete Expired Bookings
        </button>
        {this.state.loading ? (
          <div style={{ display: "flex", margin: "0 auto" }}>
            <img src={loader} style={{ margin: "0 auto" }} />
          </div>
        ) : null}
        {this.state.slotsArr
          ? this.state.slotsArr.map((slots, index) => {
              // slots.slots.map(slot => {

              console.log(
                "Booking Date=>",
                moment(slots.date.seconds * 1000).format("MM-DD-YYYY")
              );
              console.log(
                "parkingST=>",
                moment(slots.parkingStartTime.seconds * 1000).format(
                  "MM-DD-YYYY HH:mm:ss"
                )
              );
              console.log(
                "parkingET=>",
                moment(slots.parkingEndTime.seconds * 1000).format(
                  "MM-DD-YYYY HH:mm:ss"
                )
              );
              return (
                <div
                  className="col s12 m7"
                  style={{
                    width: "500px",
                    margin: "0 auto"
                  }}
                  key={index}
                >
                  <div className="card horizontal">
                    <div className="card-image">
                      <img src={parking} style={{ height: "200px" }} />
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            UserId:
                          </span>
                          {slots.uid}
                        </div>
                        <div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            Booking Date:
                          </span>
                          {moment(slots.date.seconds * 1000).format(
                            "DD-MM-YYYY"
                          )}
                        </div>
                        <div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            Parking Start Time:
                          </span>
                          {moment(slots.parkingStartTime.seconds * 1000).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </div>
                        <div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            Parking End Time:
                          </span>
                          {moment(slots.parkingEndTime.seconds * 1000).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </div>
                      </div>
                      <div className="card-action">
                        <a href="#">This is a link</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default ViewBookings;
