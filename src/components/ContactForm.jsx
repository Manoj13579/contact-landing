import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
 
 const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    toast.success("Form submitted successfully");
    event.target.reset();
    } else {
      console.log("Error", res);
    toast.error("Form submission failed");
    }
    setButtonDisabled(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-2xl shadow-lg bg-white rounded-2xl h-[70vh]">
        <h2 className="text-2xl font-semibold text-center">Contact Us</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-y-8">
            <div className="flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" 
               name="name" 
               required
               placeholder="Enter Your Name" 
               className=" w-[95%] h-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-blue-300 focus:ring-1"
               style={{padding: '8px'}}/>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email"
               name="email" 
               required
               placeholder="Enter Your Email"
               className="w-[95%] p-2 h-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-blue-300 focus:ring-1"
               style={{padding: '8px'}}/>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" 
              required
              placeholder="Enter Your Message"
              rows="4" 
              className="w-[95%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-blue-300 focus:ring-1"
              style={{padding: '8px'}}></textarea>
            </div>
            <div className="flex flex-col items-center justify-center">
            <button type="submit" className="w-[95%] p-2 mb-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={buttonDisabled} >Submit Form</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default ContactForm;