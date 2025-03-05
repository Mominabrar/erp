import React, { useEffect, useState } from "react";

// This component displays the attendance range table
export const AttendanceRangeTable = ({ attendanceData }) => {
  const [formattedData, setFormattedData] = useState({});

  useEffect(() => {
    const transformedData = {};

    attendanceData.forEach(({ attendanceDate, sessions }) => {
      if (!transformedData[attendanceDate]) {
        transformedData[attendanceDate] = {};
      }

      sessions.forEach(({ session, status }) => {
        transformedData[attendanceDate][session] = status;
      });
    });
    setFormattedData(transformedData);
  }, [attendanceData]);

  const sessions = [
    "9 AM - 10 AM",
    "10 AM - 11 AM",
    "11 AM - 12 PM",
    "1 PM - 2 PM",
    "2 PM - 3 PM",
    "3 PM - 4 PM",
    "4 PM - 5 PM",
  ];

  const sortedDates = Object.keys(formattedData).sort();

  if (!attendanceData || attendanceData.length === 0) {
    return (
      <p className="text-gray-600 text-center">No attendance data available.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border border-gray-300 shadow-md rounded-lg text-sm md:text-base">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm">
              Date
            </th>
            {sessions.map((session, index) => (
              <th
                key={index}
                className="px-4 py-2 md:px-6 md:py-3 text-center text-xs md:text-sm"
              >
                {session}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const sessionData = formattedData[date];
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 md:px-6 md:py-3 font-medium">
                  {formatDate(date)}
                </td>
                {[1, 2, 3, 4, 5, 6, 7].map((sessionNum) => {
                  const status = sessionData[sessionNum];
                  return (
                    <td
                      key={sessionNum}
                      className={`px-4 py-2 md:px-6 md:py-3 text-center text-xs md:text-sm ${
                        status === "present"
                          ? "text-green-700 bg-green-100"
                          : status === "absent"
                          ? "text-red-700 bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {status
                        ? status.charAt(0).toUpperCase() + status.slice(1)
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// This component displays the attendance table
export const AttendanceTable = ({ attendanceData }) => {
  if (!attendanceData || attendanceData.length === 0) {
    return (
      <p className="text-gray-600 text-center">No attendance data available.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border border-gray-300 shadow-md rounded-lg text-sm md:text-base">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm">
              Session
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr
              key={index}
              className={`border-b ${
                record.status === "present" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <td className="px-4 py-2 md:px-6 md:py-3">
                {(() => {
                  switch (String(record.session)) {
                    case "1":
                      return "9 AM - 10 AM";
                    case "2":
                      return "10 AM - 11 AM";
                    case "3":
                      return "11 AM - 12 PM";
                    case "4":
                      return "1 PM - 2 PM";
                    case "5":
                      return "2 PM - 3 PM";
                    case "6":
                      return "3 PM - 4 PM";
                    case "7":
                      return "4 PM - 5 PM";
                    default:
                      return "Unknown Session";
                  }
                })()}
              </td>
              <td
                className={`px-4 py-2 md:px-6 md:py-3 font-medium ${
                  record.status === "present"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
