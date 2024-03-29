import React, { Component } from "react";
import firebase from "../../../../config/firebase";
import Swal from "sweetalert2";
import moment from "moment";

class BookParking extends Component {
  state = {
    showSlots: false
  };

  handleChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  renderShowSlot = () => {
    let { start_date, start_time, time_duration } = this.state;
    if (start_date && start_time) {
      this.setState({ showSlots: true });
    } else {
      Swal.fire("Please fill all the fields");
    }
  };

  submit = async () => {
    console.log(this.state);

    const data = this.state;

    let { start_date, start_time, time_duration } = this.state;

    console.log("start_date=>", start_date);

    let m = moment(`${start_date} ${start_time}:00`);

    let currDate = moment(new Date());

    console.log(m.diff(currDate));
    var checkPast = m.diff(currDate);
    if (checkPast > 0) {
      let parkingStartTime = m.toString();
      console.log("starttime=>", parkingStartTime);

      let parkingEndTime = moment(parkingStartTime).add(time_duration, "h");
      parkingEndTime = parkingEndTime.toString();
      console.log("endtime=>", parkingEndTime);

      data.parkingStartTime = parkingStartTime;
      data.parkingEndTime = parkingEndTime;
      await firebase.setSlots(data);
      Swal.fire("Success", "Successfully Booked a Parking Slot", "success");
      this.setState({
        start_date: "",
        start_time: "",
        time_duration: "",
        showSlots: false
      });
    } else {
      Swal.fire("Warning", "Please Enter Future Date", "warning");
    }
  };

  componentDidMount = async () => {
    let slots = await firebase.getSlots();
    console.log(slots);
    this.setState({ slots: slots });
  };

  renderSlots = () => {
    const { slots, start_date, start_time, time_duration } = this.state;
    console.log(slots);

    let startDate = moment(new Date(start_date).getTime()).format(
      "MM-DD-YYYY HH:mm:ss"
    );

    let slotSet = new Set();

    let valuesOfSets;

    slots.map(slot1 =>
      slot1.slots.map((slot, index) => {
        console.log(slot);
        let slotTimeEnd = moment(slot.parkingEndTime.seconds * 1000).format(
          "MM-DD-YYYY HH:mm:ss"
        );

        let slotTimeStart = moment(slot.parkingStartTime.seconds * 1000).format(
          "MM-DD-YYYY HH:mm:ss"
        );

        startDate = moment(new Date(start_date).getTime())
          .hour(start_time)
          .format("MM-DD-YYYY HH:mm:ss");

        console.log("startDate", startDate);

        let endDate = moment(new Date(start_date).getTime())
          .hour(start_time)
          .add(time_duration, "h")
          .format("MM-DD-YYYY HH:mm:ss");

        console.log("endDate=>", endDate);

        slotTimeStart = moment(slotTimeStart);
        slotTimeEnd = moment(slotTimeEnd);

        let Duration = moment
          .duration(slotTimeStart.diff(slotTimeEnd))
          .toJSON();
        console.log("Duration=>", Duration);

        // console.log(Duration.isBetween(slotTimeStart, slotTimeEnd, null, "[)"));

        let showSlot = moment(startDate).isBetween(
          slotTimeStart,
          slotTimeEnd,
          null,
          "[)"
        );
        let showSlot1 = moment(endDate).isBetween(
          slotTimeStart,
          slotTimeEnd,
          null,
          "(]"
        );
        console.log("startTimeisBetween", showSlot);
        console.log("endTimeisBetween", showSlot1);

        if (showSlot) {
          console.log("showslot", slot1.slotName);

          slotSet.add(slot1.slotName);

          console.log("slotSet=>", slotSet);
        }
        if (showSlot1) {
          console.log("showslot", slot1.slotName);

          slotSet.add(slot1.slotName);

          console.log("slotSet=>", slotSet);
        }
      })
    );

    let value;

    console.log(slotSet);
    console.log(slotSet.size);

    var slotArr = [];
    slotArr = Array.from(slotSet);
    console.log("SlotArr =>", slotArr);

    if (slotSet.size == 0) {
      return (
        <div>
          <div style={{ display: "flex" }}>
            {slots.map((slot1, index) => {
              console.log(slot1.slotName);

              return (
                <div
                  style={{ margin: "20px", width: "100px", height: "40px" }}
                  key={slot1.slotName}
                >
                  <button
                    className="btn waves-effect waves-light "
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#9837BF"
                    }}
                    onClick={() =>
                      this.setState({ bookedSlot: `slot${index + 1}` })
                    }
                  >{`${slot1.slotName}`}</button>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="btn waves-effect waves-light blue"
              // type="submit"
              name="action"
              onClick={() => this.submit()}
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else if (slotSet.size == 1) {
      valuesOfSets = slotSet.values();

      console.log(valuesOfSets);
      console.log(valuesOfSets.size);

      let value1 = valuesOfSets.value;
      console.log(value1);
      value = valuesOfSets.next().value;
      console.log(value);

      return (
        <div>
          <div style={{ display: "flex" }}>
            {slots.map((slot1, index) => {
              console.log(slot1.slotName);
              // value = valuesOfSets.next().value;
              // console.log(value);
              if (slot1.slotName !== value && slot1.slotName !== value1) {
                console.log("not equal");
                return (
                  <div
                    style={{ margin: "20px", width: "100px", height: "40px" }}
                    key={slot1.slotName}
                  >
                    <button
                      className="btn waves-effect waves-light "
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#9837BF"
                      }}
                      onClick={() =>
                        this.setState({ bookedSlot: `slot${index + 1}` })
                      }
                    >{`${slot1.slotName}`}</button>
                  </div>
                );
              } else if (value == undefined) {
                return <div>No Slot Available</div>;
              }
            })}
          </div>
          <div>
            <button
              className="btn waves-effect waves-light blue"
              // type="submit"
              name="action"
              onClick={() => this.submit()}
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else if (slotSet.size > 1) {
      let slotArr = Array.from(slotSet);
      console.log(slotArr);

      valuesOfSets = slotSet.values();

      console.log(valuesOfSets);

      slotArr.map(slotValue => {
        {
          let arr = [];
          slots.map((slot, value) => {
            let val;
            if (slot.slotName !== slotValue) {
              val = slot.slotName;
            }
            arr.push(val);
            // else {
            //   arr.push(slot.slotName);
            // }
          });
          console.log(arr);
        }
      });

      return (
        <div>
          <div style={{ display: "flex" }}>
            {slots.map((slot1, index) => {
              console.log(slot1.slotName);
              // value = valuesOfSets.next().value;
              // console.log(value);
              slotArr.map(value => {
                console.log(value);
                if (slot1.slotName !== value) {
                  console.log("not equal");
                  return (
                    <div
                      style={{ margin: "20px", width: "100px", height: "40px" }}
                      key={slot1.slotName}
                    >
                      <button
                        className="btn waves-effect waves-light "
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#9837BF"
                        }}
                        onClick={() =>
                          this.setState({ bookedSlot: `slot${index + 1}` })
                        }
                      >{`${slot1.slotName}`}</button>
                    </div>
                  );
                }
              });
            })}
          </div>
          <div>
            <button
              className="btn waves-effect waves-light blue"
              // type="submit"
              name="action"
              onClick={() => this.submit()}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <h3>Book A Parking</h3>
        <form
          style={{
            width: "50%",
            margin: "0 auto"
          }}
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <label>Start Date</label>
          <input
            type="date"
            onChange={this.handleChange}
            name="start_date"
            defaultValue={this.state.start_date}
            value={this.state.start_date}
            className="validate"
          />

          <label>Start Time</label>
          <div className="input-field col s12">
            <select
              style={{ display: "block" }}
              name="start_time"
              onChange={this.handleChange}
              value={this.state.start_time}
              defaultValue={this.state.start_time}
            >
              <option value="" disabled selected>
                Select Time
              </option>

              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
            </select>
          </div>

          <label>Time Duration</label>
          <div className="input-field col s12">
            <select
              style={{ display: "block" }}
              name="time_duration"
              onChange={this.handleChange}
              value={this.state.time_duration}
              defaultValue={this.state.time_duration}
            >
              <option value="" disabled selected>
                Select Hrs
              </option>
              <option value="1">1 hrs</option>
              <option value="2">2 hrs</option>
              <option value="3">3 hrs</option>
              <option value="4">4 hrs</option>
              <option value="5">5 hrs</option>
              <option value="6">6 hrs</option>
            </select>
          </div>

          <label>Slot Number</label>

          <div>
            <button
              className="btn waves-effect waves-light "
              type="submit"
              name="action"
              onClick={() => this.renderShowSlot()}
            >
              Show Slots
            </button>
          </div>
          {this.state.showSlots ? this.renderSlots() : null}
        </form>
      </div>
    );
  }
}

export default BookParking;
