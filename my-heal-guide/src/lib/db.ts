import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// --- 1. DOCTOR APPOINTMENTS ---
export const bookAppointment = async (userId: string, doctorId: string, doctorName: string, date: Date, slot: string) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      userId,
      doctorId,
      doctorName,
      date: Timestamp.fromDate(date),
      slot,
      status: "pending", // Default status
      createdAt: Timestamp.now(),
    });
    console.log("Appointment booked with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error adding appointment: ", e);
    return { success: false, error: e };
  }
};

// --- 2. MEDICINE ORDERS ---
export const placeMedicineOrder = async (userId: string, items: any[], total: number, address: string) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      items,
      totalAmount: total,
      deliveryAddress: address,
      status: "processing",
      orderDate: Timestamp.now(),
    });
    console.log("Order placed with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error placing order: ", e);
    return { success: false, error: e };
  }
};

// --- 3. LAB TEST BOOKINGS ---
export const bookLabTest = async (userId: string, testName: string, date: Date, address: string) => {
  try {
    const docRef = await addDoc(collection(db, "test_bookings"), {
      userId,
      testName,
      date: Timestamp.fromDate(date),
      sampleCollectionAddress: address,
      status: "scheduled",
      createdAt: Timestamp.now(),
    });
    console.log("Test booked with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error booking test: ", e);
    return { success: false, error: e };
  }
};