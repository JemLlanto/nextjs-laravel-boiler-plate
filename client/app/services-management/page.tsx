"use client";
import HomeLayout from "@/components/homeLayout/HomeLayout";
import { DAY_LABELS } from "@/utils/date.helper";

const HomePage = () => {
  return (
    <>
      <HomeLayout>
        <div className="pt-2">
          <div className="w-full mx-auto p-5 bg-white border border-gray-200 rounded-xl shadow-sm font-sans">
            <h6>Openning Settings</h6>
            <div className="flex justify-around items-center mt-3">
              {DAY_LABELS.map((day) => (
                <div className="w-40 border border-(--primary) rounded-sm flex justify-center items-center">
                  <p key={day}>{day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default HomePage;
