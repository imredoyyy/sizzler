import { useState, useEffect } from "react";
import Button from "./ui/Button";

const UserProfileForm = ({ userData, savingInformation, onSave }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setStreet(userData.street || "");
      setTown(userData.town || "");
      setCity(userData.city || "");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(e, {
      name: userName,
      email,
      phone,
      street,
      town,
      city,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8"
    >
      <div className="relative">
        <input
          type="text"
          name="name"
          value={userName}
          disabled={savingInformation}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Name"
          id="input-name"
          className="animated-input peer"
        />
        <label htmlFor="input-name" className="animated-label">
          Name
        </label>
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          value={email}
          inputMode="email"
          disabled={savingInformation}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="input-email"
          className="animated-input peer"
        />
        <label htmlFor="input-email" className="animated-label">
          Email
        </label>
      </div>
      <div className="relative">
        <input
          type="number"
          name="phone"
          value={phone}
          disabled={savingInformation}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          id="input-phone"
          className="animated-input peer"
        />
        <label htmlFor="input-phone" className="animated-label">
          Phone
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          name="street"
          value={street}
          disabled={savingInformation}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
          id="input-street"
          className="animated-input peer"
        />
        <label htmlFor="input-street" className="animated-label">
          Street
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          name="town"
          value={town}
          disabled={savingInformation}
          onChange={(e) => setTown(e.target.value)}
          placeholder="Town"
          id="input-town"
          className="animated-input peer"
        />
        <label htmlFor="input-town" className="animated-label">
          Town
        </label>
      </div>
      <div className="relative">
        <input
          type="text"
          name="city"
          value={city}
          disabled={savingInformation}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          id="input-city"
          className="animated-input peer"
        />
        <label htmlFor="input-city" className="animated-label">
          City
        </label>
      </div>

      <Button type="submit" size="lg" radius="sm" disabled={savingInformation}>
        Save
      </Button>
    </form>
  );
};

export default UserProfileForm;
