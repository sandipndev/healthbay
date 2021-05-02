import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import { io } from "socket.io-client";

function Device(props) {
  const dev_id = props.device_id;

  const timeoutId = useRef(null);
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    if (dev_id) {
      const socket = io("https://api.healthbay.us/hrtspo2reading");

      socket.on("healthbay/hrtspo2-" + dev_id + "/hrtspo2", (hdt) => {
        const data = JSON.parse(hdt);
        setLiveData((d) => {
          if (d.length > 19) return [...d.slice(1), data];
          else return [...d, data];
        });

        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
          setLiveData([]);
        }, 3000);
      });

      return () => socket.disconnect();
    }
  }, [dev_id, setLiveData]);

  const bpmData = {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ],
    datasets: [
      {
        data: liveData.map((d) => d.bpm),
        borderColor: "#ffffff",
      },
    ],
  };

  const spo2Data = {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ],
    datasets: [
      {
        data: liveData.map((d) => d.spo2),
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: {
        ticks: {
          display: false,
        },
      },
      xAxes: {
        ticks: {
          display: false,
        },
      },
    },
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative bg-gradient-to-r from-green-400 to-blue-500 min-h-64 flex flex-col items-center justify-center text-white overflow-hidden w-screen my-2 mt-6">
      {dev_id ? (
        <>
          <div className="absolute flex items-center rounded-full space-x-2 px-3 py-1 top-2 right-2 bg-theme-red-lighter">
            <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="text-xs uppercase">LIVE FROM HRTSPO2-SENSOR</div>
          </div>
          {liveData.length > 0 ? (
            <div className="pt-8 grid grid-cols-3 gap-2 py-2 pb-4">
              <div className="bg-white bg-opacity-10 rounded-md flex flex-col items-center m-2">
                <div className="bg-white bg-opacity-20 uppercase px-2 text-xs rounded-md mx-2 mt-2 self-start">
                  heartbeat
                </div>
                <div className="mt-4 text-3xl font-semibold">
                  {liveData[liveData.length - 1].bpm}
                </div>
              </div>
              <div className="col-span-2">
                <Line data={bpmData} options={options} />
              </div>
              <div className="bg-white bg-opacity-10 rounded-md flex flex-col items-center m-2">
                <div className="bg-white bg-opacity-20 uppercase px-2 text-xs rounded-md mx-2 mt-2 self-start">
                  spo2
                </div>
                <div className="mt-4 text-3xl font-semibold">
                  {liveData[liveData.length - 1].spo2}
                </div>
              </div>
              <div className="col-span-2">
                <Line data={spo2Data} options={options} />
              </div>
            </div>
          ) : (
            <>
              <div className="text-lg">Waiting for data from device...</div>
              <div className="text-xs mt-1">Device not connected</div>
            </>
          )}
        </>
      ) : (
        <div className="bg-white bg-opacity-25 px-4 py-1 rounded-full text-white flex items-center space-x-2 hover:bg-opacity-50 cursor-pointer self-center">
          <div>No device present</div>
        </div>
      )}
    </div>
  );
}

export default Device;