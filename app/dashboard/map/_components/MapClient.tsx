"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

// 5 branches across US cities — auto-fit on load
const branches = [
  { id: 1, name: "Head Office",     address: "14 Commerce Ave, Suite 400", city: "New York",    lat: 40.7128,  lng: -74.0060,  radius: 100, employees: 42, active: 38, status: "active"   },
  { id: 2, name: "Westside Branch", address: "287 West Blvd",              city: "Los Angeles", lat: 34.0522,  lng: -118.2437, radius: 150, employees: 19, active: 17, status: "active"   },
  { id: 3, name: "Downtown Hub",    address: "55 King Street",             city: "Chicago",     lat: 41.8781,  lng: -87.6298,  radius: 75,  employees: 28, active: 25, status: "active"   },
  { id: 4, name: "Airport Desk",    address: "Terminal 2, Gate C",         city: "Houston",     lat: 29.7604,  lng: -95.3698,  radius: 200, employees: 13, active: 9,  status: "active"   },
  { id: 5, name: "North Campus",    address: "University Park, Block 3",   city: "Boston",      lat: 42.3601,  lng: -71.0589,  radius: 120, employees: 8,  active: 0,  status: "inactive" },
];

const activePeople = [
  // ── Head Office — New York (40.7128, -74.0060 | r=100m) ──
  { id: 1,  name: "Lena Vogel",       role: "HR Manager",    branch: "Head Office",     status: "late",  timeIn: "08:35 AM", lat: 40.71295, lng: -74.00580, drifted: false },
  { id: 2,  name: "Priya Kumar",      role: "Developer",     branch: "Head Office",     status: "late",  timeIn: "09:15 AM", lat: 40.71260, lng: -74.00635, drifted: false },
  { id: 3,  name: "Felix Nguyen",     role: "Security",      branch: "Head Office",     status: "valid", timeIn: "08:00 AM", lat: 40.71310, lng: -74.00550, drifted: false },
  { id: 4,  name: "Rachel Kim",       role: "Operations",    branch: "Head Office",     status: "valid", timeIn: "08:10 AM", lat: 40.71270, lng: -74.00620, drifted: false },
  { id: 5,  name: "Owen Brooks",      role: "Legal",         branch: "Head Office",     status: "valid", timeIn: "07:59 AM", lat: 40.71290, lng: -74.00590, drifted: false },
  { id: 6,  name: "Marcus Reid",      role: "Engineer",      branch: "Head Office",     status: "valid", timeIn: "08:04 AM", lat: 40.71278, lng: -74.00608, drifted: false },
  { id: 36, name: "Hana Mori",        role: "Accountant",    branch: "Head Office",     status: "valid", timeIn: "08:02 AM", lat: 40.71300, lng: -74.00565, drifted: false },
  { id: 37, name: "Kwame Asante",     role: "IT Support",    branch: "Head Office",     status: "late",  timeIn: "09:08 AM", lat: 40.71252, lng: -74.00655, drifted: false },
  { id: 38, name: "Yuki Tanaka",      role: "Admin",         branch: "Head Office",     status: "valid", timeIn: "07:55 AM", lat: 40.71285, lng: -74.00595, drifted: false },
  { id: 39, name: "Leo Fernandes",    role: "Sales",         branch: "Head Office",     status: "valid", timeIn: "08:18 AM", lat: 40.71305, lng: -74.00570, drifted: false },
  { id: 40, name: "Zara Ahmed",       role: "Compliance",    branch: "Head Office",     status: "late",  timeIn: "09:22 AM", lat: 40.71265, lng: -74.00625, drifted: false },
  // Head Office — drifted
  { id: 7,  name: "Dana Okafor",      role: "Finance",       branch: "Head Office",     status: "valid", timeIn: "07:58 AM", lat: 40.7178,  lng: -73.9985,  drifted: true  },
  { id: 8,  name: "Tara Silva",       role: "Marketing",     branch: "Head Office",     status: "late",  timeIn: "09:20 AM", lat: 40.7072,  lng: -74.0135,  drifted: true  },

  // ── Westside Branch — Los Angeles (34.0522, -118.2437 | r=150m) ──
  { id: 9,  name: "Sam Ford",         role: "Supervisor",    branch: "Westside Branch", status: "valid", timeIn: "07:55 AM", lat: 34.05235, lng: -118.24352, drifted: false },
  { id: 10, name: "Brian Torres",     role: "Support",       branch: "Westside Branch", status: "late",  timeIn: "09:02 AM", lat: 34.05200, lng: -118.24398, drifted: false },
  { id: 11, name: "Kylie Park",       role: "Cashier",       branch: "Westside Branch", status: "valid", timeIn: "08:00 AM", lat: 34.05250, lng: -118.24322, drifted: false },
  { id: 12, name: "James Osei",       role: "Sales Lead",    branch: "Westside Branch", status: "valid", timeIn: "08:22 AM", lat: 34.05208, lng: -118.24388, drifted: false },
  { id: 42, name: "Fatima Al-Hassan", role: "Teller",        branch: "Westside Branch", status: "valid", timeIn: "07:58 AM", lat: 34.05225, lng: -118.24360, drifted: false },
  { id: 43, name: "Chris Banda",      role: "Security",      branch: "Westside Branch", status: "valid", timeIn: "07:50 AM", lat: 34.05232, lng: -118.24345, drifted: false },
  { id: 44, name: "Nadia Petrov",     role: "Customer Svc.", branch: "Westside Branch", status: "late",  timeIn: "09:12 AM", lat: 34.05192, lng: -118.24412, drifted: false },
  { id: 45, name: "Emre Yilmaz",      role: "Back Office",   branch: "Westside Branch", status: "valid", timeIn: "08:14 AM", lat: 34.05218, lng: -118.24375, drifted: false },
  // Westside — drifted
  { id: 13, name: "Aisha Williams",   role: "Clerk",         branch: "Westside Branch", status: "late",  timeIn: "09:10 AM", lat: 34.0478,  lng: -118.2512,  drifted: true  },
  { id: 15, name: "Jonah Pierce",     role: "Warehouse",     branch: "Westside Branch", status: "valid", timeIn: "08:05 AM", lat: 34.0490,  lng: -118.2375,  drifted: true  },

  // ── Downtown Hub — Chicago (41.8781, -87.6298 | r=75m) ──
  { id: 16, name: "Asha Patel",       role: "Designer",      branch: "Downtown Hub",    status: "valid", timeIn: "08:11 AM", lat: 41.87825, lng: -87.62958, drifted: false },
  { id: 17, name: "Suki Yamamoto",    role: "Manager",       branch: "Downtown Hub",    status: "late",  timeIn: "09:30 AM", lat: 41.87790, lng: -87.63010, drifted: false },
  { id: 18, name: "Mei Lin",          role: "QA",            branch: "Downtown Hub",    status: "valid", timeIn: "08:15 AM", lat: 41.87835, lng: -87.62940, drifted: false },
  { id: 19, name: "Diego Ruiz",       role: "Engineer",      branch: "Downtown Hub",    status: "valid", timeIn: "08:05 AM", lat: 41.87800, lng: -87.62995, drifted: false },
  { id: 20, name: "Nina Chow",        role: "Analyst",       branch: "Downtown Hub",    status: "valid", timeIn: "08:55 AM", lat: 41.87815, lng: -87.62972, drifted: false },
  { id: 47, name: "Tobias Schmidt",   role: "Dev Lead",      branch: "Downtown Hub",    status: "valid", timeIn: "07:52 AM", lat: 41.87808, lng: -87.62978, drifted: false },
  { id: 48, name: "Chloe Dubois",     role: "UX Designer",   branch: "Downtown Hub",    status: "late",  timeIn: "09:18 AM", lat: 41.87782, lng: -87.63018, drifted: false },
  { id: 49, name: "Arjun Nair",       role: "Data Analyst",  branch: "Downtown Hub",    status: "valid", timeIn: "08:08 AM", lat: 41.87828, lng: -87.62950, drifted: false },
  { id: 50, name: "Sofia Greco",      role: "PM",            branch: "Downtown Hub",    status: "valid", timeIn: "08:25 AM", lat: 41.87818, lng: -87.62963, drifted: false },
  // Downtown — drifted
  { id: 21, name: "Nathan Cross",     role: "Product",       branch: "Downtown Hub",    status: "late",  timeIn: "09:05 AM", lat: 41.8725,  lng: -87.6298,  drifted: true  },
  { id: 22, name: "Layla Storms",     role: "Intern",        branch: "Downtown Hub",    status: "valid", timeIn: "08:45 AM", lat: 41.8732,  lng: -87.6370,  drifted: true  },
  { id: 23, name: "Victor Osei",      role: "Consultant",    branch: "Downtown Hub",    status: "late",  timeIn: "09:15 AM", lat: 41.8718,  lng: -87.6228,  drifted: true  },
  { id: 51, name: "Hira Baig",        role: "Auditor",       branch: "Downtown Hub",    status: "valid", timeIn: "08:35 AM", lat: 41.8848,  lng: -87.6315,  drifted: true  },

  // ── Airport Desk — Houston (29.7604, -95.3698 | r=200m) ──
  { id: 24, name: "Carlos Méndez",    role: "Coordinator",   branch: "Airport Desk",    status: "late",  timeIn: "08:41 AM", lat: 29.76062, lng: -95.36948, drifted: false },
  { id: 25, name: "Luis Barros",      role: "Agent",         branch: "Airport Desk",    status: "valid", timeIn: "08:00 AM", lat: 29.76020, lng: -95.37018, drifted: false },
  { id: 26, name: "Eve Carter",       role: "Handler",       branch: "Airport Desk",    status: "valid", timeIn: "07:50 AM", lat: 29.76052, lng: -95.36942, drifted: false },
  { id: 27, name: "Thomas Adler",     role: "Supervisor",    branch: "Airport Desk",    status: "valid", timeIn: "08:15 AM", lat: 29.76032, lng: -95.37000, drifted: false },
  { id: 52, name: "Jin-Ho Park",      role: "Ground Staff",  branch: "Airport Desk",    status: "valid", timeIn: "07:45 AM", lat: 29.76042, lng: -95.36972, drifted: false },
  { id: 53, name: "Amelia Okonkwo",   role: "Check-In Sup.", branch: "Airport Desk",    status: "late",  timeIn: "09:05 AM", lat: 29.76025, lng: -95.37008, drifted: false },
  { id: 54, name: "Sven Eriksson",    role: "Baggage Lead",  branch: "Airport Desk",    status: "valid", timeIn: "08:10 AM", lat: 29.76058, lng: -95.36930, drifted: false },
  { id: 55, name: "Aiko Watanabe",    role: "Gate Agent",    branch: "Airport Desk",    status: "valid", timeIn: "07:58 AM", lat: 29.76015, lng: -95.37025, drifted: false },
  { id: 56, name: "Reza Tehrani",     role: "Ops Manager",   branch: "Airport Desk",    status: "valid", timeIn: "07:48 AM", lat: 29.76050, lng: -95.36952, drifted: false },
  // Airport — drifted
  { id: 28, name: "Petra Kovacs",     role: "Logistics",     branch: "Airport Desk",    status: "valid", timeIn: "08:20 AM", lat: 29.7658,  lng: -95.3620,  drifted: true  },
  { id: 29, name: "Elias Mensah",     role: "Cargo",         branch: "Airport Desk",    status: "late",  timeIn: "09:00 AM", lat: 29.7548,  lng: -95.3778,  drifted: true  },
  { id: 30, name: "Sophie Tremblay",  role: "Check-In",      branch: "Airport Desk",    status: "valid", timeIn: "07:45 AM", lat: 29.7538,  lng: -95.3625,  drifted: true  },

  // ── North Campus — Boston (42.3601, -71.0589 | r=120m) ──
  { id: 31, name: "Grace Tan",        role: "Researcher",    branch: "North Campus",    status: "late",  timeIn: "09:00 AM", lat: 42.36025, lng: -71.05862, drifted: false },
  { id: 32, name: "Paul Monroe",      role: "Lab Tech",      branch: "North Campus",    status: "valid", timeIn: "08:30 AM", lat: 42.35995, lng: -71.05918, drifted: false },
  { id: 33, name: "Iris Chen",        role: "Lecturer",      branch: "North Campus",    status: "valid", timeIn: "08:45 AM", lat: 42.36018, lng: -71.05872, drifted: false },
  { id: 58, name: "Mateus Costa",     role: "TA",            branch: "North Campus",    status: "valid", timeIn: "08:20 AM", lat: 42.36005, lng: -71.05898, drifted: false },
  { id: 59, name: "Leila Moradi",     role: "Postdoc",       branch: "North Campus",    status: "late",  timeIn: "09:14 AM", lat: 42.36015, lng: -71.05878, drifted: false },
  { id: 60, name: "Kofi Boateng",     role: "Lab Manager",   branch: "North Campus",    status: "valid", timeIn: "07:56 AM", lat: 42.35992, lng: -71.05908, drifted: false },
  // North Campus — drifted
  { id: 35, name: "Amara Diallo",     role: "Research Asst.", branch: "North Campus",   status: "valid", timeIn: "08:50 AM", lat: 42.3538,  lng: -71.0589,  drifted: true  },
  { id: 61, name: "Luca Ricci",       role: "Field Intern",  branch: "North Campus",    status: "late",  timeIn: "09:25 AM", lat: 42.3548,  lng: -71.0520,  drifted: true  },
];

// Branches: HO=New York  WB=Los Angeles  DH=Chicago  AD=Houston  NC=Boston
// In-transit people travel realistic inter-city routes.
// speed = ms per waypoint step — tuned so movement is visible but not frantic.
const movingPeople = [
  // Jake Warren: New York → Philadelphia → back  (via NJ Turnpike / I-95, ~95 mi)
  { id: 101, name: "Jake Warren",   role: "Delivery Driver",  branch: "Head Office",     timeIn: "08:10 AM", speed: 12000,
    route: [
      { lat: 40.7128, lng: -74.0060 }, // New York, NY
      { lat: 40.6895, lng: -74.1745 }, // Newark, NJ
      { lat: 40.6084, lng: -74.2787 }, // Rahway, NJ
      { lat: 40.5432, lng: -74.3632 }, // Woodbridge, NJ
      { lat: 40.4774, lng: -74.4429 }, // New Brunswick, NJ
      { lat: 40.3573, lng: -74.6672 }, // Princeton, NJ
      { lat: 40.2206, lng: -74.7597 }, // Trenton, NJ
      { lat: 40.1065, lng: -74.8506 }, // Bristol, PA
      { lat: 40.0198, lng: -74.9662 }, // Levittown, PA
      { lat: 39.9526, lng: -75.1652 }, // Philadelphia, PA  ← turnaround
      { lat: 40.0198, lng: -74.9662 },
      { lat: 40.1065, lng: -74.8506 },
      { lat: 40.2206, lng: -74.7597 },
      { lat: 40.3573, lng: -74.6672 },
      { lat: 40.4774, lng: -74.4429 },
      { lat: 40.5432, lng: -74.3632 },
      { lat: 40.6084, lng: -74.2787 },
      { lat: 40.6895, lng: -74.1745 },
    ] },

  // Rami Haddad: Los Angeles → San Diego → back  (via I-5, ~120 mi)
  { id: 102, name: "Rami Haddad",   role: "Field Driver",     branch: "Westside Branch", timeIn: "08:30 AM", speed: 13000,
    route: [
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
      { lat: 33.9400, lng: -118.2330 }, // Compton / Downey area
      { lat: 33.7701, lng: -118.1937 }, // Long Beach, CA
      { lat: 33.6600, lng: -117.9988 }, // Laguna Hills, CA
      { lat: 33.5000, lng: -117.6647 }, // San Clemente, CA
      { lat: 33.3128, lng: -117.2917 }, // Oceanside, CA
      { lat: 33.1581, lng: -117.2506 }, // Carlsbad, CA
      { lat: 32.9595, lng: -117.2653 }, // Del Mar, CA
      { lat: 32.7157, lng: -117.1611 }, // San Diego, CA  ← turnaround
      { lat: 32.9595, lng: -117.2653 },
      { lat: 33.1581, lng: -117.2506 },
      { lat: 33.3128, lng: -117.2917 },
      { lat: 33.5000, lng: -117.6647 },
      { lat: 33.6600, lng: -117.9988 },
      { lat: 33.7701, lng: -118.1937 },
      { lat: 33.9400, lng: -118.2330 },
    ] },

  // Omar Faris: Houston → Austin → back  (via US-290, ~165 mi)
  { id: 103, name: "Omar Faris",    role: "Courier",          branch: "Airport Desk",    timeIn: "09:10 AM", speed: 15000,
    route: [
      { lat: 29.7604, lng: -95.3698 }, // Houston, TX
      { lat: 29.8266, lng: -95.5497 }, // Jersey Village, TX
      { lat: 29.9691, lng: -95.7048 }, // Cypress, TX
      { lat: 30.0963, lng: -96.0786 }, // Hempstead, TX
      { lat: 30.1666, lng: -96.3977 }, // Brenham, TX
      { lat: 30.2150, lng: -96.8140 }, // Giddings, TX
      { lat: 30.3493, lng: -97.3700 }, // Elgin, TX
      { lat: 30.2672, lng: -97.7431 }, // Austin, TX  ← turnaround
      { lat: 30.3493, lng: -97.3700 },
      { lat: 30.2150, lng: -96.8140 },
      { lat: 30.1666, lng: -96.3977 },
      { lat: 30.0963, lng: -96.0786 },
      { lat: 29.9691, lng: -95.7048 },
      { lat: 29.8266, lng: -95.5497 },
    ] },

  // Mia Larsson: Los Angeles → Palm Springs → back  (via I-10, ~110 mi)
  { id: 104, name: "Mia Larsson",   role: "Field Agent",      branch: "Westside Branch", timeIn: "09:05 AM", speed: 11000,
    route: [
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
      { lat: 34.0953, lng: -118.1270 }, // Alhambra / San Gabriel
      { lat: 34.0553, lng: -117.7500 }, // Pomona, CA
      { lat: 34.0633, lng: -117.6509 }, // Ontario, CA
      { lat: 33.9806, lng: -117.3755 }, // Riverside, CA
      { lat: 33.9294, lng: -116.9772 }, // Beaumont, CA
      { lat: 33.8803, lng: -116.7760 }, // Cabazon, CA
      { lat: 33.8303, lng: -116.5453 }, // Palm Springs, CA  ← turnaround
      { lat: 33.8803, lng: -116.7760 },
      { lat: 33.9294, lng: -116.9772 },
      { lat: 33.9806, lng: -117.3755 },
      { lat: 34.0633, lng: -117.6509 },
      { lat: 34.0553, lng: -117.7500 },
      { lat: 34.0953, lng: -118.1270 },
    ] },

  // Derek Shaw: Boston → Providence → back  (via I-95, ~50 mi)
  { id: 105, name: "Derek Shaw",    role: "Site Coordinator", branch: "North Campus",    timeIn: "09:20 AM", speed: 9000,
    route: [
      { lat: 42.3601, lng: -71.0589 }, // Boston, MA
      { lat: 42.2418, lng: -71.1673 }, // Dedham, MA
      { lat: 42.1472, lng: -71.2495 }, // Walpole, MA
      { lat: 42.0834, lng: -71.3978 }, // Franklin, MA
      { lat: 41.9445, lng: -71.2852 }, // Attleboro, MA
      { lat: 41.8787, lng: -71.3828 }, // Pawtucket, RI
      { lat: 41.8240, lng: -71.4128 }, // Providence, RI  ← turnaround
      { lat: 41.8787, lng: -71.3828 },
      { lat: 41.9445, lng: -71.2852 },
      { lat: 42.0834, lng: -71.3978 },
      { lat: 42.1472, lng: -71.2495 },
      { lat: 42.2418, lng: -71.1673 },
    ] },
];

type Filter = "all" | "branches" | "people";

/* ─── Custom icons ──────────────────────────────────────────────────────────── */

function makeBranchIcon(inactive: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:36px;height:36px;border-radius:50% 50% 50% 0;
        background:${inactive ? "#a3a3a3" : "#002244"};
        transform:rotate(-45deg);
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
      ">
        <svg style="transform:rotate(45deg);width:14px;height:14px;" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

function makePersonIcon(status: string, drifted: boolean) {
  const bg = drifted ? "#737373" : status === "valid" ? "#14b8a6" : "#f59e0b";
  const border = drifted ? "#d4d4d4" : "white";
  const dash = drifted ? `style="border:3px dashed ${border};outline:none;"` : `style="border:3px solid white;"`;
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:28px;height:28px;border-radius:50%;
        background:${bg};
        border:3px ${drifted ? "dashed" : "solid"} ${border};
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
      ">
        <svg style="width:12px;height:12px;" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

function makeMovingIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div class="moving-dot" style="
        width:30px;height:30px;border-radius:50%;
        background:#3b82f6;
        border:3px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
      ">
        <svg style="width:13px;height:13px;" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -18],
  });
}

/* ─── Fit bounds helper ──────────────────────────────────────────────────────── */

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = branches.map((b) => [b.lat, b.lng] as [number, number]);
    map.fitBounds(L.latLngBounds(bounds), { padding: [60, 60] });
  }, [map]);
  return null;
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export default function MapClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const stepRefs = useRef<Record<number, number>>({});
  const [movingPositions, setMovingPositions] = useState<Record<number, { lat: number; lng: number }>>(() => {
    const init: Record<number, { lat: number; lng: number }> = {};
    movingPeople.forEach((p) => { init[p.id] = p.route[0]; });
    return init;
  });

  // Inject CSS for the pulsing blue ring on moving-person icons
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "moving-person-style";
    style.textContent = `
      @keyframes moving-pulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.55); }
        50%      { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
      }
      .moving-dot { animation: moving-pulse 1.4s ease-in-out infinite; }
    `;
    if (!document.getElementById("moving-person-style")) document.head.appendChild(style);
    return () => { document.getElementById("moving-person-style")?.remove(); };
  }, []);

  // Advance each moving person one step along their route at their individual speed
  useEffect(() => {
    const intervals = movingPeople.map((person) =>
      setInterval(() => {
        setMovingPositions((prev) => {
          const next = ((stepRefs.current[person.id] ?? 0) + 1) % person.route.length;
          stepRefs.current[person.id] = next;
          return { ...prev, [person.id]: person.route[next] };
        });
      }, person.speed)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const showBranches = filter === "all" || filter === "branches";
  const showPeople   = filter === "all" || filter === "people";

  const activeBranches = branches.filter((b) => b.status === "active").length;
  const movingCount    = movingPeople.length;
  const onlineCount    = activePeople.length + movingCount;
  const onTimeCount    = activePeople.filter((p) => p.status === "valid" && !p.drifted).length;
  const lateCount      = activePeople.filter((p) => p.status === "late"  && !p.drifted).length;
  const driftedCount   = activePeople.filter((p) => p.drifted).length;

  return (
    <div className="relative w-full h-full">

      {/* ── Floating filter bar ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 flex items-center gap-1 bg-white shadow-lg ring-1 ring-[#e5e5e5] rounded-2xl p-1">
        {(["all", "branches", "people"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
              filter === f
                ? "bg-[#002244] text-white shadow-sm"
                : "text-[#737373] hover:bg-[#f5f5f5]"
            }`}
          >
            {f === "all" ? "All" : f === "branches" ? "Branches" : "People"}
          </button>
        ))}
      </div>

      {/* ── Stats pill (top right) ── */}
      <div className="absolute top-4 right-4 z-1000 flex items-center gap-2 bg-white shadow-lg ring-1 ring-[#e5e5e5] rounded-2xl px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#002244]" />
          <span className="text-[#0a0a0a] text-xs font-semibold">{activeBranches}</span>
          <span className="text-[#737373] text-[10px]">branches</span>
        </div>
        <div className="w-px h-4 bg-[#e5e5e5]" />
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
          </span>
          <span className="text-[#0a0a0a] text-xs font-semibold">{onlineCount}</span>
          <span className="text-[#737373] text-[10px]">live</span>
        </div>
      </div>

      {/* ── Legend (bottom left) ── */}
      <div className="absolute bottom-6 left-4 z-1000 bg-white shadow-lg ring-1 ring-[#e5e5e5] rounded-2xl px-4 py-3 flex flex-col gap-2">
        <p className="text-[#737373] text-[10px] font-bold uppercase tracking-widest">Legend</p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#002244] border-2 border-white shadow-sm" />
          <span className="text-[#0a0a0a] text-xs">Branch</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500 border-2 border-white shadow-sm" />
          <span className="text-[#0a0a0a] text-xs">On Time</span>
          <span className="text-[#737373] text-[10px]">({onTimeCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm" />
          <span className="text-[#0a0a0a] text-xs">Late</span>
          <span className="text-[#737373] text-[10px]">({lateCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#737373] border-2 border-dashed border-[#d4d4d4] shadow-sm" />
          <span className="text-[#0a0a0a] text-xs">Left area</span>
          <span className="text-[#737373] text-[10px]">({driftedCount})</span>
        </div>
        <div className="mt-1 flex items-center gap-2 pt-2 border-t border-[#e5e5e5]">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
          <span className="text-[#0a0a0a] text-xs">In Transit</span>
          <span className="text-[#737373] text-[10px]">({movingCount})</span>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-[#e5e5e5]">
          <div className="w-4 h-2 rounded-full bg-[#002244]/20 border border-[#002244]/40" />
          <span className="text-[#737373] text-[10px]">Geofence radius</span>
        </div>
      </div>

      {/* ── Map ── */}
      <MapContainer
        center={[40.75800, -73.98550]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <FitBounds />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Branch circles + markers */}
        {showBranches && branches.map((branch) => (
          <span key={branch.id}>
            <Circle
              center={[branch.lat, branch.lng]}
              radius={branch.radius}
              pathOptions={{
                color: branch.status === "active" ? "#002244" : "#a3a3a3",
                fillColor: branch.status === "active" ? "#002244" : "#a3a3a3",
                fillOpacity: 0.08,
                weight: 2,
                dashArray: branch.status === "inactive" ? "6 4" : undefined,
              }}
            />
            <Marker
              position={[branch.lat, branch.lng]}
              icon={makeBranchIcon(branch.status === "inactive")}
            >
              <Popup className="leaflet-popup-custom">
                <div className="p-1 min-w-45">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${branch.status === "active" ? "bg-teal-500" : "bg-[#a3a3a3]"}`} />
                    <span className="text-[11px] font-bold text-[#002244]">{branch.name}</span>
                  </div>
                  <p className="text-[10px] text-[#737373] mb-1">{branch.address}</p>
                  <p className="text-[10px] text-[#737373] mb-2">{branch.city}</p>
                  <div className="flex gap-3 text-[10px]">
                    <span className="text-teal-600 font-semibold">{branch.active} online</span>
                    <span className="text-[#737373]">{branch.employees} total</span>
                  </div>
                  <p className="text-[10px] text-[#737373] mt-1">Radius: {branch.radius} m</p>
                </div>
              </Popup>
            </Marker>
          </span>
        ))}

        {/* People markers */}
        {showPeople && activePeople.map((person) => (
          <Marker
            key={person.id}
            position={[person.lat, person.lng]}
            icon={makePersonIcon(person.status, person.drifted)}
          >
            <Popup>
              <div className="p-1 min-w-40">
                <p className="text-[11px] font-bold text-[#002244] mb-0.5">{person.name}</p>
                <p className="text-[10px] text-[#737373] mb-1">{person.role}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${person.drifted ? "bg-[#737373]" : person.status === "valid" ? "bg-teal-500" : "bg-amber-400"}`} />
                  <span className={`text-[10px] font-semibold ${person.drifted ? "text-[#737373]" : person.status === "valid" ? "text-teal-600" : "text-amber-600"}`}>
                    {person.drifted ? "Left area" : person.status === "valid" ? "On Time" : "Late"}
                  </span>
                </div>
                <p className="text-[10px] text-[#737373]">📍 {person.branch}</p>
                <p className="text-[10px] text-[#737373]">🕐 In at {person.timeIn}</p>
                {person.drifted && <p className="text-[10px] text-amber-600 mt-1">⚠️ Outside branch area</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Moving people — positions update every person.speed ms */}
        {showPeople && movingPeople.map((person) => {
          const pos = movingPositions[person.id];
          if (!pos) return null;
          return (
            <Marker
              key={`moving-${person.id}`}
              position={[pos.lat, pos.lng]}
              icon={makeMovingIcon()}
            >
              <Popup>
                <div className="p-1 min-w-40">
                  <p className="text-[11px] font-bold text-[#002244] mb-0.5">{person.name}</p>
                  <p className="text-[10px] text-[#737373] mb-1">{person.role}</p>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-semibold text-blue-600">In Transit</span>
                  </div>
                  <p className="text-[10px] text-[#737373]">📍 {person.branch}</p>
                  <p className="text-[10px] text-[#737373]">🕐 In at {person.timeIn}</p>
                  <p className="text-[10px] text-blue-500 mt-1">🚗 Moving between branches</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
