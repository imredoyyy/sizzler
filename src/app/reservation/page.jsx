"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import { mergeClasses } from "@/lib/utils";

const ReservationPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [personCount, setPersonCount] = useState("");
  const [reservationProgress, setReservationProgress] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const userEmail = session.user.email;
      const userName = session.user.name;
      let processedUserName = userName;
      if (processedUserName.includes(" ")) {
        processedUserName = processedUserName.split(" ")[0];
      } else {
        processedUserName =
          processedUserName.charAt(0).toUpperCase() +
          processedUserName.slice(1);
      }
      setEmail(userEmail || "");
      setName(processedUserName || "");
    }
  }, [session]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();

    // Strip off the time part from today's date for comparison
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // Convert the selected date string to a Date object
    const selectedDateObj = new Date(selectedDate);

    // Check if the selected date is in the past
    if (selectedDateObj < todayDateOnly) {
      toast.error("Cannot select a date in the past");
      return;
    }

    setDate(selectedDate);
  };

  const handleReservation = async () => {
    setReservationProgress(true); // Set loading state at the beginning

    if (status !== "authenticated") {
      toast.error("Please login to reserve a table");
      router.push("/login");
      setReservationProgress(false); // Reset loading state
      return;
    } else if (!name || !email || !phone || !date || !time || !personCount) {
      toast.error("All fields are required");
      setReservationProgress(false); // Reset loading state
      return;
    }

    const reservationPromise = fetch("api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        time,
        persons: personCount,
      }),
    });

    toast
      .promise(reservationPromise, {
        loading: "Creating reservation...",
        success: "Reservation created successfully",
        error: "Failed to create reservation",
      })
      .finally(() => {
        setReservationProgress(false);
      });

    try {
      const createReservation = await reservationPromise;

      if (!createReservation.ok) {
        throw new Error("Failed to create reservation");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Breadcrumbs page="Reservation" pageName="Reservation" />
      <Container>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-center text-xl font-semibold text-orange-50">
            Reservation
          </h3>
          <h1 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
            Create Unforgettable Moments <br />
            Reserve a Table Now
          </h1>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={name}
                inputMode="text"
                disabled={reservationProgress}
                onChange={(e) => setName(e.target.value)}
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
                autoComplete="username"
                disabled={reservationProgress}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                placeholder="Email"
                id="input-email"
                className="animated-input group peer"
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
                inputMode="numeric"
                disabled={reservationProgress}
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
                type="date"
                name="date"
                value={date}
                disabled={reservationProgress}
                onChange={handleDateChange}
                placeholder="date"
                id="input-date"
                className="animated-input peer"
              />
              <label htmlFor="input-date" className="animated-label">
                Date
              </label>
            </div>
            <div className="relative">
              <input
                type="time"
                name="time"
                value={time}
                disabled={reservationProgress}
                onChange={(e) => setTime(e.target.value)}
                placeholder="time"
                id="input-time"
                className="animated-input peer"
              />
              <label htmlFor="input-time" className="animated-label">
                Time
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="persons"
                value={personCount}
                disabled={reservationProgress}
                onChange={(e) => {
                  if (e.target.value < 1) {
                    setPersonCount("");
                    toast.error("Minimum value in persons field must be 1");
                  } else {
                    setPersonCount(e.target.value);
                  }
                }}
                placeholder="Persons"
                id="input-personCount"
                className="animated-input peer"
              />
              <label htmlFor="input-personCount" className="animated-label">
                Persons
              </label>
            </div>

            <Button radius="sm" size="lg" onClick={handleReservation}>
              Reserve Table
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default ReservationPage;
