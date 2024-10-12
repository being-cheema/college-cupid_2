import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    Gender: "",
    dob: "",
    age: "",
    College: "",
    id_card: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const pb = new PocketBase("https://collegecupid.pockethost.io");

  const [age, setAge] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const universityEmailDomains = {
    "Shiv Nadar University Chennai": "snu.edu.in",
    "SSN College of Engineering": "ssn.edu.in",
    "IIT Madras": "iitm.ac.in",
    "SRM KTR": "srmist.edu.in",
    "Hindustan Institute of Technology and Science": "hindustanuniv.ac.in",
    "VIT Chennai": "vit.ac.in",
    "NIT Trichy": "nitt.edu",
  };

  const validateEmail = (email, college) => {
    const emailDomain = email.split("@")[1];
    const expectedDomain = universityEmailDomains[college];
    if (expectedDomain && emailDomain !== expectedDomain) {
      return `The email should be a valid ${expectedDomain} address.`;
    }
    return "";
  };

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [formData.dob]);

  useEffect(() => {
    if (formData.College) {
      const expectedDomain = universityEmailDomains[formData.College];
      setEmailHint(
        `Please use your college email ending with @${expectedDomain}`
      );
    }
  }, [formData.College]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      if (name === "email") {
        setEmailError(validateEmail(value, formData.College));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValidationError = validateEmail(
      formData.email,
      formData.College
    );
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("first_name", formData.first_name);
    formPayload.append("last_name", formData.last_name);
    formPayload.append("Gender", formData.Gender);
    formPayload.append("dob", formData.dob);
    formPayload.append("age", age);
    formPayload.append("College", formData.College);
    formPayload.append("id_card", formData.id_card);
    formPayload.append("p1", formData.p1);
    formPayload.append("p2", formData.p2);
    formPayload.append("p3", formData.p3);
    formPayload.append("p4", formData.p4);
    formPayload.append("p5", formData.p5);
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);
    formPayload.append("passwordConfirm", formData.passwordConfirm);

    try {
      const existingUser = await pb
        .collection("users")
        .getFirstListItem(`email="${formData.email}"`);
      if (existingUser) {
        setEmailError(
          "A user with this email already exists. Please try logging in."
        );
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      if (error.status !== 404) {
        console.error("Error checking existing user:", error);
        setIsSubmitting(false);
        alert("Error checking if the user already exists: " + error.message);
        return;
      }
    }

    try {
      const record = await pb.collection("users").create(formPayload);
      await pb.collection("users").requestVerification(formData.email);
      window.location.href = "/verify";
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      alert("Error creating user: " + error.message);
    }
  };

  const handleNextInput = () => {
    setCurrentInputIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#141414] text-[#8789FE]">
      <a href="/" className="absolute top-5 left-5 w-[100px] h-auto">
        <img src="./src/assets/logo.png" alt="Logo" className="w-full" />
      </a>
      <a
        href="/"
        className="absolute top-5 right-5 bg-[#8789FE] hover:bg-[#6a6bd4] text-black py-2 px-4 rounded-md transition"
      >
        Home
      </a>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-[500px] w-full space-y-4"
      >
        <h1 className="text-center text-[#8789FE] text-2xl mb-5 font-extrabold">
          Sign Up For College Cupid
        </h1>

        {currentInputIndex === 0 && (
          <div className={`fade-in`}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
              placeholder="First Name"
            />
            <p className="text-sm mt-1">
              Aww, your first name will make our hearts flutter!
            </p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 1 && (
          <div className={`fade-in`}>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
              placeholder="Last Name"
            />
            <p className="text-sm mt-1">
              Tell us your last name, so we can remember you forever!
            </p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 2 && (
          <div className={`fade-in`}>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <p className="text-sm mt-1">What’s your gender? ❤️</p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 3 && (
          <div className={`fade-in`}>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
              placeholder="Date of Birth"
            />
            <p className="text-sm mt-1">When’s your special day? 🎉</p>
            {age < 18 && (
              <p className="text-red-500 text-sm">
                You must be at least 18 years old to register.
              </p>
            )}
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 4 && (
          <div className={`fade-in`}>
            <select
              name="College"
              value={formData.College}
              onChange={handleChange}
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            >
              <option value="" disabled>
                Select Your College
              </option>
              <option value="Shiv Nadar University Chennai">
                Shiv Nadar University Chennai
              </option>
              <option value="SSN College of Engineering">
                SSN College of Engineering
              </option>
              <option value="IIT Madras">IIT Madras</option>
              <option value="SRM KTR">SRM KTR</option>
              <option value="Hindustan Institute of Technology and Science">
                Hindustan Institute of Technology and Science
              </option>
              <option value="VIT Chennai">VIT Chennai</option>
              <option value="NIT Trichy">NIT Trichy</option>
            </select>
            <p className="text-sm mt-1">
              We’d love to know where you’re studying!
            </p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 5 && (
          <div className={`fade-in`}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Email"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            {emailHint && <p className="text-gray-400">{emailHint}</p>}
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        <input type="text" name="username" style={{ display: "none" }} />

        {currentInputIndex === 6 && (
          <div className={`fade-in`}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
              placeholder="Password"
            />
            <p className="text-sm mt-1">Make it strong and unforgettable!</p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 7 && (
          <div className={`fade-in`}>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
              placeholder="Confirm Password"
            />
            <p className="text-sm mt-1">
              Just to make sure you’re really sure.
            </p>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 8 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="id_card"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>ID Card</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 9 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="p1"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>Profile Photo 1</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 10 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="p2"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>Profile Photo 2</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 11 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="p3"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>Profile Photo 3</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 12 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="p4"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>Profile Photo 4</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 13 && (
          <div className={`fade-in`}>
            <input
              type="file"
              name="p5"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-[#8789FE] bg-gray-700 text-white p-3 rounded w-full"
            />
            <label>Profile Photo 5</label>
            <button
              type="button"
              onClick={handleNextInput}
              className="mt-4 w-full bg-[#8789FE] hover:bg-[#5759FE] text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {currentInputIndex === 14 && (
          <button
            type="submit"
            className={`${
              isSubmitting ? "bg-gray-500" : "bg-[#8789FE]"
            } text-black p-3 rounded w-full transition`}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
