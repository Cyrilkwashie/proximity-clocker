"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

// 5 branches across Greater Accra — auto-fit on load
const branches = [
  { id: 1, name: "Head Office",     address: "14 Ring Road East",        city: "Osu, Accra",            lat: 5.5600,  lng: -0.1750,  radius: 100, employees: 42, active: 38, status: "active"   },
  { id: 2, name: "Westside Branch", address: "Kasoa Main Road",          city: "Kasoa, Central Region", lat: 5.5187,  lng: -0.4307,  radius: 150, employees: 19, active: 17, status: "active"   },
  { id: 3, name: "Downtown Hub",    address: "East Legon Hills Avenue",  city: "East Legon, Accra",     lat: 5.6347,  lng: -0.1483,  radius: 75,  employees: 28, active: 25, status: "active"   },
  { id: 4, name: "Airport Desk",    address: "Airport City, Liberia Rd", city: "Airport Res., Accra",   lat: 5.6052,  lng: -0.1668,  radius: 200, employees: 13, active: 9,  status: "active"   },
  { id: 5, name: "North Campus",    address: "Achimota School Road",     city: "Achimota, Accra",       lat: 5.6101,  lng: -0.2268,  radius: 120, employees: 8,  active: 0,  status: "inactive" },
];

const activePeople = [
  // ── Head Office — Osu, Accra (5.5600, -0.1750 | r=100m) ──
  { id: 1,  name: "Lena Vogel",       role: "HR Manager",    branch: "Head Office",     status: "late",  timeIn: "08:35 AM", lat: 5.56015, lng: -0.17485, drifted: false },
  { id: 2,  name: "Priya Kumar",      role: "Developer",     branch: "Head Office",     status: "late",  timeIn: "09:15 AM", lat: 5.55985, lng: -0.17525, drifted: false },
  { id: 3,  name: "Felix Nguyen",     role: "Security",      branch: "Head Office",     status: "valid", timeIn: "08:00 AM", lat: 5.56022, lng: -0.17465, drifted: false },
  { id: 4,  name: "Rachel Kim",       role: "Operations",    branch: "Head Office",     status: "valid", timeIn: "08:10 AM", lat: 5.55992, lng: -0.17515, drifted: false },
  { id: 5,  name: "Owen Brooks",      role: "Legal",         branch: "Head Office",     status: "valid", timeIn: "07:59 AM", lat: 5.56008, lng: -0.17492, drifted: false },
  { id: 6,  name: "Marcus Reid",      role: "Engineer",      branch: "Head Office",     status: "valid", timeIn: "08:04 AM", lat: 5.55996, lng: -0.17505, drifted: false },
  { id: 36, name: "Hana Mori",        role: "Accountant",    branch: "Head Office",     status: "valid", timeIn: "08:02 AM", lat: 5.56018, lng: -0.17472, drifted: false },
  { id: 37, name: "Kwame Asante",     role: "IT Support",    branch: "Head Office",     status: "late",  timeIn: "09:08 AM", lat: 5.55978, lng: -0.17538, drifted: false },
  { id: 38, name: "Yuki Tanaka",      role: "Admin",         branch: "Head Office",     status: "valid", timeIn: "07:55 AM", lat: 5.56003, lng: -0.17495, drifted: false },
  { id: 39, name: "Leo Fernandes",    role: "Sales",         branch: "Head Office",     status: "valid", timeIn: "08:18 AM", lat: 5.56019, lng: -0.17470, drifted: false },
  { id: 40, name: "Zara Ahmed",       role: "Compliance",    branch: "Head Office",     status: "late",  timeIn: "09:22 AM", lat: 5.55988, lng: -0.17520, drifted: false },
  // Head Office — drifted
  { id: 7,  name: "Dana Okafor",      role: "Finance",       branch: "Head Office",     status: "valid", timeIn: "07:58 AM", lat: 5.5650,  lng: -0.1680,  drifted: true  },
  { id: 8,  name: "Tara Silva",       role: "Marketing",     branch: "Head Office",     status: "late",  timeIn: "09:20 AM", lat: 5.5542,  lng: -0.1822,  drifted: true  },

  // ── Westside Branch — Kasoa (5.5187, -0.4307 | r=150m) ──
  { id: 9,  name: "Sam Ford",         role: "Supervisor",    branch: "Westside Branch", status: "valid", timeIn: "07:55 AM", lat: 5.51882, lng: -0.43052, drifted: false },
  { id: 10, name: "Brian Torres",     role: "Support",       branch: "Westside Branch", status: "late",  timeIn: "09:02 AM", lat: 5.51852, lng: -0.43092, drifted: false },
  { id: 11, name: "Kylie Park",       role: "Cashier",       branch: "Westside Branch", status: "valid", timeIn: "08:00 AM", lat: 5.51892, lng: -0.43038, drifted: false },
  { id: 12, name: "James Osei",       role: "Sales Lead",    branch: "Westside Branch", status: "valid", timeIn: "08:22 AM", lat: 5.51860, lng: -0.43082, drifted: false },
  { id: 42, name: "Fatima Al-Hassan", role: "Teller",        branch: "Westside Branch", status: "valid", timeIn: "07:58 AM", lat: 5.51875, lng: -0.43062, drifted: false },
  { id: 43, name: "Chris Banda",      role: "Security",      branch: "Westside Branch", status: "valid", timeIn: "07:50 AM", lat: 5.51883, lng: -0.43048, drifted: false },
  { id: 44, name: "Nadia Petrov",     role: "Customer Svc.", branch: "Westside Branch", status: "late",  timeIn: "09:12 AM", lat: 5.51843, lng: -0.43102, drifted: false },
  { id: 45, name: "Emre Yilmaz",      role: "Back Office",   branch: "Westside Branch", status: "valid", timeIn: "08:14 AM", lat: 5.51870, lng: -0.43075, drifted: false },
  // Westside — drifted
  { id: 13, name: "Aisha Williams",   role: "Clerk",         branch: "Westside Branch", status: "late",  timeIn: "09:10 AM", lat: 5.5120,  lng: -0.4380,  drifted: true  },
  { id: 15, name: "Jonah Pierce",     role: "Warehouse",     branch: "Westside Branch", status: "valid", timeIn: "08:05 AM", lat: 5.5140,  lng: -0.4245,  drifted: true  },

  // ── Downtown Hub — East Legon (5.6347, -0.1483 | r=75m) ──
  { id: 16, name: "Asha Patel",       role: "Designer",      branch: "Downtown Hub",    status: "valid", timeIn: "08:11 AM", lat: 5.63482, lng: -0.14815, drifted: false },
  { id: 17, name: "Suki Yamamoto",    role: "Manager",       branch: "Downtown Hub",    status: "late",  timeIn: "09:30 AM", lat: 5.63450, lng: -0.14852, drifted: false },
  { id: 18, name: "Mei Lin",          role: "QA",            branch: "Downtown Hub",    status: "valid", timeIn: "08:15 AM", lat: 5.63490, lng: -0.14808, drifted: false },
  { id: 19, name: "Diego Ruiz",       role: "Engineer",      branch: "Downtown Hub",    status: "valid", timeIn: "08:05 AM", lat: 5.63458, lng: -0.14842, drifted: false },
  { id: 20, name: "Nina Chow",        role: "Analyst",       branch: "Downtown Hub",    status: "valid", timeIn: "08:55 AM", lat: 5.63472, lng: -0.14825, drifted: false },
  { id: 47, name: "Tobias Schmidt",   role: "Dev Lead",      branch: "Downtown Hub",    status: "valid", timeIn: "07:52 AM", lat: 5.63465, lng: -0.14830, drifted: false },
  { id: 48, name: "Chloe Dubois",     role: "UX Designer",   branch: "Downtown Hub",    status: "late",  timeIn: "09:18 AM", lat: 5.63442, lng: -0.14858, drifted: false },
  { id: 49, name: "Arjun Nair",       role: "Data Analyst",  branch: "Downtown Hub",    status: "valid", timeIn: "08:08 AM", lat: 5.63488, lng: -0.14812, drifted: false },
  { id: 50, name: "Sofia Greco",      role: "PM",            branch: "Downtown Hub",    status: "valid", timeIn: "08:25 AM", lat: 5.63475, lng: -0.14820, drifted: false },
  // Downtown — drifted
  { id: 21, name: "Nathan Cross",     role: "Product",       branch: "Downtown Hub",    status: "late",  timeIn: "09:05 AM", lat: 5.6282,  lng: -0.1483,  drifted: true  },
  { id: 22, name: "Layla Storms",     role: "Intern",        branch: "Downtown Hub",    status: "valid", timeIn: "08:45 AM", lat: 5.6290,  lng: -0.1550,  drifted: true  },
  { id: 23, name: "Victor Osei",      role: "Consultant",    branch: "Downtown Hub",    status: "late",  timeIn: "09:15 AM", lat: 5.6270,  lng: -0.1420,  drifted: true  },
  { id: 51, name: "Hira Baig",        role: "Auditor",       branch: "Downtown Hub",    status: "valid", timeIn: "08:35 AM", lat: 5.6420,  lng: -0.1500,  drifted: true  },

  // ── Airport Desk — Airport Residential (5.6052, -0.1668 | r=200m) ──
  { id: 24, name: "Carlos Méndez",    role: "Coordinator",   branch: "Airport Desk",    status: "late",  timeIn: "08:41 AM", lat: 5.60535, lng: -0.16660, drifted: false },
  { id: 25, name: "Luis Barros",      role: "Agent",         branch: "Airport Desk",    status: "valid", timeIn: "08:00 AM", lat: 5.60500, lng: -0.16705, drifted: false },
  { id: 26, name: "Eve Carter",       role: "Handler",       branch: "Airport Desk",    status: "valid", timeIn: "07:50 AM", lat: 5.60528, lng: -0.16650, drifted: false },
  { id: 27, name: "Thomas Adler",     role: "Supervisor",    branch: "Airport Desk",    status: "valid", timeIn: "08:15 AM", lat: 5.60508, lng: -0.16688, drifted: false },
  { id: 52, name: "Jin-Ho Park",      role: "Ground Staff",  branch: "Airport Desk",    status: "valid", timeIn: "07:45 AM", lat: 5.60518, lng: -0.16672, drifted: false },
  { id: 53, name: "Amelia Okonkwo",   role: "Check-In Sup.", branch: "Airport Desk",    status: "late",  timeIn: "09:05 AM", lat: 5.60502, lng: -0.16692, drifted: false },
  { id: 54, name: "Sven Eriksson",    role: "Baggage Lead",  branch: "Airport Desk",    status: "valid", timeIn: "08:10 AM", lat: 5.60532, lng: -0.16645, drifted: false },
  { id: 55, name: "Aiko Watanabe",    role: "Gate Agent",    branch: "Airport Desk",    status: "valid", timeIn: "07:58 AM", lat: 5.60497, lng: -0.16708, drifted: false },
  { id: 56, name: "Reza Tehrani",     role: "Ops Manager",   branch: "Airport Desk",    status: "valid", timeIn: "07:48 AM", lat: 5.60525, lng: -0.16658, drifted: false },
  // Airport — drifted
  { id: 28, name: "Petra Kovacs",     role: "Logistics",     branch: "Airport Desk",    status: "valid", timeIn: "08:20 AM", lat: 5.6105,  lng: -0.1580,  drifted: true  },
  { id: 29, name: "Elias Mensah",     role: "Cargo",         branch: "Airport Desk",    status: "late",  timeIn: "09:00 AM", lat: 5.5992,  lng: -0.1755,  drifted: true  },
  { id: 30, name: "Sophie Tremblay",  role: "Check-In",      branch: "Airport Desk",    status: "valid", timeIn: "07:45 AM", lat: 5.5988,  lng: -0.1612,  drifted: true  },

  // ── North Campus — Achimota (5.6101, -0.2268 | r=120m) ──
  { id: 31, name: "Grace Tan",        role: "Researcher",    branch: "North Campus",    status: "late",  timeIn: "09:00 AM", lat: 5.61025, lng: -0.22662, drifted: false },
  { id: 32, name: "Paul Monroe",      role: "Lab Tech",      branch: "North Campus",    status: "valid", timeIn: "08:30 AM", lat: 5.60995, lng: -0.22698, drifted: false },
  { id: 33, name: "Iris Chen",        role: "Lecturer",      branch: "North Campus",    status: "valid", timeIn: "08:45 AM", lat: 5.61018, lng: -0.22672, drifted: false },
  { id: 58, name: "Mateus Costa",     role: "TA",            branch: "North Campus",    status: "valid", timeIn: "08:20 AM", lat: 5.61005, lng: -0.22685, drifted: false },
  { id: 59, name: "Leila Moradi",     role: "Postdoc",       branch: "North Campus",    status: "late",  timeIn: "09:14 AM", lat: 5.61015, lng: -0.22678, drifted: false },
  { id: 60, name: "Kofi Boateng",     role: "Lab Manager",   branch: "North Campus",    status: "valid", timeIn: "07:56 AM", lat: 5.60992, lng: -0.22692, drifted: false },
  // North Campus — drifted
  { id: 35, name: "Amara Diallo",     role: "Research Asst.", branch: "North Campus",   status: "valid", timeIn: "08:50 AM", lat: 5.6048,  lng: -0.2268,  drifted: true  },
  { id: 61, name: "Luca Ricci",       role: "Field Intern",  branch: "North Campus",    status: "late",  timeIn: "09:25 AM", lat: 5.6055,  lng: -0.2195,  drifted: true  },
];

// Branches: HO=Osu  WB=Kasoa  DH=East Legon  AD=Airport Residential  NC=Achimota
// In-transit drivers travel realistic Accra inter-area routes at road speed.
// speed = ms per waypoint step.
const movingPeople = [
  // Jake Warren: Osu → Tema via N2/Motorway (~30 km)
  { id: 101, name: "Jake Warren",   role: "Delivery Driver",  branch: "Head Office",     timeIn: "08:10 AM", speed: 10000,
    route: [
      { lat: 5.5600, lng: -0.1750 }, // Osu, Accra
      { lat: 5.5680, lng: -0.1620 }, // Labadi / La
      { lat: 5.5820, lng: -0.1450 }, // Teshie
      { lat: 5.5980, lng: -0.1230 }, // Nungua
      { lat: 5.6120, lng: -0.0950 }, // Baatsona / Spintex
      { lat: 5.6300, lng: -0.0680 }, // Ashaiman border
      { lat: 5.6480, lng: -0.0430 }, // Ashaiman
      { lat: 5.6698, lng: -0.0177 }, // Tema Community 1  ← turnaround
      { lat: 5.6480, lng: -0.0430 },
      { lat: 5.6300, lng: -0.0680 },
      { lat: 5.6120, lng: -0.0950 },
      { lat: 5.5980, lng: -0.1230 },
      { lat: 5.5820, lng: -0.1450 },
      { lat: 5.5680, lng: -0.1620 },
    ] },

  // Rami Haddad: Kasoa → Accra Central via N1 (~30 km)
  { id: 102, name: "Rami Haddad",   role: "Field Driver",     branch: "Westside Branch", timeIn: "08:30 AM", speed: 11000,
    route: [
      { lat: 5.5187, lng: -0.4307 }, // Kasoa
      { lat: 5.5270, lng: -0.3900 }, // Weija Junction
      { lat: 5.5390, lng: -0.3400 }, // Aplaku / Tetegu
      { lat: 5.5450, lng: -0.3000 }, // Gbawe
      { lat: 5.5480, lng: -0.2600 }, // Dansoman approach
      { lat: 5.5495, lng: -0.2335 }, // Dansoman / Mamprobi
      { lat: 5.5520, lng: -0.2050 }, // Korle Bu / Kaneshie
      { lat: 5.5600, lng: -0.1750 }, // Osu / Accra Central  ← turnaround
      { lat: 5.5520, lng: -0.2050 },
      { lat: 5.5495, lng: -0.2335 },
      { lat: 5.5480, lng: -0.2600 },
      { lat: 5.5450, lng: -0.3000 },
      { lat: 5.5390, lng: -0.3400 },
      { lat: 5.5270, lng: -0.3900 },
    ] },

  // Omar Faris: Airport Residential → East Legon via Ring Road / Motorway (~15 km)
  { id: 103, name: "Omar Faris",    role: "Courier",          branch: "Airport Desk",    timeIn: "09:10 AM", speed: 8000,
    route: [
      { lat: 5.6052, lng: -0.1668 }, // Airport Residential
      { lat: 5.6100, lng: -0.1580 }, // Cantonments
      { lat: 5.6155, lng: -0.1510 }, // Dzorwulu / Abelemkpe
      { lat: 5.6220, lng: -0.1505 }, // American House junction
      { lat: 5.6280, lng: -0.1490 }, // Adenta road leading
      { lat: 5.6347, lng: -0.1483 }, // East Legon  ← turnaround
      { lat: 5.6280, lng: -0.1490 },
      { lat: 5.6220, lng: -0.1505 },
      { lat: 5.6155, lng: -0.1510 },
      { lat: 5.6100, lng: -0.1580 },
    ] },

  // Mia Larsson: East Legon → Achimota via Tetteh Quarshie / Ring Road (~18 km)
  { id: 104, name: "Mia Larsson",   role: "Field Agent",      branch: "Westside Branch", timeIn: "09:05 AM", speed: 9000,
    route: [
      { lat: 5.6347, lng: -0.1483 }, // East Legon
      { lat: 5.6305, lng: -0.1680 }, // Tetteh Quarshie roundabout
      { lat: 5.6260, lng: -0.1850 }, // Accra Mall area
      { lat: 5.6210, lng: -0.2000 }, // Tantra Hill
      { lat: 5.6160, lng: -0.2140 }, // Abeka
      { lat: 5.6101, lng: -0.2268 }, // Achimota  ← turnaround
      { lat: 5.6160, lng: -0.2140 },
      { lat: 5.6210, lng: -0.2000 },
      { lat: 5.6260, lng: -0.1850 },
      { lat: 5.6305, lng: -0.1680 },
    ] },

  // Derek Shaw: Achimota → Kasoa via Odorkor / N1 (~40 km)
  { id: 105, name: "Derek Shaw",    role: "Site Coordinator", branch: "North Campus",    timeIn: "09:20 AM", speed: 12000,
    route: [
      { lat: 5.6101, lng: -0.2268 }, // Achimota
      { lat: 5.5950, lng: -0.2420 }, // Lapaz / Ofankor
      { lat: 5.5800, lng: -0.2620 }, // Odorkor
      { lat: 5.5650, lng: -0.2850 }, // Dansoman North
      { lat: 5.5495, lng: -0.2900 }, // Gbawe junction
      { lat: 5.5380, lng: -0.3350 }, // Weija
      { lat: 5.5230, lng: -0.3850 }, // Kasoa approach
      { lat: 5.5187, lng: -0.4307 }, // Kasoa  ← turnaround
      { lat: 5.5230, lng: -0.3850 },
      { lat: 5.5380, lng: -0.3350 },
      { lat: 5.5495, lng: -0.2900 },
      { lat: 5.5650, lng: -0.2850 },
      { lat: 5.5800, lng: -0.2620 },
      { lat: 5.5950, lng: -0.2420 },
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

type MapView = "street" | "satellite" | "hybrid";

const TILE_LAYERS: Record<MapView, { url: string; attribution: string }[]> = {
  street: [
    {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  ],
  satellite: [
    {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com">Esri</a> World Imagery',
    },
  ],
  hybrid: [
    {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com">Esri</a> World Imagery',
    },
    {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      attribution: '',
    },
  ],
};

const VIEW_CYCLE: MapView[] = ["street", "satellite", "hybrid"];
const VIEW_LABELS: Record<MapView, string> = { street: "Street", satellite: "Satellite", hybrid: "Hybrid" };

export default function MapClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [mapView, setMapView] = useState<MapView>("street");
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

      {/* ── View toggle (top right) ── */}
      <div className="absolute top-4 right-4 z-1000 flex flex-col items-end gap-2">
        <div className="flex items-center bg-white shadow-lg ring-1 ring-[#e5e5e5] rounded-2xl p-1">
          {VIEW_CYCLE.map((v) => (
            <button
              key={v}
              onClick={() => setMapView(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mapView === v
                  ? "bg-[#002244] text-white shadow-sm"
                  : "text-[#737373] hover:bg-[#f5f5f5]"
              }`}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </div>

      {/* ── Stats pill (top right) ── */}
      <div className="flex items-center gap-2 bg-white shadow-lg ring-1 ring-[#e5e5e5] rounded-2xl px-3 py-2">
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
        {TILE_LAYERS[mapView].map((layer, i) => (
          <TileLayer key={`${mapView}-${i}`} attribution={layer.attribution} url={layer.url} />
        ))}

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
