"use client";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import Button from "../Button";
import { useTheme } from "next-themes";
import { HeadingH3, HeadingH4 } from "../Heading";
import Container from "../Container";
import { Para12, Para14 } from "../ParaGraph";
import axios from "axios";

const PlanCard = ({ serviceTabId,setServiceplanId }) => {

  // console.log(" planCard id : ",serviceTabId)
  const { theme, setTheme } = useTheme();
  const [filteredServiceplan, setFilteredServiceplan] = useState([]);
  const [serviceplan, setserviceplan] = useState([]);

  useEffect(() => {
    if (serviceTabId) {
      const fetchAllServiceplans = async () => {
        try {
          const response = await axios.get("/api/serviceplan");
          setserviceplan(response.data.serviceplans); // Corrected to serviceplans
          // console.log("All Service Plans:", response.data.serviceplans); 
        } catch (error) {
          console.error('Error getting service plans:', error);
        }
      };
      fetchAllServiceplans();
    }
  }, [serviceTabId]);

  useEffect(() => {
    const filteredData = serviceplan.filter(plan => plan.tab.serviceInfoId === serviceTabId);
    setFilteredServiceplan(filteredData);
    // console.log("Filtered Service Plans:", filteredData);
  
    if (filteredData.length > 0) {
      const newServiceplanId = filteredData[0].tabId;
      // console.log("New Service Faq ID:", newServiceplanId);
      setServiceplanId(newServiceplanId);
    }
  }, [serviceplan, serviceTabId]);
  


  return (
    <>
      <Container>
        <div
          className={`mt-10 mb-10 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 `}
        >
          {filteredServiceplan &&
            filteredServiceplan.map((items, indexCard) => (
              <div
                className={`  space-y-2 shadow  mb-5 rounded-lg p-4 hover:scale-105 transition duration-300 ${
                  theme === "dark"
                    ? " bg-primary-blue100 "
                    : "  bg-primary-white"
                } `}
                key={indexCard + 1 || items.id}
              >
                <div className="">
                  <HeadingH3 title={items.title} />
                  <p className="font-normal">{items.text}</p>
                </div>
                <div>
                  <HeadingH4 title={items.price} />
                  <p className="font-normal">{items.description}</p>
                </div>
                <div>
                  <hr />
                </div>
                <Button
                  text={"Choose Plan"}
                  className={`w-full hover:scale-105 justify-center flex ${
                    theme === "dark"
                      ? "bg-primary-white text-black"
                      : " bg-primary-blue200 hover:bg-primary-blue300 text-white"
                  }  border-none `}
                />
                <HeadingH4 title={"Features"} />

                {items.feature.map((items, index) => (
                  <>
                    <div className="flex" key={index + 1 || items.id}>
                      <TiTick size={20} />
                      <Para14 title={items.option} />
                    </div>
                  </>
                ))}
                <Para12
                  title={
                    "This is project starting Price it will be increase on project scalability."
                  }
                />
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default PlanCard;
