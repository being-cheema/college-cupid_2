import React, { useState } from "react";
import PocketBase from "pocketbase";

const SignupForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [college, setCollege] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [idCard, setIdCard] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const pb = new PocketBase("https://collegecupid.pockethost.io");

  const handleNextStep = (step) => {
    if (step === 2 && (!firstName || !lastName || !gender)) {
      alert("Please fill out all fields in Step 1.");
      return;
    }

    if (step === 3 && (!dob || !college || !collegeEmail || emailError)) {
      alert("Please fill out all fields in Step 2 correctly.");
      return;
    }

    setFormStep(step);
  };

  const validateEmail = (e) => {
    const selectedDomain = college;
    const emailValue = e.target.value;

    if (selectedDomain && !emailValue.endsWith(selectedDomain)) {
      setEmailError(`Email domain must match ${selectedDomain}`);
    } else {
      setEmailError("");
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    const age = calculateAge(dob);

    if (emailError) {
      alert("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      const existingUsers = await pb.collection("users").getList(1, 1, {
        filter: `email="${collegeEmail}"`,
      });
      if (existingUsers.items.length > 0) {
        alert("An account with this email already exists.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error checking existing email:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", collegeEmail);
    formData.append("emailVisibility", true);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("college", college);
    formData.append("id_card", idCard);
    formData.append("profilePicture", profilePicture);

    try {
      await pb.collection("users").create(formData);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <img
        src="/assets/logo.png"
        alt="College Cupid Logo"
        className="absolute top-5 left-5 w-20"
      />
      <a
        href="/"
        className="absolute top-5 right-5 px-4 py-2 bg-purple-500 text-black rounded"
      >
        Home
      </a>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-purple-400 text-center text-2xl mb-6">
          Sign Up for College Cupid
        </h1>
        <form>
          {formStep === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <button
                type="button"
                onClick={() => handleNextStep(2)}
                className="w-full bg-purple-500 p-3 rounded text-black"
              >
                Next
              </button>
            </div>
          )}
          {formStep === 2 && (
            <div className="space-y-4">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              >
                <option value="" disabled>
                  Select Your College
                </option>
                <option value="@snuchennai.edu.in">
                  Shiv Nadar University Chennai
                </option>
                <option value="@ssn.edu.in">SSN College of Engineering</option>
                <option value="@iitm.ac.in">IIT Madras</option>
                <option value="@srmist.edu.in">SRM KTR</option>
                <option value="@hindustanuniv.ac.in">
                  Hindustan Institute of Technology and Science
                </option>
                <option value="@vit.ac.in">VIT Chennai</option>
                <option value="@nitt.edu">NIT Trichy</option>
              </select>
              <input
                type="email"
                placeholder="College Email"
                value={collegeEmail}
                onChange={(e) => {
                  setCollegeEmail(e.target.value);
                  validateEmail(e);
                }}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
              <button
                type="button"
                onClick={() => handleNextStep(3)}
                className="w-full bg-purple-500 p-3 rounded text-black"
              >
                Next
              </button>
            </div>
          )}
          {formStep === 3 && (
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <label className="text-purple-400">Upload ID Card</label>
              <input
                type="file"
                onChange={(e) => setIdCard(e.target.files[0])}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <label className="text-purple-400">Upload Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full p-3 rounded bg-gray-700 border border-purple-500 text-white"
              />
              <button
                type="button"
                onClick={handleFormSubmit}
                className="w-full bg-purple-500 p-3 rounded text-black"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default SignupForm
