import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {changeCreateContactStatus } from "../redux/actions";
import { AddNewContact } from "../lib/Queries";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';
const AddContact = () => {
  const [userFirstName, updateFirstName] = useState("");
  const [userLastName, updateLastName] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [radioValue, updateRadioValue] = useState("ACTIVE");
  const dispatchFn = useDispatch();

  const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFirstName(event.target.value);
  };

  const { mutateAsync: AddContact, isPending: isAddingUser } = AddNewContact();

  const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateLastName(event.target.value);
  };
  const changeContactNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcontactNumber(event.target.value);
  };

  const changeRadioValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateRadioValue((event.target as HTMLInputElement).value);
  };

  const submitContactForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (userFirstName !== "" && userLastName !== "") {
      const newContactData = {
        id: uuidv4(),
        firstName: userFirstName,
        lastName: userLastName,
        contactNumber: contactNumber,
        status: radioValue,
      };
      // dispatchFn(addContact(newContactData));
      // dispatchFn(changeCreateContactStatus());
      AddContact(newContactData)
    } else {
      toast.error("Please fill all details!!");
    }
  };

  return (
    <div className="overflow-visible md:h-screen h-[580px] md:w-full flex flex-col md:text-center items-center justify-center border text-[#F49F1C] bg-[#F3F3F3]">
      <h1 className="text-[25px] md:text-3xl mb-8 font-bold text-[#143d59]">
        Create New Contact
      </h1>
      <form onSubmit={submitContactForm}>
        <div className="flex flex-col md:w-[550px] w-[300px] h-auto shadow-xl mx-5 border p-10 bg-[white] rounded-xl drop-shadow-sm items-center justify-center">
          <div className="md:w-full block md:flex items-center  mb-5 justify-between">
            <label
              className="mr-3 font-[500] text-[18px] md:text-[25px]"
              htmlFor="FIRSTNAME"
            >
              First Name:
            </label>
            <input
              onChange={changeFirstName}
              value={userFirstName}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="FIRSTNAME"
            />
          </div>

          <div className="md:w-full block md:flex  items-center mb-5 justify-between">
            <label
              className="mr-3 font-[500] text-[18px] md:text-[25px]"
              htmlFor="LASTNAME"
            >
              Last Name:
            </label>
            <input
              onChange={changeLastName}
              value={userLastName}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="LASTNAME"
            />
          </div>

          <div className="md:w-full block md:flex items-center mb-5 justify-between">
            <label
              className="mr-3 font-[500] text-[18px] md:text-[25px]"
              htmlFor="CONTACTNUMBER"
            >
              Contact Number:
            </label>
            <input
              onChange={changeContactNumber}
              value={contactNumber}
              className="grow max-w-[300px] border-2 border-[#36454F] rounded-lg px-3 py-1 font-[500]"
              type="text"
              id="CONTACTNUMBER"
            />
          </div>

          <div className="flex items-center text-[18px] md:text-2xl font-[500] md:w-full justify-between">
            <h1 className="mr-5">Status: </h1>
            <div className="grow max-w-[300px]">
              <div className="flex items-center">
                <input
                  checked={radioValue === "ACTIVE"}
                  onChange={changeRadioValue}
                  className="mr-2 "
                  type="radio"
                  id="ACTIVE"
                  value="ACTIVE"
                  name="ACTIVEINACTIVE"
                />
                <label className=" mb-1" htmlFor="ACTIVE">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={radioValue === "INACTIVE"}
                  onChange={changeRadioValue}
                  className="mr-2 "
                  type="radio"
                  id="INACTIVE"
                  value="INACTIVE"
                  name="ACTIVEINACTIVE"
                />
                <label className=" mb-1" htmlFor="INACTIVE">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap align-center mt-3 md:mt-5 justify-center text-center">
          <button
            onClick={submitContactForm}
            className="hover:bg-[#0e2628] duration-500 transition-all md:h-[50px] h-[40px] md:w-[150px] w-[125px] text-white font-bold rounded-xl drop-shadow-md bg-[#143d59] mt-5"
            type="submit"
          >
            {isAddingUser ? (<div><Spinner color="white" aria-label="Pink spinner example" /></div>) : (<div>Save Contact</div>)}
          </button>
          <button
            onClick={() => dispatchFn(changeCreateContactStatus())}
            className="hover:bg-[#0e2628] duration-500 transition-all md:h-[50px] h-[40px] md:w-[150px] w-[125px] text-white font-bold rounded-xl drop-shadow-md bg-[#143d59] mt-5 ml-3"
            type="submit"
          >
            Close
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddContact;
